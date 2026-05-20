const images = gsap.utils.toArray(".item");

const imageSize = images.length;
const total = images.length;
let degree = 360 / total;

if (window.innerWidth < 1024) {
  degree = 180 / total;
}

// Функція для ініціалізації анімації
const init = () => {
  const timeline = gsap.timeline();

  images.forEach((image, index) => {
    const sign = Math.floor((index / 2) % 2) ? 1 : -1;
    const value = Math.floor((index + 4) / 4) * 4;
    const rotation = index > imageSize - 3 ? 0 : sign * value;
    console.log(rotation);

    gsap.set(image, {
      rotation: rotation,
      scale: 0.5,
    });

    timeline.from(
      image,
      {
        x: () =>
          index % 2
            ? window.innerWidth + image.clientWidth * 4
            : -window.innerWidth - image.clientWidth * 4,
        y: () => window.innerHeight - image.clientHeight,
        rotation: index % 2 ? 200 : -200,
        scale: 4,
        opacity: 1,
        ease: "power4.out",
        duration: 1,
        delay: 0.15 * Math.floor(index / 2),
      },
      0
    );

    let rotationAngle = index * degree;
    timeline.to(
      image,
      {
        scale: 1,
        duration: 0,
      },
      0.15 * (imageSize / 2 - 1) + 1
    );

    timeline.to(
      image,
      {
        transformOrigin: "center 200vh",
        rotation:
          index > imageSize / 2 ? -degree * (imageSize - index) : rotationAngle,
        duration: 1,
        ease: "power1.out",
      },
      0.15 * (imageSize / 2 - 1) + 1
    );
  });
};

// Перевірка, чи секція в області видимості
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
};

// Функція для обробки скролу
const onScroll = () => {
  const section = document.querySelector(".why-section");

  if (section && isInViewport(section)) {
    init(); // Запускаємо анімацію, коли секція стає видимою
    window.removeEventListener("scroll", onScroll); // Прибираємо слухач, щоб анімація запустилась лише один раз
  }
};

// Додаємо слухач скролу
window.addEventListener("scroll", onScroll);

// Перевіряємо, чи секція вже видима при завантаженні сторінки
onScroll();

// Драґгуюча функція
const draggable = () => {
  let start = 0;
  Draggable.create(".items", {
    type: "rotation",

    onDragStart: function () {
      start = this.rotation;
    },
    onDragEnd: function () {
      const rotation = this.rotation;
      const offset = Math.abs(rotation - start);

      if (window.innerWidth < 1024) {
        // Логіка для мобільних пристроїв (прокрутка тільки на 1 слайд)
        const snappedRotation = Math.round(rotation / degree) * degree;
        gsap.to(".items", {
          rotation: snappedRotation, // Прив'язка до найближчого кута
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // Логіка для пристроїв із шириною >= 1024px
        if (rotation > start) {
          if (rotation - start < degree / 2) {
            gsap.to(".items", {
              rotation: `-=${offset}`,
            });
          } else {
            gsap.to(".items", {
              rotation: `+=${2 * degree - offset}`,
            });
          }
        } else {
          if (Math.abs(rotation - start) < degree / 2) {
            gsap.to(".items", {
              rotation: `+=${offset}`,
            });
          } else {
            gsap.to(".items", {
              rotation: `-=${2 * degree - offset}`,
            });
          }
        }
      }
    },
  });
};

// Запускаємо драґ
draggable();
