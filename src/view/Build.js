import { Element } from './Element.js';
import { LoadDefault, preventDefault } from '../controller.js';
import { formatDateForUI } from '../controller.js';
import { AddNew } from '../controller.js';
import { Navigation } from '../controller.js';
import { Queue } from '../controller.js';
import { Load } from '../controller.js';
import { EditTask } from '../controller.js';

export class Build {
    static navigationMaximized() {
        return new Element({
            'tagname':'div',
            'class':'navigation maximized',
            'children':[

                // top navigation
                new Element({
                    'tagname':'div',
                    'class':'top',
                    'children':[
                        new Element({
                            'tagname':'button',
                            'id':'minimize-navigation',
                            'event-listeners':{'click':Navigation.minimizeSidebar},
                            'children':[
                                new Element({
                                    'tagname':'img',
                                    'class':'minimize',
                                    'src':'../../tdl-v2/src/view/icons/minimize2.svg',
                                    'alt':'minimize-navigation',
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),

                // navigation content
                new Element({
                    'tagname':'ul',
                    'class':'navigation-content',
                    'children':[
                        // scheduled-today
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'scheduled-today',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'src':'../src/view/icons/scheduled-today.png',
                                            'class':'scheduled-today',
                                            'alt':'scheduled-today',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'title',
                                            'text-content':'Today',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'count scheduled-today-count',
                                            'text-content':'0'
                                        }).build(),
                                    ]
                                }).build()
                            ]
                        }).build(),
                        // this-week
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'this-week',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'src':'../src/view/icons/this-week.png',
                                            'class':'this-week',
                                            'alt':'this-week',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'title',
                                            'text-content':'This Week',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'count this-week-count',
                                            'text-content':'0'
                                        }).build(),
                                    ]
                                }).build()
                            ]
                        }).build(),
                        // tasks
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'tasks',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'src':'../src/view/icons/tasks.png',
                                            'class':'all-tasks',
                                            'alt':'all-tasks',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'title',
                                            'text-content':'Tasks',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'count tasks-count',
                                            'text-content':'0'
                                        }).build(),
                                    ]
                                }).build()
                            ]
                        }).build(),
                        // projects
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'projects',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'src':'../src/view/icons/project.png',
                                            'class':'all-tasks',
                                            'alt':'all-tasks',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'title',
                                            'text-content':'Projects',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'count projects-count',
                                            'text-content':'0'
                                        }).build(),
                                    ]
                                }).build()
                            ]
                        }).build(),
                    ]
                }).build(),
            ]
        }).build();
    }

    static navigationMinimized() {
        return new Element({
            'tagname':'div',
            'class':'navigation minimized',
            'children':[
                // top navigation 
                new Element({
                    'tagname':'div',
                    'class':'top',
                    'children':[
                        new Element({
                            'tagname':'button',
                            'id':'maximize-navigation',
                            'event-listeners':{'click':Navigation.maximizeSidebar},
                            'children':[
                                new Element({
                                    'tagname':'img',
                                    'class':'maximize',
                                    'src':'../src/view/icons/maximize.svg',
                                    'alt':'maximize',
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),

                // navigation content
                new Element({
                    'tagname':'ul',
                    'class':'navigation-content',
                    'children':[
                        // scheduled today
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'scheduled-today',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'scheduled-today',
                                            'alt':'scheduled-today',
                                            'src':'../src/view/icons/scheduled-today.png',
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                        // this-week
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'this-week',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'this-week',
                                            'alt':'this-week',
                                            'src':'../src/view/icons/this-week.png',
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                        // tasks
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'tasks',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'all-tasks',
                                            'alt':'all-tasks',
                                            'src':'../src/view/icons/tasks.png',
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                        // projects
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'projects',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'all-projects',
                                            'alt':'all-projects',
                                            'src':'../src/view/icons/project.png',
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),
            ]   
        }).build();
    }

    static rightSideFlexContainer() {
        return new Element({
            'tagname':'div',
            'class':'right-side-flex-container',
        }).build();
    }

    static header() {
        return new Element({
            'tagname':'header',
            'class':'main-header',
            'children':[
                // logo
                new Element({
                    'tagname':'div',
                    'class':'logo',
                    'children':[
                        new Element({
                            'tagname':'img',
                            'src':'../src/view/icons/logo1.png',
                            'alt':'to-do-list',
                        }).build(),
                        new Element({
                            'tagname':'h2',
                            'text-content':'Project Manager',
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'border-top',
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'box-front-top',
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'box-front-bottom',
                        }).build(),
                    ]
                }).build(),
                // new project button
                new Element({
                    'tagname':'button',
                    'class':'new-project-button-header',
                    'event-listeners':{'click':AddNew.createNewProjectModal},
                    'children':[
                        new Element({
                            'tagname':'div',
                            'class':'box-back-top',
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'box-back-bottom',
                        }).build(),
                        new Element({
                            'tagname':'h3',
                            'class':'new-project',
                            'text-content':'New Project',
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'box-front-top',
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'box-front-bottom',
                        }).build(),
                    ]
                }).build(),
            ]
        }).build();
    }

    static mainContentContainer() {
        return new Element({
            'tagname':'div',
            'id':'main-content',
        }).build();
    }

    static mobileNav() {
        return new Element({
            'tagname':'div',
            'class':'navigation mobile',
            'children':[
                new Element({
                    'tagname':'ul',
                    'class':'navigation-content',
                    'children':[
                        // scheduled-today
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'scheduled-today',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'scheduled-today',
                                            'alt':'scheduled-today',
                                            'src':'../src/view/icons/scheduled-today.png',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'text-content':'Today'
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                        // this-week
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'this-week',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'this-week',
                                            'alt':'this-week',
                                            'src':'../src/view/icons/this-week.png',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'text-content':'This Week',
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                        // new project
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'new-project',
                                    'event-listeners':{
                                        'mouseenter':AddNew.hoverMobileAddButton,
                                        'mouseleave':AddNew.hoverMobileAddButton,
                                        'click':AddNew.createNewProjectModal,
                                    },
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'src':'../src/view/icons/add.png',
                                            'alt':'new-project',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'text-content':'New',
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                        // tasks 
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'tasks',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'all-tasks',
                                            'alt':'all-tasks',
                                            'src':'../src/view/icons/tasks.png',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'text-content':'Tasks'
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                        // projects
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'projects',
                                    'event-listeners':{'click':Navigation.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'all-projects',
                                            'alt':'all-projects',
                                            'src':'../src/view/icons/project.png',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'text-content':'Projects'
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),
            ],
        }).build();
    }

    static newProjectModal() {
        return new Element({
            'tagname': 'div',
            'class': 'add-new-modal new-project-modal',
            'event-listeners':{'click':AddNew.removeModal},
            'children': [
                new Element({
                    'tagname': 'form',
                    'event-listeners':{'submit':preventDefault},
                    'children': [
                        new Element({
                            'tagname': 'label',
                            'for': 'project-name',
                            'text-content': 'Project Name:'
                        }).build(),
                        new Element({
                            'tagname': 'input',
                            'type': 'text',
                            'id': 'project-name',
                            'required': true,
                            'event-listeners':{'input':AddNew.validateInput}
                        }).build(),
                        new Element({
                            'tagname': 'label',
                            'for': 'desc',
                            'text-content': 'Description:'
                        }).build(),
                        new Element({
                            'tagname': 'textarea',
                            'id': 'project-description'
                        }).build(),
                        new Element({
                            'tagname': 'div',
                            'class': 'button-container',
                            'children': [
                                new Element({
                                    'tagname': 'button',
                                    'type':'button',
                                    'class': 'cancel',
                                    'text-content': 'Cancel',
                                    'event-listeners':{'click':AddNew.removeModal}
                                }).build(),
                                new Element({
                                    'tagname': 'button',
                                    'type': 'submit',
                                    'text-content': 'Create Project',
                                    'event-listeners':{'click':AddNew.submitProject},
                                }).build()
                            ]
                        }).build()
                    ]
                }).build()
            ]
        }).build();
    }

    static newTaskModal() {
        return new Element({
            'tagname': 'div',
            'class': 'add-new-modal new-task-modal',
            'event-listeners':{'click':AddNew.removeModal},
            'children': [
                new Element({
                    'tagname': 'form',
                    'event-listeners':{'submit':preventDefault},
                    'children': [
                        new Element({
                            'tagname': 'label',
                            'for': 'task-name',
                            'text-content': 'Task Name:'
                        }).build(),
                        new Element({
                            'tagname': 'input',
                            'type': 'text',
                            'id': 'task-name',
                            'required': true,
                            'event-listeners':{'input':AddNew.validateInput}
                        }).build(),
                        new Element({
                            'tagname': 'label',
                            'for': 'desc',
                            'text-content': 'Notes:'
                        }).build(),
                        new Element({
                            'tagname': 'textarea',
                            'id': 'project-description'
                        }).build(),
                        new Element({
                            'tagname': 'div',
                            'class': 'button-container',
                            'children': [
                                new Element({
                                    'tagname': 'button',
                                    'type':'button',
                                    'class': 'cancel',
                                    'text-content': 'Cancel',
                                    'event-listeners':{'click':AddNew.removeModal}
                                }).build(),
                                new Element({
                                    'tagname': 'button',
                                    'type': 'submit',
                                    'text-content': 'Create Task',
                                    'event-listeners':{'click':AddNew.submitTask},
                                }).build()
                            ]
                        }).build()
                    ]
                }).build()
            ]
        }).build();
    }

    static projectsPage() {
        return new Element({
            'tagname':'div',
            'class':'display',
            'children':[
                // top header
                new Element({
                    'tagname':'header',
                    'children':[
                        // left container
                        new Element({
                            'tagname':'div',
                            'class':'left-container',
                            'children':[
                                new Element({
                                    'tagname':'h1',
                                    'text-content':'Projects',
                                }).build(),
                            ]
                        }).build(),
                        // right container
                        new Element({
                            'tagname':'div',
                            'class':'right-container',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'event-listeners':{'click':AddNew.createNewProjectModal},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'src':'../src/view/icons/add.svg',
                                            'alt':'add'
                                        }).build(),
                                    ]
                                }).build(),
                                new Element({
                                    'tagname':'button',
                                    'event-listeners':{'click':Queue.toggleQueueMode},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'toggle-queue',
                                            'src':'../src/view/icons/delete.svg',
                                            'alt':'delete'
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),
                // nested container
                new Element({
                    'tagname':'ul',
                    'class':'nested-container',
                }).build(),
            ]
        }).build();
    }

    static singleProjectPage(project) {
        return new Element({
            'tagname': 'div',
            'class': 'display single-project',
            'children': [
                new Element({
                    'tagname':'div',
                    'class':'back-button-container',
                    'children':[
                        new Element({
                            'tagname':'button',
                            'class':'back-button',
                            'event-listeners':{'click':Load.projectsPage},
                            'text-content':'BACK TO PROJECTS',
                        }).build(),
                    ]
                }).build(),
                new Element({
                    'tagname': 'header',
                    'class':'single-project-header',
                    'children': [
                        new Element({
                            'tagname': 'button',
                            'children': [
                                new Element({
                                    'tagname': 'img',
                                    'class':'icon',
                                    'src': '../src/view/icons/project.png',
                                }).build(),
                                new Element({
                                    'tagname':'p',
                                    'class':'icon',
                                    'text-content':'Projects',
                                }).build(),
                            ]
                        }).build(),
                        new Element({
                            'tagname': 'span',
                            'class': 'divider',
                            'children':[
                                new Element({
                                    'tagname':'img',
                                    'src':'../src/view/icons/subdirectory.svg',
                                }).build(),
                            ]
                        }).build(),
                        new Element({
                            'tagname': 'span',
                            'class': 'name',
                            'text-content': `${project.name}`
                        }).build(),
                        new Element({
                            'tagname': 'button',
                            'children': [
                                new Element({
                                    'tagname': 'img',
                                    'src': '../src/view/icons/edit.svg',
                                    'alt': ''
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),
                new Element({
                    'tagname': 'div',
                    'class': 'project-description-container',
                    'children': [
                        new Element({
                            'tagname': 'h2',
                            'text-content': 'Description',
                        }).build(),
                        new Element({
                            'tagname': 'p',
                            'class': 'description-content',
                            'text-content': `${project.desc}`,
                        }).build()
                    ]
                }).build(),
                new Element({
                    'tagname': 'div',
                    'class': 'add-task-container',
                    'children': [
                        new Element({
                            'tagname': 'button',
                            'event-listeners':{'click':AddNew.createNewTaskModal},
                            'children': [
                                new Element({
                                    'tagname': 'img',
                                    'src': '../src/view/icons/add.png',
                                    'alt': ''
                                }).build(),
                                new Element({
                                    'tagname':'span',
                                    'text-content':'New Task'
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),
                new Element({
                    'tagname':'div',
                    'class':'tasks-subheader-container',
                    'children':[
                        new Element({
                            'tagname': 'h2',
                            'class': 'tasks',
                            'text-content': 'Tasks'
                        }).build(),
                        new Element({
                            'tagname':'button',
                            'event-listeners':{'click':Queue.toggleQueueMode},
                            'children':[
                                new Element({
                                    'tagname':'img',
                                    'class':'toggle-queue',
                                    'src':'../src/view/icons/delete.svg',
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),
                // container for list of tasks
                new Element({
                    'tagname':'ul',
                    'class':'nested-container',
                }).build(),
            ]
        }).build();
    }

    static tasksPage(title) {
        return new Element({
            'tagname': 'div',
            'class': 'display',
            'children': [
                new Element({
                    'tagname': 'header',
                    'children': [
                        new Element({
                            'tagname':'div',
                            'class':'left-container',
                            'children':[
                                new Element({
                                    'tagname': 'h1',
                                    'text-content': `${title}`,
                                }).build()
                            ]
                        }).build(),
                        new Element({
                            'tagname':'button',
                            'event-listeners':{'click':Queue.toggleQueueMode},
                            'children':[
                                new Element({
                                    'tagname':'img',
                                    'class':'toggle-queue',
                                    'src':'../src/view/icons/delete.svg',
                                    'alt':'delete'
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),

                // container for list of tasks
                new Element({
                    'tagname':'ul',
                    'class':'nested-container',
                }).build(),
            ]
        }).build();
    }

    static editTaskPage(task) {
        return new Element({
            'tagname': 'div',
            'class': 'display edit-task',
            'children': [
                new Element({
                    'tagname': 'header',
                    'children': [
                        new Element({
                            'tagname':'button',
                            'class':'back-button',
                            'event-listeners':{'click':EditTask.exitEditTask},
                            'children':[
                                new Element({
                                    'tagname':'img',
                                    'src':'../src/view/icons/left-carrot.svg'
                                }).build(),
                                new Element({
                                    'tagname':'span',
                                    'text-content':'BACK',
                                }).build(),
                            ]
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'buttons-container',
                            'children':[
                                new Element({
                                    'tagname': 'button',
                                    'class':'delete-task',
                                    'text-content': 'DELETE TASK',
                                    'event-listeners': {'click':EditTask.removeTask},
                                }).build(),
                                new Element({
                                    'tagname':'button',
                                    'class':'undo-changes',
                                    'text-content':'UNDO CHANGES',
                                    'event-listeners':{'click':EditTask.undoChanges},
                                }).build(),
                                new Element({
                                    'tagname':'button',
                                    'class':'save-changes',
                                    'text-content':'SAVE',
                                    'event-listeners':{'click':EditTask.saveChanges},
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),
                new Element({
                    'tagname':'ul',
                    'class':'nested-container',
                    'children':[
                        new Element({
                            'tagname':'div',
                            'class':'edit-input container',
                            'children':[
                                new Element({
                                    'tagname':'label',
                                    'class':'absolute-position',
                                    'text-content':'Task Name (required)',
                                }).build(),
                                new Element({
                                    'tagname':'input',
                                    'type':'text',
                                    'class':'edit-input edit-task-name',
                                    'value':`${task.name}`,
                                }).build(),
                            ]
                        }).build(),
                        new Element({
                            'tagname':'div',
                            'class':'edit-input container',
                            'children':[
                                new Element({
                                    'tagname':'label',
                                    'class':'absolute-position',
                                    'text-content':'Notes',
                                }).build(),
                                new Element({
                                    'tagname':'textarea',
                                    'class':'edit-input edit-task-notes',
                                    'text-content':`${task.notes}`,
                                }).build(),
                            ]
                        }).build(),
                        
                        new Element({
                            'tagname':'div',
                            'class':'bottom-content-container',
                            'children':[
        
                                new Element({
                                    'tagname':'div',
                                    'class':'edit-priority-container',
                                    'children':[
                                        new Element({
                                            'tagname':'label',
                                            'class':'absolute-position',
                                            'text-content':'Priority',
                                        }).build(),
        
                                        new Element({
                                            'tagname':'ul',
                                            'children':[
                                                new Element({
                                                    'tagname':'li',
                                                    'children':[
                                                        new Element({
                                                            'tagname':'input',
                                                            'type':'radio',
                                                            'name':'priority',
                                                            'value':'unset',
                                                            'checked':'true',
                                                        }).build(),
                                                        new Element({
                                                            'tagname':'label',
                                                            'for':'unset',
                                                            'text-content':'Unset',
                                                        }).build(),
                                                    ]
                                                }).build(),
                                                new Element({
                                                    'tagname':'li',
                                                    'children':[
                                                        new Element({
                                                            'tagname':'input',
                                                            'type':'radio',
                                                            'name':'priority',
                                                            'value':'low',
                                                        }).build(),
                                                        new Element({
                                                            'tagname':'label',
                                                            'for':'low',
                                                            'text-content':'Low',
                                                        }).build(),
                                                    ]
                                                }).build(),
                                                new Element({
                                                    'tagname':'li',
                                                    'children':[
                                                        new Element({
                                                            'tagname':'input',
                                                            'type':'radio',
                                                            'name':'priority',
                                                            'value':'medium',
                                                        }).build(),
                                                        new Element({
                                                            'tagname':'label',
                                                            'for':'medium',
                                                            'text-content':'Medium',
                                                        }).build(),
                                                    ]
                                                }).build(),
                                                new Element({
                                                    'tagname':'li',
                                                    'children':[
                                                        new Element({
                                                            'tagname':'input',
                                                            'type':'radio',
                                                            'name':'priority',
                                                            'value':'high',
                                                        }).build(),
                                                        new Element({
                                                            'tagname':'label',
                                                            'for':'high',
                                                            'text-content':'High',
                                                        }).build(),
                                                    ]
                                                }).build(),
                                            ]
                                        }).build(),
                                    ]
                                }).build(),

                                new Element({
                                    'tagname':'div',
                                    'class':'edit-date-container',
                                    'children':[
                                        new Element({
                                            'tagname':'label',
                                            'class':'absolute-position',
                                            'text-content':'Due Date',
                                        }).build(),
                                        new Element({
                                            'tagname':'input',
                                            'type':'date',
                                            'value':`${task.dueDate}`,
                                        }).build(),
                                        new Element({
                                            'tagname':'img',
                                            'src':'../src/view/icons/calendar.svg',
                                        }).build()
                                    ]
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),
            ]
        }).build();
    }

    static taskItem(task) {
        let dueDate = task.dueDate;

        if (dueDate !== '') {
            dueDate = formatDateForUI(dueDate);
        }

        return new Element({
            'tagname': 'div',
            'class': 'item task',
            'item-id':`${task._id}`,
            'children': [
                new Element({
                    'tagname': 'div',
                    'class': 'adjust-height-container',
                    'children': [
                        new Element({
                            'tagname': 'button',
                            'class': 'adjust-height',
                            'event-listeners':{'click':Navigation.toggleExpandable},
                            'children': [
                                new Element({
                                    'tagname': 'img',
                                    'class': 'adjust-height',
                                    'src': '../src/view/icons/right-carrot.svg',
                                    'alt': ''
                                }).build()
                            ]
                        }).build()
                    ]
                }).build(),
                new Element({
                    'tagname': 'div',
                    'class': 'item-container',
                    'children': [
                        new Element({
                            'tagname': 'div',
                            'class': 'top-content',
                            'children': [
                                new Element({
                                    'tagname': 'h3',
                                    'class':'target-node',
                                    'text-content': `${task.name}`,
                                }).build(),
                                new Element({
                                    'tagname': 'div',
                                    'class': 'right-container',
                                    'children': [
                                        new Element({
                                            'tagname': 'div',
                                            'class': 'date',
                                            'text-content': `${dueDate}`,
                                        }).build(),
                                        new Element({
                                            'tagname': 'div',
                                            'class': 'priority-circle',
                                            'children':[
                                                new Element({
                                                    'tagname':'img',
                                                    'class':'priority-circle-img',
                                                    'src':'../src/view/icons/transparent-placeholder.png',
                                                }).build(),
                                            ]
                                        }).build(),
                                        new Element({
                                            'tagname': 'button',
                                            'class': 'edit-task',
                                            'item-id':`${task._id}`,
                                            'event-listeners':{'click':Load.editTaskPage},
                                            'children': [
                                                new Element({
                                                    'tagname': 'img',
                                                    'src': '../src/view/icons/edit.svg',
                                                    'alt': ''
                                                }).build()
                                            ]
                                        }).build()
                                    ]
                                }).build()
                            ]
                        }).build(),
                        new Element({
                            'tagname': 'div',
                            'class': 'bottom-content',
                            'children': [
                                new Element({
                                    'tagname': 'h4',
                                    'class': 'notes',
                                    'text-content': 'Notes'
                                }).build(),
                                new Element({
                                    'tagname': 'p',
                                    'class': 'notes-content',
                                    'text-content': `${task.notes}`,
                                }).build(),
                                new Element({
                                    'tagname':'button',
                                    'class':'mark-complete',
                                    'text-content':'MARK COMPLETE',
                                }).build()
                                
                            ]
                        }).build()
                    ]
                }).build()
            ]
        }).build()
    }

    static projectItem(project) {
        return new Element({
            'tagname': 'div',
            'class': 'item project',
            'item-id':`${project._id}`,
            'children': [
                new Element({
                    'tagname': 'div',
                    'class': 'adjust-height-container',
                    'children': [
                        new Element({
                            'tagname': 'button',
                            'class': 'adjust-height',
                            'children': [
                                new Element({
                                    'tagname': 'img',
                                    'class': 'adjust-height',
                                    'src': '../src/view/icons/right-carrot.svg',
                                    'event-listeners':{'click':Navigation.toggleExpandable},
                                    'alt': ''
                                }).build()
                            ]
                        }).build()
                    ]
                }).build(),
                new Element({
                    'tagname': 'button',
                    'class': 'item-container',
                    'item-id':`${project._id}`,
                    'event-listeners':{'click':Load.singleProjectPage},
                    'children': [
                        new Element({
                            'tagname': 'div',
                            'class': 'top-content',
                            'children': [
                                new Element({
                                    'tagname': 'h2',
                                    'text-content': `${project.name}`
                                }).build(),
                                new Element({
                                    'tagname':'p',
                                    'class':'instructions',
                                    'text-content':'click to view project and add tasks',
                                }).build(),
                            ]
                        }).build(),
                        new Element({
                            'tagname': 'div',
                            'class': 'bottom-content',
                            'children': [
                                new Element({
                                    'tagname': 'h4',
                                    'class': 'description',
                                    'text-content': 'Description'
                                }).build(),
                                new Element({
                                    'tagname': 'p',
                                    'class': 'description-content',
                                    'text-content': `${project.desc}`
                                }).build(),
                                new Element({
                                    'tagname': 'div',
                                    'class': 'tasks-count-container',
                                    'children': [
                                        new Element({
                                            'tagname': 'h4',
                                            'class': 'tasks',
                                            'text-content': 'Tasks :'
                                        }).build(),
                                        new Element({
                                            'tagname': 'p',
                                            'class': 'tasks-count',
                                            'text-content': `${project.tasks.length}`
                                        }).build()
                                    ]
                                }).build()
                            ]
                        }).build()
                    ]
                }).build()
            ]
        }).build();
    }

    static deleteCheckbox(id) {
        return new Element({
            'tagname':'input',
            'class':'checkbox-delete',
            'item-id':`${id}`,
            'type':'checkbox',
            'event-listeners':{'input':Queue.controlQueueDropDown}
        }).build();
    }

    static queueDropDown() {
        return new Element({
            'tagname':'div',
            'class':'confirm-delete-container',
            'children':[
                new Element({
                    'tagname':'p',
                    'class':'item-queue-count',
                    'text-content':'1 selected',
                }).build(),
                new Element({
                    'tagname':'button',
                    'class':'delete-queue-items',
                    'text-content':'DELETE',
                    'event-listeners':{'click':Queue.deleteQueueItems},
                }).build(),
            ]
        }).build();
    }

    static noProjectsMessage() {
        return new Element({
            'tagname':'p',
            'class':'no-projects-message',
            'text-content':'No projects added yet',
        }).build();
    }
}