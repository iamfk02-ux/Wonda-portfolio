import React, { useEffect, useRef } from 'react';

interface SilkRibbonShaderProps {
  className?: string;
}

export const SilkRibbonShader: React.FC<SilkRibbonShaderProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.65, y: 0.45, targetX: 0.65, targetY: 0.45 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
      depth: false,
      stencil: false,
    });

    if (!gl) return;

    // Track mouse coordinates across the entire window for seamless interactivity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        // Normalize 0.0 (left/bottom in WebGL) to 1.0 (right/top)
        const normX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const normY = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height));
        mouseRef.current.targetX = normX;
        mouseRef.current.targetY = normY;
      }
    };

    // Touch support for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const normX = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
          const normY = Math.max(0, Math.min(1, 1.0 - (touch.clientY - rect.top) / rect.height));
          mouseRef.current.targetX = normX;
          mouseRef.current.targetY = normY;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Fluted Glass Ribbed Columns + Viscous Burnt Orange Fluid Gradient
    // Matches the uploaded wallpaper image with interactive cursor-driven fluid displacement
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Hash and simplex-style value noise
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

      // Fractional Brownian Motion for silky fluid warping
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.52;
        mat2 rot = mat2(cos(0.55), sin(0.55), -sin(0.55), cos(0.55));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.1 + vec2(1.7, 9.2);
          a *= 0.48;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;

        // Interactive mouse physics field
        vec2 m = u_mouse;
        vec2 delta = (st - m) * vec2(aspect, 1.0);
        float mouseDist = length(delta);
        
        // Soft gaussian push field around cursor
        float mouseInfluence = exp(-mouseDist * 2.6);
        vec2 mouseWarp = normalize(delta + vec2(0.0001)) * mouseInfluence * 0.09;

        // Slow, luxurious fluid time
        float t = u_time * 0.18;

        // Fluid domain warping
        vec2 p = st * vec2(aspect * 0.85, 1.1) + vec2(0.0, -t * 0.35);
        p -= mouseWarp * 1.5;

        // Primary fluid motion layers
        float q = fbm(p + vec2(0.0, t * 0.2));
        float r = fbm(p + vec2(q * 1.4, -q * 1.1) + vec2(t * 0.15, 0.0));
        float fluidField = fbm(p + vec2(r * 1.8, r * 1.2));

        // VERTICAL FLUTED GLASS PLEATS (Matching uploaded image)
        // High density vertical cylindrical flutes running down the frame
        float fluteDensity = 48.0 * max(1.0, aspect * 0.75);
        
        // Fluid displacement bends the vertical ribs gracefully
        float ribDisplacement = (r - 0.5) * 0.08 + (fluidField - 0.5) * 0.06 - mouseWarp.x * 0.8;
        float ribPhase = (st.x + ribDisplacement) * fluteDensity;

        // Fluted cylindrical optics: ridge highlights and valley shadows
        float ribSin = sin(ribPhase);
        float ribCos = cos(ribPhase);
        float ribHighlight = pow(clamp(ribCos * 0.5 + 0.5, 0.0, 1.0), 3.2);
        float ribGroove = pow(clamp(-ribCos * 0.5 + 0.5, 0.0, 1.0), 1.8);
        float ribBevel = clamp(ribSin * 0.5 + 0.5, 0.0, 1.0);

        // COLOR PALETTE FROM UPLOADED IMAGE:
        // Pure noir deep background
        vec3 colNoir          = vec3(0.02, 0.02, 0.025);
        // Rich, glowing incandescent Burnt Orange (#FF5712 & #E84805)
        vec3 colBurntOrange   = vec3(1.0, 0.34, 0.07);
        // Deep molten amber-crimson shadow
        vec3 colEmberShadow   = vec3(0.68, 0.14, 0.02);
        // Warm fiery golden peach core highlight
        vec3 colAmberHighlight= vec3(1.0, 0.62, 0.14);
        // Cool smoky platinum / slate silver ribs (lower third of image)
        vec3 colSilverBase    = vec3(0.55, 0.58, 0.62);
        vec3 colSilverHighlight= vec3(0.85, 0.88, 0.92);

        // BURNT ORANGE FLUID LIGHT CORE
        // Positioned in mid-to-lower-right, dynamically attracted towards the mouse cursor
        vec2 lightCenter = mix(vec2(0.72, 0.36), m, 0.38);
        vec2 lightDistVec = (st - lightCenter) * vec2(aspect * 0.9, 1.15);
        float dLight = length(lightDistVec);

        // Volumetric fluid plume shape
        float plumeShape = smoothstep(0.85, 0.05, dLight - fluidField * 0.35 + mouseInfluence * 0.25);
        plumeShape = clamp(plumeShape, 0.0, 1.0);

        // Smoky silver fluted glass transition (dominant towards the bottom)
        float silverGradient = smoothstep(0.58, 0.02, st.y + (r - 0.5) * 0.2);
        silverGradient = clamp(silverGradient * (1.0 - plumeShape * 0.72), 0.0, 1.0);

        // Top-left pure pitch-black noir mask for effortless headline legibility
        float noirFalloff = smoothstep(0.18, 0.72, st.x + (1.0 - st.y) * 0.65 - (fluidField - 0.5) * 0.2);
        noirFalloff = clamp(noirFalloff + mouseInfluence * 0.3, 0.0, 1.0);

        // COMPOSITING THE SHADED FLUTED RIBS
        // 1. Silver / Platinum Rib Tone (bottom)
        vec3 silverRibs = mix(colNoir, colSilverBase, silverGradient * 0.85);
        silverRibs += colSilverHighlight * ribHighlight * silverGradient * 0.75;
        silverRibs *= (1.0 - ribGroove * 0.45);

        // 2. Incandescent Burnt Orange Fluid Core
        vec3 orangeFluid = mix(colEmberShadow, colBurntOrange, smoothstep(0.2, 0.8, plumeShape));
        orangeFluid = mix(orangeFluid, colAmberHighlight, smoothstep(0.65, 1.0, plumeShape));
        
        // Rib lighting catches the incandescent burnt orange
        orangeFluid += colAmberHighlight * ribHighlight * plumeShape * 0.95;
        orangeFluid *= (1.0 - ribGroove * 0.35);

        // Combine Silver Ribs with Burnt Orange Fluid
        vec3 compColor = mix(silverRibs, orangeFluid, plumeShape);

        // Apply deep pitch black noir mask on upper-left
        compColor = mix(colNoir, compColor, noirFalloff);

        // Subtle upper rib specular sheen in the dark zone (like reference image top-right)
        float upperSheen = smoothstep(0.4, 0.95, st.x) * smoothstep(0.4, 0.85, st.y);
        compColor += colSilverBase * ribHighlight * upperSheen * 0.25;

        // Interactive mouse aura: warm ember halo following cursor
        float cursorAura = exp(-mouseDist * 3.8) * 0.28;
        compColor += colBurntOrange * cursorAura;

        // Vignette on borders
        float vignette = smoothstep(0.0, 0.08, st.x) * smoothstep(1.0, 0.92, st.x)
                       * smoothstep(0.0, 0.06, st.y) * smoothstep(1.0, 0.94, st.y);
        compColor = mix(colNoir, compColor, vignette);

        // Delicate analog film grain
        float grain = (hash(st * 380.0 + fract(u_time * 1.5)) - 0.5) * 0.015;
        compColor += vec3(grain);

        gl_FragColor = vec4(compColor, 1.0);
      }
    `;

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

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');

    let animationFrameId: number;
    const startTime = performance.now();

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      handleResize();

      // Silky smooth mouse inertia lerp
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.065;
      m.y += (m.targetY - m.y) * 0.065;

      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, m.x, m.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};
