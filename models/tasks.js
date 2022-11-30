require('colors');
const Task = require('./task');

class Tasks {
    
    constructor(){
        this._list = [];
    }

    createTask( desc = '' ){
        const task = new Task( desc );
        this._list[task.id] = task;
        
        return task.id;
    }

    loadTasksFromDB( tasksFromDB = [] ){
        for( const task of tasksFromDB ){
            this._list[task.id] = task;
        }
    }

    listOfTasks( completed = false ) {
        return Object.values( this._list ).filter( task => !completed ? !task.completed : task.completed );
    }

    get getTasks(){
        return Object.values( this._list );
    }

    listTasks(){
        let index = 0;
        console.log('\n');
        for( const itemTask of Object.values( this._list )){
            const listIndex = `${++index}.`;
            const listIndexFormatted = !itemTask.completed ? listIndex.red : listIndex.green;
            console.log(`\t${listIndexFormatted} ${itemTask.description} :: ${ !itemTask.completed ? 'Pending'.red : 'Completed'.green}`);
        }
        console.log('\n');

        return true;
    }

    listCompleteIncompleteTasks( completed = false ) {
        let index = 0;
        const taskList = this.listOfTasks( completed );
        console.log('\n');
        for( const itemTask of taskList ) {
            const listIndex = `${++index}.`;
            const listIndexFormatted = listIndex.green;
            console.log(`\t${listIndexFormatted} ${itemTask.description} :: ${!completed ? '⚠️' : '✅'}`);
        }
        console.log('\n');

        return true;
    }

    completeTask( taskList = [] ){
        
        if( taskList.length <= 0 ) {
            this.incompleteTasks( Object.values(this._list).map( task => task.id ) )
            return false;
        }
        const currentCompletedTasks = Object.entries( this._list ).filter( task => task[1].completed );
        const tasksToMarkAsIncomplete = currentCompletedTasks.filter( task => !taskList.includes(task[1].id) ).map(task => task[1].id);

        this.incompleteTasks( tasksToMarkAsIncomplete );

        for( const taskId of taskList ){
            this._list[taskId] = { 
                ...this._list[taskId], 
                completed: true,
                completionDate: new Date().toISOString()
            };
        }
        return true;
    }

    incompleteTasks( taskIds = [] ){
        for( const taskId of taskIds ){
            this._list[taskId] = {
                ...this._list[taskId],
                completed: false,
                completionDate: null
            };
        }
    }

    removeTask( id = '' ){
        if( !this._list[id] ){
            return false;
        }

        delete this._list[id];
        return(true);
    }


}

module.exports = Tasks;