import { collection } from './index.js';
import { Build } from './view/Build.js';

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
    rightSideFlexContainer.appendChild(Build.mainContentContainer());
    rightSideFlexContainer.appendChild(Build.mobileNav());
}

const userSettings = {
    currentProject: null,
    currentTask: null,
    currentTab: null,
    previousTabs: [],

    queueMode: false,
    itemQueue: [],
}

// elements that are removed or inserted into often
export class Move {
    static removeMainContent() {

        const mainContent= document.getElementById('main-content');

        while (mainContent.firstChild) {
            mainContent.removeChild(mainContent.firstChild);
        }
    }

    static insertMainContent(node) {
        Move.removeMainContent();
        document.getElementById('main-content').appendChild(node);
    }

    static removeNestedContent() {
        const nestedContainer = document.querySelector('ul.nested-container');
        
        while (nestedContainer.firstChild) {
            nestedContainer.removeChild(nestedContainer.firstChild)
        }
    }

    static insertNestedContent(node) {
        const nestedContainer = document.querySelector('ul.nested-container');
        nestedContainer.appendChild(node);
    }

    // inserts all projects into the nested container
    static reloadProjects() {
        const projects = collection.projects;
        for (const project of projects) {
            const node = Build.projectItem(project);
            Move.insertNestedContent(node);
        }
    }
}

export class AddNew {
    static createNewProjectModal() {
        document.querySelector('#content').appendChild(Build.newProjectModal());

        document.querySelector('.add-new-modal input#project-name').focus();
    }

    static createNewTaskModal() {
        document.querySelector('#content').appendChild(Build.newTaskModal());

        document.querySelector('.add-new-modal input#task-name').focus();
    }

    static removeModal(e) {
        const form = document.querySelector('.add-new-modal form');
        const modal = document.querySelector('.add-new-modal');
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
    static hoverMobileAddButton(e) {
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

    static validateProjectInput(e) {
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
    static submitProject(e) {
        const name = document.querySelector('input#project-name').value.trimEnd();
        const desc = document.querySelector('textarea#project-description').value;
        const modal = document.querySelector('.new-project-modal');

        // validate that the form requirements are met before pushing the project
        if (name.length > 0) {
            if (document.querySelector('input#project-name.valid')) {
                collection.addProject(name, desc);
                modal.remove();
            } else {
                window.alert('That name is already chosen!');
            }
        }

        // append the project to the list of projects if user is viewing the projects tab
        const addedProject = collection.projects[collection.projects.length -1];
        if (userSettings.currentTab === 'projects') {
            if (!document.querySelector('.display.edit-mode')) {
                const node = Build.projectItem(addedProject);
                Move.insertNestedContent(node);
            }
        }

        // if in edit-mode, exit edit mode when submitting a new project
        if (userSettings.currentTab === 'projects') {
            if (document.querySelector('.display.edit-mode')) {

                // this methods exits queueMode as well as removes the nested content and reloads it
                Edit.exitQueueMode();
            }
        }

        // update the projects count in the sidebar
        const projectsCount = document.querySelector('.count.projects-count');
        projectsCount.textContent = `${collection.projects.length}`;
    }

    static validateTaskInput(e) {
        
    }

    static submitTask(e) {

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

    static toggleExpandable(e) {
        // bubble up the DOM tree until .item is found;
        let node = e.target;
        while (!node.classList['value'].split(' ').includes('item')) {
            node = node.parentNode;
        }
        node.classList.toggle('expanded');

        // target the project button which is set to a pixel height
        // it is set to a pixel height so that the button shape doesn't flow below the given area
        // search through child nodes
            // In delete mode, there is an extra child node inserted, creating the need to dynamically find the project button node
        for (let i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].classList.value.split(' ').includes('item-container')) {
                node.childNodes[i].classList.toggle('expanded');
            }
        }
        

        // bubble down the DOM tree until img.adjust-height is found
        let imageNode = e.target;
        while (imageNode.nodeName !== 'IMG') {
            imageNode = imageNode.childNodes[0];
        }
        imageNode.classList.toggle('rotated');

        
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
        
        // this will prevent a bug that would occur if the user is in edit mode and clicks a tab, thus exiting edit-mode
        userSettings.itemQueue = [];
        userSettings.queueMode = false;

        const targetedClass = Navigation.getClassName(e.target);
        if (targetedClass === 'scheduled-today' && userSettings.currentTab !== 'scheduled-today') {
            userSettings.currentTab = 'scheduled-today';
            Move.removeMainContent();
            Move.insertMainContent(Build.tasksView());

        } else if (targetedClass === 'scheduled' && userSettings.currentTab !== 'scheduled') {
            userSettings.currentTab = 'scheduled';
            Move.removeMainContent();
            Move.insertMainContent(Build.tasksView());

        } else if (targetedClass === 'tasks' && userSettings.currentTab !== 'tasks') {
            userSettings.currentTab = 'tasks';
            Move.removeMainContent();
            Move.insertMainContent(Build.tasksView());

        } else if (targetedClass === 'projects' && userSettings.currentTab !== 'projects') {
            Load.projectsPage();
        }
    }
}

export class Load {
    static projectsPage() {
        userSettings.currentTab = 'projects';
        Move.removeMainContent();
        Move.insertMainContent(Build.projectsView());
        Move.removeNestedContent();
        for (const project of collection.projects) {
            const projectNode = Build.projectItem(project);
            Move.insertNestedContent(projectNode);
        }
    }
}

export class Edit {
    static enterQueueMode() {
        userSettings.queueMode = true;
        userSettings.itemQueue = [];

        // add checkboxes to each item in nested container
        const items = document.querySelectorAll('.item');
        for (const container of items) {
            container.classList.add('delete-view');
            const itemID = container.getAttribute('item-id');
            const checkbox = Build.deleteCheckbox(itemID);
            const adjustHeight = container.firstChild;
            adjustHeight.insertAdjacentElement('afterend', checkbox);
        }

        // insert the drop down
        const nestedContainer = document.querySelector('.nested-container');
        const dropDown = Build.queueDropDown();
        nestedContainer.insertAdjacentElement('afterbegin', dropDown);

        // add message to the header
        const message = document.createElement('p');
        message.classList.add('delete-queue-message');
        message.textContent = 'Select item(s) to queue for deletion'
        document.querySelector('header .left-container').insertAdjacentElement('afterend', message);

        // change the background-color
        document.querySelector('.display').classList.add('edit-mode');
    }

    static exitQueueMode() {
        userSettings.queueMode = false;
        userSettings.itemQueue = [];

        // reset background-color;
        document.querySelector('.display').classList.remove('edit-mode');

        // remove queue message from header
        document.querySelector('.delete-queue-message').remove();

        // remove the items from the nestedContainer
        Move.removeNestedContent();

        // reload the items depending on which tab is being viewed
        if (userSettings.currentTab === 'projects') {
            Move.reloadProjects();
        }
    }


    static toggleQueueMode() {
        if (userSettings.queueMode === false) {
            Edit.enterQueueMode();
        } 
        
        else if (userSettings.queueMode === true) {
            Edit.exitQueueMode();
        }
    }
    // this controls the queue drop down in edit-mode and listens for an input event on each checkbox
    static controlQueueDropDown(e) {
        const dropDown = document.querySelector('.confirm-delete-container');
        const count = document.querySelector('.confirm-delete-container p');

        // update the userSettings.itemQueue
        if (e.target.checked) {
            userSettings.itemQueue.push(e.target.getAttribute('item-id'));
        } else {
            userSettings.itemQueue = userSettings.itemQueue.filter(value => value !== e.target.getAttribute('item-id'));
        }

        // update the text-content of the counter
        count.textContent = `${userSettings.itemQueue.length} selected`;

        // toggle the visible classList if there are projects in the stack
        if (userSettings.itemQueue.length > 0) {
            dropDown.classList.add('visible');
        } else {
            dropDown.classList.remove('visible');
        }
    }


}

export class Project {
    static exploreProject(e) {
        let node = e.target;
        while (!node.getAttribute('item-id')) {
            node = node.parentNode;
        }

        const projectID = node.getAttribute('item-id');
        const project = collection.getProject(projectID);
        
        Move.removeMainContent();
        const projectPage = Build.singleProjectView(project);
        Move.insertMainContent(projectPage);
    }
}