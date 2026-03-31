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
        // Последний блок — уезжает вверх сам, без следующего
        tl.to([contentLeft, subtitle, btn], { x: "-100vw", ease: "none" });
        tl.to(
          image,
          { y: () => -window.innerHeight - image.offsetHeight, ease: "none" },
          "<"
        );
      }
    });

    // Финальный белый экран
    tl.to(section, { backgroundColor: "#ffffff", ease: "none" });
  });

  // ----------------- МОБИЛКА -----------------
  mm.add("(max-width: 575px)", () => {
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

        // старт следующего блока снизу
        gsap.set([nextContentLeft, nextSubtitle, nextBtn], { y: "100vh" });
        gsap.set(nextImage, {
          y: () => window.innerHeight + nextImage.offsetHeight,
        });

        // текущий блок уходит вверх
        tl.to([contentLeft, subtitle, btn], { y: "-148vh", ease: "none" });
        tl.to(
          image,
          { y: () => -window.innerHeight - image.offsetHeight, ease: "none" },
          "<"
        );

        // следующий появляется снизу
        tl.to(
          [nextContentLeft, nextSubtitle, nextBtn],
          { y: 0, ease: "none" },
          "-=0.3"
        );
        tl.to(nextImage, { y: 0, ease: "none" }, "<");

        // фон
        tl.to(
          section,
          { backgroundColor: nextBlock.dataset.color, ease: "none" },
          "<"
        );
      } else {
        // Последний блок — уезжает вверх сам
        tl.to([contentLeft, subtitle, btn], { y: "-148vh", ease: "none" });
        tl.to(
          image,
          { y: () => -window.innerHeight - image.offsetHeight, ease: "none" },
          "<"
        );
      }
    });

    // Финальный белый экран
    tl.to(section, { backgroundColor: "#ffffff", ease: "none" });
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
    $("html, body").animate({ scrollTop: targetPosition }, 500);
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

  // $(".faq__item").click(function () {
  //     $(this).siblings().removeClass("active");
  //     $(this).siblings().find(".faq__item-content").slideUp();

  //     $(this).toggleClass("active");
  //     $(this).find(".faq__item-content").slideToggle();
  // });

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
    $(".tabs__btn").on("click", function () {
      const $btn = $(this);

      // 👉 если уже активный — выходим
      if ($btn.hasClass("active")) return;

      const tab = $btn.data("tab");

      // кнопки
      $(".tabs__btn").removeClass("active");
      $btn.addClass("active");

      // контент
      const $current = $(".tabs__pane.active");
      const $next = $(`.tabs__pane[data-tab="${tab}"]`);

      $current.stop(true, true).fadeOut(200, function () {
        $current.removeClass("active");

        $next.fadeIn(200).addClass("active");
      });
    });
  });

  // -------------------------------------------------------------------------------------СЛАЙДЕР--------------------------------------------------------------------------
  $(function () {
    const $container = $(".cards-container");
    const $cards = $(".card");
    const $progress = $(".progress");

    let isDown = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    const speed = 1.3; // чувствительность

    function getSizes() {
      const cardWidth = $cards.outerWidth(true); // учитываем margin
      const gap = parseFloat(getComputedStyle($container[0]).gap) || 0;
      const step = cardWidth + gap;

      const visible = $(".cards-wrapper").outerWidth();
      const totalWidth = step * $cards.length;

      const maxTranslate = Math.max(totalWidth - visible, 0); // если карточек мало

      return { step, maxTranslate, visible, totalWidth };
    }

    function update() {
      const { maxTranslate, visible, totalWidth } = getSizes();

      // ограничиваем слайдер
      currentTranslate = Math.max(-maxTranslate, Math.min(0, currentTranslate));
      $container.css("transform", `translateX(${currentTranslate}px)`);

      // прогресс = сколько уже видимо + смещение
      let basePercent = (visible / totalWidth) * 100;
      let movedPercent = maxTranslate
        ? (Math.abs(currentTranslate) / maxTranslate) * (100 - basePercent)
        : 0;
      let percent = basePercent + movedPercent;

      $progress.css("width", percent + "%");
    }

    // стартовый прогресс
    update();

    // НАЖАЛ
    $(".cards-wrapper").on("mousedown touchstart", function (e) {
      isDown = true;
      startX = e.pageX || e.originalEvent.touches[0].pageX;
      prevTranslate = currentTranslate;
    });

    // ДВИГАЕМ
    $(document).on("mousemove touchmove", function (e) {
      if (!isDown) return;
      if (e.type === "mousemove" && e.buttons !== 1) return;

      const x = e.pageX || e.originalEvent.touches[0].pageX;
      const diff = (x - startX) * speed;

      currentTranslate = prevTranslate + diff;

      update();
    });

    // ОТПУСТИЛ
    $(document).on("mouseup touchend", function () {
      isDown = false;
    });

    // ресайз фикс
    $(window).on("resize", update);
  });

  // ---------------------------------------------------------------------------СЛАЙДЕР ПОБЕДИТЕЛЕЙ-----------------------------------------------------------------
  $(function () {
    function initWinnersSlider() {
      if (window.innerWidth > 575) return;

      const $wrapper = $(".winners__box");
      const $container = $(".winners__container");
      const $cards = $(".winners__item");
      const $progress = $(".winners__progress-inner");

      let isDown = false;
      let startX = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;

      const speed = 1.2;

      function getSizes() {
        const visible = $wrapper.outerWidth();

        // реальная ширина всего контента
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

        let basePercent = (visible / totalWidth) * 100;
        let movedPercent = maxTranslate
          ? (Math.abs(currentTranslate) / maxTranslate) * (100 - basePercent)
          : 0;

        $progress.css("width", basePercent + movedPercent + "%");
      }

      update();

      $wrapper.on("mousedown touchstart", function (e) {
        isDown = true;
        startX = e.pageX || e.originalEvent.touches[0].pageX;
        prevTranslate = currentTranslate;
      });

      $(document).on("mousemove touchmove", function (e) {
        if (!isDown) return;
        if (e.type === "mousemove" && e.buttons !== 1) return;

        const x = e.pageX || e.originalEvent.touches[0].pageX;
        const diff = (x - startX) * speed;

        currentTranslate = prevTranslate + diff;
        update();
      });

      $(document).on("mouseup touchend", function () {
        isDown = false;
      });

      $(window).on("resize", update);
    }

    initWinnersSlider();
  });
});
