import { collection } from '../index.js';
import { Build } from '../view/Build.js';

export function preventDefault(e) {
    e.preventDefault();
}

export function insertDefaultLoaded() {
    const content = document.getElementById('content');
        
    content.appendChild(Build.navigationMaximized());
    content.appendChild(Build.navigationMinimized());
    content.appendChild(Build.rightSideFlexContainer());

    const rightSideFlexContainer = document.querySelector('.right-side-flex-container');

    rightSideFlexContainer.appendChild(Build.header());
    rightSideFlexContainer.appendChild(Build.viewContent());
    rightSideFlexContainer.appendChild(Build.mobileNav());

    Move.insertViewContent(Build.singleProjectView());
}

// elements that are removed or inserted into often
export class Move {
    static removeContent() {

        const viewContent = document.getElementById('view-content');

        while (viewContent.firstChild) {
            viewContent.removeChild(viewContent.firstChild);
        }
    }

    static insertViewContent(node) {
        Move.removeContent();
        document.getElementById('view-content').appendChild(node);
    }

    static insertProjectContent(node) {
        document.querySelector('.display').appendChild(node);
    }

    static removeListContent() {
        const nodes = document.querySelectorAll('.display .project-container');
    }

    static insertListContent(node) {
        const listContainer = document.querySelector('#main-content');
        listContainer.appendChild(node);
    }
}

export class NewProject {
    // e.type === 'click'
    static createModal() {
        document.querySelector('#content').appendChild(Build.newProjectModal());

        document.querySelector('.new-project-modal input#project-name').focus();
    }

    static removeModal(e) {
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
    // e.type === 'mouseenter
    // e.type === 'mouseleave'
    // need both of these events for this callback method to work properly
    static hoverButton(e) {
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

    static validateInput(e) {
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

    // e.type === 'click'  Pressing enter will trigger the click event for the submit button in the new project modal
    static pushToCollection(e) {
        const name = document.querySelector('input#project-name').value.trimEnd();
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
}

export class Navigation {
    static maximizeSidebar() {
        document.querySelector('.navigation.maximized').classList.remove('hidden');
        document.querySelector('.navigation.minimized').classList.remove('visible');
    }

    static minimizeSidebar() {
        document.querySelector('.navigation.maximized').classList.add('hidden');
        document.querySelector('.navigation.minimized').classList.add('visible');
    }

    static getClassName(node) {
        // get the parent element in case click inside of child node
        while (node.nodeName !== 'BUTTON') {
            node = node.parentNode;
        }
        
        return node.classList['value'].split(' ').filter(string => ['scheduled-today','scheduled','tasks','projects'].includes(string))[0];
    }

    static resetChosenTab(e) {
        const nodeLists = [
            document.querySelectorAll('button.scheduled-today'),
            document.querySelectorAll('button.scheduled'),
            document.querySelectorAll('button.tasks'),
            document.querySelectorAll('button.projects'),
        ]

        const targetedClass = this.getClassName(e.target);

        for (const nodeList of nodeLists) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].classList.remove('chosen-tab');

                if (this.getClassName(nodeList[i]) === targetedClass) {
                    nodeList[i].classList.add('chosen-tab');
                }
            }
        }
    }

    static clickTab(e) {
        Navigation.resetChosenTab(e);
        const targetedClass = Navigation.getClassName(e.target);
    }

    // this needs to use unique IDs to target the container
    // currently not doing so for the purposes of cleaning up the style sheet
    static toggleExpandable() {
        const container = document.querySelector('.display .project-container');
        container.classList.toggle('maximized');

        const image = document.querySelector('.display img.adjust-height');
        image.classList.toggle('rotated');
    }
}