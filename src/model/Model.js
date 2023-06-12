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
}