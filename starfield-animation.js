

(function() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    
    
    const baseSpeed = 0.07;
    const starCount = 2000; 
    let stars = [];

    class Star {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * width;
            
            this.size = 0.2 + Math.random() * 1.5;
            this.speed = baseSpeed + Math.random() * 0.12;
            
            const colors = ['#ffffff', '#f8fafc', '#e2e8f0', '#94a3b8', '#818cf8'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            
            this.twinkleFactor = 0.01 + Math.random() * 0.05;
            this.twinkleOffset = Math.random() * Math.PI * 2;
        }

        update() {
            this.z -= this.speed * 20;
            
            if (this.z <= 0) {
                this.init();
                this.z = width;
            }

            this.px = (this.x - width / 2) * (width / this.z) + width / 2;
            this.py = (this.y - height / 2) * (width / this.z) + height / 2;
        }

        draw() {
            const distanceOpacity = 1 - (this.z / width);
            
            const twinkle = Math.sin(Date.now() * this.twinkleFactor + this.twinkleOffset) * 0.4 + 0.6;
            
            ctx.globalAlpha = distanceOpacity * twinkle;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            
            const r = this.size * (1 - this.z / width) * 2.5;
            ctx.arc(this.px, this.py, r, 0, Math.PI * 2);
            ctx.fill();
            
            
            if (this.z < width * 0.2) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
            } else {
                ctx.shadowBlur = 0;
            }
        }
    }

    function resize() {
        const parent = canvas.parentElement;
        width = canvas.width = parent.offsetWidth;
        height = canvas.height = parent.offsetHeight;
        
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        ctx.globalAlpha = 1;
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
})();
