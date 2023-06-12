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

        Move.insertViewContent(Build.projectsView());

        // if (projectsCount === 0)
        Move.insertProjectContent(Build.noProjectsMessage());

        // else
        // projects.forEach(project => Move.insertProjectContent(project));
    }

    static removeContent() {

        const viewContent = document.getElementById('view-content');

        while (viewContent.firstChild) {
            viewContent.removeChild(viewContent.firstChild);
        }
    }

    static insertViewContent(element) {
        document.getElementById('view-content').appendChild(element);
    }

    static removeProjects() {
        document.querySelectorAll('.projects-view .project-container').forEach(projectContainer => projectContainer.remove());
    }

    static insertProjectContent(element) {
        document.querySelector('.projects-view').appendChild(element);
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

        // get the button element's class in case e.target is a childNode
        let node = e.target;
        while (node.nodeName !== 'BUTTON') {
            node = node.parentNode;
        }

        function getClass(node) {
            return node.classList['value'].split(' ').filter(string => ['scheduled-today','scheduled','tasks','projects'].includes(string))[0];
        }

        const targetedClass = getClass(node);

        for (const nodeList of nodeLists) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].classList.remove('chosen-tab');

                if (getClass(nodeList[i]) === targetedClass) {
                    nodeList[i].classList.add('chosen-tab');
                }
            }
        }
    }
}