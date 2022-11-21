const inquirer = require('inquirer');
require('colors');

const { menu } = require('./menuOptions.js');


const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿What would you like to do?',
        choices: menu,
    }
];

const inquirerMenu = async () => {
    //console.clear();
    console.log('='.repeat(20).green);
    console.log('Tasks Manager App'.yellow);
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

module.exports = {
    inquirerMenu,
    pause
};