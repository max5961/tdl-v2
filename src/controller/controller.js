import { Build } from '../view/Build.js';

export class Move {
    static insertDefaultLoaded() {
        const content = document.getElementById('content');
        
        content.appendChild(Build.navigationMaximized());
        content.appendChild(Build.navigationMinimized());
        content.appendChild(Build.rightSideFlexContainer());

        const rightSideFlexContainer = document.querySelector('.right-side-flex-container');

        rightSideFlexContainer.appendChild(Build.header());
        rightSideFlexContainer.appendChild(Build.viewContent());
        rightSideFlexContainer.appendChild(Build.mobileNav());

        Move.insertViewContent(Build.tasksView());
        Move.removeListContent();
        Move.insertListContent(Build.tasksViewItem());
    }

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
        document.querySelector('.content-view').appendChild(node);
    }

    static removeListContent() {
        const nodes = document.querySelectorAll('.content-view .project-container');
    }

    static insertListContent(node) {
        const listContainer = document.querySelector('#view-content');
        listContainer.appendChild(node);
    }
}

export class Controller {
    static resetChosenTab(e) {

        const nodeLists = [
            document.querySelectorAll('button.scheduled-today'),
            document.querySelectorAll('button.scheduled'),
            document.querySelectorAll('button.tasks'),
            document.querySelectorAll('button.projects'),
        ]

        const targetedClass = Controller.getClass(e.target);

        for (const nodeList of nodeLists) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].classList.remove('chosen-tab');

                if (Controller.getClass(nodeList[i]) === targetedClass) {
                    nodeList[i].classList.add('chosen-tab');
                }
            }
        }
    }

    static getClass(node) {
        // get the parent element in case click inside of child node
        while (node.nodeName !== 'BUTTON') {
            node = node.parentNode;
        }

        return node.classList['value'].split(' ').filter(string => ['scheduled-today','scheduled','tasks','projects'].includes(string))[0];
    }

    
}