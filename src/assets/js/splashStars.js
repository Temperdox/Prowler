export default function initializeStarCanvas() {
    const requestAnimationFrame = window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

    const BACKGROUND_MIN_WIDTH = 1920;
    let width, height, background, bgCtx;
    const entities = [];

    function setupCanvasSize() {
        background = document.getElementById("starCanvas");
        if (!background || !(background instanceof HTMLCanvasElement)) {
            console.error("Canvas element with id 'starCanvas' not found or is not a canvas element.");
            return;
        }

        bgCtx = background.getContext("2d");
        if (!bgCtx) {
            console.error("Failed to get 2D context. The canvas might not be supported or might be in a cross-origin environment.");
            return;
        }

        width = Math.max(document.body.offsetWidth, BACKGROUND_MIN_WIDTH);
        height = window.innerHeight;
        background.width = width;
        background.height = height;
    }

    function setupEntities() {
        entities.length = 0;
        for (let i = 0; i < height; i++) {
            entities.push(new Star({
                x: Math.random() * width,
                y: Math.random() * height
            }));
        }
        entities.push(new ShootingStar());
        entities.push(new ShootingStar());
    }

    class Star {
        constructor(options) {
            this.reset(options);
        }

        reset(options = {}) {
            this.size = Math.random() * 2;
            this.x = options.x || Math.random() * width;
            this.y = options.y || Math.random() * height;
            this.setInitialSpeed();
        }

        setInitialSpeed() {
            this.speed = Math.random() * 0.05;
        }

        update() {
            this.x -= this.speed;
            if (this.x < 0) {
                this.reset();
            } else {
                bgCtx.fillRect(this.x, this.y, this.size, this.size);
            }
        }
    }

    class ShootingStar {
        constructor() {
            this.reset();
        }

        reset() {
            this.size = Math.random() + 0.1;
            this.speed = Math.random() * 10 + 6;
            this.len = Math.random() * 80 + 10;
            this.x = Math.random() * width;
            this.y = 0;
            this.waitTime = Date.now() + Math.random() * 3000 + 500;
            this.active = false;
        }

        update() {
            if (this.active) {
                this.x -= this.speed;
                this.y += this.speed;
                if (this.x < 0 || this.y >= height) {
                    this.reset();
                } else {
                    bgCtx.lineWidth = this.size;
                    bgCtx.beginPath();
                    bgCtx.moveTo(this.x, this.y);
                    bgCtx.lineTo(this.x + this.len, this.y - this.len);
                    bgCtx.stroke();
                }
            } else if (this.waitTime < Date.now()) {
                this.active = true;
            }
        }
    }

    function onResize() {
        console.log("resize");
        setupCanvasSize();
        setupEntities();
        animate();  // Restart the animation loop on resize
    }

    function animate() {
        if (bgCtx !== null) {
            bgCtx.clearRect(0, 0, width, height);
            bgCtx.fillStyle = 'rgba(17,14,25,0)';
            bgCtx.fillRect(0, 0, width, height);
            bgCtx.fillStyle = '#ffffff';
            bgCtx.strokeStyle = '#ffffff';
        }

        for (let entity of entities) {
            entity.update();
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('popstate', onResize);

    setupCanvasSize();
    setupEntities();
    animate();
}