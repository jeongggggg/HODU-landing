// 유틸리티 함수
function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

function toggleClass(element, condition, className) {
    condition ? addClass(element, className) : removeClass(element, className);
}

// 헤더 스크롤
function handleHeaderFixed() {
    const header = document.querySelector('header');
    toggleClass(header, window.scrollY > 0, 'fixed');
}

// 햄버거 메뉴
function toggleHamburgerMenu(open) {
    const menu = document.querySelector('.ham_menu');
    toggleClass(menu, open, 'on');
}

function handleOutsideClick(event) {
    const hamMenu = document.querySelector('.ham_menu');
    const hamBtn = document.querySelector('.ham_btn');

    // 메뉴가 열려있고 클릭한 곳이 햄버거 메뉴나 버튼이 아닌 경우
    if (hamMenu.classList.contains('on') && !hamMenu.contains(event.target) && !hamBtn.contains(event.target)) {
        toggleHamburgerMenu(false);
    }
}

function handleHamburgerOverlayClick() {
    toggleHamburgerMenu(false);
}

// 스크롤 버튼
function handleTopButtonDisplay() {
    const topBtn = document.querySelector('.top_btn');
    toggleClass(topBtn, window.scrollY > 0, 'show');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleTopButtonStop() {
    const sct = window.scrollY;
    const viewportHeight = window.innerHeight;
    const container = document.querySelector('main');
    const scrollBtnWrap = document.querySelector('.top_btn');

    const containerBtm = sct + viewportHeight;
    const contHeight = container.offsetHeight;

    // 스크롤 버튼이 멈춰야 하는 조건
    toggleClass(scrollBtnWrap, containerBtm >= contHeight, 'stop');
}

// 모달 처리
function handleModalDimClick(event) {
    if (event.target === document.getElementById('subscribeModal')) {
        closeModal();
    }
}

function handleSubscribeFormSubmit(event) {
    event.preventDefault();

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

function openModal() {
    document.getElementById('subscribeModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('subscribeModal').style.display = 'none';
}

function handleModalOkButtonClick() {
    closeModal();
    document.getElementById('subscribeForm').submit();
}

// 이벤트 리스너 초기화
function initEventListeners() {
    window.addEventListener('scroll', () => {
        handleHeaderFixed();
        handleTopButtonDisplay();
        handleTopButtonStop();
    });

    const hamBtn = document.querySelector('.ham_btn');
    if (hamBtn) hamBtn.addEventListener('click', () => toggleHamburgerMenu(true));

    const hamCloseBtn = document.querySelector('.ham_close_btn');
    if (hamCloseBtn) hamCloseBtn.addEventListener('click', () => toggleHamburgerMenu(false));

    document.addEventListener('click', handleOutsideClick);

    const hamOverlay = document.querySelector('.ham_dim');
    if (hamOverlay) hamOverlay.addEventListener('click', handleHamburgerOverlayClick);

    const topBtn = document.querySelector('.top_btn');
    if (topBtn) topBtn.addEventListener('click', scrollToTop);

    window.addEventListener('click', handleModalDimClick);

    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) subscribeForm.addEventListener('submit', handleSubscribeFormSubmit);

    const modalOkBtn = document.getElementById('modalOkBtn');
    if (modalOkBtn) modalOkBtn.addEventListener('click', handleModalOkButtonClick);
}

// 초기화
function init() {
    initEventListeners();
}

// 페이지 로드 시 초기화 실행
document.addEventListener('DOMContentLoaded', init);
