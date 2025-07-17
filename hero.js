document.addEventListener('DOMContentLoaded', function () {
  const hero = document.getElementById("hero");

  const images = [
    'pop01.png',
    'pop02.png',
    'pop04.png',
    'pop05.png',
    'pop06.png',
    'pop07.png',
    'pop08.png',
    'pop09.png'
  ];

  let isMouseDown = false;

  function createFloatingImage(x, y, duration) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    const img = document.createElement("img");
    img.src = randomImage;
    img.style.position = "absolute";
    img.style.maxWidth = "65px";
    img.style.pointerEvents = "none";
    img.style.zIndex = 9999;
    img.style.transform = "translate(-50%, -50%)";
    img.style.animation = "miniBounce 0.4s ease forwards";

    // Coordenadas relativas al hero
    const offsetX = x - hero.getBoundingClientRect().left;
    const offsetY = y - hero.getBoundingClientRect().top;
    img.style.left = offsetX + "px";
    img.style.top = offsetY + "px";

    hero.appendChild(img);

    setTimeout(() => {
      img.remove();
    }, duration);
  }

  // Bloquear arrastre de TODAS las imágenes dentro de #hero
  const allImages = hero.querySelectorAll("img");
  allImages.forEach(img => {
    img.setAttribute("draggable", "false");
    img.addEventListener("dragstart", e => e.preventDefault());
    img.addEventListener("mousedown", e => e.preventDefault());
  });

  // Click simple: imagen visible por 250 ms
  hero.addEventListener("click", function (e) {
    createFloatingImage(e.clientX, e.clientY, 250);
  });

  hero.addEventListener("mousedown", function () {
    isMouseDown = true;
  });

  hero.addEventListener("mouseup", function () {
    isMouseDown = false;
  });

  hero.addEventListener("mouseleave", function () {
    isMouseDown = false;
  });

  // Estela: imágenes visibles por 150 ms
  hero.addEventListener("mousemove", function (e) {
    if (isMouseDown) {
      createFloatingImage(e.clientX, e.clientY, 150);
    }
  });
});

  