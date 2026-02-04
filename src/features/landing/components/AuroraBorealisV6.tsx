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
    colors: RGB[];  // Sequence of colors for gradient
    angle: number;  // Tilt angle
    swingSpeed: number; // How fast it waves
    opacity: number;
    waveOffset: number; // Unique wave starting point
}

const AuroraBorealisV6: React.FC<AuroraBackgroundProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const targetMouse = useRef({ x: 0, y: 0 });
    const currentMouse = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(0);

    // Defined color stops
    const COLORS = {
        MINT: { r: 0, g: 255, b: 180 },    // #00FFB4
        CYAN: { r: 0, g: 240, b: 255 },    // #00F0FF
        BLUE: { r: 0, g: 120, b: 255 },    // #0078FF
        PURPLE: { r: 160, g: 40, b: 255 },  // #A028FF
        PINK: { r: 255, g: 0, b: 160 }     // #FF00A0
    };

    // Pre-defined transition sequences based on image
    const COLOR_SEQUENCES: RGB[][] = [
        [COLORS.MINT, COLORS.CYAN, COLORS.BLUE, COLORS.PURPLE], // Seq 1: Mint -> Cyan -> Blue -> Purple
        [COLORS.MINT, COLORS.PINK, COLORS.PURPLE],             // Seq 2: Mint -> Pink -> Purple
        [COLORS.CYAN, COLORS.BLUE, COLORS.PURPLE],             // Seq 3: Cyan -> Blue -> Purple
        [COLORS.MINT, COLORS.CYAN, COLORS.PURPLE]              // Seq 4: Mint -> Cyan -> Purple
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Seeded random function to ensure consistent layout across refreshes
        const seededRandom = (seed: number) => {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        const getSeededRange = (seed: number, min: number, max: number) => {
            return seededRandom(seed) * (max - min) + min;
        };

        // Initialize Beams - Recovering pillar shape and structure
        const beams: AuroraBeam[] = [];
        const numBeams = 32; // Moderate density to define shapes

        const initBeams = () => {
            beams.length = 0;
            for (let i = 0; i < numBeams; i++) {
                const s1 = i + 100;
                const s2 = i + 200;
                const s3 = i + 300;
                const s4 = i + 400;
                const s5 = i + 500;
                const s6 = i + 600;
                const s7 = i + 700;

                const z = seededRandom(s1);
                const sequenceIndex = i % COLOR_SEQUENCES.length;

                // Structured X distribution
                let xBase;
                if (i < numBeams * 0.3) {
                    xBase = getSeededRange(s2, -0.1, 0.3);
                } else if (i < numBeams * 0.7) {
                    xBase = getSeededRange(s2, 0.3, 0.7);
                } else {
                    xBase = getSeededRange(s2, 0.7, 1.1);
                }

                beams.push({
                    id: i,
                    x: xBase,
                    y: getSeededRange(s3, 0.1, 0.9),
                    z: z,
                    // Slightly narrower width to expose more background
                    width: getSeededRange(s4, 100, 280) * (0.5 + z),
                    // Height range tuned to leave dark gaps at top and bottom
                    height: getSeededRange(s5, 1200, 2200),
                    colors: COLOR_SEQUENCES[sequenceIndex],
                    angle: getSeededRange(s6, -0.05, 0.05),
                    swingSpeed: getSeededRange(s7, 0.00015, 0.0006),
                    // Core opacity slightly reduced for cleaner background visibility
                    opacity: getSeededRange(s1, 0.12, 0.35) * (0.4 + z * 0.6),
                    waveOffset: getSeededRange(s2, 0, Math.PI * 2),
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

            // Dark Deep Navy background (#070112)
            ctx.fillStyle = '#070112';
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

                // Re-tuned vertical scale for "original draft 5" feel
                ctx.scale(1, 8);

                // Vertical Linear Gradient along the pillar with sharper edges
                const gradient = ctx.createLinearGradient(0, -beam.height / 20, 0, beam.height / 20);

                const alpha = beam.opacity * (0.3 + beam.z * 0.7);
                const colors = beam.colors;

                // Top stop (0) is fully transparent to darken upper area
                gradient.addColorStop(0, `rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, 0)`);

                colors.forEach((color, idx) => {
                    // Shift the weight towards the bottom (stop values increase as idx increases)
                    // The first color (top) will start fading in later
                    const stop = 0.4 + (idx / (colors.length - 1)) * 0.5;
                    gradient.addColorStop(stop, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
                });

                // Bottom fade-out
                gradient.addColorStop(1, `rgba(${colors[colors.length - 1].r}, ${colors[colors.length - 1].g}, ${colors[colors.length - 1].b}, 0)`);

                ctx.fillStyle = gradient;

                // Ellipse shape tuned for defined pillar with smoky edges
                ctx.beginPath();
                ctx.ellipse(0, 0, beam.width / 2, beam.height / 20, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            });

            // Global top vignette overlay to darken the header area
            const vignette = ctx.createLinearGradient(0, 0, 0, height * 0.4);
            vignette.addColorStop(0, '#070112'); // Matches background
            vignette.addColorStop(1, 'transparent');

            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height * 0.4);

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
            style={{ filter: 'blur(25px) contrast(1.4) brightness(1.1)' }}
        />
    );
};

export default AuroraBorealisV6;