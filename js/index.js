// 스크롤시 헤더 고정
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});

// 햄버거 메뉴 버튼 클릭 시 메뉴 표시
document.querySelector('.ham_btn').addEventListener('click', function() {
    document.querySelector('.ham_menu').classList.add('on');
});

// 닫기 버튼 클릭 시 메뉴 숨김
document.querySelector('.ham_close_btn').addEventListener('click', function() {
    document.querySelector('.ham_menu').classList.remove('on');
});

// 햄버거 메뉴 외의 영역 클릭 시 메뉴 닫기
document.addEventListener('click', function(event) {
    const hamMenu = document.querySelector('.ham_menu');
    const hamBtn = document.querySelector('.ham_btn');

    // 메뉴가 열려있고 클릭한 곳이 햄버거 메뉴나 버튼이 아닌 경우
    if (hamMenu.classList.contains('on') && !hamMenu.contains(event.target) && !hamBtn.contains(event.target)) {
        hamMenu.classList.remove('on');
    }
});

// 햄버거 딤 클릭시 닫기
const hamOverlay = document.querySelector('.ham_dim');

hamOverlay.addEventListener('click', function() {
    document.querySelector('.ham_menu').classList.remove('on');
});

// 스크롤 탑버튼 동작
const topBtn = document.querySelector('.top_btn');
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
});

topBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll to top
    });
});

// scroll top button 스크롤 탑 버튼 stop 클래스 추가
window.addEventListener('scroll', function() {
    const sct = window.scrollY,
        viewportHeight = window.innerHeight,
        scrollBtnWrap = document.querySelector('.top_btn'),
        footer = document.querySelector('footer'),
        wrap = document.querySelector('.wrap'),
        containerBtm = sct + viewportHeight,
        wrapHeight = wrap.offsetHeight,
        footerHeight = footer.offsetHeight,
        contHeight = wrapHeight - footerHeight;

    if (containerBtm >= contHeight) {
        scrollBtnWrap.classList.add('stop');
    } else {
        scrollBtnWrap.classList.remove('stop');
    }
});

// 모달 딤 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('subscribeModal');

    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Subscribe 버튼 동작
document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        alert('이메일을 입력해주세요!');
    } else if (!emailPattern.test(email)) {
        alert('유효하지 않은 이메일 형식입니다!');
    } else {
        document.getElementById('subscribeModal').style.display = 'flex';
    }
});

document.getElementById('modalOkBtn').addEventListener('click', function() {
    document.getElementById('subscribeModal').style.display = 'none';
    document.getElementById('subscribeForm').submit();
});