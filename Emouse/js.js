const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx);
const particlesArray = [];
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const mouse = { x: null, y: null };
// canvas.addEventListener("click", (event) => {
//   mouse.x = event.x;
//   mouse.y = event.y;
//   init();
// });
canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  // init();
  // particlesArray.push(snows());
});
const snows = () => {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 15 + 1,
    speedX: Math.random() * 3 - 1.5,
    speedY: Math.random() * 3 - 1,

    update: function () {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y >= canvas.height) {
        this.y = canvas.height;
        this.speedY= -1
      }
      if (this.y <= 0) {
        this.y = 0;
        this.speedY= 1
      }
      if (this.x >= canvas.width) {
        this.speedX= -1
      }
      if (this.x <= 0) {
        this.speedX= 1
      }
    },
    draw: function () {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    },
  };
};

const init = () => {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(snows());
  }
};

const handleParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for(let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x
      const dy = particlesArray[i].y - particlesArray[j].y
      const mx = particlesArray[i].x - mouse.x
      const my = particlesArray[i].y - mouse.y
      const distance = Math.sqrt(dx * dx + dy * dy);
      const distanceMouse = Math.sqrt(mx * mx + my * my);
      if(distance < 200) {
        ctx.beginPath()
        ctx.linewidth =2
        ctx.strokeStyle ="white"
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.stroke()
      }
      if(distanceMouse < 200) {
        ctx.beginPath()
        ctx.linewidth =2
        ctx.strokeStyle ="white"
        ctx.moveTo(mouse.x, mouse.y)
        ctx.lineTo(particlesArray[i].x, particlesArray[i].y)
        ctx.stroke()
      }
    }
    if (particlesArray[i].size <= 3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
};
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.02";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
};
init();
animate();
