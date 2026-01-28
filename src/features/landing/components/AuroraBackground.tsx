import React, { useEffect, useRef } from 'react';

export const AuroraBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        // Vertex shader: Simple full-screen quad
        const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        // Fragment shader: Vivid Liquid Aurora (No Mouse Interaction)
        const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        st.x *= aspect;

        // Dynamic coordinate warping
        float t = u_time * 0.15;
        vec2 p = st;

        // Iterative layering for fluid effect (Domain Warping)
        // Removed mouse influence calculations
        for (float i = 1.0; i < 5.0; i++) {
            p.x += 0.4 / i * sin(i * 3.5 * p.y + t * 0.8);
            p.y += 0.4 / i * cos(i * 3.5 * p.x + t * 0.8);
        }

        // Color Logic - Vivid Unicorn Style
        // Calculate intensity based on warped coordinates
        float r = cos(p.x + p.y + 1.3) * 0.5 + 0.5;
        float g = sin(p.x + p.y + 2.0) * 0.5 + 0.5;
        float b = (sin(p.x * 1.5 + p.y) + cos(p.x + t)) * 0.5 + 0.5;

        // Vivid Color Palette
        vec3 deepPurple = vec3(0.08, 0.03, 0.15);  // Deep background
        vec3 vibrantViolet = vec3(0.45, 0.1, 0.85); // Main purple
        vec3 neonCyan = vec3(0.0, 0.8, 0.95);       // Bright highlight
        vec3 hotPink = vec3(0.9, 0.1, 0.5);         // Secondary highlight

        // Mixing the colors
        vec3 color = mix(deepPurple, vibrantViolet, r * 0.8);
        color = mix(color, neonCyan, g * b * 0.6); // Cyan glowing rivers
        color = mix(color, hotPink, r * g * 0.4);  // Pink accents

        // Add subtle grain/noise for texture
        float noise = fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
        color += (noise - 0.5) * 0.03;

        // Contrast boost
        color = pow(color, vec3(1.1));

        gl_FragColor = vec4(color, 1.0);
      }
    `;

        const createShader = (type: number, source: string) => {
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
        };

        const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);

        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW
        );

        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

        const resize = () => {
            if (!canvas) return;
            const displayWidth = canvas.clientWidth;
            const displayHeight = canvas.clientHeight;

            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
            }
        };
        window.addEventListener('resize', resize);
        resize();

        let startTime = performance.now();
        const render = () => {
            const currentTime = (performance.now() - startTime) / 1000;

            gl.uniform1f(timeLocation, currentTime);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            rafRef.current = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            style={{ background: '#0f172a' }}
        />
    );
};