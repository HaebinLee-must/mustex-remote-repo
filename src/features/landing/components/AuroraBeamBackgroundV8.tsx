import React, { useEffect, useRef } from 'react';

interface RGB {
    r: number;
    g: number;
    b: number;
}

interface AuroraBeam {
    id: number;
    groupId?: number;   // X좌표 기준 그룹 ID (애니메이션 동기화용, 내부 자동계산)
    colorKey: keyof typeof COLOR_CONFIG;
    x: number;          // 가로 위치 (0~1)
    y: number;          // 세로 위치 (0~1)
    z: number;          // 깊이감 (0~1, 마우스 반응도)
    width: number;      // 빔 너비
    scaleY: number;     // 수직 늘림 배수
    angle: number;      // 기울기 (라디안)
    blur: number;       // 개별 블러
    opacity: number;    // 개별 투명도 (0~1)
}

/**
 * [포인트 1: 컬러 라이브러리 (HSB)]
 */
const COLOR_CONFIG = {
    MINT: { h: 162, s: 100, b: 100 },
    CYAN: { h: 184, s: 100, b: 100 },
    LIME: { h: 60, s: 70, b: 100 },
    WHITE: { h: 0, s: 0, b: 100 },
    PURPLE: { h: 273, s: 84, b: 100 },
    PINK: { h: 322, s: 100, b: 100 }
};

/**
 * [포인트 2: 마스터 빔 리스트 (피그마 레이어처럼 제어)]
 * 여기서 각 빛기둥의 속성을 개별적으로 수정하여 완벽한 구도를 잡을 수 있습니다.
 * 
 * [속성 가이드]
 * - colorKey: 색상 이름 (COLOR_CONFIG 참조)
 * - x: 가로 위치 (0: 왼쪽 끝, 1: 오른쪽 끝, -0.5 ~ 1.5 범위 권장)
 * - y: 세로 위치 (0.5가 화면 중앙 기준선)
 * - z: 깊이감 (0: 완전 후면, 1: 완전 전면 - 마우스 반응도와 밝기에 영향)
 * - width: 빔의 두께 (단위: px)
 * - scaleY: 빔을 수직으로 늘리는 배수 (높을수록 날카로운 광선 느낌)
 * - angle: 기울기 (단위: 라디안. -0.5 ~ 0.5 사이 권장. 0은 수직)
 * - blur: 번짐 정도 (단위: px. 높을수록 뽀얗게 변함)
 * - opacity: 빔 고유 농도 (0: 투명, 1: 불투명)
 * 
 * *팁: 리스트의 뒤에 배치된 빔일수록 화면상 가장 앞에(위쪽 레이어) 나타납니다.
 */
const BEAMS_MASTER: Omit<AuroraBeam, 'id' | 'groupId'>[] = [
    // [후면부 포인트 광선들 - 레이어 뒤쪽]
    { colorKey: 'WHITE', x: 0.25, y: 0.6, z: 0.3, width: 450, scaleY: 5, angle: 0.3, blur: 50, opacity: 0.2 },
    { colorKey: 'PINK', x: 0.5, y: 0.6, z: 0.2, width: 350, scaleY: 5, angle: 0.3, blur: 50, opacity: 0.9 },
    { colorKey: 'LIME', x: 0.15, y: 0.6, z: 0.4, width: 400, scaleY: 6, angle: -0.3, blur: 65, opacity: 0.3 },
    { colorKey: 'CYAN', x: 0.19, y: 0.6, z: 0.9, width: 350, scaleY: 5, angle: 0.3, blur: 60, opacity: 0.4 },
    { colorKey: 'PURPLE', x: 0.85, y: 0.6, z: 0.2, width: 500, scaleY: 10, angle: 0.4, blur: 60, opacity: 0.8 },
    { colorKey: 'PINK', x: 0.65, y: 0.2, z: 0.4, width: 400, scaleY: 6, angle: -0.3, blur: 65, opacity: 0.4 },
    { colorKey: 'PURPLE', x: 0.95, y: 0.6, z: 0.2, width: 350, scaleY: 5, angle: -0.1, blur: 50, opacity: 0.4 },


    // [전면부 메인 광선들 - 레이어 앞쪽]
    { colorKey: 'MINT', x: 0.01, y: 0.6, z: 0.9, width: 600, scaleY: 8, angle: 0.3, blur: 40, opacity: 0.6 },
    { colorKey: 'CYAN', x: 0.05, y: 0.7, z: 0.7, width: 300, scaleY: 8, angle: -0.35, blur: 35, opacity: 0.9 },
    { colorKey: 'PINK', x: 0.08, y: 0.6, z: 1, width: 250, scaleY: 6, angle: -0.35, blur: 30, opacity: 0.8 },
    { colorKey: 'LIME', x: 0.16, y: 0.6, z: 0.8, width: 300, scaleY: 8, angle: -0.15, blur: 35, opacity: 0.5 },
    { colorKey: 'PINK', x: 0.19, y: 0.6, z: 0.3, width: 450, scaleY: 5, angle: 0.3, blur: 50, opacity: 0.4 },
    { colorKey: 'CYAN', x: 0.32, y: 0.6, z: 0.7, width: 750, scaleY: 8, angle: 0, blur: 35, opacity: 0.6 },
    { colorKey: 'PURPLE', x: 0.35, y: 0.4, z: 0.4, width: 350, scaleY: 3, angle: -0.45, blur: 30, opacity: 0.8 },
    { colorKey: 'CYAN', x: 0.50, y: 0.6, z: 0.9, width: 600, scaleY: 10, angle: 0.1, blur: 25, opacity: 0.6 },
    { colorKey: 'CYAN', x: 0.75, y: 0.6, z: 0.7, width: 500, scaleY: 8, angle: -0.1, blur: 30, opacity: 1 },
    { colorKey: 'PINK', x: 0.850, y: 0.2, z: 0.5, width: 750, scaleY: 8, angle: 0.1, blur: 60, opacity: 0.6 },
    { colorKey: 'CYAN', x: 0.60, y: 0.1, z: 0.7, width: 450, scaleY: 4, angle: 0.15, blur: 20, opacity: 0.6 },
    { colorKey: 'LIME', x: 0.60, y: 0.6, z: 0.8, width: 300, scaleY: 6, angle: 0.05, blur: 30, opacity: 0.3 },
    { colorKey: 'PURPLE', x: 0.97, y: 0.6, z: 0.9, width: 600, scaleY: 8, angle: 0.3, blur: 30, opacity: 0.6 },
    { colorKey: 'MINT', x: 0.75, y: 0.6, z: 0.4, width: 300, scaleY: 8, angle: -0.35, blur: 20, opacity: 0.2 },
    { colorKey: 'LIME', x: 0.70, y: 0.6, z: 0.8, width: 300, scaleY: 8, angle: -0.15, blur: 30, opacity: 0.2 },

];

// HSB를 RGB로 변환하는 유틸리티
const hsbToRgb = (h: number, s: number, b: number): RGB => {
    s /= 100;
    b /= 100;
    const k = (n: number) => (n + h / 60) % 6;
    const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return {
        r: Math.round(255 * f(5)),
        g: Math.round(255 * f(3)),
        b: Math.round(255 * f(1))
    };
};

/**
 * [포인트 3: 애니메이션 설정]
 * 밝기가 일렁이는 속도와 폭을 조절합니다.
 */
const OPACITY_ANIMATION = {
    speed: 0.0008,      // 일렁이는 속도 (낮을수록 느림)
    amplitude: 0.15     // 변화 폭 (0.35면 기준값에서 ±0.35만큼 변동)
};

/**
 * [포인트 4: 디바이스별 레이아웃 보정]
 */
const DEVICE_SETTINGS = {
    mobile: { breakpoint: 768, contrast: 1.2, brightness: 1.1 },
    tablet: { breakpoint: 1024, contrast: 1.3, brightness: 1.1 },
    desktop: { contrast: 1.5, brightness: 1.1 }
};

export const AuroraBeamBackgroundV8: React.FC<{ className?: string }> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const targetMouse = useRef({ x: 0, y: 0 });
    const currentMouse = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(0);
    const beamsRef = useRef<AuroraBeam[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const updateDeviceSettings = (w: number) => {
            const device = w < DEVICE_SETTINGS.mobile.breakpoint ? 'mobile' :
                w < DEVICE_SETTINGS.tablet.breakpoint ? 'tablet' : 'desktop';
            const settings = DEVICE_SETTINGS[device];
            canvas.style.filter = `contrast(${settings.contrast}) brightness(${settings.brightness})`;

            // 마스터 리스트를 기반으로 빔 초기화
            beamsRef.current = BEAMS_MASTER.map((m, i) => {
                // X좌표에 따라 4개의 그룹으로 분류 (0~0.25: 0, 0.25~0.5: 1, ...)
                const groupId = Math.min(3, Math.floor(Math.max(0, m.x) * 4));
                return {
                    ...m,
                    id: i,
                    groupId: groupId
                } as AuroraBeam;
            });
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            updateDeviceSettings(width);
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

            // Z값 순서대로 렌더링하여 깊이감 유지
            const sortedBeams = [...beamsRef.current].sort((a, b) => a.z - b.z);

            sortedBeams.forEach((beam) => {
                const colorCfg = COLOR_CONFIG[beam.colorKey];
                const { r, g, b } = hsbToRgb(colorCfg.h, colorCfg.s, colorCfg.b);

                // 개별 블러 적용
                ctx.filter = `blur(${beam.blur}px)`;

                const parallaxX = currentMouse.current.x * beam.z * 150;
                const parallaxY = currentMouse.current.y * beam.z * 50;

                const renderX = beam.x * width + parallaxX;
                const renderY = beam.y * height + parallaxY;

                ctx.save();
                ctx.translate(renderX, renderY);
                ctx.rotate(beam.angle);
                ctx.scale(1, beam.scaleY);

                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, beam.width / 2);

                // [동적 Opacity 애니메이션 적용]
                const time = Date.now();
                // 그룹별로 시간 차(groupId * 1.5)를 주어 일렁임이 겹치지 않게 함
                const groupId = beam.groupId || 0;
                const pulse = Math.sin(time * OPACITY_ANIMATION.speed + groupId * 1.5);
                const dynamicOpacity = Math.max(0.1, beam.opacity + (pulse * OPACITY_ANIMATION.amplitude));

                const alpha = dynamicOpacity * (0.5 + beam.z * 0.5);

                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`);
                gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.ellipse(0, 0, beam.width, beam.width * 1.3, 0, 0, Math.PI * 2);
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
            style={{ willChange: 'filter' }}
        />
    );
};