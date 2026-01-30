import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaveBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
        let planeMesh: THREE.Mesh;
        let frameId: number;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const USER_BG_COLOR = 0x0B0E11;

        const init = () => {
            // 1. Scene setup
            scene = new THREE.Scene();
            scene.background = new THREE.Color(USER_BG_COLOR);
            scene.fog = new THREE.FogExp2(USER_BG_COLOR, 0.001);

            // 2. Camera setup
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 1000;
            camera.position.y = 400;

            // 3. Renderer setup
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            mountRef.current?.appendChild(renderer.domElement);

            // 4. Geometry setup
            const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

            // 5. Material setup
            const material = new THREE.MeshPhongMaterial({
                color: 0x3d2c63,
                emissive: 0x110d24,
                specular: 0x7b6fe6,
                shininess: 60,
                side: THREE.DoubleSide,
                flatShading: false,
            });

            // 6. Mesh setup
            planeMesh = new THREE.Mesh(geometry, material);
            planeMesh.rotation.x = -Math.PI / 2;
            scene.add(planeMesh);

            // 7. Lighting setup
            const ambientLight = new THREE.AmbientLight(0x404060, 2.0);
            scene.add(ambientLight);

            const dirLight = new THREE.DirectionalLight(0xaaccff, 1.0);
            dirLight.position.set(0, 1000, 500);
            scene.add(dirLight);

            const pointLight1 = new THREE.PointLight(0x9966ff, 1.5, 2000);
            pointLight1.position.set(500, 500, 500);
            scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0x3399ff, 1.2, 2000);
            pointLight2.position.set(-500, 500, -500);
            scene.add(pointLight2);
        };

        const onWindowResize = () => {
            if (!mountRef.current) return;
            const width = window.innerWidth;
            const height = mountRef.current.parentElement?.clientHeight || window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        const onMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        };

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            render();
        };

        const render = () => {
            const time = performance.now() * 0.001;
            const positionAttribute = planeMesh.geometry.attributes.position;
            const vertex = new THREE.Vector3();

            for (let i = 0; i < positionAttribute.count; i++) {
                vertex.fromBufferAttribute(positionAttribute, i);

                const wave1 = Math.sin(vertex.x * 0.002 + time * 0.5) * 120;
                const wave2 = Math.cos(vertex.y * 0.002 + time * 0.4) * 120;
                const wave3 = Math.sin((vertex.x + vertex.y) * 0.001 + time * 0.8) * 60;

                positionAttribute.setZ(i, wave1 + wave2 + wave3);
            }

            positionAttribute.needsUpdate = true;
            planeMesh.geometry.computeVertexNormals();

            targetX = mouseX * 0.5;
            targetY = mouseY * 0.5;

            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (-targetY + 400 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        init();
        animate();

        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mousemove', onMouseMove);
        onWindowResize();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('mousemove', onMouseMove);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            planeMesh.geometry.dispose();
            (planeMesh.material as THREE.Material).dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default WaveBackground;