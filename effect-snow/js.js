const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const snows = () => {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height, // Để tạo hiệu ứng tuyết rơi từ mọi vị trí
    size: Math.random() * 5 + 1,
    speedX: Math.random() * 3 - 1.5, // Tạo chuyển động ngang
    speedY: Math.random() * 3 + 1, // Tốc độ rơi của tuyết

    update: function () {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 1) this.size -= 0.1; // Tuyết tan khi rơi xuống
      if (this.y > canvas.height) {
        this.x = Math.random() * canvas.width;
        this.y = 0; // Tuyết bắt đầu rơi lại từ trên cùng
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 + 1;
      }
    },
    draw: function () {
      ctx.fillStyle = "white"; // Màu tuyết
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    },
  };
};

const init = () => {
  for (let i = 0; i < 100; i++) {
    // Tạo nhiều hạt tuyết hơn
    particlesArray.push(snows());
  }
};

const handleParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
};

init();
animate();
