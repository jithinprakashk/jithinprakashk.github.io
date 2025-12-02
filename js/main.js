// Typing animation
const texts = ["Data Scientist", "Analytics Manager", "Machine Learning Engineer", "Problem Solver"];
let count = 0, index = 0, currentText = "", letter = "";

(function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.querySelector(".typing").textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 2000);
  } else setTimeout(type, 100);
})();

// Particles background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.05;
  }
  draw() {
    ctx.fillStyle = 'rgba(13,110,253,0.4)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.size <= 0.3) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();
setInterval(() => particles.push(new Particle()), 150);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Animate on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'skills') {
        document.querySelectorAll('.bar div').forEach(bar => {
          bar.style.width = bar.parentElement.previousElementSibling.textContent.includes('98%') ? '98% : bar.style.width;
        });
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section').forEach(sec => observer.observe(sec));

// Dark mode
document.querySelector('.theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.querySelector('.theme-toggle i').classList.toggle('fa-moon');
  document.querySelector('.theme-toggle i').classList.toggle('fa-sun');
});

// Smooth scroll
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});
