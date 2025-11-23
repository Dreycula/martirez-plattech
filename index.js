import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

// --- USER DATA ---
const userData = {
    name: "Jan Lloyd Aldrey Martirez",
    role: "Student/Crypto Enthusiast",
    affiliation: "BSIT SM 4102",
    bounty: 10, 
    quote: "People’s dreams have no end!",
    character: "Marshall D. Teach"
};

// --- IMAGES ---
const userImg = "/aldrey.jpeg";
const charImg = "/blackbeards.jpg";

app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Void: ${userData.name}</title>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@1,400;1,700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --c-void: #05010a;        /* Blackest Purple */
            --c-purple: #4b0082;      /* Indigo */
            --c-magenta: #800080;     /* Deep Magenta */
            --c-gold: #ffd700;        /* Pirate Gold */
            --c-text: #e0d0e0;        /* Off-white */
            --c-dark-glass: rgba(10, 5, 20, 0.85);
            --c-border: rgba(128, 0, 128, 0.3);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background-color: var(--c-void);
            color: var(--c-text);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow-x: hidden; /* Prevent horizontal scroll */
            background-image: radial-gradient(circle at 50% 50%, #1a0520 0%, #000000 100%);
            padding: 20px 0; /* Padding for mobile scrolling */
        }

        /* --- BACKGROUND --- */
        #webgl-canvas {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 0; opacity: 0.6; pointer-events: none;
        }

        /* --- MAIN CARD --- */
        .emperor-card {
            position: relative;
            width: 90%; /* Fluid width */
            max-width: 1200px;
            min-height: 650px;
            z-index: 10;
            
            background: var(--c-dark-glass);
            backdrop-filter: blur(50px);
            -webkit-backdrop-filter: blur(50px);
            
            border: 1px solid var(--c-border);
            box-shadow: 
                0 0 80px -20px rgba(0,0,0,1),
                0 0 30px rgba(75, 0, 130, 0.2);
            
            display: grid;
            grid-template-columns: 1fr 1fr; /* Default Split */
            overflow: hidden;
            border-radius: 4px;
        }

        /* Golden Frame Accent */
        .emperor-card::after {
            content: '';
            position: absolute;
            top: 20px; left: 20px; right: 20px; bottom: 20px;
            border: 1px solid rgba(255, 215, 0, 0.1);
            pointer-events: none;
            z-index: 20;
        }

        /* --- LEFT SIDE: INFO --- */
        .info-section {
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-right: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
            min-height: 600px; /* Ensure height on desktop */
        }

        .zehahaha-bg {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) rotate(-10deg);
            font-family: 'Cinzel', serif;
            font-size: 8rem;
            font-weight: 900;
            color: rgba(0,0,0,0.4);
            white-space: nowrap;
            pointer-events: none;
            z-index: 0;
            letter-spacing: 10px;
        }

        .content-wrapper { position: relative; z-index: 5; }

        .rank-badge {
            display: inline-block;
            font-family: 'Cinzel', serif;
            font-size: 0.8rem;
            letter-spacing: 4px;
            color: var(--c-gold);
            border: 1px solid var(--c-gold);
            padding: 8px 16px;
            margin-bottom: 30px;
            text-transform: uppercase;
        }

        .name-block h1 {
            font-family: 'Cinzel', serif;
            font-size: clamp(2rem, 4vw, 4rem); /* Responsive Font */
            line-height: 1.1;
            color: #fff;
            margin-bottom: 10px;
            background: linear-gradient(to right, #fff, #d4af37);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .name-block h2 {
            font-family: 'Inter', sans-serif;
            font-size: 1.1rem;
            color: var(--c-magenta);
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: 600;
        }

        /* Avatar styling */
        .avatar-box {
            margin: 40px 0;
            width: 120px; height: 120px;
            border-radius: 50%;
            padding: 4px;
            background: linear-gradient(135deg, var(--c-purple), var(--c-void));
            box-shadow: 0 0 30px rgba(75, 0, 130, 0.5);
        }
        .avatar-img {
            width: 100%; height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #000;
            filter: grayscale(0.3) contrast(1.2);
        }

        /* Stats */
        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 30px;
        }

        .stat-item { display: flex; flex-direction: column; }
        .stat-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #888;
            margin-bottom: 5px;
        }
        .stat-val {
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
            color: #fff;
            word-wrap: break-word; /* Prevent overflow */
        }
        
        .bounty-val {
            font-family: 'Cinzel', serif;
            font-size: 2.5rem;
            color: var(--c-gold);
            font-weight: 700;
            text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
        }

        /* --- RIGHT SIDE: VISUAL --- */
        .visual-section {
            position: relative;
            background: #000;
            overflow: hidden;
            display: flex;
            align-items: flex-end;
            min-height: 600px;
        }

        .blackbeard-bg {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            object-fit: cover;
            opacity: 0.7;
            transition: transform 10s ease;
            filter: grayscale(40%) sepia(20%) contrast(1.2);
        }
        
        .gradient-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to top, #05010a 10%, transparent 60%);
            z-index: 1;
        }

        .quote-block {
            position: relative;
            z-index: 10;
            padding: 60px;
            width: 100%;
            text-align: right;
        }

        .quote-text {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.5rem, 3vw, 2.2rem);
            color: #fff;
            line-height: 1.3;
            font-style: italic;
            margin-bottom: 20px;
            text-shadow: 0 4px 10px #000;
        }

        .quote-author {
            font-family: 'Cinzel', serif;
            color: var(--c-gold);
            font-size: 0.9rem;
            letter-spacing: 3px;
            text-transform: uppercase;
        }

        /* --- MEDIA QUERIES --- */
        
        /* Tablet Portrait & Mobile (Stack Vertical) */
        @media (max-width: 1024px) {
            .emperor-card {
                grid-template-columns: 1fr; /* Single Column */
                min-height: auto;
                height: auto;
                margin: 20px 0;
            }

            .info-section { 
                order: 1; /* Info First */
                padding: 50px 40px; 
                border-right: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                min-height: auto;
                text-align: center;
            }

            .visual-section { 
                order: 2; /* Visual Second */
                height: 400px; 
                min-height: 400px;
            }
            
            /* Center Align Elements */
            .content-wrapper { display: flex; flex-direction: column; align-items: center; }
            .stats-grid { width: 100%; justify-items: center; }
            .avatar-box { margin: 30px auto; }
            
            .zehahaha-bg { 
                font-size: 5rem; 
                opacity: 0.3; /* Fade out more on mobile to read text */
            }
            
            .quote-block { padding: 40px; text-align: center; }
        }

        /* Small Mobile */
        @media (max-width: 600px) {
            .info-section { padding: 40px 20px; }
            .stats-grid { grid-template-columns: 1fr; gap: 20px; } /* Stack stats */
            .visual-section { height: 300px; min-height: 300px; }
            
            .zehahaha-bg { display: none; } /* Hide heavy background text on small screens */
            .name-block h1 { font-size: 2rem; }
            .quote-text { font-size: 1.2rem; }
            .emperor-card::after { display: none; } /* Remove border decoration on small screens */
        }
    </style>
</head>
<body>

    <canvas id="webgl-canvas"></canvas>

    <div class="emperor-card">
        
        <div class="info-section">
            <div class="zehahaha-bg">ZEHAHAHA</div>
            
            <div class="content-wrapper">
                <div class="rank-badge">Yonko</div>
                
                <div class="avatar-box">
                    <img src="${userImg}" class="avatar-img" alt="User Profile">
                </div>

                <div class="name-block">
                    <h1>${userData.name}</h1>
                    <h2>${userData.role}</h2>
                </div>

                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Affiliation</span>
                        <span class="stat-val">${userData.affiliation}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Bounty</span>
                        <span class="bounty-val">฿ ${userData.bounty}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="visual-section">
            <img src="${charImg}" class="blackbeard-bg" alt="Marshall D. Teach">
            <div class="gradient-overlay"></div>
            
            <div class="quote-block">
                <p class="quote-text">"${userData.quote}"</p>
                <div class="quote-author">― ${userData.character}</div>
            </div>
        </div>

    </div>

    <script>
        // --- 1. ENTRANCE ANIMATIONS (GSAP) ---
        const tl = gsap.timeline();

        // Responsive handling for animations
        const isMobile = window.innerWidth <= 1024;

        tl.from(".emperor-card", { 
            y: 50, 
            opacity: 0, 
            duration: 1.5, 
            ease: "power3.out" 
        })
        .from(".rank-badge", { opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? -20 : 0, duration: 0.8 }, "-=1")
        .from(".avatar-box", { scale: 0, rotation: -180, duration: 1, ease: "back.out(1.7)" }, "-=0.8")
        .from(".name-block h1", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".stats-grid", { opacity: 0, duration: 1 }, "-=0.5")
        .from(".quote-text", { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 30 : 0, duration: 1 }, "-=0.8");

        if(!isMobile) {
            tl.from(".zehahaha-bg", { opacity: 0, scale: 2, duration: 2, ease: "power4.out" }, "-=2");
        }

        // Subtle Zoom on Background Image
        gsap.to(".blackbeard-bg", {
            scale: 1.1,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // --- 2. THREE.JS BACKGROUND ---
        const canvas = document.getElementById('webgl-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 5;

        // Dark Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15; 
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x4b0082,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending 
        });
        
        const voidMaterial = new THREE.PointsMaterial({
            size: 0.08,
            color: 0x000000,
            transparent: true,
            opacity: 0.4
        });

        const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        const voidMesh = new THREE.Points(particlesGeometry, voidMaterial);
        
        scene.add(particleMesh);
        scene.add(voidMesh);

        let mouseX = 0;
        let mouseY = 0;
        
        // Only track mouse on desktop to save resources
        if (window.matchMedia("(pointer: fine)").matches) {
            document.addEventListener('mousemove', (event) => {
                mouseX = event.clientX / window.innerWidth - 0.5;
                mouseY = event.clientY / window.innerHeight - 0.5;
            });
        }

        const clock = new THREE.Clock();

        function animate() {
            const elapsedTime = clock.getElapsedTime();

            particleMesh.rotation.y = elapsedTime * 0.1;
            particleMesh.rotation.z = elapsedTime * 0.05;
            
            voidMesh.rotation.y = elapsedTime * 0.08;
            voidMesh.rotation.x = elapsedTime * 0.02;

            particleMesh.rotation.x += 0.05 * (mouseY - particleMesh.rotation.x);
            particleMesh.rotation.y += 0.05 * (mouseX - particleMesh.rotation.y);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>
  `;
  
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`🏴‍☠️ The Void is opening on port ${PORT}`);
});