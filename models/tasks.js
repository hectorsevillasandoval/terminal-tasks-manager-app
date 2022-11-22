const fs = require('node:fs');
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
        return Object.values( this._list );
    }


}

module.exports = Tasks;