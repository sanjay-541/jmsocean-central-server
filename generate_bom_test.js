const xlsx = require('xlsx');
const fs = require('fs');

console.log('Generating dummy BOM Master data (150,000 rows)...');

const data = [];
// Define column headers exactly as expected by the backend
const columns = [
    'ItemID', 'BOMItemType', 'BOMItemCode', 'BOMItemName', 'BOMItemWeightinKgs', 'BOMUOM',
    'BOMType', 'BOMQuantity', 'RMItemType', 'RMItemCode', 'RMItemName/Process', 'RMSrNo',
    'RMItemWeightinKgs', 'RMItemUOM', 'RMItemQuantity', 'HasBOM', 'GrindingItemCode',
    'GrindingItemName', 'GrindingPercentage', 'AltItems'
];

for (let i = 1; i <= 150000; i++) {
    data.push({
        'ItemID': `ITEM-${i}`,
        'BOMItemType': 'FG',
        'BOMItemCode': `FG-${Math.floor(i / 10)}`,
        'BOMItemName': `Finished Good ${i}`,
        'BOMItemWeightinKgs': (Math.random() * 10).toFixed(2),
        'BOMUOM': 'KGS',
        'BOMType': 'Standard',
        'BOMQuantity': 1,
        'RMItemType': 'RM',
        'RMItemCode': `RM-${i}`,
        'RMItemName/Process': `Raw Material ${i}`,
        'RMSrNo': i,
        'RMItemWeightinKgs': (Math.random() * 5).toFixed(2),
        'RMItemUOM': 'KGS',
        'RMItemQuantity': (Math.random() * 2).toFixed(2),
        'HasBOM': 'Yes',
        'GrindingItemCode': `GR-${i}`,
        'GrindingItemName': `Grinding Process ${i}`,
        'GrindingPercentage': (Math.random() * 10).toFixed(2),
        'AltItems': `ALT-${i}`
    });

    if (i % 10000 === 0) console.log(`Generated ${i} rows...`);
}

const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(data, { header: columns });
xlsx.utils.book_append_sheet(wb, ws, "BOM_Data");

const filename = 'bom_test_150k.xlsx';
console.log(`Writing to ${filename}...`);
xlsx.writeFile(wb, filename);
console.log('Done!');
