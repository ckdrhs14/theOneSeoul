document.addEventListener("DOMContentLoaded", () => {
  // GNB 드롭다운 토글
  document.querySelectorAll(".gnb-item").forEach((item) => {
    const gnbLink = item.querySelector(".gnb-link");
    const gnbDropdown = item.querySelector(".gnb-dropdown");

    // 드롭다운이 없는 메뉴는 이벤트를 건너뜀
    if (!gnbLink || !gnbDropdown) return;

    gnbLink.addEventListener("mouseenter", () => {
      gnbDropdown.classList.add("open");
    });

    item.addEventListener("mouseleave", () => {
      gnbDropdown.classList.remove("open");
    });
  });

  document.querySelectorAll(".mobile-menu-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".mobile-menu").classList.toggle("open");
      document.querySelector(".dimmed").classList.toggle("open");
    });
    document.querySelector(".close-btn").addEventListener("click", () => {
      document.querySelector(".mobile-menu").classList.remove("open");
      document.querySelector(".dimmed").classList.remove("open");
    });
    document.querySelector(".dimmed").addEventListener("click", () => {
      document.querySelector(".mobile-menu").classList.remove("open");
      document.querySelector(".dimmed").classList.remove("open");
    });
  });

  // 모바일 메뉴 드롭다운 토글
  document.querySelectorAll(".mobile-menu .menu-item").forEach((item) => {
    const mobileMenuLink = item.querySelector("a");
    const mobileMenuDropdown = item.querySelector(".menu-dropdown");

    // 드롭다운이 없는 메뉴는 이벤트를 건너뜀
    if (!mobileMenuLink || !mobileMenuDropdown) return;

    mobileMenuLink.addEventListener("click", (event) => {
      event.preventDefault();
      const isActive = item.classList.contains("active");

      // 다른 활성화된 메뉴 닫기
      document.querySelectorAll(".mobile-menu .menu-item").forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // 현재 메뉴 토글
      item.classList.toggle("active", !isActive);
    });
  });

  // post-row 전체 클릭 시 링크로 이동 (actions 영역은 제외)
  document.querySelectorAll(".post-row").forEach((row) => {
    const thumbLink = row.querySelector(".post-row-thumb");
    if (!thumbLink) return;

    const href = thumbLink.getAttribute("href");
    if (!href) return;

    row.addEventListener("click", (event) => {
      const target = event.target;

      // 공유/외부링크 버튼 영역 클릭은 무시
      if (target.closest(".post-row-actions")) return;
      // 이미 a 태그를 직접 클릭한 경우 기본 동작 유지
      if (target.closest("a")) return;

      window.location.href = href;
    });

    // 썸네일 a 클릭 시도 동일하게 동작 (기본 # 이동 방지)
    thumbLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = href;
    });
  });

  // Footer Swiper 초기화 (Swiper가 로드되었는지 확인)
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
});
