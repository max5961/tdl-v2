export class Collection {
    constructor(){
        this.projects = [];
    }

    addProject(name, desc) {
        const project = new Project(name, desc);
        project.setProjectID(this);
        this.projects.push(project);
    }

    getProjectIDs() {
        return this.projects.map(project => project._id);
    }

    getProjectNames() {
        return this.projects.map(project => project.name);
    }

    getProject(id) {
        for (const project of this.projects) {
            if (project._id === id) {
                return project;
            }
        }
    }

    removeProject(id) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i]._id === id) {
                this.projects.splice(i,1);
            }
        }
    }

    removeTask(id) {
        const projectID = id.substring(0,5);
        const parentProject = this.getProject(projectID);

        for (let i = 0; i < parentProject.tasks.length; i++) {
            if (parentProject.tasks[i]._id === id) {
                parentProject.tasks.splice(i,1);
            }
        }
    }
}

export class Project {
    constructor(name, desc) {
        this.name = name;
        this.desc = desc;
        this.tasks = [];
        this._id = null;
    }

    setProjectID(collectionObject) {
        function createID() {
            return `p${Math.floor(Math.random() * 8999) + 1000}`;
        }

        const projectIDs = collectionObject.getProjectIDs();
        let id = createID();

        while (projectIDs.includes(id)) {
            id = createID();
        }

        this._id = id;
    }

    addTask(name, desc) {
        const task = new Task(name, desc);
        this.tasks.push(task);
        task.setTaskID(this);
    }

    getTaskIDs() {
        return this.tasks.map(task => task._id);
    }

    getTaskNames() {
        return this.tasks.map(task => task.name);
    }
}

export class Task {
    constructor(name, notes = '', priority = 'unset', dueDate = '') {
        this.name = name;
        this.notes = notes;
        this.priority = priority;
        this.dueDate = dueDate;
        this._id = null;
    }

    setTaskID(projectObject) {
        function createID() {
            return `${projectObject._id}-t${Math.floor(Math.random() * 8999) + 1000}`
        }

        const taskIDs = projectObject.getTaskIDs();
        let id = createID();

        while (taskIDs.includes(id)) {
            id = createID();
        }

        this._id = id;
    }
}