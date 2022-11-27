const { saveDB, readDB } = require('./helpers/db.helper');
const { inquirerMenu, pause, readInput, listTasksToRemove, confirm } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

require( 'colors' );

const main = async () => {
    let opt = '';
    const tasks = new Tasks();

    const DBtasks = readDB();
    
    if( DBtasks ){
        tasks.loadTasksFromDB( DBtasks );
    }
    
    do{
        opt = await inquirerMenu();

        switch ( opt ) {
            case 1:
                // Create Task
                const desc = await readInput('Description: ');
                const taskId = tasks.createTask( desc );
                console.log(tasks._list);
                console.log(`The task ${taskId} has been created.`);
                break;
            case 2:
                tasks.listTasks();
                break;
            case 3:
                tasks.listCompleteIncompleteTasks( true );
                break;
            case 4:
                tasks.listCompleteIncompleteTasks( false );
                break;
            case 6:
                const removeThisID = await listTasksToRemove( Object.values( tasks._list ) );
                const deleteId = await confirm();
            
                if( deleteId ) tasks.removeTask( deleteId );
                
                break;
            case 0:
                break;
        }   
        saveDB( Object.values( tasks._list ) );
        await pause();
    } while( opt !== 0 );

    
};


main();