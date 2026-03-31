$(document).ready(() => {
  // setTimeout(() => {
  //     AOS.init({ acnhorPlacement: "center-center", once: true, duration: 700 });
  // }, 200);

  // if ($(window).width() < 575) {
  // }

  // ----------------------------------------------GSAP ANIMATION-----------------------------------------
  gsap.registerPlugin(ScrollTrigger);

  if ($(window).width() > 575) {
    const image = document.querySelector(".intro-section__box-img");
    const premium = document.querySelector(".premium-section");

    // Точные координаты для перемещения картинки
    const premiumTop = premium.getBoundingClientRect().top + window.scrollY;
    const imageTop = image.getBoundingClientRect().top + window.scrollY;

    // смещение, чтобы картинка была чуть ниже и правее
    const offsetX = premium.offsetWidth * 0.03; // 10% вправо
    const offsetY = premium.offsetHeight * 0.17; // 5% вниз

    const targetY = premiumTop - imageTop + offsetY;

    gsap.to(".intro-section__box-text.left", {
      x: -300,
      opacity: 0,
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".intro-section__box-text.right", {
      x: 300,
      opacity: 0,
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".intro-section__box-title.left", {
      x: 300,
      opacity: 0,
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".intro-section__box-title.right", {
      x: -300,
      opacity: 0,
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".intro-section__box-img", {
      x: offsetX,
      y: targetY,
      scale: 1.55,
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // ---------------------------------------------------НОМИНАЦИИ-----------------------------------------------

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".nomination-section");
  const blocks = section.querySelectorAll(".nomination-section__box-item");

  // общие начальные состояния
  gsap.set(section, { backgroundColor: blocks[0].dataset.color });
  gsap.set(blocks, {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  });

  let mm = gsap.matchMedia();

  // ----------------- ДЕСКТОП -----------------
  // ----------------- ДЕСКТОП -----------------
  mm.add("(min-width: 576px)", () => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + (blocks.length + 1) * window.innerHeight,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    blocks.forEach((block, i) => {
      const contentLeft = block.querySelector(".nomination__content-left");
      const image = block.querySelector(".nomination__image");
      const subtitle = block.querySelector(".nomination__subtitle");
      const btn = block.querySelector(".nomination__btn");

      const nextBlock = blocks[i + 1];

      if (nextBlock) {
        const nextContentLeft = nextBlock.querySelector(
          ".nomination__content-left"
        );
        const nextImage = nextBlock.querySelector(".nomination__image");
        const nextSubtitle = nextBlock.querySelector(".nomination__subtitle");
        const nextBtn = nextBlock.querySelector(".nomination__btn");

        gsap.set(nextContentLeft, { x: "100vw" });
        gsap.set(nextImage, {
          y: () => window.innerHeight + nextImage.offsetHeight,
        });
        gsap.set(nextSubtitle, { x: "100vw" });
        gsap.set(nextBtn, { x: "100vw" });

        tl.to([contentLeft, subtitle, btn], { x: "-100vw", ease: "none" });
        tl.to(
          image,
          { y: () => -window.innerHeight - image.offsetHeight, ease: "none" },
          "<"
        );
        tl.to(
          [nextContentLeft, nextSubtitle, nextBtn],
          { x: 0, ease: "none" },
          "-=0.3"
        );
        tl.to(nextImage, { y: 0, ease: "none" }, "<");
        tl.to(
          section,
          { backgroundColor: nextBlock.dataset.color, ease: "none" },
          "<"
        );
      } else {
        // последний блок — уезжает вверх
        tl.to([contentLeft, subtitle, btn], { x: "-100vw", ease: "none" });
        tl.to(
          image,
          { y: () => -window.innerHeight - image.offsetHeight, ease: "none" },
          "<"
        );

        // финальный быстрый переход к белому
        tl.to(section, {
          backgroundColor: "#ffffff",
          duration: 0.1,
          ease: "power1.in",
        });
      }
    });
  });

  // ----------------- МОБИЛКА -----------------
  mm.add("(max-width: 575px)", () => {
    // сбрасываем абсолютные позиции
    gsap.set(blocks, { position: "relative", width: "100%", height: "auto" });
    blocks.forEach((block) => {
      const contentLeft = block.querySelector(".nomination__content-left");
      const image = block.querySelector(".nomination__image");
      const subtitle = block.querySelector(".nomination__subtitle");
      const btn = block.querySelector(".nomination__btn");

      gsap.set([contentLeft, subtitle, btn, image], { x: 0, y: 0 });
    });

    // анимация только цвета фона при скролле
    blocks.forEach((block, i) => {
      const nextBlock = blocks[i + 1];
      if (nextBlock) {
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onEnter: () =>
            gsap.to(section, {
              backgroundColor: nextBlock.dataset.color,
              duration: 0.5,
            }),
          onEnterBack: () =>
            gsap.to(section, {
              backgroundColor: block.dataset.color,
              duration: 0.5,
            }),
        });
      }
    });

    // стартовый цвет
    gsap.to(section, { backgroundColor: blocks[0].dataset.color, duration: 0 });
  });

  // ---------------------------------------------------------ЭТАПЫ И СРОКИ--------------------------------------------------
  if ($(window).width() > 575) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".steps__title", {
      scale: 0.3, // насколько уменьшать (подбери)
      ease: "none",
      scrollTrigger: {
        trigger: ".steps__title",
        start: "top center", // когда верх блока доходит до центра экрана
        end: "bottom top", // пока блок не выйдет вверх
        scrub: true, // привязка к скроллу (плавно)
      },
    });
  }

  // -----------------------------------------------ПАРТНЕРЫ И ОРГАНИЗАТОРЫ-----------------------------------
  gsap.registerPlugin(ScrollTrigger);

  $(function () {
    if (window.innerWidth < 575) return;

    const section = document.querySelector(".partners-section");

    const boxes = document.querySelectorAll(".partners__box");

    const box1 = boxes[0];
    const box2 = boxes[1];
    const box3 = boxes[2];

    const items1 = box1.querySelectorAll(".partners__wrap-item");
    const items2 = box2.querySelectorAll(".partners__wrap-item");
    const items3 = box3.querySelectorAll(".partners__wrap-item");

    const title1 = box1.querySelector(".partners__box-title");
    const title2 = box2.querySelector(".partners__box-title");
    const title3 = box3.querySelector(".partners__box-title");

    // 👉 начальные состояния
    gsap.set([box2, box3], {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
    });

    gsap.set(items2, { y: 200, opacity: 0 });
    gsap.set(items3, { y: 200, opacity: 0 });

    gsap.set(title2, { x: 200, opacity: 0 });
    gsap.set(title3, { x: 200, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%", // 👈 увеличили под 2 перехода
        scrub: true,
        pin: true,
      },
    });

    // =====================
    // 🔥 1 → 2
    // =====================

    tl.to(items1, {
      y: (i) => -150 - i * 80,
      opacity: 0,
      stagger: 0.15,
      ease: "power3.out",
    });

    tl.to(title1, { x: "-50%", opacity: 0 }, "<");

    tl.to(title2, { x: "0%", opacity: 1 }, "-=0.3");

    tl.to(
      items2,
      {
        y: (i) => -i * 60,
        opacity: 1,
        stagger: 0.15,
        ease: "power3.out",
      },
      "<"
    );

    // =====================
    // 🔥 2 → 3
    // =====================

    tl.to(items2, {
      y: (i) => -150 - i * 80,
      opacity: 0,
      stagger: 0.15,
      ease: "power3.out",
    });

    tl.to(title2, { x: "-50%", opacity: 0 }, "<");

    tl.to(title3, { x: "0%", opacity: 1 }, "-=0.3");

    tl.to(
      items3,
      {
        y: (i) => -i * 60,
        opacity: 1,
        stagger: 0.15,
      },
      "<"
    );
  });
  // ----------------------------------------------GSAP ANIMATION-----------------------------------------
  // Модальные окна
  var overlay = $(".overlay"),
    modal = $(".modal"),
    modalClose = $(".modal__close"),
    modalOpen = $(".modal__open[data-modal]");

  // Обработчик клика по overlay и закрытие модального окна
  $(document).on("click", ".modal__close", function () {
    $("body, html").removeClass("my-body-noscroll-class");
    overlay.fadeOut();
    modal.fadeOut();
  });

  $(document).on("click", ".overlay", function (e) {
    if ($(e.target).closest(".modal").length === 0) {
      $("body, html").removeClass("my-body-noscroll-class");
      overlay.fadeOut();
      modal.fadeOut();
    }
  });

  // Открытие модальных окон
  modalOpen.each(function () {
    $(this).on("click", function (e) {
      var modalId = $(this).data("modal"),
        EachModal = $('.modal[data-modal="' + modalId + '"]');
      $("body, html").addClass("my-body-noscroll-class");
      $("#mobile__menu").removeClass("active");
      modal.fadeOut();
      overlay.fadeIn();
      EachModal.fadeIn();
    });
  });

  /** * Replace all SVG images with inline SVG */
  $("img.img-svg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        $img.replaceWith($svg);
      },
      "xml"
    );
  });

  // Мобильное меню
  $(".mobile__menu-open, .mobile__menu-close").on("click", function () {
    $("#mobile__menu").toggleClass("active");
    $("body, html").toggleClass(
      "my-body-noscroll-class",
      $("#mobile__menu").hasClass("active")
    );
  });

  // Плавная прокрутка при клике на якорь
  $('a[href^="#"]').click(function () {
    $("#mobile__menu").removeClass("active");
    $("body, html").removeClass("my-body-noscroll-class");
    let target = $(this).attr("href");
    let targetPosition = $(target).offset().top - 30;
    $("html, body").animate({ scrollTop: targetPosition }, 2000);
    return false;
  });

  // Маска для ввода телефона
  // $('input[type="tel"]').inputmask('+7 (999) 999-99-99');

  // E-mail Ajax Send
  $("form").submit(function (event) {
    event.preventDefault();
    var th = $(this);
    var submitButton = th.find("button[type=submit]");

    submitButton.prop("disabled", true); // Блокируем кнопку
    setTimeout(() => {
      submitButton.prop("disabled", false); // Разблокируем после 2 секунд
    }, 2000);

    let nameInputLength = th.find('input[name="Имя"]').val().length;
    if (nameInputLength > 15) {
      alert("Слишком много букв в имени");
    } else {
      $.ajax({
        type: "POST",
        url: "/telegram.php",
        data: th.serialize(),
      }).done(function () {
        // Выполнить действия после успешной отправки
      });
    }
  });

  // Закомментированный слайдер
  // $(".report__slider").slick({
  //     infinite: true,
  //     slidesToShow: 2,
  //     arrows: true,
  //     prevArrow: ".report__arrow.left",
  //     nextArrow: ".report__arrow.right",
  //     dots: false,
  //     responsive: [
  //         {
  //             breakpoint: 575,
  //             settings: {
  //                 slidesToShow: 1,
  //             },
  //         },
  //     ],
  // });

  $(".faq__item").click(function () {
    $(this).siblings().removeClass("active");
    $(this).siblings().find(".faq__item-content").slideUp();

    $(this).toggleClass("active");
    $(this).find(".faq__item-content").slideToggle();
  });

  // Табы - вкладки
  // $(".repairs__button").on("click", function () {
  //     $(this).addClass("active").siblings().removeClass("active");
  //     $(".repairs__tab").removeClass("active").eq($(this).index()).addClass("active");
  // });

  // Таймер
  // var deadline = new Date('2024-11-01T23:59:00+03:00');
  // let timerId = null;
  // function declensionNum(num, words) {
  //   return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  // }
  // function countdownTimer() {
  //   const diff = deadline - new Date();
  //   if (diff <= 0) {
  //     clearInterval(timerId);
  //   }
  //   var days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
  //   var hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
  //   var minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
  //   var seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
  //   days = days < 10 ? '0' + days : days;
  //   hours = hours < 10 ? '0' + hours : hours;
  //   minutes = minutes < 10 ? '0' + minutes : minutes;
  //   seconds = seconds < 10 ? '0' + seconds : seconds;
  //   if(days !== 0) {
  //     hours = hours + (days * 24);
  //   } else {
  //     hours = hours < 10 ? '0' + hours : hours;
  //   }
  //   var timerValue = hours + ' : ' + minutes + ' : ' + seconds;
  //   $('.day .value').html(days);
  //   $('.hours .value').html(hours);
  //   $('.minutes .value').html(minutes);
  //   $('.seconds .value').html(seconds);
  // }
  // countdownTimer();
  // timerId = setInterval(countdownTimer, 1000);

  // function isInViewport($el) {
  //     const rect = $el[0].getBoundingClientRect();
  //     return (
  //         rect.top < window.innerHeight &&
  //         rect.bottom > 0
  //     );
  // }
  // const $button = $('.t-btn.fixed');
  // const $sections = $('.intro-section');
  // function checkVisibility() {
  //     let shouldHide = false;
  //     $sections.each(function () {
  //         if (isInViewport($(this))) {
  //             shouldHide = true;
  //             return false; // break
  //         }
  //     });
  //     $button.toggleClass('hide', shouldHide);
  // }
  // checkVisibility(); // РїСЂРё Р·Р°РіСЂСѓР·РєРµ
  // $(window).on('scroll resize', checkVisibility);

  // -------------------------------------------------------------------------------------ТАБЫ--------------------------------------------------------------------
  $(function () {
    $(".tabs").each(function () {
      const $tabs = $(this);

      $tabs.find(".tabs__btn").on("click", function () {
        const $btn = $(this);

        // если уже активный — ничего не делаем
        if ($btn.hasClass("active")) return;

        const tab = $btn.data("tab");

        const $current = $tabs.find(".tabs__pane.active");
        const $next = $tabs.find(`.tabs__pane[data-tab="${tab}"]`);

        // переключаем кнопки ТОЛЬКО внутри блока
        $tabs.find(".tabs__btn").removeClass("active");
        $btn.addClass("active");

        // переключаем контент ТОЛЬКО внутри блока
        $current.stop(true, true).fadeOut(200, function () {
          $current.removeClass("active");
          $next.fadeIn(200, function () {
            $next.addClass("active");
            $next.find(".tabs__wrapper").trigger("horizontalSlider:tabVisible");
          });
        });
      });
    });
  });

  // -------------------------------------------------------------------------------------СЛАЙДЕРЫ (горизонтальная прокрутка)--------------------------------------------------------------------------
  $(function () {
    const wheelRegistrations = [];
    let wheelListenerBound = false;

    function onDocumentWheel(e) {
      for (let i = 0; i < wheelRegistrations.length; i++) {
        const reg = wheelRegistrations[i];
        if (reg.mobileOnly && window.innerWidth > 575) continue;

        const rect = reg.getWrapperRect();
        if (rect.top > 1 || rect.bottom < 72) continue;

        const sizes = reg.getSizes();
        if (sizes.maxTranslate <= 0) continue;

        const t = reg.getTranslate();
        const atStart = t >= -0.5;
        const atEnd = t <= -sizes.maxTranslate + 0.5;

        if (e.deltaY > 0 && atEnd) continue;
        if (e.deltaY < 0 && atStart) continue;

        if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
          e.preventDefault();
          reg.setTranslate(
            Math.max(-sizes.maxTranslate, Math.min(0, t - e.deltaY * 0.72))
          );
          reg.update();
          return;
        }
      }
    }

    function bindDocumentWheel() {
      if (wheelListenerBound) return;
      wheelListenerBound = true;
      document.addEventListener("wheel", onDocumentWheel, { passive: false });
    }

    function initHorizontalSlider(options) {
      const {
        $wrapper,
        $container,
        $progressInner,
        $progressTrack,
        speed = 1.2,
        wheelLock = false,
        mobileOnly = false,
        getSizes: customGetSizes,
        shouldUpdateProgress = () => true,
      } = options;

      if (!$wrapper.length || !$container.length) return;

      let isDown = false;
      let startX = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;

      function getSizes() {
        if (customGetSizes) return customGetSizes();
        const visible = $wrapper.outerWidth();
        const totalWidth = $container[0].scrollWidth;
        const maxTranslate = Math.max(totalWidth - visible, 0);
        return { maxTranslate, visible, totalWidth };
      }

      function update() {
        const { maxTranslate, visible, totalWidth } = getSizes();

        currentTranslate = Math.max(
          -maxTranslate,
          Math.min(0, currentTranslate)
        );
        $container.css("transform", `translateX(${currentTranslate}px)`);

        if (
          $progressInner &&
          $progressInner.length &&
          shouldUpdateProgress() &&
          totalWidth > 0
        ) {
          const basePercent = (visible / totalWidth) * 100;
          const movedPercent = maxTranslate
            ? (Math.abs(currentTranslate) / maxTranslate) * (100 - basePercent)
            : 0;
          $progressInner.css("width", basePercent + movedPercent + "%");
        }
      }

      update();

      $wrapper.on("mousedown touchstart", function (e) {
        isDown = true;
        startX = e.pageX || e.originalEvent.touches[0].pageX;
        prevTranslate = currentTranslate;
      });

      $(document).on(
        "mousemove.horizontalSlider touchmove.horizontalSlider",
        function (e) {
          if (!isDown) return;
          if (e.type === "mousemove" && e.buttons !== 1) return;

          const x = e.pageX || e.originalEvent.touches[0].pageX;
          const diff = (x - startX) * speed;

          currentTranslate = prevTranslate + diff;

          update();
        }
      );

      $(document).on(
        "mouseup.horizontalSlider touchend.horizontalSlider",
        function () {
          isDown = false;
        }
      );

      $(window).on("resize", update);

      if ($progressTrack && $progressTrack.length) {
        $progressTrack.on("click", function (e) {
          if (!shouldUpdateProgress()) return;
          const sizes = getSizes();
          if (sizes.maxTranslate <= 0) return;
          const rect = $progressTrack[0].getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          const clamped = Math.max(0, Math.min(1, ratio));
          currentTranslate = -clamped * sizes.maxTranslate;
          update();
        });
      }

      $wrapper.on("horizontalSlider:tabVisible", function () {
        update();
      });

      if (wheelLock) {
        bindDocumentWheel();
        wheelRegistrations.push({
          getWrapperRect: () => $wrapper[0].getBoundingClientRect(),
          getSizes,
          getTranslate: () => currentTranslate,
          setTranslate: (v) => {
            currentTranslate = v;
          },
          update,
          mobileOnly,
        });
      }
    }

    const $groupWrap = $(".group-section .cards-wrapper");
    const $groupCont = $groupWrap.find(".cards-container");
    const $groupCards = $groupCont.find(".card");

    if ($groupWrap.length && $groupCont.length && $groupCards.length) {
      initHorizontalSlider({
        $wrapper: $groupWrap,
        $container: $groupCont,
        $progressInner: $groupWrap.find(".progress"),
        $progressTrack: $groupWrap.find(".progress-bar"),
        speed: 1.3,
        wheelLock: true,
        getSizes: () => {
          const cardWidth = $groupCards.outerWidth(true);
          const gap = parseFloat(getComputedStyle($groupCont[0]).gap) || 0;
          const step = cardWidth + gap;
          const visible = $groupWrap.outerWidth();
          const totalWidth = step * $groupCards.length;
          const maxTranslate = Math.max(totalWidth - visible, 0);
          return { maxTranslate, visible, totalWidth };
        },
      });
    }

    if (window.innerWidth <= 575) {
      $(".winners-section .winners__box").each(function () {
        const $wrapper = $(this);
        const $container = $wrapper.find(".winners__container");
        initHorizontalSlider({
          $wrapper,
          $container,
          $progressInner: $wrapper.find(".winners__progress-inner"),
          $progressTrack: $wrapper.find(".winners__progress"),
          speed: 1.2,
          wheelLock: true,
          mobileOnly: true,
        });
      });

      const $nProgIn = $(".nominees-section .tabs__progress-inner");
      const $nProgTrack = $(".nominees-section .tabs__progress");

      $(".nominees-section .tabs__pane").each(function () {
        const $pane = $(this);
        const $wrapper = $pane.find(".tabs__wrapper");
        const $container = $pane.find(".tabs__container");
        initHorizontalSlider({
          $wrapper,
          $container,
          $progressInner: $nProgIn,
          $progressTrack: $nProgTrack,
          speed: 1.2,
          wheelLock: true,
          mobileOnly: true,
          shouldUpdateProgress: () => $pane.hasClass("active"),
        });
      });
    }
  });

  // -----------------------------------------------------------------ЭТАПЫ И СРОКИ-------------------------------------

  if ($(window).width() > 575) {
    $(function () {
      const $container = $(".steps__container");
      const $items = $(".steps__item");

      let containerWidth = $container.width();
      let itemsWidth = $items
        .toArray()
        .reduce((sum, el) => sum + $(el).outerWidth(true), 0);
      let maxPercent = 0;

      let targetPercent = 0;
      let currentPercent = 0;
      let isInside = false;

      function updateSizes() {
        containerWidth = $container.width();
        itemsWidth = $items
          .toArray()
          .reduce((sum, el) => sum + $(el).outerWidth(true), 0);

        // переводим в проценты относительно контейнера
        maxPercent = Math.max(
          ((itemsWidth - containerWidth) / containerWidth) * 100,
          0
        );
      }

      updateSizes();

      $(window).on("resize", updateSizes);

      $container.on("mouseenter", function () {
        isInside = true;
      });

      $container.on("mouseleave", function () {
        isInside = false;
      });

      $container.on("mousemove", function (e) {
        if (!isInside || maxPercent <= 0) return;

        let mouseX = e.pageX - $container.offset().left;
        mouseX = Math.max(0, Math.min(mouseX, containerWidth));

        let percent = mouseX / containerWidth; // 0..1
        targetPercent = -maxPercent * percent;
      });

      function animate() {
        currentPercent += (targetPercent - currentPercent) * 0.1;

        // ограничение
        currentPercent = Math.max(-maxPercent, Math.min(0, currentPercent));

        $container.css("transform", `translateX(${currentPercent}%)`);
        requestAnimationFrame(animate);
      }

      animate();
    });
  }
});
