import './style/index.css';
import { insertDefaultLoaded } from './controller.js';
import { Collection } from './model.js';
import { Project } from './model.js';
import { Task } from './model.js';

insertDefaultLoaded();

export const collection = new Collection();

collection.addProject('project 1','desc of p1');
console.log(JSON.stringify(collection));

collection.addProject('project 2', 'desc of p2');
console.log(JSON.stringify(collection));

collection.getProject(collection.projects[0]._id).addTask('task1','desc of task1');
console.log(JSON.stringify(collection));

collection.removeTask(collection.projects[0].tasks[0]._id);
console.log(JSON.stringify(collection));
