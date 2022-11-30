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

const listTasksToRemove = async ( tasks = [] ) => {
    const choices = tasks.map( (task, index) => {
        return {
            value: task.id,
            name: `${(index + 1).toString().green}. ${task.description}`
        };        
    });

    choices.unshift({
        value: 0,
        name: `${'0.'.green} Cancel`
    });

    if( choices.length > 0 ) { 
        const { removeTask } = await inquirer.prompt([
            {
                type: 'list',
                name: 'removeTask',
                choices
            },
        ]);
        

        return removeTask;
    }

    return false;
    
};

const listPendingTasks = async ( tasks = [] ) => {
    const choices = tasks.map( (task, index) => {
        return {
            value: task.id,
            checked: task.completed,
            name: `${(index + 1).toString().red}. ${task.description}`
        };        
    });

    if( choices.length > 0 ) { 
        const { pendingTasks } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'pendingTasks',
                choices
            },
        ]);
        

        return pendingTasks;
    }

    return false;
};

const confirm = async () => {
    
    const { deleteId } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'deleteId',
            message: '¿Are you sure?',
        }
    ]);

    return deleteId;

};

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksToRemove,
    confirm,
    listPendingTasks
};