document.addEventListener('DOMContentLoaded', function() {
    // TODO: class→id、API関数
    // HTML要素の取得
    const sideBtns = document.querySelectorAll('.side-btn');
    let changePageBtns = document.querySelectorAll('.change-page-btn');
    const pageSearchBtn = document.querySelector('.page-search-btn');
    const pageDeletehBtn = document.querySelector('.page-delete-btn');
    const howToUseBtn = document.querySelector('.how-to-use-btn');
    const dbBtns = document.querySelector('.db-btns');
    const newPageBtn = document.querySelector('.new-page-btn');
    const newNotionPageBtn = document.querySelector('.new-notion-page-btn');
    const settingBtn = document.querySelector('.setting-btn');
    const termsOfUseBtn = document.querySelector('.terms-of-use-btn');
    const logoutBtn = document.querySelector('.logout-btn');

    const pages = document.querySelectorAll('.pages');
    const page = document.querySelectorAll('.page');
    const getDBIDbox = document.querySelector('.get-dbid-box');
    const dbPages = document.querySelector('.db-pages');
    const howToUsePage = document.querySelector('.how-to-use-page');

    const dbidInput = document.querySelector('.dbid-input');
    const dbidSubmit = document.querySelector('.dbid-submit');

    let count = 0;
    let currentPage = howToUsePage;

    // 初期サイドボタンのイベントリスナーを設置
    sideBtns.forEach(btn => {
        btn.addEventListener('click', (e) => sideBtnClk(e, btn));
    });

    // dbidの送信
    dbidSubmit.addEventListener('click', function() {
        const dbid = dbidInput.value;
        console.log("OK", isPromiseFulfilled('secret_Mhsn81CQB8OmdKJ1TuqPYA03PDfiCbMs9I2aCUWdiFG', dbid));
        // 値の取得
        // APIとつなげる
        // 正誤
        // ローカルストレージ追加、コンテンツ挿入、input閉鎖
        // ダメメッセージ挿入

        // ページ変化した時
        // 閉鎖解除、ローカルストレージからほかを輸入、
    })


    // サイドバーボタンがクリックされた時の処理
    function sideBtnClk(e, btn) {
        // データベースじゃないとき
        if (!btn.classList.contains('db-btn')) {
            // ページ変える系ボタンのとき
            if (btn.classList.contains('change-page-btn')) {
                collapsePage();
                getDBIDbox.style.display = 'none';
                const page = document.getElementById(btn.dataset.page);
                page.style.display = 'block';

                btn.style.backgroundColor = "rgb(235, 235, 235)";
                currentPage = page;
            // ページ変えないアクション系ボタンのとき
            } else {
                if (btn === pageSearchBtn) {
                    console.log(btn);
                } else if (btn === pageDeletehBtn) {
                    console.log(btn);
                // ページ作成ボタンのとき
                } else if (btn === newPageBtn) {
                    count++;

                    // ボタンの追加と諸々の設定
                    const newBtn = document.createElement("button");
                    newBtn.classList.add('db-btn', 'side-btn', 'change-page-btn');
                    newBtn.dataset.page = `&undifined${count}`;
                    newBtn.innerHTML = '<span>undifined</span>';
                    dbBtns.appendChild(newBtn);
                    newBtn.addEventListener('click', (e) => sideBtnClk(e, newBtn));

                    // コンテンツの追加と諸々の設定
                    const newPage = document.createElement("div");
                    newPage.classList.add('db-page', 'pages');
                    newPage.id = `&undifined${count}`;
                    const dbMessage = document.createElement("div");
                    dbMessage.innerHTML = 'データベースIDもしくはトークンが入力されていないか不適切。';
                    dbMessage.classList.add('db-message');
                    newPage.appendChild(dbMessage);
                    dbPages.appendChild(newPage);

                    // 新しいページに移動
                    movePage(newBtn);

                    // 変数の再設定
                    changePageBtns = document.querySelectorAll('.change-page-btn');
                } else if (btn === newNotionPageBtn) {
                    console.log(btn);
                }
            }
        // データベースのとき
        } else {
            // 単にページの移動
            movePage(btn);
            currentPage = document.getElementById(btn.dataset.page);
        }
    }

    function movePage(btn) {
        collapsePage();
        dbPages.style.display = 'block';
        getDBIDbox.style.display = 'block';
        const page = document.getElementById(btn.dataset.page);
        page.style.display = 'block';
        btn.style.backgroundColor = "rgb(235, 235, 235)";
        dbidInput.value = "";
    }

    function collapsePage() {
        changePageBtns.forEach(btn => {
            const pageId = btn.dataset.page;
            const page = document.getElementById(pageId);
            page.style.display = 'none';
            btn.style.backgroundColor = "white";
        });
    }

    // APIの履行/拒否
    function isPromiseFulfilled(authToken, databaseId) {
        if (authToken.length !== 50 && authToken.length !== 60) {
            return false;
        } else if (databaseId.length !== 32) {
            return false;
        }

        getDB(authToken, databaseId)
            .then(items => {
                console.log(items[32].properties.date.date.start);
                return true;
            })
            .catch(error => {
                console.error('Error', error);
                return false;
            })

    }

    // APIとつなげる
    async function getDB(authToken, databaseId) {
        try {
            const endpoint = `https://api.notion.com/v1/databases/${databaseId}/query`;

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Notion-Version': '2022-06-28'
                }
            };

            const response = await fetch(endpoint, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
})
