// 스크롤 시 헤더 고정
function handleHeaderFixed() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
}

// 햄버거 메뉴 열기
function openHamburgerMenu() {
    document.querySelector('.ham_menu').classList.add('on');
}

// 햄버거 메뉴 닫기
function closeHamburgerMenu() {
    document.querySelector('.ham_menu').classList.remove('on');
}

// 햄버거 메뉴 외부 클릭 시 메뉴 닫기
function handleOutsideClick(event) {
    const hamMenu = document.querySelector('.ham_menu');
    const hamBtn = document.querySelector('.ham_btn');

    // 메뉴가 열려있고, 클릭한 곳이 햄버거 메뉴나 버튼이 아닌 경우
    if (hamMenu.classList.contains('on') && !hamMenu.contains(event.target) && !hamBtn.contains(event.target)) {
        closeHamburgerMenu();
    }
}

// 햄버거 메뉴 딤 클릭 시 닫기
function handleHamburgerOverlayClick() {
    closeHamburgerMenu();
}

// 스크롤 시 탑 버튼 노출
function handleTopButtonDisplay() {
    const topBtn = document.querySelector('.top_btn');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
}

// 탑 버튼 클릭 시 페이지 상단으로 스크롤
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드럽게 스크롤
    });
}

// 스크롤 탑 버튼 정지(stop) 클래스 추가
function handleTopButtonStop() {
    const sct = window.scrollY,
        viewportHeight = window.innerHeight,
        scrollBtnWrap = document.querySelector('.top_btn'),
        container = document.querySelector('main'),
        containerBtm = sct + viewportHeight,
        contHeight = container.offsetHeight;

    if (containerBtm >= contHeight) {
        scrollBtnWrap.classList.add('stop');
    } else {
        scrollBtnWrap.classList.remove('stop');
    }
}

// 모달 딤 클릭 시 닫기
function handleModalDimClick(event) {
    const modal = document.getElementById('subscribeModal');

    if (event.target === modal) {
        closeModal();
    }
}

// 이메일 유효성 검사 및 모달 열기
function handleSubscribeFormSubmit(event) {
    event.preventDefault(); // 폼 제출 막기

    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        alert('이메일을 입력해주세요!');
    } else if (!emailPattern.test(email)) {
        alert('유효하지 않은 이메일 형식입니다!');
    } else {
        openModal();
    }
}

// 모달 열기
function openModal() {
    document.getElementById('subscribeModal').style.display = 'flex';
}

// 모달 닫기
function closeModal() {
    document.getElementById('subscribeModal').style.display = 'none';
}

// 모달 확인 버튼 클릭 시 모달 닫기 및 폼 제출
function handleModalOkButtonClick() {
    closeModal();
    document.getElementById('subscribeForm').submit();
}

// 이벤트 리스너 등록
function initEventListeners() {
    window.addEventListener('scroll', handleHeaderFixed);
    window.addEventListener('scroll', handleTopButtonDisplay);
    window.addEventListener('scroll', handleTopButtonStop);

    document.querySelector('.ham_btn').addEventListener('click', openHamburgerMenu);
    document.querySelector('.ham_close_btn').addEventListener('click', closeHamburgerMenu);
    document.addEventListener('click', handleOutsideClick);

    const hamOverlay = document.querySelector('.ham_dim');
    if (hamOverlay) {
        hamOverlay.addEventListener('click', handleHamburgerOverlayClick);
    }

    const topBtn = document.querySelector('.top_btn');
    if (topBtn) {
        topBtn.addEventListener('click', scrollToTop);
    }

    window.addEventListener('click', handleModalDimClick);

    document.getElementById('subscribeForm').addEventListener('submit', handleSubscribeFormSubmit);
    document.getElementById('modalOkBtn').addEventListener('click', handleModalOkButtonClick);
}

// 초기화
function init() {
    initEventListeners();
}

// 페이지 로드 시 초기화 실행
document.addEventListener('DOMContentLoaded', init);
