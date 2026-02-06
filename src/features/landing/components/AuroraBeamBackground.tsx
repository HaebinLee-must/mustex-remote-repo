import React, { useEffect, useRef } from 'react';

interface AuroraBeamBackgroundProps {
    className?: string;
}

interface RGB {
    r: number;
    g: number;
    b: number;
}

interface Sparkle {
    x: number;
    y: number;
    size: number;
    speed: number;
    phase: number;
    brightness: number;
    color: RGB;
}

interface Ripple {
    x: number;
    y: number;
    startTime: number;
    maxRadius: number;
    color: RGB;
}

export const AuroraBeamBackground: React.FC<AuroraBeamBackgroundProps> = ({
    className = '',
}) => {
    const auroraCanvasRef = useRef<HTMLCanvasElement>(null);
    const sparkleCanvasRef = useRef<HTMLCanvasElement>(null);
    const targetMouse = useRef({ x: 0.5, y: 0.5 });
    const currentMouse = useRef({ x: 0.5, y: 0.5 });
    const mousePixel = useRef({ x: 0, y: 0 });
    const isMouseInCanvas = useRef(false);
    const animationFrameId = useRef<number>(0);
    const sparklesRef = useRef<Sparkle[]>([]);
    const ripplesRef = useRef<Ripple[]>([]);
    const lastRippleTime = useRef(0);

    const COLORS: RGB[] = [
        { r: 40, g: 180, b: 200 },   // Teal with blue tint
        { r: 50, g: 160, b: 230 },   // Cyan-blue
        { r: 80, g: 140, b: 255 },   // Blue transition
        { r: 120, g: 120, b: 255 },  // Soft violet-blue
        { r: 255, g: 100, b: 180 },  // Pink
        { r: 160, g: 120, b: 255 },  // Purple
        { r: 140, g: 170, b: 255 },  // Light purple-blue
    ];

    useEffect(() => {
        const auroraCanvas = auroraCanvasRef.current;
        const sparkleCanvas = sparkleCanvasRef.current;
        if (!auroraCanvas || !sparkleCanvas) return;

        const auroraCtx = auroraCanvas.getContext('2d');
        const sparkleCtx = sparkleCanvas.getContext('2d');
        if (!auroraCtx || !sparkleCtx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Initialize many small sparkles
        const initSparkles = () => {
            const sparkleCount = Math.floor((width * height) / 800); // Much denser
            sparklesRef.current = [];

            for (let i = 0; i < sparkleCount; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const colIndex = Math.floor((x / width) * COLORS.length);
                const color = COLORS[colIndex % COLORS.length];

                sparklesRef.current.push({
                    x,
                    y,
                    size: Math.random() * 1 + 0.3, // Smaller particles
                    speed: Math.random() * 3 + 1,
                    phase: Math.random() * Math.PI * 2,
                    brightness: Math.random(),
                    color,
                });
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            auroraCanvas.width = width;
            auroraCanvas.height = height;
            sparkleCanvas.width = width;
            sparkleCanvas.height = height;
            initSparkles();
        };

        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.current = {
                x: (e.clientX / width) * 2 - 1,
                y: (e.clientY / height) * 2 - 1,
            };
            mousePixel.current = { x: e.clientX, y: e.clientY };

            // Create ripples on hover movement (throttled)
            const now = Date.now();
            if (now - lastRippleTime.current > 150) {
                const colIndex = Math.floor((e.clientX / width) * COLORS.length);
                const color = COLORS[Math.abs(colIndex) % COLORS.length];
                ripplesRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    startTime: now,
                    maxRadius: 150 + Math.random() * 100,
                    color,
                });
                lastRippleTime.current = now;

                // Keep only recent ripples
                if (ripplesRef.current.length > 10) {
                    ripplesRef.current.shift();
                }
            }
        };

        const handleMouseEnter = () => {
            isMouseInCanvas.current = true;
        };

        const handleMouseLeave = () => {
            isMouseInCanvas.current = false;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        sparkleCanvas.addEventListener('mouseenter', handleMouseEnter);
        sparkleCanvas.addEventListener('mouseleave', handleMouseLeave);
        handleResize();

        const getColumnCount = () => {
            if (width >= 1200) return 5;
            if (width >= 900) return 4;
            if (width >= 600) return 3;
            return 1; // Mobile: single Nova
        };

        const isMobile = () => width < 600;

        // Track sparkle reveal intensity (for smooth fade)
        let sparkleReveal = 0;

        const animate = () => {
            currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.03;
            currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.03;

            // Smooth sparkle reveal on hover
            const targetReveal = isMouseInCanvas.current ? 1 : 0;
            sparkleReveal += (targetReveal - sparkleReveal) * 0.05;

            const time = Date.now();

            // ==================== AURORA CANVAS ====================
            auroraCtx.fillStyle = '#000000';
            auroraCtx.fillRect(0, 0, width, height);

            const numColumns = getColumnCount();
            const columnWidth = width / numColumns;
            const segments = 60;
            const segmentHeight = height / segments;

            // Draw connected curtain
            for (let col = 0; col < numColumns; col++) {
                const colorTop = COLORS[col % COLORS.length];
                const colorBottom = COLORS[(col + 1) % COLORS.length];
                const colPhase = col * 0.5;

                auroraCtx.beginPath();

                const leftX = col * columnWidth;
                const rightX = (col + 1) * columnWidth;

                const getWaveOffset = (y: number, basePhase: number) => {
                    // Primary curtain wave - slow, large movement
                    const wave1 = Math.sin(time * 0.0008 + y * 0.003 + basePhase) * 35;
                    // Secondary wave - medium speed, flowing
                    const wave2 = Math.sin(time * 0.0015 + y * 0.006 + basePhase * 0.7) * 20;
                    // Tertiary wave - faster flutter
                    const wave3 = Math.sin(time * 0.003 + y * 0.01 + basePhase * 1.3) * 12;
                    // Ripple effect - small rapid movements
                    const wave4 = Math.sin(time * 0.005 + y * 0.015 + basePhase * 0.5) * 6;
                    // Mouse interaction
                    const mouseWave = currentMouse.current.x * 40 * Math.sin(y * 0.004 + time * 0.0006);
                    // Vertical position intensity (more movement in middle)
                    const verticalFactor = Math.sin((y / height) * Math.PI) * 0.4 + 0.6;
                    return (wave1 + wave2 + wave3 + wave4 + mouseWave) * verticalFactor;
                };

                const leftPoints: { x: number; y: number }[] = [];
                for (let i = 0; i <= segments; i++) {
                    const y = i * segmentHeight;
                    const waveOffset = getWaveOffset(y, colPhase);
                    leftPoints.push({ x: leftX + waveOffset, y });
                }

                const rightPoints: { x: number; y: number }[] = [];
                for (let i = 0; i <= segments; i++) {
                    const y = i * segmentHeight;
                    const waveOffset = getWaveOffset(y, colPhase + 0.5);
                    rightPoints.push({ x: rightX + waveOffset, y });
                }

                auroraCtx.moveTo(leftPoints[0].x, leftPoints[0].y);
                for (let i = 1; i <= segments; i++) {
                    auroraCtx.lineTo(leftPoints[i].x, leftPoints[i].y);
                }
                for (let i = segments; i >= 0; i--) {
                    auroraCtx.lineTo(rightPoints[i].x, rightPoints[i].y);
                }
                auroraCtx.closePath();

                const gradient = auroraCtx.createLinearGradient(leftX, 0, leftX, height);
                const morphPhase = Math.sin(time * 0.0004 + col) * 0.5 + 0.5;
                const midR = colorTop.r + (colorBottom.r - colorTop.r) * morphPhase;
                const midG = colorTop.g + (colorBottom.g - colorTop.g) * morphPhase;
                const midB = colorTop.b + (colorBottom.b - colorTop.b) * morphPhase;

                gradient.addColorStop(0, `rgba(${colorTop.r}, ${colorTop.g}, ${colorTop.b}, 0)`);
                gradient.addColorStop(0.15, `rgba(${colorTop.r}, ${colorTop.g}, ${colorTop.b}, 0.85)`);
                gradient.addColorStop(0.35, `rgba(${colorTop.r}, ${colorTop.g}, ${colorTop.b}, 1)`);
                gradient.addColorStop(0.5, `rgba(${midR}, ${midG}, ${midB}, 1)`);
                gradient.addColorStop(0.65, `rgba(${colorBottom.r}, ${colorBottom.g}, ${colorBottom.b}, 1)`);
                gradient.addColorStop(0.85, `rgba(${colorBottom.r}, ${colorBottom.g}, ${colorBottom.b}, 0.85)`);
                gradient.addColorStop(1, `rgba(${colorBottom.r}, ${colorBottom.g}, ${colorBottom.b}, 0)`);

                auroraCtx.fillStyle = gradient;
                auroraCtx.fill();

                // ==================== EDGE BEAM EFFECT ====================
                // Thin glowing line on column edges
                const edgeGradient = auroraCtx.createLinearGradient(leftX, 0, leftX, height);
                edgeGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                edgeGradient.addColorStop(0.2, `rgba(255, 255, 255, 0.4)`);
                edgeGradient.addColorStop(0.5, `rgba(255, 255, 255, 0.6)`);
                edgeGradient.addColorStop(0.8, `rgba(255, 255, 255, 0.4)`);
                edgeGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                auroraCtx.strokeStyle = edgeGradient;
                auroraCtx.lineWidth = 0.5;
                auroraCtx.lineCap = 'round';

                // Draw left edge beam
                auroraCtx.beginPath();
                auroraCtx.moveTo(leftPoints[0].x, leftPoints[0].y);
                for (let i = 1; i <= segments; i++) {
                    auroraCtx.lineTo(leftPoints[i].x, leftPoints[i].y);
                }
                auroraCtx.stroke();

                // Draw right edge beam
                auroraCtx.beginPath();
                auroraCtx.moveTo(rightPoints[0].x, rightPoints[0].y);
                for (let i = 1; i <= segments; i++) {
                    auroraCtx.lineTo(rightPoints[i].x, rightPoints[i].y);
                }
                auroraCtx.stroke();
            }

            // ==================== VERTICAL LIGHT BEAMS ====================
            auroraCtx.globalCompositeOperation = 'lighter';

            // Skip heavy effects on mobile for performance and cleaner look
            if (isMobile()) {
                // Mobile: Skip to Nova effect only
            } else {
            // Draw many vertical light rays within each column
            const beamCount = 60; // More beams
            for (let i = 0; i < beamCount; i++) {
                const seed = i * 137.5;
                const baseX = (i / beamCount) * width;
                const colIndex = Math.floor((baseX / width) * COLORS.length);
                const color = COLORS[colIndex % COLORS.length];

                // Animated position - spread across width
                const beamWave = Math.sin(time * 0.0008 + seed * 0.1) * 35;
                const beamX = baseX + beamWave + currentMouse.current.x * 20;

                // Beam properties - varied positions across full height
                const beamStartRatio = (Math.sin(seed * 0.3) * 0.5 + 0.5) * 0.4; // 0 to 0.4
                const beamEndRatio = 0.6 + (Math.cos(seed * 0.7) * 0.5 + 0.5) * 0.4; // 0.6 to 1.0
                const beamY = height * beamStartRatio;
                const beamHeight = height * (beamEndRatio - beamStartRatio);
                const beamWidthVal = 5 + Math.sin(seed * 2) * 3;

                // Pulsing brightness - stronger
                const pulse = Math.sin(time * 0.003 + seed) * 0.2 + 0.8;
                const alpha = 0.4 * pulse;

                // Draw vertical beam with gradient
                const beamGradient = auroraCtx.createLinearGradient(beamX, beamY, beamX, beamY + beamHeight);
                beamGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
                beamGradient.addColorStop(0.15, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.6})`);
                beamGradient.addColorStop(0.35, `rgba(255, 255, 255, ${alpha * 0.9})`);
                beamGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
                beamGradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.6})`);
                beamGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

                auroraCtx.fillStyle = beamGradient;
                auroraCtx.fillRect(beamX - beamWidthVal / 2, beamY, beamWidthVal, beamHeight);

                // Add thin bright core line - every beam
                if (i % 1 === 0) {
                    const coreAlpha = alpha * 1.5;
                    auroraCtx.strokeStyle = `rgba(255, 255, 255, ${coreAlpha})`;
                    auroraCtx.lineWidth = 1.5;
                    auroraCtx.beginPath();
                    auroraCtx.moveTo(beamX, beamY + beamHeight * 0.1);
                    auroraCtx.lineTo(beamX, beamY + beamHeight * 0.9);
                    auroraCtx.stroke();
                }
            }
            } // End of desktop-only beams

            // ==================== NOVA GLOW EFFECT ====================
            if (isMobile()) {
                // ==================== MOBILE: Clustered Water Droplet Blobs ====================
                const centerX = width * 0.5;
                const centerY = height * 0.38;
                const blobTime = time * 0.001;

                // Main blob base size - more compact and round
                const baseSize = Math.min(width, height) * 0.18;

                // Color morphing
                const colorPhase = (blobTime * 0.25) % COLORS.length;
                const colorIndex = Math.floor(colorPhase);
                const colorBlend = colorPhase - colorIndex;
                const color1 = COLORS[colorIndex % COLORS.length];
                const color2 = COLORS[(colorIndex + 1) % COLORS.length];
                const mainR = color1.r + (color2.r - color1.r) * colorBlend;
                const mainG = color1.g + (color2.g - color1.g) * colorBlend;
                const mainB = color1.b + (color2.b - color1.b) * colorBlend;

                // Define clustered blob positions - multiple small blobs huddled together
                const blobs = [
                    // Main center blob
                    { offsetX: 0, offsetY: 0, size: 1.0, speed: 1, phase: 0 },
                    // Surrounding smaller blobs that stay close
                    { offsetX: -0.6, offsetY: -0.4, size: 0.65, speed: 1.3, phase: 0.5 },
                    { offsetX: 0.5, offsetY: -0.5, size: 0.55, speed: 0.9, phase: 1.2 },
                    { offsetX: -0.4, offsetY: 0.5, size: 0.5, speed: 1.1, phase: 2.1 },
                    { offsetX: 0.6, offsetY: 0.3, size: 0.6, speed: 0.8, phase: 1.8 },
                    { offsetX: 0, offsetY: -0.7, size: 0.45, speed: 1.2, phase: 0.8 },
                    { offsetX: -0.3, offsetY: 0.1, size: 0.4, speed: 1.4, phase: 2.5 },
                    { offsetX: 0.3, offsetY: -0.2, size: 0.35, speed: 1.0, phase: 1.5 },
                ];

                // Draw each blob in the cluster
                blobs.forEach((blob, i) => {
                    // Organic wobble - blobs squish together and apart
                    const wobbleX = Math.sin(blobTime * blob.speed + blob.phase) * 8
                        + Math.sin(blobTime * blob.speed * 1.7 + blob.phase) * 5;
                    const wobbleY = Math.cos(blobTime * blob.speed * 0.8 + blob.phase) * 8
                        + Math.cos(blobTime * blob.speed * 1.4 + blob.phase) * 4;

                    // Position with wobble - stays clustered near center
                    const blobX = centerX + blob.offsetX * baseSize + wobbleX;
                    const blobY = centerY + blob.offsetY * baseSize + wobbleY;

                    // Size with breathing effect
                    const breathe = Math.sin(blobTime * 0.6 + blob.phase) * 0.12 + 1;
                    const blobRadius = baseSize * blob.size * breathe;

                    // Pulse intensity
                    const pulse = Math.sin(blobTime * 1.0 + blob.phase) * 0.25 + 0.75;

                    // Each blob has slightly different color
                    const colorShift = (colorPhase + i * 0.3) % COLORS.length;
                    const shiftIndex = Math.floor(colorShift);
                    const shiftBlend = colorShift - shiftIndex;
                    const c1 = COLORS[shiftIndex % COLORS.length];
                    const c2 = COLORS[(shiftIndex + 1) % COLORS.length];
                    const blobR = c1.r + (c2.r - c1.r) * shiftBlend;
                    const blobG = c1.g + (c2.g - c1.g) * shiftBlend;
                    const blobB = c1.b + (c2.b - c1.b) * shiftBlend;

                    // Draw blob with tight, round gradient
                    const blobGradient = auroraCtx.createRadialGradient(
                        blobX, blobY, 0,
                        blobX, blobY, blobRadius
                    );
                    // More opaque center for solid blob look
                    blobGradient.addColorStop(0, `rgba(255, 255, 255, ${0.85 * pulse})`);
                    blobGradient.addColorStop(0.2, `rgba(255, 255, 255, ${0.6 * pulse})`);
                    blobGradient.addColorStop(0.4, `rgba(${blobR}, ${blobG}, ${blobB}, ${0.7 * pulse})`);
                    blobGradient.addColorStop(0.7, `rgba(${blobR}, ${blobG}, ${blobB}, ${0.4 * pulse})`);
                    blobGradient.addColorStop(1, `rgba(${blobR}, ${blobG}, ${blobB}, 0)`);

                    auroraCtx.fillStyle = blobGradient;
                    auroraCtx.beginPath();
                    auroraCtx.arc(blobX, blobY, blobRadius, 0, Math.PI * 2);
                    auroraCtx.fill();
                });

                // Soft ambient glow behind the cluster
                const ambientGlow = auroraCtx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, baseSize * 2.5
                );
                const ambientPulse = Math.sin(blobTime * 0.4) * 0.15 + 0.85;
                ambientGlow.addColorStop(0, `rgba(${mainR}, ${mainG}, ${mainB}, ${0.3 * ambientPulse})`);
                ambientGlow.addColorStop(0.4, `rgba(${mainR}, ${mainG}, ${mainB}, ${0.15 * ambientPulse})`);
                ambientGlow.addColorStop(0.7, `rgba(${mainR}, ${mainG}, ${mainB}, ${0.05 * ambientPulse})`);
                ambientGlow.addColorStop(1, `rgba(${mainR}, ${mainG}, ${mainB}, 0)`);

                auroraCtx.fillStyle = ambientGlow;
                auroraCtx.fillRect(0, 0, width, height);

            } else {
                // ==================== DESKTOP: Multiple Nova Columns ====================
                for (let col = 0; col < numColumns; col++) {
                    const colorTop = COLORS[col % COLORS.length];
                    const colorBottom = COLORS[(col + 1) % COLORS.length];
                    const centerX = (col + 0.5) * columnWidth;
                    const colPhase = col * 0.5;

                    // More random offsets
                    const randomSeed = col * 137.5;
                    const randomOffset1 = Math.sin(randomSeed) * 0.5 + 0.5;
                    const randomOffset2 = Math.cos(randomSeed * 1.3) * 0.5 + 0.5;
                    const randomOffset3 = Math.sin(randomSeed * 0.7) * 0.5 + 0.5;

                    const waveOffset = Math.sin(time * 0.001 + colPhase) * 25
                        + Math.sin(time * 0.0023 + randomSeed) * 15
                        + currentMouse.current.x * 30;

                    // Vertical position variation for nova
                    const novaY = height * (0.35 + Math.sin(randomSeed * 0.5) * 0.15 + Math.sin(time * 0.001 + col) * 0.08);

                    const avgR = (colorTop.r + colorBottom.r) / 2;
                    const avgG = (colorTop.g + colorBottom.g) / 2;
                    const avgB = (colorTop.b + colorBottom.b) / 2;

                    // Position-based intensity (less on left, more on right/center)
                    const positionFactor = 0.5 + (col / numColumns) * 0.5;

                    // Nova pulse effect - more random variation
                    const novaPulse = Math.sin(time * (0.002 + randomOffset1 * 0.002) + col * 1.2) * 0.4 * positionFactor + 0.5
                        + Math.sin(time * 0.0037 + randomSeed) * 0.15;
                    const novaPulse2 = Math.sin(time * (0.004 + randomOffset2 * 0.002) + col * 0.9) * 0.35 * positionFactor + 0.55
                        + Math.cos(time * 0.0029 + randomSeed) * 0.1;
                    const novaPulse3 = Math.sin(time * (0.0015 + randomOffset3 * 0.001) + col * 1.5) * 0.35 * positionFactor + 0.5
                        + Math.sin(time * 0.0041 + randomSeed * 0.8) * 0.12;

                    // Fewer rings on left columns
                    const ringCount = col < 2 ? 1 : 2;
                    for (let ring = 0; ring < ringCount; ring++) {
                        const ringPhase = ((time * 0.0015 + col * 0.8 + ring * 2.1) % (Math.PI * 2)) / (Math.PI * 2);
                        const ringRadius = columnWidth * (0.2 + ringPhase * 1.5);
                        const ringAlpha = (1 - ringPhase) * 0.25 * novaPulse * positionFactor;

                        if (ringAlpha > 0.02) {
                            auroraCtx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha})`;
                            auroraCtx.lineWidth = 2 + (1 - ringPhase) * 3;
                            auroraCtx.beginPath();
                            auroraCtx.arc(centerX + waveOffset, novaY, ringRadius, 0, Math.PI * 2);
                            auroraCtx.stroke();
                        }
                    }

                    // Large outer nova glow
                    const novaGradient = auroraCtx.createRadialGradient(
                        centerX + waveOffset, novaY, 0,
                        centerX + waveOffset, novaY, columnWidth * 1.9
                    );
                    novaGradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 * novaPulse})`);
                    novaGradient.addColorStop(0.1, `rgba(${avgR}, ${avgG}, ${avgB}, ${0.4 * novaPulse})`);
                    novaGradient.addColorStop(0.3, `rgba(${avgR}, ${avgG}, ${avgB}, ${0.2 * novaPulse})`);
                    novaGradient.addColorStop(0.5, `rgba(${avgR}, ${avgG}, ${avgB}, ${0.1 * novaPulse})`);
                    novaGradient.addColorStop(0.8, `rgba(${avgR}, ${avgG}, ${avgB}, ${0.03 * novaPulse})`);
                    novaGradient.addColorStop(1, `rgba(${avgR}, ${avgG}, ${avgB}, 0)`);

                    auroraCtx.fillStyle = novaGradient;
                    auroraCtx.fillRect(0, 0, width, height);

                    // Inner bright core nova - stronger
                    const coreGradient = auroraCtx.createRadialGradient(
                        centerX + waveOffset, novaY, 0,
                        centerX + waveOffset, novaY, columnWidth * 0.6
                    );
                    coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.5 * novaPulse2})`);
                    coreGradient.addColorStop(0.2, `rgba(255, 255, 255, ${0.3 * novaPulse2})`);
                    coreGradient.addColorStop(0.4, `rgba(${avgR}, ${avgG}, ${avgB}, ${0.25 * novaPulse2})`);
                    coreGradient.addColorStop(0.7, `rgba(${avgR}, ${avgG}, ${avgB}, ${0.1 * novaPulse2})`);
                    coreGradient.addColorStop(1, `rgba(${avgR}, ${avgG}, ${avgB}, 0)`);

                    auroraCtx.fillStyle = coreGradient;
                    auroraCtx.fillRect(0, 0, width, height);

                    // Bright flare burst at center - skip left columns
                    const flarePulse = Math.pow(Math.sin(time * 0.004 + col * 1.5) * 0.5 + 0.5, 1.5);
                    if (flarePulse > 0.2 && col >= 2) {
                        const flareGradient = auroraCtx.createRadialGradient(
                            centerX + waveOffset, novaY, 0,
                            centerX + waveOffset, novaY, columnWidth * 0.4
                        );
                        flareGradient.addColorStop(0, `rgba(255, 255, 255, ${0.6 * flarePulse})`);
                        flareGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.3 * flarePulse})`);
                        flareGradient.addColorStop(0.6, `rgba(${avgR}, ${avgG}, ${avgB}, ${0.2 * flarePulse})`);
                        flareGradient.addColorStop(1, `rgba(${avgR}, ${avgG}, ${avgB}, 0)`);

                        auroraCtx.fillStyle = flareGradient;
                        auroraCtx.fillRect(0, 0, width, height);
                    }

                    // Extra glow layer for depth
                    const glowGradient = auroraCtx.createRadialGradient(
                        centerX + waveOffset, novaY, 0,
                        centerX + waveOffset, novaY, columnWidth * 1.2
                    );
                    glowGradient.addColorStop(0, `rgba(${avgR}, ${avgG}, ${avgB}, ${0.2 * novaPulse3})`);
                    glowGradient.addColorStop(0.4, `rgba(${avgR}, ${avgG}, ${avgB}, ${0.1 * novaPulse3})`);
                    glowGradient.addColorStop(1, `rgba(${avgR}, ${avgG}, ${avgB}, 0)`);

                    auroraCtx.fillStyle = glowGradient;
                    auroraCtx.fillRect(0, 0, width, height);
                }
            }

            // ==================== SOFT WATER CAUSTIC (부드러운 물결 무늬) ====================
            // Gentle, smooth water ripple effect - works on both desktop and mobile
            {
                const t = time * 0.0006; // Slower, more gentle movement
                const isMobileView = isMobile();

                // Responsive: fewer, larger spots on mobile
                const spotCount = isMobileView ? 12 : 25;
                const baseSize = isMobileView ? 120 : 180;

                // Layer 1: Large soft caustic blobs
                for (let i = 0; i < spotCount; i++) {
                    const seed = i * 137.5;
                    const seed2 = i * 89.3;

                    // Base position distributed across screen
                    const baseX = ((i % 5) / 4) * width + (Math.sin(seed) * 0.1) * width;
                    const baseY = (Math.floor(i / 5) / (spotCount / 5)) * height + (Math.cos(seed2) * 0.1) * height;

                    // Gentle wave movement
                    const wave1 = Math.sin(t * 0.8 + seed * 0.1) * Math.cos(t * 0.6 + seed2 * 0.08);
                    const wave2 = Math.cos(t * 0.5 + seed * 0.15) * Math.sin(t * 0.7 + seed2 * 0.12);

                    // Smooth intensity variation
                    const intensity = (wave1 + wave2 + 2) / 4; // 0 to 1, centered around 0.5

                    // Flowing position
                    const flowX = Math.sin(t * 0.4 + seed) * 60 + Math.cos(t * 0.3 + seed2) * 40;
                    const flowY = Math.cos(t * 0.35 + seed2) * 50 + Math.sin(t * 0.25 + seed) * 35;
                    const x = baseX + flowX;
                    const y = baseY + flowY;

                    // Get color based on position
                    const colorProgress = (x / width) * COLORS.length;
                    const colorIndex = Math.floor(Math.abs(colorProgress)) % COLORS.length;
                    const color = COLORS[colorIndex];

                    // Size pulses gently
                    const sizePulse = 0.8 + Math.sin(t * 0.5 + seed) * 0.2;
                    const size = baseSize * sizePulse * (0.7 + intensity * 0.6);
                    const alpha = 0.15 + intensity * 0.25;

                    // Draw large soft gradient blob
                    const gradient = auroraCtx.createRadialGradient(x, y, 0, x, y, size);
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.7})`);
                    gradient.addColorStop(0.2, `rgba(255, 255, 255, ${alpha * 0.4})`);
                    gradient.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.35})`);
                    gradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.15})`);
                    gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

                    auroraCtx.fillStyle = gradient;
                    auroraCtx.beginPath();
                    auroraCtx.arc(x, y, size, 0, Math.PI * 2);
                    auroraCtx.fill();
                }

                // Layer 2: Medium flowing shapes
                const mediumCount = isMobileView ? 8 : 18;
                const mediumSize = isMobileView ? 80 : 120;

                for (let i = 0; i < mediumCount; i++) {
                    const seed = i * 97.3 + 50;
                    const seed2 = i * 61.7 + 30;

                    const baseX = (Math.sin(seed * 0.2) * 0.5 + 0.5) * width;
                    const baseY = (Math.cos(seed2 * 0.2) * 0.5 + 0.5) * height;

                    // Wave interference
                    const wave = Math.sin(baseX * 0.008 + t) * Math.cos(baseY * 0.006 + t * 0.8);
                    const intensity = (wave + 1) / 2;

                    if (intensity > 0.4) {
                        const flowX = Math.sin(t * 0.5 + seed) * 50;
                        const flowY = Math.cos(t * 0.4 + seed2) * 45;
                        const x = baseX + flowX;
                        const y = baseY + flowY;

                        const colorIndex = Math.floor((x / width) * COLORS.length) % COLORS.length;
                        const color = COLORS[Math.abs(colorIndex)];

                        const size = mediumSize * (0.6 + intensity * 0.8);
                        const alpha = (intensity - 0.4) * 0.6;

                        const gradient = auroraCtx.createRadialGradient(x, y, 0, x, y, size);
                        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
                        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${alpha * 0.4})`);
                        gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.3})`);
                        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

                        auroraCtx.fillStyle = gradient;
                        auroraCtx.beginPath();
                        auroraCtx.arc(x, y, size, 0, Math.PI * 2);
                        auroraCtx.fill();
                    }
                }

                // Layer 3: Small bright accents (subtle highlights)
                const accentCount = isMobileView ? 10 : 20;

                for (let i = 0; i < accentCount; i++) {
                    const seed = i * 47.3;
                    const seed2 = i * 31.7;

                    const px = (Math.sin(seed) * 0.5 + 0.5) * width;
                    const py = (Math.cos(seed2) * 0.5 + 0.5) * height;

                    const wave = Math.sin(px * 0.01 + t * 1.2) * Math.cos(py * 0.008 + t);
                    const brightness = (wave + 1) / 2;

                    if (brightness > 0.6) {
                        const moveX = Math.sin(t * 0.5 + seed) * 30;
                        const moveY = Math.cos(t * 0.4 + seed2) * 25;
                        const x = px + moveX;
                        const y = py + moveY;

                        const colorIndex = Math.floor((x / width) * COLORS.length) % COLORS.length;
                        const color = COLORS[Math.abs(colorIndex)];

                        const spotAlpha = (brightness - 0.6) * 0.8;
                        const spotSize = 40 + brightness * 50;

                        const spotGradient = auroraCtx.createRadialGradient(x, y, 0, x, y, spotSize);
                        spotGradient.addColorStop(0, `rgba(255, 255, 255, ${spotAlpha * 0.9})`);
                        spotGradient.addColorStop(0.3, `rgba(255, 255, 255, ${spotAlpha * 0.5})`);
                        spotGradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${spotAlpha * 0.3})`);
                        spotGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

                        auroraCtx.fillStyle = spotGradient;
                        auroraCtx.beginPath();
                        auroraCtx.arc(x, y, spotSize, 0, Math.PI * 2);
                        auroraCtx.fill();
                    }
                }
            } // End of soft water caustic

            // ==================== SUBTLE BRIGHT ACCENTS ====================
            if (!isMobile()) {
            const accentCount = 8;
            for (let i = 0; i < accentCount; i++) {
                const seed = i * 173.7;
                const colIndex = i % numColumns;
                const accentX = (colIndex + 0.5) * columnWidth + Math.sin(time * 0.001 + seed) * 30;
                const accentY = height * (0.3 + Math.sin(seed) * 0.15);

                const accentCycle = (time * 0.002 + seed * 0.5) % (Math.PI * 2);
                const accentIntensity = Math.pow(Math.max(0, Math.sin(accentCycle)), 3) * 0.6;

                if (accentIntensity > 0.05) {
                    const color = COLORS[colIndex % COLORS.length];
                    const accentSize = 60 + (seed % 40);

                    const accentGradient = auroraCtx.createRadialGradient(
                        accentX, accentY, 0,
                        accentX, accentY, accentSize
                    );
                    accentGradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 * accentIntensity})`);
                    accentGradient.addColorStop(0.2, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 * accentIntensity})`);
                    accentGradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.1 * accentIntensity})`);
                    accentGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

                    auroraCtx.fillStyle = accentGradient;
                    auroraCtx.beginPath();
                    auroraCtx.arc(accentX, accentY, accentSize, 0, Math.PI * 2);
                    auroraCtx.fill();
                }
            }

            } // End of accents (desktop only)

            // ==================== STREAMING RAYS ====================
            if (!isMobile()) {
            // Additional thin streaming light rays - more prominent
            const rayCount = 40;
            for (let i = 0; i < rayCount; i++) {
                const seed = i * 97.3;
                const rayX = (i / rayCount) * width + Math.sin(time * 0.001 + seed) * 40;
                const colIndex = Math.floor((rayX / width) * COLORS.length);
                const color = COLORS[Math.abs(colIndex) % COLORS.length];

                const rayAlpha = (Math.sin(time * 0.004 + seed) * 0.5 + 0.5) * 0.35;
                const rayLength = height * (0.7 + Math.sin(seed * 0.3) * 0.2);
                const rayStart = height * 0.02 + Math.sin(seed) * height * 0.08;

                const rayGradient = auroraCtx.createLinearGradient(rayX, rayStart, rayX, rayStart + rayLength);
                rayGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                rayGradient.addColorStop(0.15, `rgba(255, 255, 255, ${rayAlpha * 0.8})`);
                rayGradient.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, ${rayAlpha})`);
                rayGradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${rayAlpha * 0.5})`);
                rayGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

                auroraCtx.strokeStyle = rayGradient;
                auroraCtx.lineWidth = 2.5;
                auroraCtx.beginPath();
                auroraCtx.moveTo(rayX, rayStart);
                auroraCtx.lineTo(rayX + Math.sin(time * 0.002 + seed) * 8, rayStart + rayLength);
                auroraCtx.stroke();
            }

            } // End of streaming rays (desktop only)

            // ==================== HOVER RIPPLE EFFECT ====================
            const now = Date.now();
            ripplesRef.current = ripplesRef.current.filter(ripple => {
                const age = now - ripple.startTime;
                const duration = 1500; // 1.5 seconds
                if (age > duration) return false;

                const progress = age / duration;
                const radius = ripple.maxRadius * progress;
                const alpha = (1 - progress) * 0.5;

                // Draw expanding ripple ring
                const rippleGradient = auroraCtx.createRadialGradient(
                    ripple.x, ripple.y, radius * 0.8,
                    ripple.x, ripple.y, radius
                );
                rippleGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                rippleGradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.8})`);
                rippleGradient.addColorStop(0.7, `rgba(${ripple.color.r}, ${ripple.color.g}, ${ripple.color.b}, ${alpha})`);
                rippleGradient.addColorStop(1, `rgba(${ripple.color.r}, ${ripple.color.g}, ${ripple.color.b}, 0)`);

                auroraCtx.fillStyle = rippleGradient;
                auroraCtx.beginPath();
                auroraCtx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
                auroraCtx.fill();

                // Inner glow
                const innerAlpha = (1 - progress) * 0.3;
                const innerGlow = auroraCtx.createRadialGradient(
                    ripple.x, ripple.y, 0,
                    ripple.x, ripple.y, radius * 0.5
                );
                innerGlow.addColorStop(0, `rgba(255, 255, 255, ${innerAlpha})`);
                innerGlow.addColorStop(0.5, `rgba(${ripple.color.r}, ${ripple.color.g}, ${ripple.color.b}, ${innerAlpha * 0.5})`);
                innerGlow.addColorStop(1, `rgba(${ripple.color.r}, ${ripple.color.g}, ${ripple.color.b}, 0)`);

                auroraCtx.fillStyle = innerGlow;
                auroraCtx.beginPath();
                auroraCtx.arc(ripple.x, ripple.y, radius * 0.5, 0, Math.PI * 2);
                auroraCtx.fill();

                return true;
            });

            auroraCtx.globalCompositeOperation = 'source-over';

            // ==================== SPARKLE CANVAS (Mouse hover only) ====================
            sparkleCtx.clearRect(0, 0, width, height);

            if (sparkleReveal > 0.01) {
                const mouseX = mousePixel.current.x;
                const mouseY = mousePixel.current.y;
                const revealRadius = 250; // Radius around mouse where sparkles appear

                sparklesRef.current.forEach((sparkle) => {
                    // Calculate distance from mouse
                    const dx = sparkle.x - mouseX;
                    const dy = sparkle.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Only show sparkles within reveal radius
                    if (dist < revealRadius) {
                        const distFactor = 1 - (dist / revealRadius);
                        const twinkle = Math.sin(time * sparkle.speed * 0.005 + sparkle.phase);
                        const twinkle2 = Math.sin(time * sparkle.speed * 0.008 + sparkle.phase * 1.3);
                        const combinedTwinkle = (twinkle + twinkle2) / 2;

                        if (combinedTwinkle > 0.2) {
                            const baseAlpha = (combinedTwinkle - 0.2) * 1.25 * sparkle.brightness;
                            const alpha = baseAlpha * distFactor * sparkleReveal;
                            const size = sparkle.size * (0.5 + combinedTwinkle * 0.5);

                            const { color } = sparkle;

                            // Tiny glow
                            const glowSize = size * 3;
                            const glow = sparkleCtx.createRadialGradient(
                                sparkle.x, sparkle.y, 0,
                                sparkle.x, sparkle.y, glowSize
                            );
                            glow.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.5})`);
                            glow.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.15})`);
                            glow.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

                            sparkleCtx.fillStyle = glow;
                            sparkleCtx.beginPath();
                            sparkleCtx.arc(sparkle.x, sparkle.y, glowSize, 0, Math.PI * 2);
                            sparkleCtx.fill();

                            // Bright tiny core
                            sparkleCtx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
                            sparkleCtx.beginPath();
                            sparkleCtx.arc(sparkle.x, sparkle.y, size * 0.6, 0, Math.PI * 2);
                            sparkleCtx.fill();
                        }
                    }
                });
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            sparkleCanvas.removeEventListener('mouseenter', handleMouseEnter);
            sparkleCanvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <div className={`absolute inset-0 w-full h-full ${className}`}>
            <canvas
                ref={auroraCanvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    background: '#000000',
                    filter: 'blur(30px) contrast(1.4) brightness(1.15) saturate(1.5)',
                }}
            />
            <canvas
                ref={sparkleCanvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    mixBlendMode: 'screen',
                }}
            />
        </div>
    );
};

export default AuroraBeamBackground;
