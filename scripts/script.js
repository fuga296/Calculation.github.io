document.addEventListener('DOMContentLoaded', function() {
    selectContent();
});

function selectContent() {
    document.querySelectorAll('.content-btn').forEach(content_btn => {
        content_btn.onclick = function() {
            let showcontent = this.dataset.content;
            if (showcontent !== 'user-content') {
                showContent(this.dataset.content);
            } else {
                if (!localStorage.getItem('user-name')) {
                    showContent('user-content-notloggedin');
                } else {
                    showContent('user-content-loggedin');
                }
            }
        };
    });
    document.querySelectorAll('.logo').forEach(logo => {
        logo.onclick = function() {
            showContent('main-content')
        }
    });
}

function showContent(content) {
    document.querySelectorAll('.content').forEach(content => {
        content.style.display = 'none';
    });
    document.querySelector(`.${content}`).style.display = 'block';
}