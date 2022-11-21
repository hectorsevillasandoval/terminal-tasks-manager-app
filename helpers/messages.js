require('colors');
const { menu } = require('./menuOptions.js');

const showMenu = () => {

    return new Promise( resolve => {
        console.clear();
        console.log('='.repeat(20).green);
        console.log('Tasks Manager App'.yellow);
        console.log('='.repeat(20).green);
    
        for( const menuOption of menu ){
            console.log( `${(menuOption.option).toString().green}. ${menuOption.label}` );
        }
    
        /***
         **** Require information from the terminal ****
         ***/
        const readLine = require( 'readline' ).createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question( 'Select an option: ', (opt) => {
            readLine.close();
            resolve(opt);
        } );

    } )
}

const pause = () => { z

    return new Promise( resolve => {
        const readLine = require( 'readline' ).createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question( `Press ${'ENTER'.green} to continue...\n`, (opt) => {
            readLine.close();
            resolve();
        } );

    } )

};

module.exports = { showMenu, pause };