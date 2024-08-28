
/* **************************************** *
 * INIT
 * **************************************** */

function init() {
    initEventListeners(); // 이벤트 리스너 초기화
}

/* **************************************** *
 * ON LOAD
 * **************************************** */

document.addEventListener('DOMContentLoaded', init);

/* **************************************** *
 * Default Functions
 * **************************************** */

function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

function toggleClass(element, condition, className) {
    condition ? addClass(element, className) : removeClass(element, className);
}

/* **************************************** *
 * Other Functions
 * **************************************** */

// 헤더 고정 처리
function handleHeaderFixed() {
    const header = document.querySelector('header');
    toggleClass(header, window.scrollY > 0, 'fixed');
}

// 햄버거 메뉴 열기/닫기
function toggleHamburgerMenu(open) {
    const menu = document.querySelector('.ham_menu');
    toggleClass(menu, open, 'on');
}

// 햄버거 메뉴 바깥 클릭 시 닫기
function handleOutsideClick(event) {
    const hamMenu = document.querySelector('.ham_menu');
    const hamBtn = document.querySelector('.ham_btn');

    // 메뉴가 열려있고, 클릭한 곳이 햄버거 메뉴나 버튼이 아닌 경우
    if (hamMenu.classList.contains('on') && !hamMenu.contains(event.target) && !hamBtn.contains(event.target)) {
        toggleHamburgerMenu(false);
    }
}

// 햄버거 오버레이 클릭 시 닫기
function handleHamburgerOverlayClick() {
    toggleHamburgerMenu(false);
}

// 상단 이동 버튼 표시 및 스크롤 처리
function handleTopButtonDisplay() {
    const topBtn = document.querySelector('.top_btn');
    toggleClass(topBtn, window.scrollY > 0, 'show');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const container = document.querySelector('main');
const contHeight = container.offsetHeight;

function handleTopButtonStop() {
    const sct = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollBtnWrap = document.querySelector('.top_btn');
    const containerBtm = sct + viewportHeight;

    toggleClass(scrollBtnWrap, containerBtm >= contHeight, 'stop');
}

// 모달 처리
function handleModalDimClick(event) {
    if (event.target === document.getElementById('subscribeModal')) {
        closeModal();
    }
}

function openModal() {
    addClass(document.getElementById('subscribeModal'), 'open');
}

function closeModal() {
    removeClass(document.getElementById('subscribeModal'), 'open');
    document.getElementById('email').value = '';
}

function handleModalOkButtonClick() {
    document.getElementById('subscribeForm').submit();
    closeModal();
}

// 이메일 유효성 검사 및 폼 제출
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

/* **************************************** *
 * Helper
 * **************************************** */

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

