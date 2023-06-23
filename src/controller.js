import { collection } from './index.js';
import { Storage } from './model.js';
import { Build } from './view/Build.js';
import { format, parseISO } from 'date-fns';

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

export class LoadDefault {
    static insertDefaultLoaded() {
        const content = document.getElementById('content');
            
        content.appendChild(Build.navigationMaximized());
        content.appendChild(Build.navigationMinimized());
        content.appendChild(Build.rightSideFlexContainer());
    
        const rightSideFlexContainer = document.querySelector('.right-side-flex-container');
    
        rightSideFlexContainer.appendChild(Build.header());
        rightSideFlexContainer.appendChild(Build.mainContentContainer());
        rightSideFlexContainer.appendChild(Build.mobileNav());
    }
    static loadLastPage() {
        if (userSettings.currentTask) {
            LoadDefault.editTaskPage();
        } else if (userSettings.currentProject) {
            LoadDefault.singleProjectPage();
        } else if (userSettings.currentTab === 'scheduled-today') {
            Load.scheduledTodayTasksPage();
        } else if (userSettings.currentTab === 'this-week') {
            Load.scheduledThisWeekTasksPage();
        } else if (userSettings.currentTab === 'tasks') {
            Load.allTasksPage();
        } else if (userSettings.currentTab === 'projects') {
            Load.projectsPage();
        }
    }

    static editTaskPage() {
        const task = collection.getTask(userSettings.currentTask);

        const editTaskPage = Build.editTaskPage(task);
        Move.changeMainContent(editTaskPage);
        
        const radios = document.querySelectorAll('input[type="radio"]');
        for (const radio of radios) {
            if (radio.getAttribute('value') === task.priority) {
                radio.checked = true;
            }
        }
    }

    static singleProjectPage() {
        const project = collection.getProject(userSettings.currentProject);
        Move.changeMainContent(Build.singleProjectPage(project));
        Load.reloadProjectTasks();

        Queue.resetQueueValues();
    }

    static resetChosenTab() {
        const nodeLists = [
            document.querySelectorAll('button.scheduled-today'),
            document.querySelectorAll('button.this-week'),
            document.querySelectorAll('button.tasks'),
            document.querySelectorAll('button.projects'),
        ]

        for (const nodeList of nodeLists) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].classList.remove('chosen-tab');

                if (Navigation.getClassName(nodeList[i]) === userSettings.currentTab) {
                    nodeList[i].classList.add('chosen-tab');
                }
            }
        }
    }
}

export function formatDateForUI(date) {
    return format(parseISO(date), 'MM/dd/yyyy');
}

export const userSettings = {
    currentProject: null,
    currentTask: null,
    currentTab: null,
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

    static changeMainContent(node) {
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
    static projectsPage() {
        Queue.resetQueueValues();
        userSettings.currentProject = null;
        userSettings.currentTask = null;
        Storage.updateUserSettings(userSettings);

        Move.changeMainContent(Build.projectsPage());
        Load.reloadProjects();
    }

    static generalTasksPage() {
        Queue.resetQueueValues();
        userSettings.currentProject = null;
        userSettings.currentTask = null;
        Storage.updateUserSettings(userSettings);

        let title;
        if (userSettings.currentTab === 'tasks') {
            title = 'All Tasks';
        } else if (userSettings.currentTab === 'this-week') {
            title = 'Scheduled This Week';
        } else if (userSettings.currentTab === 'scheduled-today') {
            title = 'Scheduled Today';
        } else {
            return;
        }

        Move.changeMainContent(Build.tasksPage(title));
    }
    
    static allTasksPage() {
        Load.generalTasksPage();
        Load.reloadAllTasks();
    }

    static scheduledThisWeekTasksPage() {
        Load.generalTasksPage();
        Load.reloadScheduledTasks();
    }

    static scheduledTodayTasksPage() {
        Load.generalTasksPage();
        Load.reloadScheduledTodayTasks();
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
        Move.changeMainContent(editTaskPage);
        
        const radios = document.querySelectorAll('input[type="radio"]');
        for (const radio of radios) {
            if (radio.getAttribute('value') === task.priority) {
                radio.checked = true;
            }
        }

        Storage.updateUserSettings(userSettings);
    }

    static singleProjectPage(e) {
        Queue.resetQueueValues();
        userSettings.currentTask = null;
        
        // if userSettings.currentProject === null, the user is clicking a project to examine
        // if userSettings.currentProject !== null, the user is exiting the edit task page
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
        Move.changeMainContent(Build.singleProjectPage(project));
        Load.reloadProjectTasks();

        Storage.updateUserSettings(userSettings);
    }

    static reloadProjects() {
        Move.removeNestedContent();

        const projects = collection.projects;
        for (const project of projects) {
            const node = Build.projectItem(project);
            Move.insertNestedContent(node);
        }
    }

    static reloadProjectTasks() {
        Move.removeNestedContent();
        
        const project = collection.getProject(userSettings.currentProject);
        for (const task of project.tasks) {
            // const node = Build.taskItem(task);
            const node = Load.createTaskElement(task);
            Move.insertNestedContent(node);
        }
    }

    static reloadAllTasks() {
        Move.removeNestedContent();

        const allTasks = collection.getAllTasks();
        for (const task of allTasks) {
            const node = Load.createTaskElement(task);
            Move.insertNestedContent(node);
        }
    }

    static reloadScheduledTasks() {
        Move.removeNestedContent();

        const scheduledTasks = collection.getScheduledThisWeekTasks();
        for (const task of scheduledTasks) {
            const node = Load.createTaskElement(task);
            Move.insertNestedContent(node);
        }
    }

    static reloadScheduledTodayTasks() {
        const scheduledTodayTasks = collection.getScheduledTodayTasks();

        Move.removeNestedContent();
        for (const task of scheduledTodayTasks) {
            const node = Load.createTaskElement(task);
            Move.insertNestedContent(node);
        }
    }

    static createTaskElement(task) {
        // need to edit the html class names on this. Priority circle doesn't make sense anymore
        // Should also consider removing the parent div element of the img;
        const taskElement = Build.taskItem(task);
        const priorityNode = findPriorityNode(taskElement);
        if (task.priority === 'unset') {
            priorityNode.src = '../src/view/icons/transparent-placeholder.png';
        } else if (task.priority === 'low') {
            priorityNode.src = '../src/view/icons/low-priority.svg';
        } else if (task.priority === 'medium') {
            priorityNode.src = '../src/view/icons/medium-priority.svg';
        } else if (task.priority === 'high') {
            priorityNode.src = '../src/view/icons/high-priority.svg';
        }
        
        return taskElement;

        // not sold on this function yet.  It returned 3 elements when I ran it one time.  Needs more testing.
        function findPriorityNode(node) {
            const childNodes = [];
            for (let i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].nodeType === Node.ELEMENT_NODE) {
                    childNodes.push(node.childNodes[i]);
                }
            }

            for (let i = 0; i < childNodes.length; i++) {
                if (childNodes[i].classList.value === 'priority-circle-img') {
                    return childNodes[i];
                } else {
                    const targetNode = findPriorityNode(childNodes[i]);
                    if (targetNode) {
                        return targetNode;
                    }
                }
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

        // capitalize the first letter
        if (e.target.value.length === 1) {
            e.target.value = e.target.value.toUpperCase();
        }

        // check to see if the modal is for a new task vs new project to see which names to gather to check for duplicates
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

        if (document.querySelector('.display.queue-mode')) {
            Queue.exitQueueMode();
        }

        if (userSettings.currentProject) {
            const addedTask = project.tasks[project.tasks.length -1];
            const node = Build.taskItem(addedTask);
            Move.insertNestedContent(node);
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
        
        return node.classList['value'].split(' ').filter(string => ['scheduled-today','this-week','tasks','projects'].includes(string))[0];
    }

    static resetChosenTab(e) {
        const nodeLists = [
            document.querySelectorAll('button.scheduled-today'),
            document.querySelectorAll('button.this-week'),
            document.querySelectorAll('button.tasks'),
            document.querySelectorAll('button.projects'),
        ]

        const targetedClass = Navigation.getClassName(e.target);
        

        for (const nodeList of nodeLists) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].classList.remove('chosen-tab');

                if (Navigation.getClassName(nodeList[i]) === targetedClass) {
                    nodeList[i].classList.add('chosen-tab');
                }
            }
        }
    }

    static clickTab(e) {
        const targetedClass = Navigation.getClassName(e.target);
        if (targetedClass === 'scheduled-today' && userSettings.currentTab !== 'scheduled-today') {
            userSettings.currentTab = 'scheduled-today';
            Load.scheduledTodayTasksPage();

        } else if (targetedClass === 'this-week' && userSettings.currentTab !== 'this-week') {
            userSettings.currentTab = 'this-week';
            Load.scheduledThisWeekTasksPage();

        } else if (targetedClass === 'tasks' && userSettings.currentTab !== 'tasks') {
            userSettings.currentTab = 'tasks';
            Load.allTasksPage();

        } else if (targetedClass === 'projects') {
            userSettings.currentTab = 'projects';
            Load.projectsPage();
        } else {
            return;
        }

        // resetting userSettings.currentTask to be safe, even though this value should be updated on every button that does something to a task
        userSettings.currentTask = null;
        Queue.resetQueueValues();
        Navigation.resetChosenTab(e);

        Storage.updateUserSettings(userSettings);
    }

    static updateSidebarCount() {
        const projectsCount = `${collection.projects.length}`;
        const tasksCount = `${collection.getAllTasks().length}`;
        const scheduledCount = `${collection.getScheduledThisWeekTasks().length}`;
        const todayCount = `${collection.getScheduledTodayTasks().length}`;

        const projectsNode = document.querySelector('.count.projects-count');
        const tasksNode = document.querySelector('.count.tasks-count');
        const scheduledNode = document.querySelector('.count.this-week-count');
        const todayNode = document.querySelector('.count.scheduled-today-count');

        projectsNode.textContent = projectsCount;
        tasksNode.textContent = tasksCount;
        scheduledNode.textContent = scheduledCount;
        todayNode.textContent = todayCount;

    }
}

export class Queue {
    static enterQueueMode() {
        userSettings.queueMode = true;
        userSettings.itemQueue = [];
        Storage.updateUserSettings(userSettings);

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
        const dropDown = Build.queueDropDown();
        document.querySelector('.nested-container').insertAdjacentElement('afterbegin', dropDown);
        
        // add message to the header
        const message = document.createElement('p');
        message.classList.add('delete-queue-message');
        message.textContent = 'Select item(s) to queue for deletion'
        
        if (userSettings.currentProject) {
            document.querySelector('.tasks-subheader-container h2').insertAdjacentElement('afterend', message);
        } else {
            document.querySelector('header .left-container').insertAdjacentElement('afterend', message);
        }
        
        // change the background-color
        document.querySelector('.display').classList.add('queue-mode');
    }

    static exitQueueMode() {
        userSettings.itemQueue = [];
        userSettings.queueMode = false;
        Storage.updateUserSettings(userSettings);

        // reset background-color
        document.querySelector('.display').classList.remove('queue-mode');

        // remove queue message from header
        document.querySelector('.delete-queue-message').remove();
        
        // remove confirm-delete-container (drop down)
        document.querySelector('.confirm-delete-container').remove();

        // remove checkboxes
        const checkboxes = document.querySelectorAll('input.checkbox-delete');
        for (const node of checkboxes) {
            node.remove();
        }

        // remove delete-view class
        const items = document.querySelectorAll('.item');
        for (const node of items) {
            node.classList.remove('delete-view');
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

    static resetQueueValues() {
        userSettings.queueMode = false;
        userSettings.itemQueue = [];
        Storage.updateUserSettings(userSettings);
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
        
        // get priority value
        for (const radio of radios) {
            if (radio.checked) {
                task.priority = radio.getAttribute('value');
            }
        }

        Storage.updateLocalStorage(collection);
        EditTask.exitEditTask();
        Navigation.updateSidebarCount();
    }

    static removeTask() {
        collection.removeTask(userSettings.currentTask);
        Navigation.updateSidebarCount();
        EditTask.exitEditTask();
    }

    static exitEditTask(e) {
        if (userSettings.currentProject) {
            Load.singleProjectPage(e);
            return;
        } else if (userSettings.currentTab === 'tasks') {
            Load.allTasksPage();
            return;
        } else if (userSettings.currentTab === 'this-week') {
            Load.scheduledThisWeekTasksPage();
            return;
        } else if (userSettings.currentTab === 'scheduled-today') {
            Load.scheduledTodayTasksPage();
            return;
        }
    }
}

export class EditProject {
    static insertComponents() {
        const header = document.querySelector('header.single-project-header');
        document.querySelector('span.name').remove();
        document.querySelector('button')
        

    }
}