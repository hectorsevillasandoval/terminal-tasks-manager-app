const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

require( 'colors' );

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    
    do{
        opt = await inquirerMenu();

        switch ( opt ) {
            case 1:
                // Create Task
                const desc = await readInput('Description: ');
                const taskId = tasks.createTask( desc );
                console.log(`The task ${taskId} has been created.`);
                break;
            case 2:
                console.log( tasks.tasks );
                break;
        }
        await pause();
    } while( opt !== 0 );
};


main();