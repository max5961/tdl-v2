import './style/index.css';
import { insertDefaultLoaded } from './controller.js';
import { Collection } from './model.js';
import { Project } from './model.js';
import { Task } from './model.js';
import { Storage } from './model.js';

insertDefaultLoaded();

export const collection = new Collection();

if (Storage.checkStatus()) {
    Storage.retrieveFromLocalStorage(collection);
}