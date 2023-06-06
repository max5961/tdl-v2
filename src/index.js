import './styles/index.css';

document.querySelector('.minimize-sidebar').onclick = () => {
    document.querySelector('.sidebar-container').classList.add('hidden');
    document.querySelector('.sidebar-minimized').classList.add('visible');
}

document.querySelector('.maximize-sidebar').onclick = () => {
    document.querySelector('.sidebar-container').classList.remove('hidden');
    document.querySelector('.sidebar-minimized').classList.remove('visible');
}