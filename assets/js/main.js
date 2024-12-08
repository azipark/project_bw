// 모바일 스크롤 개선
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVh();
window.addEventListener('resize', setVh);
window.addEventListener('resize', setVh);

// 네비게이션
document.addEventListener("DOMContentLoaded", function() {
  const dotsElement = document.querySelector('.dots');

  if (dotsElement) {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('wrap-dots');

    dotsElement.parentNode.insertBefore(wrapperDiv, dotsElement);
    wrapperDiv.appendChild(dotsElement);
  }
});

// 이미지 애니메이션
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.wrap-img.animation');

  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('fromRight');
          observer.unobserve(entry.target);
      }
    });
  }

  const imageObserver = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  });

  images.forEach(image => {
    imageObserver.observe(image);
  });
});

// 터치 및 휠 스크롤
let currentSection = 0;
const sections = document.querySelectorAll('.section');
const totalSections = sections.length;
let isScrolling = false;
const scrollDelay = 800;
let touchStartY = 0;
let touchEndY = 0;

// 스크롤 잠금 해제
function unlockScroll() {
  isScrolling = false;
}

// 섹션으로 스크롤 이동
function scrollToSection(sectionIndex) {
  if (isScrolling || sectionIndex < 0 || sectionIndex >= totalSections) return;

  isScrolling = true;
  const offset = -sectionIndex * window.innerHeight;
  sections.forEach(section => {
    section.style.transform = `translateY(${offset}px)`;
  });
  currentSection = sectionIndex;

  setTimeout(unlockScroll, scrollDelay); // 스크롤 잠금 해제
}

// 터치 이벤트 핸들러
function handleTouchStart(e) {
  touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
  touchEndY = e.changedTouches[0].screenY;
  
  if (touchEndY < touchStartY) {
    scrollToSection(currentSection + 1);
  } else {
    scrollToSection(currentSection - 1);
  }
}

window.addEventListener('touchstart', handleTouchStart);
window.addEventListener('touchend', handleTouchEnd);

// 휠 이벤트 핸들러
function handleWheelEvent(e) {
  if (isScrolling) return;

  if (e.deltaY > 0) {
    scrollToSection(currentSection + 1);
  } else {
    scrollToSection(currentSection - 1);
  }

  setTimeout(unlockScroll, scrollDelay);
}

window.addEventListener('wheel', handleWheelEvent);

// 마지막 섹션 감지 및 IntersectionObserver 설정
const sectionObserver = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}