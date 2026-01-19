const initMagicCursor = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9998'; // Below scrollbar (9999) but high
    canvas.style.pointerEvents = 'none';

    document.body.appendChild(canvas);

    const particles = [];
    const colors = ['#FF8660', '#9A33FF', '#FFFFFF']; // Orange, Purple, White

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeObserver = new ResizeObserver(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    resizeObserver.observe(document.body);

    // Initial size
    canvas.width = width;
    canvas.height = height;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2; // Random size 2-7px
            this.speedX = Math.random() * 2 - 1; // -1 to 1
            this.speedY = Math.random() * 2 - 1; // -1 to 1
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 1.0;
            this.decay = Math.random() * 0.02 + 0.01; // Random decay rate
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size *= 0.95; // Shrink
            this.life -= this.decay;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const handleMouseMove = (e) => {
        // Spawn multiple particles for dense trail
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0 || particles[i].size <= 0.5) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on page unload (optional but good practice)
    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        resizeObserver.disconnect();
        canvas.remove();
    };
};

if (window.innerWidth > 768) {
    // Only init on desktop
    document.addEventListener('DOMContentLoaded', initMagicCursor);
}
