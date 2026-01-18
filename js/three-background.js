// Three.js Background Animation

const initThreeBackground = () => {
    // Create Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        alpha: true, // Transparent background
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add canvas to body
    const canvas = renderer.domElement;
    canvas.id = 'three-background';
    document.body.prepend(canvas);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        // Spread particles across a wide area
        posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const material = new THREE.PointsMaterial({
        size: 0.015,
        color: 0x9A33FF, // Using the purple from the site's palette
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const animateParticles = (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    };

    document.addEventListener('mousemove', animateParticles);

    // Animation Loop
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Constant gentle rotation
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        // Interactive movement based on mouse
        // We smooth it out a bit by adding a fraction of the mouse position
        particlesMesh.rotation.y += mouseX * 0.00008;
        particlesMesh.rotation.x += mouseY * 0.00008;

        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };

    tick();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', initThreeBackground);
