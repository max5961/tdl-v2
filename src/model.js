import { collection } from './index.js';

export class Collection {
    constructor(){
        this.projects = [];
    }

    addProject(name, desc) {
        const project = new Project(name, desc);
        project.setProjectID(this);
        this.projects.push(project);

        Storage.updateLocalStorage(collection);
    }


    removeProject(id) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i]._id === id) {
                this.projects.splice(i,1);
            }
        }

        Storage.updateLocalStorage(collection);
    }

    removeTask(id) {
        const projectID = this.getParentProjectID(id);
        const parentProject = this.getProject(projectID);

        for (let i = 0; i < parentProject.tasks.length; i++) {
            if (parentProject.tasks[i]._id === id) {
                parentProject.tasks.splice(i,1);
            }
        }

        Storage.updateLocalStorage(collection);
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

    getTask(id) {
        const parentID = this.getParentProjectID(id);
        const parentProject = this.getProject(parentID);

        for (const task of parentProject.tasks) {
            if (task._id === id) {
                return task;
            }
        }
    }

    getParentProjectID(id) {
        return id.substring(0,5);
    }

    getProjectIDs() {
        return this.projects.map(project => project._id);
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

        Storage.updateLocalStorage(collection);
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

export class Storage {
    static updateLocalStorage(collectionObject) {
        const projects = collectionObject.projects.map(({tasks, ...rest}) => rest)

        const tasks = [];
        collectionObject.projects.forEach(project => {
            project.tasks.forEach(task => tasks.push(task));
        })

        localStorage.setItem('projects', JSON.stringify(projects));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static retrieveFromLocalStorage(collectionObject) {
        const projects = JSON.parse(localStorage.getItem('projects'));
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        for (const project of projects) {
            Object.setPrototypeOf(project, Project.prototype);

            project.tasks = [];
            collectionObject.projects.push(project);
        }

        for (const task of tasks) {
            Object.setPrototypeOf(task, Task.prototype);

            const parentProjectID = task._id.substring(0,5);
            const project = collectionObject.getProject(parentProjectID);
            project.tasks.push(task);
        }
    }

    static checkStatus() {
        if (!localStorage.getItem('projects')) {
            return false;
        } else {
            return true;
        }
    }
}