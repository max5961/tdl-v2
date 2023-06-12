import { Build } from '../view/Build.js';

export class Move {
    static insertDefaultLoaded() {
        const content = document.getElementById('content');
        
        content.appendChild(Build.sidebarMaximized());
        content.appendChild(Build.sidebarMinimized());
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