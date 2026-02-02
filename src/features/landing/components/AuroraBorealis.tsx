import React, { useEffect, useRef } from 'react';

export interface RGB {
    r: number;
    g: number;
    b: number;
}

interface AuroraBackgroundProps {
    className?: string;
}

// "Beam" particle structure for the curtain effect
interface AuroraBeam {
    id: number;
    x: number;      // Position 0-1
    y: number;      // Position 0-1
    z: number;      // Depth
    width: number;  // Beam width
    height: number; // Beam length (very long)
    color: RGB;     // Base color
    angle: number;  // Tilt angle
    swingSpeed: number; // How fast it waves
    opacity: number;
    waveOffset: number; // Unique wave starting point
}

const AuroraBorealis: React.FC<AuroraBackgroundProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const targetMouse = useRef({ x: 0, y: 0 });
    const currentMouse = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(0);

    // Refined colors with requested additions and weighted distribution
    const BEAM_COLORS: RGB[] = [
        { r: 0, g: 255, b: 180 },    // Seafoam Green (#00FFB4) - Weight 1
        { r: 0, g: 255, b: 180 },    // Seafoam Green (#00FFB4) - Weight 2 (Higher Priority)
        { r: 217, g: 167, b: 255 },  // Light Lavender (#D9A7FF)
        { r: 255, g: 0, b: 160 },    // Opera Pink (#FF00A0)
        { r: 0, g: 240, b: 255 },    // Bright Cyan/Aqua
        { r: 80, g: 50, b: 255 },    // Royal Blue
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        // Initialize Beams - More particles for the "Curtain" look
        const beams: AuroraBeam[] = [];
        const numBeams = 45;

        const initBeams = () => {
            beams.length = 0;
            for (let i = 0; i < numBeams; i++) {
                const z = Math.random();

                beams.push({
                    id: i,
                    x: random(-0.1, 1.1),
                    y: random(0.1, 0.9),
                    z: z,
                    // Vertical beams should be thinner but very tall
                    width: random(80, 250) * (0.8 + z),
                    height: random(1000, 2000),
                    color: BEAM_COLORS[Math.floor(random(0, BEAM_COLORS.length))],
                    angle: random(-0.15, 0.15),
                    swingSpeed: random(0.0003, 0.0012),
                    opacity: random(0.2, 0.5),
                    waveOffset: random(0, Math.PI * 2),
                });
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initBeams();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / width) * 2 - 1;
            const y = (e.clientY / height) * 2 - 1;
            targetMouse.current = { x, y };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();

        const animate = () => {
            const lerpFactor = 0.05;
            currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * lerpFactor;
            currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * lerpFactor;

            ctx.clearRect(0, 0, width, height);

            // Deep Navy Black background
            ctx.fillStyle = '#010308';
            ctx.fillRect(0, 0, width, height);

            ctx.globalCompositeOperation = 'lighter';

            const time = Date.now();

            beams.forEach((beam) => {
                // Complex waving motion for the "Curtain" effect
                const swing = Math.sin(time * beam.swingSpeed + beam.waveOffset) * 0.15;
                const wave = Math.cos(time * 0.0005 + beam.id) * 20; // Subtle horizontal sway

                const currentAngle = beam.angle + swing;

                const parallaxX = currentMouse.current.x * beam.z * 120;
                const parallaxY = currentMouse.current.y * beam.z * 40;

                const renderX = beam.x * width + parallaxX + wave;
                const renderY = beam.y * height + parallaxY;

                ctx.save();
                ctx.translate(renderX, renderY);
                ctx.rotate(currentAngle);

                // Heavy vertical stretching for the beam look
                ctx.scale(1, 6);

                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, beam.width / 2);

                const { r, g, b } = beam.color;
                const alpha = beam.opacity * (0.4 + beam.z * 0.6);

                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
                gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.ellipse(0, 0, beam.width, beam.width * 1.2, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${className}`}
            style={{ filter: 'blur(40px) contrast(1.5) brightness(1.1)' }}
        />
    );
};

export default AuroraBorealis;