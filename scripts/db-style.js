document.addEventListener('DOMContentLoaded', () => {
    // ヘッダーアイコン関連
    const menuIcon = document.querySelector('#menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.header');
    const pageContainer = document.querySelector('.page-container');

    let showSidebar = true;
    menuIcon.addEventListener('click', function() {
        if (showSidebar) {
            sidebar.classList.remove('shrunken');
            header.classList.remove('shrunken');
            pageContainer.classList.remove('shrunken');

            sidebar.classList.add('expanded');
            header.classList.add('expanded');
            pageContainer.classList.add('expanded');
            menuIcon.classList.add('expanded');


            showSidebar = false;
        } else {
            sidebar.classList.remove('expanded');
            header.classList.remove('expanded');
            pageContainer.classList.remove('expanded');
            menuIcon.classList.remove('expanded');

            sidebar.classList.add('shrunken');
            header.classList.add('shrunken');
            pageContainer.classList.add('shrunken');

            showSidebar = true;
        }
    })
})