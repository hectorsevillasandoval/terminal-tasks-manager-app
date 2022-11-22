const { v4: uuidv4 } = require('uuid');

class Task{
    constructor(taskDescription) {
        this.id = uuidv4();
        this.description = taskDescription;
    }
}

module.exports = Task;