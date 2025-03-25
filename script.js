document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const toggleBtn = document.getElementById("darkModeToggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggleBtn.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");

  function revealElements() {
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealElements);
  revealElements();

  // Smooth scroll for logo click
  document.querySelector(".logo").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#hero").scrollIntoView({ behavior: "smooth" });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Cursor paint trail
  const canvas = document.getElementById("cursorCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 5 + 2;
    this.color = `rgba(${154}, ${106}, 255, 0.7)`;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.life = 100;
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  };

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.update();
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    });
    requestAnimationFrame(drawParticles);
  }

  document.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  drawParticles();
});
const words = ["UI/UX Designer", "Ad Strategist", "Sales Driver"];
let i = 0;
let j = 0;
let currentWord = '';
let isDeleting = false;
const speed = 120;

function type() {
  currentWord = words[i];
  let displayText = isDeleting 
    ? currentWord.substring(0, j--) 
    : currentWord.substring(0, j++);

  document.querySelector('.typing-text').textContent = displayText;

  if (!isDeleting && j === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
}

document.addEventListener('DOMContentLoaded', type);
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const bgText = document.querySelector('.background-text');
  bgText.style.transform = `translateY(${scrollY * 0.4}px)`;  // adjust 0.4 for stronger/weaker parallax
});
window.addEventListener('DOMContentLoaded', () => {
  const coffeeCount = document.getElementById('coffee-count');
  if (coffeeCount) {
      const randomCoffeeCount = Math.floor(Math.random() * 5) + 1;  
      coffeeCount.innerText = randomCoffeeCount;
  }
});
let textPosition = 5; 
function moveText(direction) {
  const textElement = document.getElementById('infoBackgroundText');
  if (direction === 'up' && textPosition > 0) {
    textPosition -= 5;
  } else if (direction === 'down' && textPosition < 50) {
    textPosition += 5;
  }
  textElement.style.top = `${textPosition}px`;
}
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      
      if (target) { // ✅ Check if target exists
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
      }
  });
});
