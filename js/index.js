// 초기화
function init() {
    initEventListeners();
}

document.addEventListener('DOMContentLoaded', init);

// 클래스 조작 함수
function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

function toggleClass(element, condition, className) {
    condition ? addClass(element, className) : removeClass(element, className);
}

// 이벤트 바인딩 함수
function bindEvent(selector, eventType, handler) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener(eventType, handler);
    }
}

// 헤더 고정 함수
function handleHeaderFixed() {
    const header = document.querySelector('header');
    toggleClass(header, window.scrollY > 0, 'fixed');
}

// 햄버거 메뉴 관련 동작
function toggleHamburgerMenu(open) {
    const menu = document.querySelector('.ham_menu');
    toggleClass(menu, open, 'on');
}

function handleOutsideClick(event) {
    const hamMenu = document.querySelector('.ham_menu');
    const hamBtn = document.querySelector('.ham_btn');

    if (hamMenu.classList.contains('on') && !hamMenu.contains(event.target) && !hamBtn.contains(event.target)) {
        toggleHamburgerMenu(false);
    }
}

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

// 상단 이동 버튼 정지 위치 처리
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
    document.body.classList.add('no-scroll');
}

function closeModal() {
    removeClass(document.getElementById('subscribeModal'), 'open');
    document.body.classList.remove('no-scroll');
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

// 이벤트 리스너 초기화
function initEventListeners() {
    window.addEventListener('scroll', () => {
        handleHeaderFixed();
        handleTopButtonDisplay();
        handleTopButtonStop();
    });

    bindEvent('.ham_btn', 'click', () => toggleHamburgerMenu(true));
    bindEvent('.ham_close_btn', 'click', () => toggleHamburgerMenu(false));
    document.addEventListener('click', handleOutsideClick);
    bindEvent('.ham_dim', 'click', () => toggleHamburgerMenu(false));

    bindEvent('.top_btn', 'click', scrollToTop);

    window.addEventListener('click', handleModalDimClick);
    bindEvent('#subscribeForm', 'submit', handleSubscribeFormSubmit);
    bindEvent('#modalOkBtn', 'click', handleModalOkButtonClick);
}

