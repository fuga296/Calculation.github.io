document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.loggedin-message').innerHTML = `${localStorage.getItem('userName')}さんはすでに登録されています`
    selectContent();
    getUserName();
    calculate();
    logout();
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
    document.querySelector('#result').innerHTML = '計算結果がここに表示されます';
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

function logout() {
    document.querySelector('#logout-btn').onclick = function() {
        localStorage.removeItem('userName');
        selectContent('user-content');
    }
}


function calculate() {
    document.querySelector('#calculate-btn').onclick = function() {
        const formulaString = document.querySelector('#input-formula').value;
        document.querySelector('#input-formula').value = '';
        let quit = checkFormula(formulaString);
        if (!quit) {return false;};
        const formula = normalization(formulaString);
        document.querySelector('#result').innerHTML = BigInt(eval(formula));
    }
}


function checkFormula(formulaString) {
    const reBase = /^[0-9+\-*/()! ]*$/;
    const reSymbol1 = /[+\-*/!]{2,}/;
    const reSymbol2 = /![+\-*/]/;

    if (formulaString === '') {
        alert('空文字は不適切です');
        return false;
    }

    if (!reBase.test(formulaString)) {
        alert('数字と指定された演算子以外の文字を使用しないでください');
        return false;
    }

    if ((reSymbol1.test(formulaString)) & !reSymbol2.test(formulaString)) {
        alert('記号を2回以上連続させないでください');
        return false;
    }

    if (!(( formulaString.match( /\(/g ) || [] ).length === (formulaString.match(/\)/g) || []).length)) {
        alert('()を閉じてください');
        return false;
    }

    if ((formulaString.match(/[^0-9]*?/g) || []).length === 0) {
        alert('数字が必要です');
        return false;
    }
    return true;
}

function normalization(formulaString) {
    const reFactorial = /(\d+)!/;
    formula = formula.replace(reFactorial, n => {
        return `factorial(${parseInt(n)})`;
    });
    return formula;
}

function factorial(n) {
    if (Number.isInteger(n)) {
        let tmp = 1
        for (let i = 1; i <= n; i++) {
            tmp *= i;
        }
        return tmp;
    } else {
        alert('階乗の引数は自然数にしてください');
        return null;
    }
}