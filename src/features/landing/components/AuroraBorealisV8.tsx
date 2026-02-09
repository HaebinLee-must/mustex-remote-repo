import React, { useEffect, useRef } from 'react';

interface AuroraBorealisV8Props {
    className?: string;
}

interface RGB {
    r: number;
    g: number;
    b: number;
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
}

const AuroraBorealisV8: React.FC<AuroraBorealisV8Props> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const targetMouse = useRef({ x: 0, y: 0 });
    const currentMouse = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(0);

    // Exact colors extracted from the reference image (Teal -> Pink -> Purple)
    const BEAM_COLORS: RGB[] = [
        { r: 0, g: 255, b: 170 },    // Bright Teal (Bottom/Edges)
        { r: 0, g: 200, b: 255 },    // Electric Blue
        { r: 255, g: 0, b: 150 },    // Hot Magenta (Middle)
        { r: 150, g: 0, b: 255 },    // Deep Violet (Top)
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Helper: Random range
        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        // Initialize Beams
        const beams: AuroraBeam[] = [];
        const numBeams = 35; // More particles for dense curtains

        const initBeams = () => {
            beams.length = 0;
            for (let i = 0; i < numBeams; i++) {
                const z = Math.random(); // Depth factor

                beams.push({
                    id: i,
                    x: random(-0.2, 1.2),
                    y: random(0.2, 1.0), // Spawn mostly in the lower-mid section
                    z: z,
                    // Reduced width by 5% (100 -> 95, 300 -> 285) to show more dark background
                    width: random(95, 285) * (1 + z),
                    height: random(800, 1600), // Huge height to span screen
                    color: BEAM_COLORS[Math.floor(random(0, BEAM_COLORS.length))],
                    // Slight tilt, mostly vertical (-15 to +15 degrees approx)
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

            // Pure black base for contrast
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            // 'lighter' (Additive Blending) is CRITICAL for the "Glowing" neon look
            // When colors overlap, they add up towards white (RGB 255,255,255)
            ctx.globalCompositeOperation = 'lighter';

            beams.forEach((beam) => {
                // Oscillation logic for the "Waving Curtain" effect
                const time = Date.now();
                // The angle swings slowly like a pendulum
                const swing = Math.sin(time * beam.swingSpeed + beam.id) * 0.2;
                const currentAngle = beam.angle + swing;

                // Parallax movement
                const parallaxX = currentMouse.current.x * beam.z * 150;
                const parallaxY = currentMouse.current.y * beam.z * 50; // Less vertical movement

                const renderX = beam.x * width + parallaxX;
                const renderY = beam.y * height + parallaxY;

                ctx.save();
                ctx.translate(renderX, renderY);
                ctx.rotate(currentAngle);

                // STRETCH IT: Scale Y heavily to make it look like a vertical beam/ray
                // Scale X slightly to control width
                ctx.scale(1, 4); // Stretch factor

                // Gradient for the beam itself
                // Center is bright, edges fade out
                const gradient = ctx.createRadialGradient(
                    0, 0, 0,
                    0, 0, beam.width / 2 // radius
                );

                const { r, g, b } = beam.color;
                // Higher z = brighter
                const alpha = beam.opacity * (0.5 + beam.z * 0.5);

                // Core is white-hot
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
                // Middle retains color
                gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
                // Edges fade to nothing
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                // Draw ellipse (which gets stretched by scale to become a beam)
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
        <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
            {/* Texture Layer: Subtle Grain (from Downloaded App.tsx) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
                // Reduced blur slightly compared to V2 to keep the "streak" definition visible
                // High contrast filter creates the "HDR" look of the photo
                style={{ filter: 'blur(40px) contrast(1.5) brightness(1.1)' }}
            />
        </div>
    );
};

export default AuroraBorealisV8;