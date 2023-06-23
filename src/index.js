import './style/index.css';
import { insertDefaultLoaded } from './controller.js';
import { LoadDefault } from './controller.js';
import { Navigation } from './controller.js';
import { Collection } from './model.js';
import { Storage } from './model.js';
import { userSettings } from './controller.js';


insertDefaultLoaded();

export const collection = new Collection();

if (Storage.checkStatus()) {
    Storage.retrieveFromLocalStorage(collection);
    Navigation.updateSidebarCount();
}

if (Storage.checkUserSettings()) {
    console.log('user settings is not null');
    Storage.retrieveUserSettings(userSettings);
    LoadDefault.loadLastPage();
    LoadDefault.resetChosenTab();
    
    console.log(userSettings);
}
