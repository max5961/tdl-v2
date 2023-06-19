import './style/index.css';
import { insertDefaultLoaded } from './controller.js';
import { Navigation } from './controller.js';
import { Collection } from './model.js';
import { Storage } from './model.js';


insertDefaultLoaded();

export const collection = new Collection();

if (Storage.checkStatus()) {
    Storage.retrieveFromLocalStorage(collection);
    Navigation.updateSidebarCount();
}