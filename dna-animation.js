

(function() {
    const canvas = document.getElementById('dna-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    
    const dotRadius = 2;
    const dotSpacing = 35; 
    
    const helices = [
        { xPercent: 0.5,  width: 100, speed: 0.5, rotation: 0.02, opacity: 0.6 }, 
        { xPercent: 0.15, width: 60,  speed: 0.3, rotation: 0.015, opacity: 0.3 }, 
        { xPercent: 0.85, width: 60,  speed: 0.4, rotation: 0.025, opacity: 0.3 }  
    ];
    
    let dots = [];
    let angles = [0, 0, 0];

    function resize() {
        const parent = canvas.parentElement;
        width = canvas.width = parent.offsetWidth;
        height = canvas.height = parent.offsetHeight;
        
        dots = [];
        const numDots = Math.floor(height / dotSpacing) + 2;
        for (let i = 0; i < numDots; i++) {
            dots.push({
                y: i * dotSpacing,
                phase: (i * 0.25) 
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        helices.forEach((helix, hIndex) => {
            angles[hIndex] += helix.rotation;
            const centerX = width * helix.xPercent;

            dots.forEach((dot) => {
                let currentY = (dot.y - (angles[0] * helix.speed * 50)) % (height + dotSpacing * 2);
                if (currentY < -dotSpacing) currentY += (height + dotSpacing * 2);

                const xOffset = Math.sin(angles[hIndex] + dot.phase) * helix.width;
                
                const x1 = centerX + xOffset;
                const x2 = centerX - xOffset;

                const z = Math.cos(angles[hIndex] + dot.phase);
                const size = dotRadius * (1 + z * 0.4);
                const alpha = (0.2 + (z + 1) * 0.4) * helix.opacity;

                const color1 = `rgba(99, 102, 241, ${alpha})`; 
                const color2 = `rgba(14, 165, 233, ${alpha})`; 

                if (z > 0) {
                    ctx.beginPath();
                    ctx.moveTo(x1, currentY);
                    ctx.lineTo(x2, currentY);
                    ctx.strokeStyle = `rgba(226, 232, 240, ${alpha * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(x1, currentY, size, 0, Math.PI * 2);
                ctx.fillStyle = color1;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x2, currentY, size, 0, Math.PI * 2);
                ctx.fillStyle = color2;
                ctx.fill();
            });
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
})();
