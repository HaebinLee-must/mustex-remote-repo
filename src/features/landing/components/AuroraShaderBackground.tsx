import React, { useEffect, useRef } from 'react';

const AuroraShaderBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error("WebGL을 사용할 수 없습니다.");
            return;
        }

        const vertexSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragmentSource = `
            precision highp float;

            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;

            // Simplex 2D Noise 함수
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ;
                m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                
                // 화면 비율 보정
                float ratio = u_resolution.x / u_resolution.y;
                vec2 pos = uv;
                pos.x *= ratio;
                
                vec2 mousePos = u_mouse / u_resolution.xy;
                mousePos.x *= ratio;

                float t = u_time * 0.15;

                // 마우스 거리 계산 (마우스 주변에 반응)
                float dist = distance(pos, mousePos);
                float mouseInfluence = smoothstep(0.8, 0.0, dist);

                // 노이즈 조합 (오로라 형태)
                float n = snoise(pos * 1.2 + t + (mouseInfluence * 0.5));
                n += 0.5 * snoise(pos * 2.5 - t * 1.2 + (mouseInfluence * 0.3));
                n += 0.25 * snoise(pos * 5.0 + t);

                // 오로라 색상 팔레트
                vec3 baseColor = vec3(0.05, 0.02, 0.15); // 깊은 밤하늘색
                vec3 colorPurple = vec3(0.4, 0.2, 0.8);  // 보라색
                vec3 colorPink = vec3(0.7, 0.3, 0.9);    // 핑크/마젠타
                vec3 colorCyan = vec3(0.2, 0.5, 1.0);    // 밝은 파랑

                // 노이즈 밀도에 따라 색상 혼합
                vec3 aurora = mix(colorPurple, colorPink, n);
                aurora = mix(aurora, colorCyan, snoise(pos * 0.5 - t));
                
                // 마우스 근처 발광 효과
                aurora += colorCyan * (mouseInfluence * 0.4);

                // 최종 색상 계산
                float intensity = smoothstep(-0.2, 0.8, n);
                
                // 상하 마스킹 (기존)
                intensity *= smoothstep(0.0, 0.5, uv.y) * smoothstep(1.0, 0.5, uv.y);

                // 중안부(타이틀 영역) 밝기 및 애니메이션 최소화
                // y축 중앙(0.5)을 기준으로 멀어질수록 밝아지게 설정 (중앙은 어둡게)
                float centerMask = smoothstep(0.0, 0.4, abs(uv.y - 0.5));
                // 중앙부는 원래 밝기의 10%만 유지하고, 주변부는 1.5배로 강화
                intensity *= (0.1 + 1.4 * centerMask);
                
                vec3 finalColor = mix(baseColor, aurora, intensity);
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        function createShader(gl: WebGLRenderingContext, type: number, source: string) {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const program = gl.createProgram();
        if (!program) return;

        const vs = createShader(gl, gl.VERTEX_SHADER, vertexSource);
        const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
        if (!vs || !fs) return;

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1
        ]), gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        const timeLoc = gl.getUniformLocation(program, "u_time");
        const resLoc = gl.getUniformLocation(program, "u_resolution");
        const mouseLoc = gl.getUniformLocation(program, "u_mouse");

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentMouseX = mouseX;
        let currentMouseY = mouseY;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = window.innerHeight - e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl!.viewport(0, 0, canvas.width, canvas.height);
        }
        window.addEventListener('resize', resize);
        resize();

        let animationFrameId: number;
        function render(now: number) {
            currentMouseX += (mouseX - currentMouseX) * 0.1;
            currentMouseY += (mouseY - currentMouseY) * 0.1;

            gl!.uniform1f(timeLoc, now * 0.001);
            gl!.uniform2f(resLoc, canvas!.width, canvas!.height);
            gl!.uniform2f(mouseLoc, currentMouseX, currentMouseY);

            gl!.drawArrays(gl!.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        }

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full"
            style={{ position: 'absolute', top: 0, left: 0 }}
        />
    );
};

export default AuroraShaderBackground;