import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { SmokeParticles } from "./smoke-particles";



interface FeatureItemProps {
  name: string;
  value: string;
  position: string;
  onClick?: () => void;
  href?: string;
}

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

const Lightning: React.FC<LightningProps> = ({
  hue = 230,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
    `;
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      #define OCTAVE_COUNT 4
      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }
      float hash11(float p) {
          p = fract(p * .1031); p *= p + 33.33; p *= p + p; return fract(p);
      }
      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }
      mat2 rotate2d(float theta) {
          float c = cos(theta); float s = sin(theta); return mat2(c, -s, s, c);
      }
      float noise(vec2 p) {
          vec2 ip = floor(p); vec2 fp = fract(p);
          float a = hash12(ip); float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0)); float d = hash12(ip + vec2(1.0, 1.0));
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }
      float fbm(vec2 p) {
          float value = 0.0; float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45); p *= 2.0; amplitude *= 0.5;
          }
          return value;
      }
      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          fragColor = vec4(col, 1.0);
      }
      void main() { mainImage(gl_FragColor, gl_FragCoord.xy); }
    `;
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uHueLocation = gl.getUniformLocation(program, "uHue");
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
    const uSizeLocation = gl.getUniformLocation(program, "uSize");
    const startTime = performance.now();
    let animationFrameId: number;
    const render = () => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(iTimeLocation, (performance.now() - startTime) / 1000.0);
      gl.uniform1f(uHueLocation, hue);
      gl.uniform1f(uXOffsetLocation, xOffset);
      gl.uniform1f(uSpeedLocation, speed);
      gl.uniform1f(uIntensityLocation, intensity);
      gl.uniform1f(uSizeLocation, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => { 
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(vertexBuffer);
    };
  }, [hue, xOffset, speed, intensity, size]);
  return <canvas ref={canvasRef} className="w-full h-full relative" />;
};

const FeatureItem: React.FC<FeatureItemProps> = ({ name, value, position, onClick, href }) => {
  const content = (
    <div className="flex items-center gap-2 relative">
      <div className="relative">
        <div className="w-2 h-2 bg-white rounded-full group-hover:animate-pulse"></div>
        <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="text-white relative">
        <div className="font-medium group-hover:text-white transition-colors duration-300">{name}</div>
        <div className="text-white/70 text-sm group-hover:text-white/70 transition-colors duration-300">{value}</div>
        <div className="absolute -inset-2 bg-white/10 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>
    </div>
  );

  const className = `absolute ${position} z-10 group transition-all duration-300 hover:scale-110 ${(onClick || href) ? 'cursor-pointer' : ''}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} onClick={onClick}>
      {content}
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightningHue, setLightningHue] = useState(195);
  const [comingSoonService, setComingSoonService] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Oscillate within the energetic electric blue/cyan spectrum (195 - 215)
      setLightningHue((prev) => (prev === 195 ? 215 : 195));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for tattoo machine tilting
  const mouseX = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 25 };
  const smoothMouseX = useSpring(mouseX, springConfig);

  // Tilt angle based on mouse X position relative to screen center
  const tiltRotation = useTransform(smoothMouseX, (x: number) => {
    if (typeof window === 'undefined') return 0;
    const center = window.innerWidth / 2;
    const offset = (x - center) / (window.innerWidth / 2);
    // Tilt up to 35 degrees
    return offset * 35;
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
  };
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <AnimatePresence>
        {comingSoonService && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 cursor-pointer"
            onClick={() => setComingSoonService(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-black/80 border border-white/10 p-8 rounded-3xl text-center max-w-sm mx-4 shadow-2xl backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>
              </div>
              <h3 className="text-3xl font-light mb-3 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent">
                {comingSoonService}
              </h3>
              <p className="text-gray-400 mb-8 font-light leading-relaxed">
                Coming Soon! We are currently crafting beautiful designs and experiences for this service. Stay tuned.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setComingSoonService(null)}
                className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Got it
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-screen">
        {/* Navigation removed and replaced by global Navbar */}

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className="absolute inset-0 z-[200] pointer-events-none">
          <motion.div variants={itemVariants}><FeatureItem name="Tattoo" value="Custom Ink" position="left-[5%] top-[72%] sm:left-[15%] sm:top-[68%] pointer-events-auto" href="/gallery/tattoos" /></motion.div>
          <motion.div variants={itemVariants}><FeatureItem name="Piercing" value="Body Art" position="left-[20%] top-[53%] sm:left-[30%] sm:top-[50%] pointer-events-auto" href="/gallery/piercings" /></motion.div>
          <motion.div variants={itemVariants}><FeatureItem name="Nail Art" value="Styling" position="right-[20%] top-[53%] sm:right-[30%] sm:top-[50%] pointer-events-auto" onClick={() => setComingSoonService('Nail Art')} /></motion.div>
          <motion.div variants={itemVariants}><FeatureItem name="Tattoo Removal" value="Laser" position="right-[5%] top-[72%] sm:right-[15%] sm:top-[68%] pointer-events-auto" onClick={() => setComingSoonService('Tattoo Removal')} /></motion.div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className="relative z-30 flex flex-col items-center text-center max-w-4xl mx-auto pt-24 md:pt-32">

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-light mb-2 tracking-widest uppercase">
            Ink Nation
          </motion.h1>
          <motion.h2 variants={itemVariants}
            className="text-3xl md:text-5xl pb-3 font-light bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent">
            We Don't Just Tattoo. We Transcend.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 mb-9 max-w-2xl">
            Premium tattoo studio in Bangalore. Book your consultation and wear your story forever.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-[100px] sm:mt-[100px] relative z-40">
            <Link href="/gallery/tattoos">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                Explore Our Work
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-cyan-500/25 to-blue-600/10 blur-3xl"></div>
        <div className="absolute top-0 w-[100%] left-1/2 transform -translate-x-1/2 h-full">
          <Lightning hue={lightningHue} xOffset={0} speed={1.6} intensity={0.6} size={2} />
        </div>

        {/* Custom looping canvas smoke particles */}
        <SmokeParticles />

        {/* The Globe Backdrop */}
        <div className="z-10 absolute top-[55%] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] backdrop-blur-3xl rounded-full bg-[radial-gradient(circle_at_25%_90%,_#092644_15%,_#000000de_70%,_#000000ed_100%)]"></div>

        {/* Floating Tattoo Machine - Perfectly contained in globe */}
        <motion.div
          style={{
            rotate: tiltRotation,
            transformOrigin: "bottom center",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
          className="absolute top-[65%] left-1/2 -ml-[150px] z-[15] w-[300px] h-[300px] flex items-center justify-center pointer-events-none mix-blend-screen pb-6"


        >
          <img
            src="/tattoo-machine-new.png"
            alt="Premium Rotary Tattoo Machine"
            className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)] rotate-90"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
