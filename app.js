const { saveDB, readDB } = require('./helpers/db.helper');
const { inquirerMenu, pause, readInput, listTasksToRemove, confirm, listPendingTasks } = require('./helpers/inquirer');
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
            case 5:
                const pendingTasks = await listPendingTasks( tasks.getTasks ); // returns an array
                if(pendingTasks.length >= 0 ) tasks.completeTask( pendingTasks );
                break;
            case 6:
                const removeThisID = await listTasksToRemove( Object.values( tasks._list ) );
                const deleteId = await confirm();
                
                if( !deleteId || deleteId === 0 ) {
                    console.log('No tasks to remove');
                    break;
                }
                console.log("removeThisID", removeThisID);
                const removed = tasks.removeTask( removeThisID )

                if( !removed ) {
                    console.log('There was an error removing the task');
                    break;
                }

                console.log(`The task ${removeThisID} has been removed`);

                
                break;
            case 0:
                break;
        }   
        saveDB( Object.values( tasks._list ) );
        await pause();
    } while( opt !== 0 );

    
};


main();