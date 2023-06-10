import './style/index.css';

document.querySelector('#minimize-sidebar').onclick = () => {
    document.querySelector('.sidebar.maximized').classList.add('hidden');
    document.querySelector('.sidebar.minimized').classList.add('visible');
}

document.querySelector('#maximize-sidebar').onclick = () => {
    document.querySelector('.sidebar.maximized').classList.remove('hidden');
    document.querySelector('.sidebar.minimized').classList.remove('visible');
}

document.querySelector('.new-project-modal input#project-name').oninput = (e) => {

    const createButton = document.querySelector('.new-project-modal button[type=submit]');
    const names = ['Project 1', 'Project 2'];
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

document.querySelector('.new-project-modal').onclick = (e) => {
    const form = document.querySelector('.new-project-modal form');
    const modal = document.querySelector('.new-project-modal');

    if (e.target === form) {
        return;
    }

    if (e.target === modal) {
        modal.remove();
    }
}

document.querySelector('button.new-project-container').onclick = () => {
    console.log('test');
}