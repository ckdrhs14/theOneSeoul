document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".gnb-item").forEach((item) => {
    const gnbLink = item.querySelector(".gnb-link");
    const gnbDropdown = item.querySelector(".gnb-dropdown");

    if (!gnbLink || !gnbDropdown) return;

    gnbLink.addEventListener("mouseenter", () => {
      gnbDropdown.classList.add("open");
    });

    item.addEventListener("mouseleave", () => {
      gnbDropdown.classList.remove("open");
    });
  });

  const mobileMenu = document.querySelector(".mobile-menu");
  const dimmed = document.querySelector(".mobile-menu-dimmed");
  const closeBtn = document.querySelector(".close-btn");

  if (mobileMenu && dimmed) {
    document.querySelectorAll(".mobile-menu-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        dimmed.classList.toggle("open");
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        dimmed.classList.remove("open");
      });
    }

    dimmed.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      dimmed.classList.remove("open");
    });
  }



  document.querySelectorAll(".post-row").forEach((row) => {
    const postRowLink = row.querySelector("a");
    if (!postRowLink) return;

    postRowLink.addEventListener("click", (event) => {
      const target = event.target;

      if (target.closest(".post-row-actions")) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });

  if (typeof Swiper !== "undefined") {
    const footerSwiper = new Swiper(".footer-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".footer-swiper-button-next",
        prevEl: ".footer-swiper-button-prev",
      },
      loop: true,
    });
  }

  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const targetElement = document.getElementById(hash);

    if (targetElement) {
      setTimeout(() => {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});


$(function () {
  // 모바일 메뉴 드롭다운 토글
  $(".mobile-menu .menu-item").on("click", "> a", function (e) {
    e.preventDefault();
    const $menuItem = $(this).parent(".menu-item");
    const $dropdown = $menuItem.find(".menu-dropdown");

    if ($dropdown.length === 0) return;

    $(".mobile-menu .menu-item").not($menuItem).removeClass("active").find(".menu-dropdown").slideUp(400);

    $menuItem.toggleClass("active");
    $dropdown.slideToggle(400);
  });

  // 헤더 스크롤 이벤트
  const $topBanner = $(".top-banner");
  const hasTopBanner = $topBanner.length > 0;
  const topBannerHeight = hasTopBanner ? $topBanner.outerHeight() : 0;


  $(".header, .sticky-area").removeClass("scroll-down");
  if ($(window).scrollTop() === 0) {
    $(".header").removeClass("is-fixed");
  }

  let lastScrollTop = $(window).scrollTop();

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const scrollDiff = scrollTop - lastScrollTop;
    const scrollThreshold = hasTopBanner ? topBannerHeight : 0;

    if (scrollTop > 0) {
      $(".header").addClass("is-fixed");
      $(".quick-menu").addClass("active");

      if (scrollTop > scrollThreshold) {
        if (scrollDiff > 0) {
          $(".header, .sticky-area").addClass("scroll-down");
        } else if (scrollDiff < 0) {
          $(".header, .sticky-area").removeClass("scroll-down");
        }
      } else {
        $(".header, .sticky-area").removeClass("scroll-down");
      }
    } else {
      $(".header").removeClass("is-fixed");
      $(".header, .sticky-area").removeClass("scroll-down");
      $(".quick-menu").removeClass("active");
    }

    lastScrollTop = scrollTop;
  });
});


function scrollToReplyArea() {
  const replyArea = document.getElementById('reply-area');
  if (replyArea) {
    const targetPosition = replyArea.offsetTop - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

function scrollTopMove() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function shareOpen(element) {
  if (!element) return;

  // share-box 구조 (board.html)
  const shareBox = element.closest('.share-box');
  if (shareBox) {
    shareBox.classList.toggle('active');
    return;
  }

  // post-action-btn 구조 (index.html)
  if (element.classList.contains('post-action-btn')) {
    const postRowActions = element.closest('.post-row-actions');
    if (postRowActions) {
      postRowActions.classList.toggle('active');
    }
    return;
  }

  // post-action-btn 내부에서 호출된 경우
  const postActionBtn = element.closest('.post-action-btn');
  if (postActionBtn) {
    const postRowActions = postActionBtn.closest('.post-row-actions');
    if (postRowActions) {
      postRowActions.classList.toggle('active');
    }
  }
}