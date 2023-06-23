import './style/index.css';
import { LoadDefault } from './controller.js';
import { Navigation } from './controller.js';
import { Collection } from './model.js';
import { Storage } from './model.js';
import { userSettings } from './controller.js';


LoadDefault.insertDefaultLoaded();

export const collection = new Collection();

if (Storage.checkStatus()) {
    Storage.retrieveFromLocalStorage(collection);
    Navigation.updateSidebarCount();
}

if (Storage.checkUserSettings()) {
    Storage.retrieveUserSettings(userSettings);
    LoadDefault.loadLastPage();
    LoadDefault.resetChosenTab();
}
