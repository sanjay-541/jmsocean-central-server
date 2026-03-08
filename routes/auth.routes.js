'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Simple in-memory rate limit: max 10 login attempts per key per 15 min
const loginAttempts = new Map();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;

function getLoginKey(req) {
  return req.ip || req.socket?.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
}

function checkLoginRateLimit(req) {
  const key = getLoginKey(req);
  const now = Date.now();
  let entry = loginAttempts.get(key);
  if (!entry) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    loginAttempts.set(key, entry);
  }
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + WINDOW_MS;
  }
  entry.count++;
  if (entry.count > MAX_ATTEMPTS) return false;
  return true;
}

/**
 * Create auth routes (login, health). Mount at /api so routes are /api/health, /api/login.
 * @param {{ pool: import('pg').Pool, JWT_SECRET: string }} deps
 */
function createAuthRouter(deps) {
  const { pool, JWT_SECRET } = deps;

  async function q(text, params) {
    const { rows } = await pool.query(text, params);
    return rows;
  }

  router.get('/health', async (_req, res) => {
    try {
      const r = await q('SELECT NOW() AS now', []);
      res.json({ ok: true, now: r[0].now });
    } catch (e) {
      res.status(500).json({ ok: false, error: String(e) });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      if (!checkLoginRateLimit(req)) {
        return res.status(429).json({ ok: false, error: 'Too many login attempts. Try again later.' });
      }
      const { username, password } = req.body || {};
      if (!username || !password) return res.json({ ok: false, error: 'Missing credentials' });

      const rows = await q(
        `SELECT id, username, password, line, role_code, permissions, global_access
           FROM users
          WHERE username = $1
            AND COALESCE(is_active, TRUE) = TRUE
          LIMIT 1`,
        [username]
      );

      if (!rows.length) return res.json({ ok: false, error: 'User not found' });
      const u = rows[0];

      let valid = false;
      let needsRehash = false;
      if (u.password.startsWith('$2')) {
        valid = await bcrypt.compare(password, u.password);
      } else {
        if (u.password === password) {
          valid = true;
          needsRehash = true;
        }
      }

      if (!valid) return res.json({ ok: false, error: 'Password is Wrong' });

      if (needsRehash) {
        const hash = await bcrypt.hash(password, 10);
        await q('UPDATE users SET password=$1 WHERE username=$2', [hash, u.username]);
      }

      let factories = [];
      if (u.role_code === 'superadmin' || u.username === 'superadmin') {
        factories = await q(`SELECT id, name, code, location, 'superadmin' as user_role FROM factories WHERE is_active = true ORDER BY id`);
      } else {
        factories = await q(`
              SELECT f.id, f.name, f.code, f.location, uf.role_code as user_role
              FROM factories f
              JOIN user_factories uf ON uf.factory_id = f.id
              WHERE uf.user_id = $1 AND f.is_active = true
              ORDER BY f.id
          `, [u.id]);
      }

      delete u.password;

      const now = new Date();
      const h = now.getHours();
      let shift = 'Day';
      let shiftDate = new Date(now);
      if (h >= 8 && h < 20) {
        shift = 'Day';
      } else {
        shift = 'Night';
        if (h < 8) shiftDate.setDate(shiftDate.getDate() - 1);
      }
      const yyyy = shiftDate.getFullYear();
      const mm = String(shiftDate.getMonth() + 1).padStart(2, '0');
      const dd = String(shiftDate.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;

      u.shift = shift;
      u.shiftDate = dateStr;

      const token = jwt.sign(
        { id: u.id, username: u.username, role: u.role_code, line: u.line },
        JWT_SECRET,
        { expiresIn: '12h' }
      );
      res.json({ ok: true, data: u, factories, token });
    } catch (e) {
      console.error('login error', e);
      res.status(500).json({ ok: false, error: String(e) });
    }
  });

  return router;
}

module.exports = { createAuthRouter };
