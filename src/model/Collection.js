export class Collection {
    constructor(){
        this.projects = [];
    }

    addProject(name, desc) {
        const project = new Project(name, desc);
        project.setProjectID(this);
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
            return `p${Math.floor(Math.random() * 9998) + 1}`;
        }

        const projectIDs = collectionObject.projects.map(Project => Project._id);
        let id = createID();

        while (projectsIDs.includes(id)) {
            id = createID();
        }

        this._id = id;
    }
}