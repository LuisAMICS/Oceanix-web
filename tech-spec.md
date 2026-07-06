# OCEANIX — Especificación Técnica

## Dependencias

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| react | ^18.3.0 | Framework UI |
| react-dom | ^18.3.0 | Renderizado DOM |
| vite | ^6.0.0 | Bundler |
| @vitejs/plugin-react | ^4.3.0 | Plugin Vite React |
| typescript | ^5.6.0 | Tipado estático |
| tailwindcss | ^4.0.0 | Estilos utilitarios |
| @tailwindcss/vite | ^4.0.0 | Plugin Tailwind Vite |
| gsap | ^3.12.0 | Motor de animaciones (ScrollTrigger incluido) |
| @studio-freight/lenis | ^1.0.0 | Smooth scroll |
| three | ^0.170.0 | Motor 3D / shaders de agua |
| @react-three/fiber | ^9.0.0 | Renderer React para Three.js |
| @react-three/drei | ^10.0.0 | Helpers R3F (useTexture, etc.) |
| three-custom-shader-material | ^6.3.0 | ShaderMaterial extendible para meshes |
| html2canvas | ^1.4.0 | Captura DOM para texturas 3D (reserva) |
| geist | ^1.3.0 | Fuente tipográfica |
| lucide-react | ^0.460.0 | Iconos UI |

## Inventario de Componentes

### Layout (persistentes)

| Componente | Fuente | Notas |
|------------|--------|-------|
| LenisProvider | Custom | Wrapper global que instancia Lenis y conecta con GSAP ScrollTrigger |
| FixedPreOrderButton | Custom | Pill button fijo en viewport, visible solo en secciones 2-4 |

### Secciones (page-level)

| Componente | Fuente | Notas |
|------------|--------|-------|
| HeroWaterSection | Custom | Canvas 3D fijo + contenido HTML superpuesto. Scroll bridge: 0-100vh |
| UnderwaterAssemblySection | Custom | Canvas 3D fijo + cards flotantes. Scroll bridge: 100-200vh |
| DaylightSection | Custom | Sección HTML normal (sin 3D), transición dramática de tema |
| TechnicalDeepDiveSection | Custom | SVG stroke drawing + stats tipográficos |
| FooterCTASection | Custom | Formulario pre-order + footer info |

### Componentes 3D (React Three Fiber)

| Componente | Fuente | Notas |
|------------|--------|-------|
| WaterSurfaceScene | Custom | Escena R3F con two-pass shader system. Render target para Pass 1 |
| CausticPlane | Custom | Mesh con CustomShaderMaterial. Recibe textura de Pass 1 |
| HydrofoilAssembly | Custom | GLTF con 5 grupos animados por scroll. Posiciones exploded → assembled |
| VolumetricLightShafts | Custom | Cones semitransparentes simulando god rays |

### Componentes Reutilizables

| Componente | Fuente | Usado por |
|------------|--------|-----------|
| GlassCard | Custom | UnderwaterAssemblySection, DaylightSection |
| ScrollIndicator | Custom | HeroWaterSection |
| SVGStrokeDraw | Custom | TechnicalDeepDiveSection |
| SpecBadge | Custom | UnderwaterAssemblySection |

## Plan de Animaciones

| Animación | Librería | Enfoque de Implementación | Complejidad |
|-----------|----------|---------------------------|-------------|
| 🔒 Water surface normal map (Pass 1) | Three.js (raw GLSL) | Shader fragment personalizado con Simplex noise 2D animado por tiempo. Render target offscreen. | **High** |
| 🔒 Caustic refraction (Pass 2) | Three.js + three-custom-shader-material | Muestrea textura de Pass 1, decodifica normals, aplica refract(), proyecta luz, calcula caustic intensity. | **High** |
| 🔒 Camera scroll bridge (Hero → Underwater) | GSAP ScrollTrigger | Timeline scrubbeada por scroll progress (0-1). Camera Y desciende, rota X para simular inmersión. | **High** |
| 🔒 Hydrofoil assembly by scroll | GSAP ScrollTrigger | Timeline con 5 tweens secuenciales. Cada parte se traslada de posición exploded a final. Scrub: true. | **High** |
| Volumetric god rays | Three.js | Conos con shader básico (gradiente vertical + fading edges). Rotación lenta continua. | **Medium** |
| SVG stroke drawing | GSAP + ScrollTrigger | Clonar path, calcular getTotalLength(), animar strokeDashoffset → 0. ToggleActions para reversibilidad. | **Medium** |
| Glass cards float | GSAP ScrollTrigger | Parallax vertical sutil (y: 30) + fade-in staggerado. | **Low** |
| Daylight theme transition | GSAP ScrollTrigger | Background-color tween de navy a cream. Inversión de text colors. Trigger: enter section. | **Low** |
| Hero text entrance | GSAP | SplitText en "OCEANIX" + fade-in stagger desde abajo. Reflejo parcial en agua vía shader. | **Medium** |
| Scroll indicator pulse | CSS | @keyframes translateY + opacity loop. | **Low** |
| Pre-order button hover | CSS | Transición scale + glow shadow. | **Low** |

## Estado y Lógica — Plan de Arquitectura

No se requiere state management global. La arquitectura es event-driven via scroll:

### Scroll Progress Bridge

El sistema más crítico es la sincronización Lenis → GSAP → Three.js:

1. **Lenis** emite evento `scroll` en cada frame con `progress` (0-1)
2. **GSAP ScrollTrigger** escucha via `ScrollTrigger.scrollerProxy()` o directamente usando Lenis como driver
3. **WaterScene** recibe `scrollProgress` como prop y lo mapea a:
   - `camera.position.y`: 5 (above) → -2 (underwater)
   - `camera.rotation.x`: 0 → -0.5 (mirar hacia arriba)
   - `uIntensity` (caustics): 0 → 1 (fade-in al sumergirse)

### Two-Pass Shader System

La arquitectura del shader de agua requiere render targets:

1. **Pass 1** (WaterSurfacePass): Scene separada con un fullscreen quad. Renderiza a `WebGLRenderTarget` cada frame.
2. **Pass 2** (CausticPlane): Mesh principal que muestrea la textura del render target como `uNoiseTexture`.

Esto debe implementarse usando `useFrame` en R3F con acceso al renderer y composer manual, o via vanilla Three.js dentro de un `useEffect` con canvas ref.

### Hydrofoil Scroll Assembly

Cada parte del GLTF tiene una posición "exploded" y "assembled" definida en el design. El progreso de scroll (0.5-1.0 range, mapeado a 0-1) drivea un GSAP timeline que interpola cada grupo:
- Board: Y+3 → Y=0
- Mast: Y+5, Z+2 → Y=0, Z=0
- Fuselage: Y+4, X-1 → Y=0, X=0
- Front Wing: Y+6, Z-3 → Y=0, Z=0
- Stabilizer: Y+7, Z+3 → Y=0, Z=0

## Otras Decisiones Clave

### Three.js Integration Pattern

El hero y underwater sections comparten un **mismo canvas fijo** (`position: fixed; inset: 0; z-index: 0`). Las secciones HTML normales (Daylight, Technical, Footer) tienen `position: relative; z-index: 1; background: solid` para ocultar el canvas fijo cuando se scrollea fuera de la zona 3D.

La visibilidad del canvas 3D se controla togglando `opacity` o `pointer-events` basado en el scroll progress (ocultar cuando progress > 0.8).

### Glassmorphism Strategy

Todos los GlassCards usan la misma clase base:
- `background: rgba(2, 62, 125, 0.25)`
- `backdrop-filter: blur(12px)`
- `border: 1px solid rgba(254, 250, 224, 0.1)` (sutil borde foam)
- `box-shadow: 0 0 20px rgba(72, 202, 228, 0.1)` (glow cyan tenue)

En DaylightSection, los colores del glass se invierten para mantener contraste sobre fondo claro.

### Performance Budget

- Canvas DPR: `[1, 1.5]` en R3F (capado en móvil)
- Render target del water shader: resolución reducida a 0.5x viewport en móvil
- GLTF: Draco-compressed, máximo 50k polígonos
- Lenis lerp: `0.1` (balance entre suavidad y responsividad)
