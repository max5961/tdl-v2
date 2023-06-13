import './style/index.css';
import { insertDefaultLoaded } from './controller/controller.js';
import { Collection } from './model/Model.js';

insertDefaultLoaded();

export const collection = new Collection();