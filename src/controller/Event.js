import { Build } from '../view/Build.js';
import { Move } from './Move.js';

export class Event {
    static preventDefault(e) {
        e.preventDefault();
    }
    // click
    static newProject() {
        document.querySelector('#content').appendChild(Build.newProjectModal());

        document.querySelector('.new-project-modal input#project-name').focus();
    }

    // click
    static exitNewProjectModal(e) {
        const form = document.querySelector('.new-project-modal form');
        const modal = document.querySelector('.new-project-modal');
        const cancel = document.querySelector('button.cancel');
    
        if (e.target === form) {
            return;
        }
    
        if (e.target === modal || e.target === cancel) {
            modal.remove();
        }
    }

    // input
    static validateNewProjectInput(e) {
        const createButton = document.querySelector('.new-project-modal button[type=submit]');
        const names = []; // change to --> const names = collection.getProjectNames();
        let current = e.target.value.trimEnd();
    
        if (e.target.value.length > 0) {
            createButton.classList.add('not-empty');
    
            if (!names.includes(current)) {
                e.target.classList.add('valid');
            } else {
                e.target.classList.remove('valid');
            }
    
        } else {
            createButton.classList.remove('not-empty');
            e.target.classList.remove('valid');
        }
    }

    // click
    static maximizeSidebar() {
        document.querySelector('.sidebar.maximized').classList.remove('hidden');
        document.querySelector('.sidebar.minimized').classList.remove('visible');
    }

    // click
    static minimizeSidebar() {
        document.querySelector('.sidebar.maximized').classList.add('hidden');
        document.querySelector('.sidebar.minimized').classList.add('visible');
    }

    // click '.project-container button.adjust-height'
    static showProjectContent() {
        const projectContainer = document.querySelector('.project-container');
        const img = document.querySelector('.project-container img.adjust-height')
    
        projectContainer.classList.toggle('maximized');
        img.classList.toggle('rotated');
    }
}