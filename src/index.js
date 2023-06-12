import './style/index.css';
import { Move } from './controller/controller.js';
import { Collection } from './model/Model.js';

Move.insertDefaultLoaded();

export const collection = new Collection();