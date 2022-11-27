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
        for( const task of tasksFromDB){
            this._list[task.id] = task;
        }
        console.log('Task loaded', this._list);
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
        console.log('\n');
        for( const itemTask of Object.values( this._list ).filter( task => !completed ? !task.completed : task.completed ) ){
            const listIndex = `${++index}.`;
            const listIndexFormatted = listIndex.green;
            console.log(`\t${listIndexFormatted} ${itemTask.description} :: ${!completed ? '⚠️' : '✅'}`);
        }
        console.log('\n');

        return true;
    }

    removeTask( id = '' ){
        if( !this._list[id] ){
            return false;
        }
        delete this._list[id];
        return true;
    }


}

module.exports = Tasks;