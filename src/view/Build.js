import { Element } from './Element.js';

export class Build {
    static sidebarMaximized() {
        return new Element({
            'tagname':'div',
            'class':'sidebar maximized',
            'children':[

                // top sidebar
                new Element({
                    'tagname':'div',
                    'class':'top',
                    'children':[
                        new Element({
                            'tagname':'button',
                            'id':'minimize-sidebar',
                            'children':[
                                new Element({
                                    'tagname':'img',
                                    'class':'minimize',
                                    'src':'../src/view/icons/minimize2.svg',
                                    'alt':'minimize-sidebar',
                                }).build(),
                            ]
                        }).build(),
                    ]
                }).build(),

                // sidebar content
                new Element({
                    'tagname':'ul',
                    'class':'sidebar-content',
                    'children':[
                        // scheduled-today
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'scheduled-today',
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

    static sidebarMinimized() {
        return new Element({
            'tagname':'div',
            'class':'sidebar minimized',
            'children':[
                // top sidebar 
                new Element({
                    'tagname':'div',
                    'class':'top',
                    'children':[
                        new Element({
                            'tagname':'button',
                            'id':'maximize-sidebar',
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

                // sidebar content
                new Element({
                    'tagname':'ul',
                    'children':[
                        // scheduled today
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'scheduled-today',
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
            'class':'view-content',
        }).build();
    }

    static mobileNav() {
        return new Element({
            'tagname':'nav',
            'class':'mobile',
            'children':[
                new Element({
                    'tagname':'ul',
                    'class':'mobile-nav-content',
                    'children':[
                        // scheduled-today
                        new Element({
                            'tagname':'li',
                            'children':[
                                new Element({
                                    'tagname':'button',
                                    'class':'scheduled-today',
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
                                    'class':'scheduled',
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

    static DefaultLoaded() {
        const content = document.getElementById('content');
        
        content.appendChild(Build.sidebarMaximized());
        content.appendChild(Build.sidebarMinimized());
        content.appendChild(Build.rightSideFlexContainer());

        const rightSideFlexContainer = document.querySelector('.right-side-flex-container');

        rightSideFlexContainer.appendChild(Build.header());
        rightSideFlexContainer.appendChild(Build.mainContentContainer());
        rightSideFlexContainer.appendChild(Build.mobileNav());

        const viewContent = document.getElementById('view-content');
    }
}