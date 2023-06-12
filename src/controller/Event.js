import { collection } from '../index.js';
import { Build } from '../view/Build.js';
import { Move } from './controller.js';
import { Controller } from './controller.js';

export class Event {
    static preventDefault(e) {
        e.preventDefault();
    }
    // click
    static newProject() {
        document.querySelector('#content').appendChild(Build.newProjectModal());

        document.querySelector('.new-project-modal input#project-name').focus();
    }

    static hoverNewProject(e) {
        // need to add 2 event listeners to the element for this to work properly
        // 1 event needs to be 'mouseenter' and 1 event needs to be 'mouseleave'
        function getImgNode(node) {
            if (node.nodeName === 'IMG') {
                return node;
            }

            if (node.childNodes.length === 0) {
                return -1;
            }

            for (let i = 0; i < node.childNodes.length; i++) {
                return getImgNode(node.childNodes[i]);
            }
        }

        const image = getImgNode(e.target);

        if (e.type === 'mouseenter') {
            image.classList.add('active');
        } else if (e.type === 'mouseleave') {
            image.classList.remove('active');
        }
    }

    // click
    static exitNewProjectModal(e) {
        const form = document.querySelector('.new-project-modal form');
        const modal = document.querySelector('.new-project-modal');
        const cancel = document.querySelector('button.cancel');
    
        if (e.target === form ) {
            return;
        }
    
        if (e.target === modal || e.target === cancel) {
            modal.remove();
        }
    }

    // input
    static validateNewProjectInput(e) {
        const createButton = document.querySelector('.new-project-modal button[type=submit]');
        const names = collection.getProjectNames();
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
    static maximizeNavigation() {
        document.querySelector('.navigation.maximized').classList.remove('hidden');
        document.querySelector('.navigation.minimized').classList.remove('visible');
    }

    // click
    static minimizeNavigation() {
        document.querySelector('.navigation.maximized').classList.add('hidden');
        document.querySelector('.navigation.minimized').classList.add('visible');
    }

    // click '.project-container button.adjust-height'
    static showProjectContent() {
        const projectContainer = document.querySelector('.project-container');
        const img = document.querySelector('.project-container img.adjust-height')
    
        projectContainer.classList.toggle('maximized');
        img.classList.toggle('rotated');
    }

    static addProject(e) {
        const name = document.querySelector('input#project-name').value;
        const desc = document.querySelector('textarea#project-description').value;
        const modal = document.querySelector('.new-project-modal');

        if (name.length > 0) {
            if (document.querySelector('input#project-name.valid')) {
                collection.addProject(name, desc);
                modal.remove();
            } else {
                window.alert('That name is already chosen!');
            }
        }
    }

    static clickTab(e) {
        Controller.resetChosenTab(e);
        const targetedClass = Controller.getClass(e.target);
        console.log(targetedClass);
        //Controller.loadContentView(targetedClass);
    }

    // this needs to use unique IDs to target the container
    // currently not doing so for the purposes of cleaning up the style sheet
    static toggleViewContent() {
        const container = document.querySelector('.content-view .project-container');
        container.classList.toggle('maximized');

        const image = document.querySelector('.content-view img.adjust-height');
        image.classList.toggle('rotated');
    }
}