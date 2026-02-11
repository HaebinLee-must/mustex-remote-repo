import React, { useEffect, useRef } from 'react';

export interface RGB {
    r: number;
    g: number;
    b: number;
}

interface AuroraBorealisV9Props {
    className?: string;
}

type ShapeType = 'vertical_column' | 'elliptical_blob' | 'radial_soft';

interface AuroraBeam {
    id: number;
    x: number;      // Position 0-1
    y: number;      // Position 0-1
    z: number;      // Depth 0-1
    width: number;
    height: number;
    colors: RGB[];
    angle: number;
    opacity: number;
    pulseSpeed: number;
    pulseOffset: number;
    driftX: number;
    driftY: number;
    shapeType: ShapeType;
    layer: 'back' | 'mid' | 'front';
}

const AuroraBorealisV9: React.FC<AuroraBorealisV9Props> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const targetMouse = useRef({ x: 0, y: 0 });
    const currentMouse = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(0);

    const COLORS = {
        MINT: { r: 0, g: 255, b: 180 },
        CYAN: { r: 0, g: 240, b: 255 },
        BLUE: { r: 0, g: 120, b: 255 },
        PURPLE: { r: 160, g: 40, b: 255 },
        PINK: { r: 255, g: 0, b: 160 }
    };

    const COLOR_SEQUENCES: RGB[][] = [
        [COLORS.MINT, COLORS.CYAN, COLORS.BLUE, COLORS.PURPLE],
        [COLORS.MINT, COLORS.PINK, COLORS.PURPLE],
        [COLORS.CYAN, COLORS.BLUE, COLORS.PURPLE],
        [COLORS.MINT, COLORS.CYAN, COLORS.PURPLE]
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const seededRandom = (seed: number) => {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        const beams: AuroraBeam[] = [];
        const numBeams = 45; // Increased density for field effect

        const initBeams = () => {
            beams.length = 0;
            for (let i = 0; i < numBeams; i++) {
                const s = i * 137.5; // Golden angle-ish distribution for seeds

                const z = seededRandom(s + 1);
                let layer: 'back' | 'mid' | 'front' = 'mid';
                if (z < 0.33) layer = 'back';
                else if (z > 0.66) layer = 'front';

                const shapeRand = seededRandom(s + 2);
                let shapeType: ShapeType = 'elliptical_blob';
                if (shapeRand < 0.2) shapeType = 'vertical_column';
                else if (shapeRand > 0.8) shapeType = 'radial_soft';

                beams.push({
                    id: i,
                    // Unified distribution across and outside screen
                    x: seededRandom(s + 3) * 1.4 - 0.2,
                    y: seededRandom(s + 4) * 1.2 - 0.1,
                    z: z,
                    width: (shapeType === 'vertical_column' ? 100 : 400) * (0.5 + z * 1.5),
                    height: (shapeType === 'vertical_column' ? 1200 : 600) * (0.5 + z * 1.5),
                    colors: COLOR_SEQUENCES[i % COLOR_SEQUENCES.length],
                    angle: seededRandom(s + 5) * Math.PI * 0.1 - 0.05,
                    opacity: seededRandom(s + 6) * 0.3 + 0.1,
                    pulseSpeed: seededRandom(s + 7) * 0.001 + 0.0005,
                    pulseOffset: seededRandom(s + 8) * Math.PI * 2,
                    driftX: (seededRandom(s + 9) - 0.5) * 0.0001,
                    driftY: (seededRandom(s + 10) - 0.5) * 0.0001,
                    shapeType,
                    layer
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

        window.addEventListener('resize', handleResize);
        handleResize();

        const animate = () => {
            const lerpFactor = 0.03;
            currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * lerpFactor;
            currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * lerpFactor;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#070112';
            ctx.fillRect(0, 0, width, height);

            const time = Date.now();

            // Sort beams by depth for correct layering
            const sortedBeams = [...beams].sort((a, b) => a.z - b.z);

            sortedBeams.forEach((beam) => {
                // Breathing Effect
                const pulse = (Math.sin(time * beam.pulseSpeed + beam.pulseOffset) + 1) / 2;
                const currentOpacity = beam.opacity * (0.6 + pulse * 0.4);

                // Subtle Drift
                beam.x += beam.driftX;
                beam.y += beam.driftY;

                // Parallax
                const parallaxX = currentMouse.current.x * beam.z * 80;
                const parallaxY = currentMouse.current.y * beam.z * 30;

                const renderX = beam.x * width + parallaxX;
                const renderY = beam.y * height + parallaxY;

                ctx.save();
                ctx.translate(renderX, renderY);
                ctx.rotate(beam.angle);

                // Additive Blending
                ctx.globalCompositeOperation = 'lighter';

                // Depth based blur
                const baseBlur = beam.layer === 'back' ? 40 : (beam.layer === 'mid' ? 25 : 15);
                const zBlur = (1 - beam.z) * 30;
                const totalBlur = baseBlur + zBlur;
                ctx.filter = `blur(${totalBlur}px)`;

                let gradient;
                if (beam.shapeType === 'vertical_column') {
                    gradient = ctx.createLinearGradient(0, -beam.height / 2, 0, beam.height / 2);
                } else {
                    gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, beam.width / 2);
                }

                const colors = beam.colors;
                gradient.addColorStop(0, `rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, 0)`);
                colors.forEach((color, idx) => {
                    const stop = 0.2 + (idx / (colors.length - 1)) * 0.6;
                    gradient.addColorStop(stop, `rgba(${color.r}, ${color.g}, ${color.b}, ${currentOpacity})`);
                });
                gradient.addColorStop(1, `rgba(${colors[colors.length - 1].r}, ${colors[colors.length - 1].g}, ${colors[colors.length - 1].b}, 0)`);

                ctx.fillStyle = gradient;

                ctx.beginPath();
                if (beam.shapeType === 'vertical_column') {
                    ctx.ellipse(0, 0, beam.width / 2, beam.height / 2, 0, 0, Math.PI * 2);
                } else if (beam.shapeType === 'elliptical_blob') {
                    ctx.ellipse(0, 0, beam.width / 2, beam.width / 4, 0, 0, Math.PI * 2);
                } else {
                    ctx.arc(0, 0, beam.width / 2, 0, Math.PI * 2);
                }
                ctx.fill();

                ctx.restore();
            });

            // Top vignette
            ctx.globalCompositeOperation = 'source-over';
            ctx.filter = 'none';
            const vignette = ctx.createLinearGradient(0, 0, 0, height * 0.4);
            vignette.addColorStop(0, '#070112');
            vignette.addColorStop(1, 'transparent');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height * 0.4);

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.current = {
                x: (e.clientX / width) * 2 - 1,
                y: (e.clientY / height) * 2 - 1
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ filter: 'contrast(1.2) brightness(1.1)' }}
            />
        </div>
    );
};

export default AuroraBorealisV9;