let currentPage = 0;
const pagesLeft = document.querySelectorAll('.page-left .page');
const pagesRight = document.querySelectorAll('.page-right .page');
const clickLeft = document.createElement('div');
const clickRight = document.createElement('div');

clickLeft.className = 'click-left';
clickRight.className = 'click-right';

document.querySelector('.page-container').appendChild(clickLeft);
document.querySelector('.page-container').appendChild(clickRight);

let isTransitioning = false;

function showPage(pageIndex) {
    const leftPageIndex = pageIndex;
    const rightPageIndex = pageIndex + 1;
    
    pagesLeft.forEach((page, index) => {
        page.classList.toggle('active', index === Math.floor(leftPageIndex / 2));
    });
    pagesRight.forEach((page, index) => {
        page.classList.toggle('active', index === Math.floor(rightPageIndex / 2));
    });
}

function transitionPage(next) {
    if (isTransitioning) return;
    isTransitioning = true;

    const currentLeftPage = document.querySelector('.page-left .page.active');
    const currentRightPage = document.querySelector('.page-right .page.active');

    if (currentLeftPage) currentLeftPage.style.opacity = '0';
    if (currentRightPage) currentRightPage.style.opacity = '0';

    setTimeout(() => {
        currentPage = (currentPage + (next ? 2 : -2) + pagesLeft.length * 2) % (pagesLeft.length * 2);
        showPage(currentPage);
        const newLeftPage = document.querySelector('.page-left .page.active');
        const newRightPage = document.querySelector('.page-right .page.active');
        
        if (newLeftPage) newLeftPage.style.opacity = '0';
        if (newRightPage) newRightPage.style.opacity = '0';

        setTimeout(() => {
            if (newLeftPage) newLeftPage.style.opacity = '1';
            if (newRightPage) newRightPage.style.opacity = '1';
            setTimeout(() => {
                isTransitioning = false;
            }, 500);  // フェードイン完了後0.5秒の待機時間を追加
        }, 1000);  // フェードインに1秒間
    }, 1000);  // フェードアウトに1秒間
}

clickRight.addEventListener('click', () => {
    transitionPage(true);
});

clickLeft.addEventListener('click', () => {
    transitionPage(false);
});

// 初期ページを表示
showPage(currentPage);
