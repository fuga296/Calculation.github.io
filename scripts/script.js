// 計算、ユーザー認証
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.loggedin-message').innerHTML = `${localStorage.getItem('userName')}さんはすでに登録されています`
    selectContent();
    getUserName();
});

function selectContent() {
    document.querySelectorAll('.content-btn').forEach(content_btn => {
        content_btn.onclick = function() {
            let showcontent = this.dataset.content;
            if (showcontent !== 'user-content') {
                showContent(this.dataset.content);
            } else {
                if (localStorage.getItem('userName')) {
                    showContent('user-content-loggedin');
                } else {
                    showContent('user-content-notloggedin');
                }
            }
        };
    });
    document.querySelectorAll('.logo').forEach(logo => {
        logo.onclick = function() {
            showContent('main-content')
        }
    });
    document.querySelector('#user-name').value = '';
}

function showContent(content) {
    document.querySelectorAll('.content').forEach(content => {
        content.style.display = 'none';
    });
    document.querySelector(`.${content}`).style.display = 'block';
}



function getUserName() {
    document.querySelector('#user-name-btn').onclick = function() {
        userName = document.querySelector('#user-name').value;
        if (userName !== '') {
            localStorage.setItem('userName', userName);
            document.querySelector('#user-name').value = '';
            selectContent('main-content');
        } else {
        alert('空文字は使用できません');
        }
    };
}