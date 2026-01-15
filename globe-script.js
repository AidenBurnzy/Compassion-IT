// ========================================
// INTERACTIVE 3D GLOBE WITH TIMELINE
// ========================================

let scene, camera, renderer, globe;
let rotationX = 0, rotationY = 0;
let targetRotationX = 0, targetRotationY = 0;
let velocityX = 0, velocityY = 0;
let isDragging = false;
let lastX = 0, lastY = 0;
let isFirstInteraction = true;

// Configuration
const CONFIG = {
    globeSize: 100,
    rotationDamping: 0.95,
    easing: 0.1,
    rotationConstraint: 60,
    colorScheme: {
        core: 0x8b1a1a,      // Dark red
        wireframe: 0xdc143c,   // Crimson
        glow: 0xff6b6b        // Light coral
    }
};

function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) {
        console.warn('Globe canvas not found');
        return;
    }

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    
    // Camera
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    camera.position.z = 280;

    // Renderer with performance optimizations
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: window.devicePixelRatio <= 1.5, // Disable on high-DPI for performance
        alpha: true,
        precision: 'mediump', // Use medium precision for better performance
        powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap at 1.5x for performance
    renderer.shadowMap.enabled = false; // Disable shadows for better performance

    // Create globe
    createGlobe();

    // Lights
    createLighting();

    // Event listeners
    setupEventListeners();

    // Start animation loop
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createGlobe() {
    // Remove existing globe
    if (globe) {
        scene.remove(globe);
    }

    // Create sphere geometry with reduced detail for better performance
    const geometry = new THREE.IcosahedronGeometry(CONFIG.globeSize, 16);
    
    // Create material with gradient effect
    const material = new THREE.MeshPhongMaterial({
        color: CONFIG.colorScheme.core,
        emissive: 0x4a0a0a,
        shininess: 100,
        wireframe: false
    });

    globe = new THREE.Mesh(geometry, material);
    // Disabled shadows for better performance
    globe.castShadow = false;
    globe.receiveShadow = false;
    
    // Add wireframe overlay with reduced complexity
    const wireframeGeometry = new THREE.IcosahedronGeometry(CONFIG.globeSize * 1.02, 16);
    const wireframeMaterial = new THREE.LineSegments(
        new THREE.EdgesGeometry(wireframeGeometry),
        new THREE.LineBasicMaterial({
            color: CONFIG.colorScheme.wireframe,
            linewidth: 1,
            fog: false
        })
    );
    
    globe.add(wireframeMaterial);
    scene.add(globe);
}

function createLighting() {
    // Remove existing lights
    scene.children = scene.children.filter(child => !(child instanceof THREE.Light));

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Point lights with glow effect
    const pointLight1 = new THREE.PointLight(CONFIG.colorScheme.glow, 1, 500);
    pointLight1.position.set(200, 150, 200);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(CONFIG.colorScheme.wireframe, 0.8, 400);
    pointLight2.position.set(-200, -150, 150);
    scene.add(pointLight2);

    // Directional light for depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(100, 200, 150);
    // Disabled shadows for better performance
    directionalLight.castShadow = false;
    scene.add(directionalLight);
}

function setupEventListeners() {
    const canvas = document.getElementById('globe-canvas');
    const container = document.querySelector('.timeline-container');
    
    if (!canvas || !container) return;

    // Mouse events
    canvas.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Touch events - non-passive only on canvas, passive on document for scrolling
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });

    // Arrow buttons
    document.querySelectorAll('.carousel-arrow').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const angle = index === 0 ? -15 : 15;
            targetRotationY += angle;
            hideHintOnFirstInteraction();
        });
    });

    // Keyboard controls
    document.addEventListener('keydown', onKeyDown);
}

function onMouseDown(e) {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    document.querySelector('.timeline-container').classList.add('grabbing');
    hideHintOnFirstInteraction();
}

function onMouseMove(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;

    velocityX = deltaX * 0.5;
    velocityY = deltaY * 0.5;

    targetRotationY += velocityX;
    targetRotationX += velocityY;

    lastX = e.clientX;
    lastY = e.clientY;

    constrainRotation();
}

function onMouseUp() {
    isDragging = false;
    document.querySelector('.timeline-container').classList.remove('grabbing');
}

function onTouchStart(e) {
    if (e.touches.length === 1) {
        isDragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        hideHintOnFirstInteraction();
    }
}

function onTouchMove(e) {
    if (!isDragging || e.touches.length !== 1) return;
    // Don't prevent default to allow scrolling outside interactive area
    
    const deltaX = e.touches[0].clientX - lastX;
    const deltaY = e.touches[0].clientY - lastY;

    velocityX = deltaX * 0.5;
    velocityY = deltaY * 0.5;

    targetRotationY += velocityX;
    targetRotationX += velocityY;

    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;

    constrainRotation();
}

function onTouchEnd() {
    isDragging = false;
}

function onKeyDown(e) {
    const step = 5;
    switch(e.key) {
        case 'ArrowLeft':
            targetRotationY -= step;
            hideHintOnFirstInteraction();
            break;
        case 'ArrowRight':
            targetRotationY += step;
            hideHintOnFirstInteraction();
            break;
        case 'ArrowUp':
            targetRotationX -= step;
            hideHintOnFirstInteraction();
            break;
        case 'ArrowDown':
            targetRotationX += step;
            hideHintOnFirstInteraction();
            break;
    }
    constrainRotation();
}

function constrainRotation() {
    if (targetRotationX > CONFIG.rotationConstraint) {
        targetRotationX = CONFIG.rotationConstraint;
        velocityY = 0;
    }
    if (targetRotationX < -CONFIG.rotationConstraint) {
        targetRotationX = -CONFIG.rotationConstraint;
        velocityY = 0;
    }
}

function hideHintOnFirstInteraction() {
    if (isFirstInteraction) {
        const hint = document.querySelector('.carousel-hint');
        if (hint) {
            hint.classList.add('hidden');
        }
        isFirstInteraction = false;
    }
}

function onWindowResize() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function updateGlobeRotation() {
    // Apply easing
    rotationX += (targetRotationX - rotationX) * CONFIG.easing;
    rotationY += (targetRotationY - rotationY) * CONFIG.easing;

    // Apply damping
    if (!isDragging) {
        velocityX *= CONFIG.rotationDamping;
        velocityY *= CONFIG.rotationDamping;

        targetRotationX += velocityX;
        targetRotationY += velocityY;

        constrainRotation();
    }

    // Update globe rotation
    if (globe) {
        globe.rotation.order = 'YXZ';
        globe.rotation.y = THREE.MathUtils.degToRad(rotationY);
        globe.rotation.x = THREE.MathUtils.degToRad(rotationX);
    }

    const container = document.querySelector('.timeline-container');
    if (container) {
        container.style.setProperty('--rotation-y', `${rotationY}deg`);
        container.style.setProperty('--rotation-x', `${rotationX}deg`);
    }

    // Update timeline items counter-rotation
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        const angle = (360 / items.length) * index;
        
        // Calculate if item is visible (front facing)
        const adjustedRotationY = ((rotationY % 360) + 360) % 360;
        const itemAngle = (angle + 90 - adjustedRotationY + 180) % 360;
        const normalizedAngle = itemAngle > 180 ? itemAngle - 360 : itemAngle;
        
        // Hide items on back side
        const isBackSide = normalizedAngle > 90 || normalizedAngle < -90;
        item.style.opacity = isBackSide ? '0' : '1';
        item.style.pointerEvents = isBackSide ? 'none' : 'auto';

        // Counter-rotate to face viewer
        const counterRotateY = -rotationY;
        const counterRotateX = -rotationX;
        item.style.setProperty('--counter-rotate-y', `${counterRotateY}deg`);
        item.style.setProperty('--counter-rotate-x', `${counterRotateX}deg`);
    });
}

// Performance optimization: Track frame timing
let lastFrameTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

function animate(currentTime) {
    requestAnimationFrame(animate);

    // Throttle to target FPS
    const elapsed = currentTime - lastFrameTime;
    if (elapsed < frameInterval) {
        return;
    }
    lastFrameTime = currentTime - (elapsed % frameInterval);

    updateGlobeRotation();

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
} else {
    initGlobe();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (renderer) {
        renderer.dispose();
    }
    if (scene) {
        scene.clear();
    }
});
