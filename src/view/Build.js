import { Element } from './Element.js';
import { Event } from '../controller/Event.js';
import { Controller } from '../controller/controller.js';

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
                            'event-listeners':{'click':Event.minimizeNavigation},
                            'children':[
                                new Element({
                                    'tagname':'img',
                                    'class':'minimize',
                                    'src':'../src/view/icons/minimize2.svg',
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
                                    'event-listeners':{'click':Event.clickTab},
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
                        // scheduled
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'scheduled',
                                    'event-listeners':{'click':Event.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'src':'../src/view/icons/scheduled.png',
                                            'class':'scheduled',
                                            'alt':'scheduled',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'title',
                                            'text-content':'Scheduled',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'class':'count scheduled-count',
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
                                    'event-listeners':{'click':Event.clickTab},
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
                                    'event-listeners':{'click':Event.clickTab},
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
                            'event-listeners':{'click':Event.maximizeNavigation},
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
                                    'event-listeners':{'click':Event.clickTab},
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
                        // scheduled
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'scheduled',
                                    'event-listeners':{'click':Event.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'scheduled',
                                            'alt':'scheduled',
                                            'src':'../src/view/icons/scheduled.png',
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
                                    'event-listeners':{'click':Event.clickTab},
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
                                    'event-listeners':{'click':Event.clickTab},
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
                    'event-listeners':{'click':Event.newProject},
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

    static viewContent() {
        return new Element({
            'tagname':'div',
            'id':'view-content',
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
                                    'event-listeners':{'click':Event.clickTab},
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
                        // scheduled
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'scheduled',
                                    'event-listeners':{'click':Event.clickTab},
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'class':'scheduled',
                                            'alt':'scheduled',
                                            'src':'../src/view/icons/scheduled.png',
                                        }).build(),
                                        new Element({
                                            'tagname':'p',
                                            'text-content':'Scheduled'
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
                                        'mouseenter':Event.hoverNewProject,
                                        'mouseleave':Event.hoverNewProject,
                                        'click':Event.newProject,
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
                                    'event-listeners':{'click':Event.clickTab},
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
                                    'event-listeners':{'click':Event.clickTab},
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

    static noProjectsMessage() {
        return new Element({
            'tagname':'p',
            'class':'no-projects-message',
            'text-content':'No projects added yet',
        }).build();
    }

    static projectsView() {
        return new Element({
            'tagname':'div',
            'class':'projects-view',
            'children':[
                // top section
                new Element({
                    'tagname':'section',
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
                                    'children':[
                                        new Element({
                                            'tagname':'img',
                                            'src':'../src/view/icons/delete.svg',
                                            'alt':'delete'
                                        }).build(),
                                    ]
                                }).build(),
                            ]
                        }).build()
                    ]
                }).build(),
            ]
        }).build();
    }

    static singleProjectView() {
        return new Element({
            'tagname': 'div',
            'class': 'projects-view single-project',
            'children': [
                new Element({
                    'tagname': 'section',
                    'children': [
                        new Element({
                            'tagname': 'button',
                            'children': [
                                new Element({
                                    'tagname': 'h1',
                                    'text-content': 'Projects'
                                }).build()
                            ]
                        }).build(),
                        new Element({
                            'tagname': 'span',
                            'class': 'divider',
                            'text-content': '>'
                        }).build(),
                        new Element({
                            'tagname': 'span',
                            'class': 'name',
                            'text-content': 'Project 1'
                        }).build()
                    ]
                }).build(),
                new Element({
                    'tagname': 'div',
                    'class': 'project-description',
                    'children': [
                        new Element({
                            'tagname': 'h2',
                            'text-content': 'Description'
                        }).build(),
                        new Element({
                            'tagname': 'p',
                            'class': 'description-content',
                            'text-content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ipsa dolorum fuga at velit. Animi illo laboriosam natus perspiciatis ab necessitatibus odit? Maiores non, itaque aliquam totam molestiae deleniti. Unde!'
                        }).build()
                    ]
                }).build(),
                new Element({
                    'tagname': 'h2',
                    'class': 'tasks',
                    'text-content': 'Tasks'
                }).build(),
                new Element({
                    'tagname': 'form',
                    'class': 'add-task-container',
                    'children': [
                        new Element({
                            'tagname': 'button',
                            'children': [
                                new Element({
                                    'tagname': 'img',
                                    'src': '../src/view/icons/add.png',
                                    'alt': ''
                                }).build()
                            ]
                        }).build(),
                        new Element({
                            'tagname': 'input',
                            'type': 'text',
                            'placeholder': 'task name'
                        }).build()
                    ]
                }).build(),
                new Element({
                    'tagname': 'div',
                    'class': 'project-container tasks-container',
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
                                            'alt': ''
                                        }).build()
                                    ]
                                }).build()
                            ]
                        }).build(),
                        new Element({
                            'tagname': 'div',
                            'class': 'content-container',
                            'children': [
                                new Element({
                                    'tagname': 'div',
                                    'class': 'top-content',
                                    'children': [
                                        new Element({
                                            'tagname': 'h3',
                                            'text-content': 'Task 1'
                                        }).build(),
                                        new Element({
                                            'tagname': 'div',
                                            'class': 'right-container',
                                            'children': [
                                                new Element({
                                                    'tagname': 'div',
                                                    'class': 'date',
                                                    'text-content': '6/12/2023'
                                                }).build(),
                                                new Element({
                                                    'tagname': 'div',
                                                    'class': 'priority-circle',
                                                    'text-content': '!'
                                                }).build(),
                                                new Element({
                                                    'tagname': 'button',
                                                    'class': 'edit-task',
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
                                            'text-content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quisquam doloribus possimus autem consequuntur placeat iure obcaecati, ipsa delectus magni quasi numquam sequi quaerat totam nesciunt assumenda quos excepturi magnam?'
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

    static newProjectModal() {
        return new Element({
            'tagname': 'div',
            'class': 'new-project-modal',
            'event-listeners':{'click':Event.exitNewProjectModal},
            'children': [
                new Element({
                    'tagname': 'form',
                    'event-listeners':{'submit':Event.preventDefault},
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
                            'event-listeners':{'input':Event.validateNewProjectInput}
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
                                    'event-listeners':{'click':Event.exitNewProjectModal}
                                }).build(),
                                new Element({
                                    'tagname': 'button',
                                    'type': 'submit',
                                    'text-content': 'Create Project',
                                    'event-listeners':{'click':Event.addProject},
                                }).build()
                            ]
                        }).build()
                    ]
                }).build()
            ]
        }).build();
    }

    // should take a parameter that specifies which task view.  Depending on which task view is specified, parent element class should change
    static tasksView() {
        return new Element({
            'tagname': 'div',
            'class': 'projects-view single-project all-tasks',
            'children': [
                new Element({
                    'tagname': 'section',
                    'children': [
                        new Element({
                            'tagname': 'h1',
                            'text-content': 'Scheduled Today'
                        }).build()
                    ]
                }).build(),
                new Element({
                    'tagname': 'div',
                    'class': 'project-container tasks-container tasks-view',
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
                                            'alt': ''
                                        }).build()
                                    ]
                                }).build()
                            ]
                        }).build(),
                        new Element({
                            'tagname': 'div',
                            'class': 'content-container',
                            'children': [
                                new Element({
                                    'tagname': 'div',
                                    'class': 'top-content',
                                    'children': [
                                        new Element({
                                            'tagname': 'div',
                                            'class': 'left-container',
                                            'children': [
                                                new Element({
                                                    'tagname': 'h3',
                                                    'text-content': 'Task 1'
                                                }).build(),
                                                new Element({
                                                    'tagname': 'p',
                                                    'class': 'parent-project-name',
                                                    'text-content': '(Project 1)'
                                                }).build()
                                            ]
                                        }).build(),
                                        new Element({
                                            'tagname': 'div',
                                            'class': 'right-container',
                                            'children': [
                                                new Element({
                                                    'tagname': 'div',
                                                    'class': 'date',
                                                    'text-content': '6/12/2023'
                                                }).build(),
                                                new Element({
                                                    'tagname': 'div',
                                                    'class': 'priority-circle',
                                                    'text-content': '!'
                                                }).build(),
                                                new Element({
                                                    'tagname': 'button',
                                                    'class': 'edit-task',
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
                                            'text-content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quisquam doloribus possimus autem consequuntur placeat iure obcaecati, ipsa delectus magni quasi numquam sequi quaerat totam nesciunt assumenda quos excepturi magnam?'
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
}