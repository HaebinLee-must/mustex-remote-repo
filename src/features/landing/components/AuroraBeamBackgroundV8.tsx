import React, { useEffect, useRef } from 'react';

interface RGB {
    r: number;
    g: number;
    b: number;
}

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
}

export const AuroraBeamBackgroundV8: React.FC<{ className?: string }> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const targetMouse = useRef({ x: 0, y: 0 });
    const currentMouse = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(0);

    // Purple, Opera Pink, Mint, and Cyan (from unicorn-studio version)
    const BEAM_COLORS: RGB[] = [
        { r: 160, g: 40, b: 255 },  // Purple (#A028FF)
        { r: 255, g: 0, b: 160 },   // Opera Pink (#FF00A0)
        { r: 0, g: 255, b: 180 },   // Mint (#00FFB4)
        { r: 0, g: 240, b: 255 },   // Cyan (#00F0FF)
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const beams: AuroraBeam[] = [];
        const numBeams = 35;

        const initBeams = () => {
            beams.length = 0;
            for (let i = 0; i < numBeams; i++) {
                const z = Math.random();
                beams.push({
                    id: i,
                    x: random(-0.2, 1.2),
                    y: random(0.2, 1.0),
                    z: z,
                    width: random(100, 300) * (1 + z),
                    height: random(800, 1600),
                    color: BEAM_COLORS[Math.floor(random(0, BEAM_COLORS.length))],
                    angle: random(-0.3, 0.3),
                    swingSpeed: random(0.0005, 0.002),
                    opacity: random(0.3, 0.6),
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
            const lerpFactor = 0.04;
            currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * lerpFactor;
            currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * lerpFactor;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'lighter';

            beams.forEach((beam) => {
                const time = Date.now();
                const swing = Math.sin(time * beam.swingSpeed + beam.id) * 0.2;
                const currentAngle = beam.angle + swing;
                const parallaxX = currentMouse.current.x * beam.z * 150;
                const parallaxY = currentMouse.current.y * beam.z * 50;

                const renderX = beam.x * width + parallaxX;
                const renderY = beam.y * height + parallaxY;

                ctx.save();
                ctx.translate(renderX, renderY);
                ctx.rotate(currentAngle);
                ctx.scale(1, 4);

                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, beam.width / 2);
                const { r, g, b } = beam.color;
                const alpha = beam.opacity * (0.5 + beam.z * 0.5);

                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
                gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.ellipse(0, 0, beam.width, beam.width * 1.5, 0, 0, Math.PI * 2);
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
            className={`w-full h-full pointer-events-none ${className}`}
            style={{ filter: 'blur(40px) contrast(1.5) brightness(1.1)' }}
        />
    );
};