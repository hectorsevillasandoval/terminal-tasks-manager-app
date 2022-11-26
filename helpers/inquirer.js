const inquirer = require('inquirer');
require('colors');

const { menu } = require('./menuOptions.js');


const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿What would you like to do?',
        choices: menu.map( choice => { 
            return { ...choice, name: `${choice.value.toString().yellow}. ${choice.name}` }
         } ),
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('='.repeat(20).green);
    console.log('Tasks Manager App'.white);
    console.log('='.repeat(20).green);

    const { option } = await inquirer.prompt(questions);

    return option;
};

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue...\n`,
        }
    ];
    await inquirer.prompt( question );
};

const readInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Please enter a description';
                }
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);

    return description;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput
};