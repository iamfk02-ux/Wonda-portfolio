import React, { useEffect, useRef } from 'react';

interface FlutedGlassShaderProps {
  className?: string;
}

export const FlutedGlassShader: React.FC<FlutedGlassShaderProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    if (!gl) return;

    // Vertex shader source
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader: High-motion liquid gold spreading across canvas with fluted glass optics
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;

      // Noise and pseudo-random generators
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      // Fractional Brownian Motion for viscous liquid flow
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.55;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.05 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.y = 1.0 - st.y; // Natural orientation: top = 0.0, bottom = 1.0

        // Increased liquid speed & kinetic turbulence
        float t = u_time * 0.72;

        // Density of fluted glass ribs
        float ribDensity = u_resolution.x > 900.0 ? 100.0 : 60.0;
        float ribX = st.x * ribDensity;
        float ribFraction = fract(ribX);

        // Fluted cylindrical rib refraction & specular normals
        float ribNormal = sin(ribFraction * 6.2831853);
        float ribShading = 0.50 + 0.50 * cos(ribFraction * 6.2831853);
        float ribSpecular = pow(max(0.0, ribNormal), 2.5) * 0.65;

        // Domain-warped multi-octave liquid coordinates
        vec2 q = st;
        q.x += ribNormal * 0.007; // Physical light refraction through the glass flutes

        // Swirling liquid velocity vector field
        vec2 warpA = vec2(
          fbm(q * 2.2 + vec2(t * 0.35, -t * 0.28)),
          fbm(q * 2.2 + vec2(-t * 0.25, t * 0.32))
        );

        vec2 warpB = vec2(
          fbm(q * 3.0 + 3.0 * warpA + vec2(t * 0.45, -t * 0.40)),
          fbm(q * 3.0 + 3.0 * warpA + vec2(-t * 0.38, t * 0.42))
        );

        vec2 liquidPos = q + warpB * 0.38;

        // Multi-frequency caustic surges
        float c1 = sin(liquidPos.x * 4.5 + liquidPos.y * 3.5 + t * 1.1) * 0.5 + 0.5;
        float c2 = cos(liquidPos.y * 5.2 - liquidPos.x * 4.0 - t * 0.95) * 0.5 + 0.5;
        float c3 = fbm(liquidPos * 3.5 + vec2(t * 0.5, -t * 0.6));
        float c4 = sin((liquidPos.x + liquidPos.y) * 3.8 + t * 1.3) * 0.5 + 0.5;

        float liquidEnergy = (c1 * 0.35 + c2 * 0.30 + c3 * 0.20 + c4 * 0.15);
        liquidEnergy = pow(liquidEnergy, 1.45) * 1.85;

        // Website Yellow Brand Palette (#FFF200)
        vec3 colorElectricYellow  = vec3(1.0, 0.949, 0.0);   // #FFF200
        vec3 colorWarmAmber       = vec3(1.0, 0.64, 0.02);    // Rich golden amber
        vec3 colorDeepMoltenGold  = vec3(0.85, 0.38, 0.01);   // Deep molten core
        vec3 colorIncandescent    = vec3(1.0, 1.0, 0.72);     // Specular golden crest
        vec3 colorDarkBackground  = vec3(0.02, 0.02, 0.02);   // Deep black

        // Color blending with viscous liquid transitions
        vec3 liquidColor = mix(colorDeepMoltenGold, colorWarmAmber, smoothstep(0.20, 0.60, liquidEnergy));
        liquidColor = mix(liquidColor, colorElectricYellow, smoothstep(0.55, 0.92, liquidEnergy));
        liquidColor = mix(liquidColor, colorIncandescent, smoothstep(0.92, 1.40, liquidEnergy));

        // Modulate with vertical reeded glass flutes
        vec3 flutedLiquid = liquidColor * (ribShading * 0.85 + 0.15) + (colorIncandescent * ribSpecular * liquidEnergy);

        // STRATEGIC PLACEMENT:
        // The liquid spreads across the vast majority of the screen (top, right, bottom, center, edges)
        // BUT strategically provides a deep dark clearing where the text sits (left-center: x ~ 0.08 to 0.46, y ~ 0.32 to 0.68)
        vec2 textCenter = vec2(0.24, 0.50);
        vec2 textOffset = (st - textCenter) / vec2(0.24, 0.22);
        float textDistSq = dot(textOffset, textOffset);
        
        // Negative mask around text: 0.0 right on the text, smoothly ramping to 1.0 outside
        float textAvoidance = smoothstep(0.55, 1.35, textDistSq);

        // Edge presence: liquid spreads freely everywhere else
        float globalSpread = smoothstep(0.08, 0.45, st.x) * 0.65 + smoothstep(0.40, 0.85, st.x) * 0.35;
        // Dynamic liquid tongues surging through the page
        float liquidSurge = smoothstep(0.18, 0.70, liquidEnergy);
        
        // Final presence combines the text avoidance with widespread liquid presence
        float finalPresence = textAvoidance * max(globalSpread, liquidSurge * 0.75);

        // Soft viewport edge vignette
        float edgeVignette = smoothstep(0.0, 0.06, st.y) * smoothstep(1.0, 0.94, st.y);
        finalPresence *= edgeVignette;

        // Composite
        vec3 finalColor = mix(colorDarkBackground, flutedLiquid, clamp(finalPresence, 0.0, 1.0));

        // Subtle film grain
        float grain = (hash(st * 380.0 + fract(u_time * 2.0)) - 0.5) * 0.025;
        finalColor += vec3(grain);

        gl_FragColor = vec4(finalColor, finalPresence);
      }
    `;

    // Shader compilation helper
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
    };

    const render = (now: number) => {
      resize();
      const elapsed = (now - startTime) / 1000;

      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(timeLocation, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Atmospheric depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505] pointer-events-none" />
    </div>
  );
};
