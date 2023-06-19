import { collection } from './index.js';
import { Storage } from './model.js';
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
    singleProject: false,
    previousPage: null,

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
}

export class Load {
    static previousPage(e) {
        if (userSettings.singleProject === true) {
            Load.singleProjectPage(e);
            return;
        } else if (userSettings.currentTab === 'projects') {
            Load.projectsPage();
            return;
        } 
    }

    static projectsPage() {
        userSettings.currentTab = 'projects';
        userSettings.currentProject = null;
        userSettings.singleProject = false;

        Move.removeMainContent();
        Move.insertMainContent(Build.projectsView());
        Load.reloadProjects();
    }

    // should be singleProjectPage()
    static singleProjectPage(e) {
        userSettings.singleProject = true;
        userSettings.currentTask = null;
        userSettings.queueMode = false;
        userSettings.itemQueue = [];
        
        if (userSettings.currentProject === null) {
            let node = e.target;
            while (!node.getAttribute('item-id')) {
                node = node.parentNode;
            }
    
            const projectID = node.getAttribute('item-id');
    
            // this is necessary for task input validation and where to put newly created tasks
            userSettings.currentProject = projectID;
        }

        // load the project
        const project = collection.getProject(userSettings.currentProject);
        Move.insertMainContent(Build.singleProjectView(project));
        Load.reloadProjectTasks();
    }

    // inserts all projects into the nested container
    // should be reloadProjectItems()
    static reloadProjects() {
        Move.removeNestedContent();

        const projects = collection.projects;
        for (const project of projects) {
            const node = Build.projectItem(project);
            Move.insertNestedContent(node);
        }
    }

    // reloadProjectTaskItems()
    static reloadProjectTasks() {
        Move.removeNestedContent();
        
        const project = collection.getProject(userSettings.currentProject);
        for (const task of project.tasks) {
            const node = Build.taskItem(task);
            Move.insertNestedContent(node);
        }
    }

    static editTaskPage(e) {
        let node = e.target;
        while (!node.getAttribute('item-id')) {
            node = node.parentNode;
        }
        const taskID = node.getAttribute('item-id');
        const task = collection.getTask(taskID);

        // this is necessary for submitting the final edit form;
        userSettings.currentTask = taskID;

        const editTaskPage = Build.editTaskPage(task);
        Move.removeMainContent();
        Move.insertMainContent(editTaskPage);
        
        const radios = document.querySelectorAll('input[type="radio"]');
        for (const radio of radios) {
            if (radio.getAttribute('value') === task.priority) {
                radio.checked = true;
            }
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

    static validateInput(e) {
        const createButton = document.querySelector('.add-new-modal button[type=submit]');

        let names;
        if (e.target.getAttribute('id') === 'project-name') {
            names = collection.getProjectNames();
        }
        else if (e.target.getAttribute('id') === 'task-name') {
            const project = collection.getProject(userSettings.currentProject);
            names = project.getTaskNames();
        }
        
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
        const modal = document.querySelector('.add-new-modal');

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
        // instead of reloading all the projects at once, only append the latest added project, so that if a tab is expanded, it stays expanded
        const addedProject = collection.projects[collection.projects.length -1];
        if (userSettings.currentTab === 'projects') {
            if (!document.querySelector('.display.queue-mode')) {
                const node = Build.projectItem(addedProject);
                Move.insertNestedContent(node);
            }
        }

        // if in queue-mode, exit edit mode when submitting a new project
        if (userSettings.currentTab === 'projects') {
            if (document.querySelector('.display.queue-mode')) {

                // this methods exits queueMode as well as removing the nested content and reloading it
                Queue.exitQueueMode();
            }
        }

        // update the projects count in the sidebar
        Navigation.updateSidebarCount();
    }

    static submitTask(e) {
        const name = document.querySelector('input#task-name').value.trimEnd();
        const notes = document.querySelector('textarea#project-description').value;
        const modal = document.querySelector('.add-new-modal');
        const project = collection.getProject(userSettings.currentProject);

        if (name.length > 0) {
            if (document.querySelector('input#task-name.valid')) {
                project.addTask(name, notes);
                modal.remove();
            } else {
                window.alert('That task name has already been chosen!')
            }
        }

        if (userSettings.singleProject === true) {
            if (!document.querySelector('.display.queue-mode')) {
                const addedTask = project.tasks[project.tasks.length -1];
                const node = Build.taskItem(addedTask);
                Move.insertNestedContent(node);
            }
        }
        
        if (document.querySelector('.display.queue-mode')) {
            Queue.exitQueueMode();
        }

        // update the tasks count in the sidebar
        Navigation.updateSidebarCount();
        
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
        
        // resetting userSettings properties to prevent bugs that would occur if the user is in edit mode and clicks a tab, thus exiting queue-mode but keeping the selected items in the itemQueue
        // resetting userSettings.currentTask to be safe, even though this value should be updated on every button that does something to a task
        userSettings.itemQueue = [];
        userSettings.queueMode = false;
        userSettings.currentTask = null;

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

        } else if (targetedClass === 'projects') {
            if (userSettings.singleProject === true) {
                Load.projectsPage();
            }
            if (userSettings.currentTab !== 'projects') {
                Load.projectsPage();
            }
        }
    }

    static updateSidebarCount() {
        const projectsCount = `${collection.projects.length}`;
        const tasksCount = `${collection.getAllTasks().length}`;
        // const scheduled
        // const today

        const projectsNode = document.querySelector('.count.projects-count');
        const tasksNode = document.querySelector('.count.tasks-count');
        // const scheduledNode = document.querySelector('.count.scheduled-count');
        // const todayNode = document.querySelector('.count.scheduled-today-count');

        projectsNode.textContent = projectsCount;
        tasksNode.textContent = tasksCount;
    }
}

export class Queue {
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
        document.querySelector('.display').classList.add('queue-mode');
    }

    static exitQueueMode() {
        userSettings.queueMode = false;
        userSettings.itemQueue = [];

        // reset background-color;
        document.querySelector('.display').classList.remove('queue-mode');

        // remove queue message from header
        if (document.querySelector('.delete-queue-message')) {
            document.querySelector('.delete-queue-message').remove();
        }

        // remove the items from the nestedContainer
        Move.removeNestedContent();

        // reload the items depending on which tab is being viewed
        if (userSettings.singleProject === true) {
            Load.reloadProjectTasks();
        } else if (userSettings.currentTab === 'projects') {
            Load.reloadProjects();
        }

    }


    static toggleQueueMode() {
        if (userSettings.queueMode === false) {
            Queue.enterQueueMode();
        } 
        
        else if (userSettings.queueMode === true) {
            Queue.exitQueueMode();
        }
    }
    // this controls the queue drop down in queue-mode and listens for an input event on each checkbox
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

export class EditTask {
    static undoChanges() {
        const task = collection.getTask(userSettings.currentTask);

        const name = document.querySelector('input.edit-task-name');
        const notes = document.querySelector('textarea.edit-task-notes');
        const dueDate = document.querySelector('input[type="date"]');
        const radios = document.querySelectorAll('input[type="radio"]');

        name.value = task.name;
        notes.value = task.notes;
        dueDate.value = task.dueDate;
        
        for (const radio of radios) {
            if (radio.getAttribute('value') === task.priority) {
                radio.checked = true;
            }
        }
    }

    static saveChanges() {
        const task = collection.getTask(userSettings.currentTask);

        const name = document.querySelector('input.edit-task-name');
        const notes = document.querySelector('textarea.edit-task-notes');
        const dueDate = document.querySelector('input[type="date"]');
        const radios = document.querySelectorAll('input[type="radio"]');

        task.name = name.value.trimEnd();
        task.notes = notes.value;
        task.dueDate = dueDate.value;
        
        for (const radio of radios) {
            if (radio.checked) {
                task.priority = radio.getAttribute('value');
            }
        }

        Storage.updateLocalStorage(collection);
        Load.previousPage();
    }

    static removeTask() {
        collection.removeTask(userSettings.currentTask);
        Load.previousPage();
    }
}