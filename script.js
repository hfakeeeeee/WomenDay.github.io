(function() {
    // Create and append the canvas for hearts
    const canvas = document.createElement('canvas');
    canvas.id = 'animationCanvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let hearts = [];
    const maxHearts = 100;

    // Resize the canvas to fill the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Create a heart object with random properties
    function createHeart() {
        const heart = {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 1 + 0.5,
            angle: Math.random() * Math.PI * 2,
            alpha: Math.random() * 0.5 + 0.5,
            color: `hsl(${Math.random() * 60 + 330}, 100%, 75%)`
        };
        hearts.push(heart);
    }

    // Draw a heart shape at given coordinates
    function drawHeart(heart) {
        ctx.save();
        ctx.translate(heart.x, heart.y);
        ctx.rotate(heart.angle);
        ctx.scale(heart.size, heart.size);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.bezierCurveTo(-5, -15, -15, -15, -15, -5);
        ctx.bezierCurveTo(-15, 5, 0, 15, 0, 20);
        ctx.bezierCurveTo(0, 15, 15, 5, 15, -5);
        ctx.bezierCurveTo(15, -15, 5, -15, 0, -5);
        ctx.closePath();
        ctx.fillStyle = heart.color;
        ctx.globalAlpha = heart.alpha;
        ctx.fill();
        ctx.restore();
    }

    // Animate the hearts
    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach((heart, index) => {
            heart.y -= heart.speed;
            heart.angle += 0.01;

            if (heart.y < -20) {
                hearts.splice(index, 1);
            }

            drawHeart(heart);
        });

        while (hearts.length < maxHearts) {
            createHeart();
        }

        requestAnimationFrame(animateHearts);
    }

    // Initialize the animation
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateHearts();

    // Gift box interaction
    const giftBox = document.getElementById('giftBox');
    const message = document.getElementById('message');
    const fireworksButton = document.getElementById('fireworksButton');
    let isOpened = false;

    giftBox.addEventListener('click', () => {
        if (!isOpened) {
            giftBox.querySelector('.lid').style.transform = 'rotateX(-90deg)';
            setTimeout(() => {
                message.classList.remove('hidden');
                fireworksButton.classList.remove('hidden');
            }, 1000);
            isOpened = true;
        }
    });

    // Fireworks animation
    const fireworksCanvas = document.createElement('canvas');
    fireworksCanvas.id = 'fireworksCanvas';
    document.body.appendChild(fireworksCanvas);
    const fCtx = fireworksCanvas.getContext('2d');
    let fireworks = [];

    function resizeFireworksCanvas() {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeFireworksCanvas);
    resizeFireworksCanvas();

    function createFirework() {
        const firework = {
            x: Math.random() * fireworksCanvas.width,
            y: fireworksCanvas.height,
            height: Math.random() * fireworksCanvas.height / 2,
            speed: Math.random() * 3 + 2,
            particles: [],
            exploded: false
        };
        fireworks.push(firework);
    }

    function animateFireworks() {
        fCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        fireworks.forEach((firework, index) => {
            if (!firework.exploded) {
                firework.y -= firework.speed;
                fCtx.beginPath();
                fCtx.arc(firework.x, firework.y, 2, 0, Math.PI * 2);
                fCtx.fillStyle = 'white';
                fCtx.fill();

                if (firework.y <= firework.height) {
                    firework.exploded = true;
                    for (let i = 0; i < 50; i++) {
                        firework.particles.push({
                            x: firework.x,
                            y: firework.y,
                            angle: Math.random() * Math.PI * 2,
                            speed: Math.random() * 3 + 2,
                            alpha: 1
                        });
                    }
                }
            } else {
                firework.particles.forEach((particle, pIndex) => {
                    particle.x += Math.cos(particle.angle) * particle.speed;
                    particle.y += Math.sin(particle.angle) * particle.speed;
                    particle.alpha -= 0.02;

                    fCtx.beginPath();
                    fCtx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                    fCtx.fillStyle = `rgba(255, ${Math.random() * 255}, 0, ${particle.alpha})`;
                    fCtx.fill();

                    if (particle.alpha <= 0) {
                        firework.particles.splice(pIndex, 1);
                    }
                });

                if (firework.particles.length === 0) {
                    fireworks.splice(index, 1);
                }
            }
        });

        requestAnimationFrame(animateFireworks);
    }

    fireworksButton.addEventListener('click', () => {
        createFirework();
        animateFireworks();
    });

    // Balloon interaction
    let balloons = [];
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 90 + '%';
        balloon.style.bottom = '-100px';
        balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
        document.body.appendChild(balloon);
        balloons.push(balloon);
    }

    balloons.forEach(balloon => {
        balloon.addEventListener('click', () => {
            balloon.style.transition = 'all 1s ease-out';
            balloon.style.transform = 'translateY(-100vh) scale(0.5)';
            balloon.style.opacity = 0;
            setTimeout(() => {
                balloon.remove();
            }, 1000);
        });
    });

})();
