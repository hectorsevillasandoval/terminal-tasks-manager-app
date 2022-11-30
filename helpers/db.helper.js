const fs = require('node:fs');
const path = require('path');
const dbFilePath = path.join( __dirname, '../db/tasks.json');

const saveDB = ( data ) => {
    fs.writeFileSync( dbFilePath, JSON.stringify(data), 'utf8');
}

const readDB = () => {
    if( ! fs.existsSync( dbFilePath ) ){
        return null;
    }

    const info = fs.readFileSync( dbFilePath, { encoding: 'utf-8' });
    
    const data = info ? JSON.parse(info) : [];

    return data;
}

module.exports = {
    saveDB,
    readDB
}