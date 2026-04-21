import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Box, Edges, Float, RoundedBox, Sphere, Torus } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const QUALITY_PRESETS = {
  low: {
    dpr: [1, 1.25],
    particles: 60,
    bloom: 0,
    bloomThreshold: 0.72,
    lightScale: 0.82,
    geometry: 0,
    extraHalo: false,
    showSideObjects: false,
  },
  medium: {
    dpr: [1, 1.5],
    particles: 140,
    bloom: 0.4,
    bloomThreshold: 0.6,
    lightScale: 1,
    geometry: 1,
    extraHalo: false,
    showSideObjects: true,
  },
  high: {
    dpr: [1, 1.85],
    particles: 210,
    bloom: 0.55,
    bloomThreshold: 0.52,
    lightScale: 1.16,
    geometry: 2,
    extraHalo: true,
    showSideObjects: true,
  },
  ultra: {
    dpr: [1, 2],
    particles: 280,
    bloom: 0.68,
    bloomThreshold: 0.48,
    lightScale: 1.28,
    geometry: 3,
    extraHalo: true,
    showSideObjects: true,
  },
}

function CoreRack({ detail = 1 }) {
  const ref = useRef()
  const pulseRef = useRef()
  const rackSmoothness = detail >= 2 ? 8 : 5
  const diodeSegments = detail >= 2 ? 16 : 10
  const pulseSegments = detail >= 2 ? 220 : 160

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!ref.current || !pulseRef.current) return
    ref.current.rotation.y = Math.sin(t * 0.28) * 0.18
    ref.current.rotation.x = Math.sin(t * 0.18) * 0.06
    pulseRef.current.scale.setScalar(1.08 + Math.sin(t * 1.8) * 0.025)
  })

  return (
    <group ref={ref}>
      <RoundedBox args={[1.18, 1.72, 0.72]} radius={0.045} smoothness={rackSmoothness}>
        <meshStandardMaterial
          color="#070a0f"
          emissive="#001624"
          emissiveIntensity={0.55}
          metalness={0.78}
          roughness={0.26}
        />
        <Edges color="#00d4ff" threshold={10} />
      </RoundedBox>

      {[-0.52, -0.25, 0.02, 0.29, 0.56].map((y, index) => (
        <group key={y} position={[0, y, 0.374]}>
          <Box args={[0.92, 0.055, 0.012]}>
            <meshBasicMaterial
              color={index % 2 === 0 ? '#00d4ff' : '#7b61ff'}
              transparent
              opacity={0.55}
            />
          </Box>
          <Sphere args={[0.027, diodeSegments, diodeSegments]} position={[0.49, 0, 0.012]}>
            <meshBasicMaterial color="#00ff88" transparent opacity={0.88} />
          </Sphere>
        </group>
      ))}

      <Torus ref={pulseRef} args={[1.03, 0.008, 12, pulseSegments]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.24} />
      </Torus>
    </group>
  )
}

function DataPanel({ mousePos, detail = 1 }) {
  const ref = useRef()
  const smoothness = detail >= 2 ? 6 : 4

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!ref.current) return
    ref.current.position.set(-1.9, 0.52 + Math.sin(t * 0.7) * 0.045, -0.35)
    ref.current.rotation.y = 0.34 + mousePos.current.x * 0.045
    ref.current.rotation.x = -0.06 + mousePos.current.y * 0.035
  })

  return (
    <Float speed={0.9} rotationIntensity={0.08} floatIntensity={0.12}>
      <group ref={ref}>
        <RoundedBox args={[1.36, 0.88, 0.035]} radius={0.035} smoothness={smoothness}>
          <meshStandardMaterial
            color="#090b13"
            emissive="#061222"
            emissiveIntensity={0.55}
            metalness={0.62}
            roughness={0.22}
          />
          <Edges color="#7b61ff" threshold={12} />
        </RoundedBox>
        {[
          ['#00d4ff', 0.26, 0.52],
          ['#7b61ff', 0.08, 0.74],
          ['#00ff88', -0.1, 0.42],
          ['#00d4ff', -0.28, 0.66],
        ].map(([color, y, width]) => (
          <Box key={`${color}-${y}`} args={[width, 0.035, 0.01]} position={[-0.18, y, 0.028]}>
            <meshBasicMaterial color={color} transparent opacity={0.52} />
          </Box>
        ))}
        <Box args={[0.36, 0.22, 0.01]} position={[0.38, -0.19, 0.03]}>
          <meshBasicMaterial color="#111827" transparent opacity={0.9} />
        </Box>
        {detail >= 2 && (
          <Torus args={[0.26, 0.004, 8, 72]} position={[0.38, -0.19, 0.034]}>
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
          </Torus>
        )}
      </group>
    </Float>
  )
}

function MobileSlab({ mousePos, detail = 1 }) {
  const ref = useRef()
  const smoothness = detail >= 2 ? 9 : 6

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!ref.current) return
    ref.current.position.set(1.86, -0.42 + Math.sin(t * 0.62) * 0.04, -0.15)
    ref.current.rotation.y = -0.38 + mousePos.current.x * 0.045
    ref.current.rotation.x = 0.08 + mousePos.current.y * 0.035
  })

  return (
    <Float speed={0.85} rotationIntensity={0.08} floatIntensity={0.12}>
      <group ref={ref}>
        <RoundedBox args={[0.58, 1.1, 0.052]} radius={0.075} smoothness={smoothness}>
          <meshStandardMaterial color="#05070b" metalness={0.82} roughness={0.22} />
          <Edges color="#00d4ff" threshold={12} />
        </RoundedBox>
        <Box args={[0.48, 0.88, 0.008]} position={[0, 0, 0.035]}>
          <meshBasicMaterial color="#071a2a" transparent opacity={0.96} />
        </Box>
        <Box args={[0.32, 0.04, 0.009]} position={[0, 0.31, 0.043]}>
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.48} />
        </Box>
        <Box args={[0.38, 0.14, 0.009]} position={[0, 0.05, 0.043]}>
          <meshBasicMaterial color="#7b61ff" transparent opacity={0.28} />
        </Box>
        <Box args={[0.24, 0.08, 0.009]} position={[-0.08, -0.21, 0.043]}>
          <meshBasicMaterial color="#00ff88" transparent opacity={0.34} />
        </Box>
      </group>
    </Float>
  )
}

function SecurityHalo({ enhanced = false }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.18
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.25) * 0.05
  })

  return (
    <group ref={ref}>
      <Torus args={[1.92, 0.008, 10, 180]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.22} />
      </Torus>
      <Torus args={[2.2, 0.006, 10, 180]} rotation={[Math.PI / 2.15, 0.16, 0.08]}>
        <meshBasicMaterial color="#7b61ff" transparent opacity={0.16} />
      </Torus>
      <Torus args={[2.48, 0.005, 10, 180]} rotation={[Math.PI / 2.3, -0.1, -0.08]}>
        <meshBasicMaterial color="#00ff88" transparent opacity={0.12} />
      </Torus>
      {enhanced && (
        <>
          <Torus args={[1.58, 0.006, 10, 220]} rotation={[Math.PI / 2.45, 0.24, -0.18]}>
            <meshBasicMaterial color="#ff2d78" transparent opacity={0.1} />
          </Torus>
          <Torus args={[2.78, 0.004, 10, 240]} rotation={[Math.PI / 2.72, -0.18, 0.22]}>
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.09} />
          </Torus>
        </>
      )}
    </group>
  )
}

function SystemsCube({ mousePos, detail = 1 }) {
  const ref = useRef()
  const ringSegments = detail >= 2 ? 120 : 80

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!ref.current) return
    ref.current.position.set(1.28, 0.82 + Math.sin(t * 0.5) * 0.04, -0.62)
    ref.current.rotation.set(t * 0.17 + mousePos.current.y * 0.035, t * 0.22, 0.18)
  })

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.1}>
      <group ref={ref}>
        <Box args={[0.48, 0.48, 0.48]}>
          <meshStandardMaterial
            color="#07090e"
            emissive="#120b2a"
            emissiveIntensity={0.45}
            metalness={0.84}
            roughness={0.22}
          />
          <Edges color="#7b61ff" threshold={8} />
        </Box>
        <Torus args={[0.38, 0.006, 8, ringSegments]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00ff88" transparent opacity={0.42} />
        </Torus>
      </group>
    </Float>
  )
}

function Particles({ count = 140 }) {
  const meshRef = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 1) {
      pos[i] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.018
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        color="#00d4ff"
        transparent
        opacity={0.34}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function SceneController({ mousePos }) {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePos.current.x * 0.52, 0.026)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.9 + mousePos.current.y * 0.35, 0.026)
    camera.lookAt(0.75, 0, 0)
  })

  return null
}

function Scene3D({ mousePos, quality = 'medium' }) {
  const [isMobile, setIsMobile] = useState(false)
  const preset = QUALITY_PRESETS[quality] || QUALITY_PRESETS.medium

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0.9, 5.7], fov: 43 }}
      dpr={isMobile ? QUALITY_PRESETS.low.dpr : preset.dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      resize={{ scroll: false, debounce: { scroll: 100, resize: 0 } }}
      style={{ background: 'transparent' }}
      performance={{ min: 0.5 }}
    >
      <SceneController mousePos={mousePos} />
      <ambientLight intensity={0.18 * preset.lightScale} />
      <pointLight position={[0.8, 0.2, 0.5]} color="#00d4ff" intensity={3.4 * preset.lightScale} distance={8} decay={2} />
      <pointLight position={[2.8, 2, 2]} color="#7b61ff" intensity={1.35 * preset.lightScale} distance={8} decay={2} />
      <pointLight position={[-2.8, -1, -1.5]} color="#00ff88" intensity={0.7 * preset.lightScale} distance={7} decay={2} />
      {!isMobile && quality === 'ultra' && (
        <pointLight position={[0.2, 3.2, 1.2]} color="#ff2d78" intensity={0.55} distance={7} decay={2} />
      )}

      <group position={[1.15, 0, 0]}>
        <SecurityHalo enhanced={!isMobile && preset.extraHalo} />
        <CoreRack detail={preset.geometry} />
        <DataPanel mousePos={mousePos} detail={preset.geometry} />
        {!isMobile && preset.showSideObjects && <MobileSlab mousePos={mousePos} detail={preset.geometry} />}
        {!isMobile && preset.showSideObjects && <SystemsCube mousePos={mousePos} detail={preset.geometry} />}
      </group>

      <Particles count={isMobile ? QUALITY_PRESETS.low.particles : preset.particles} />

      {/* Subtle bloom — makes neon edges and particles glow */}
      {!isMobile && preset.bloom > 0 && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={preset.bloom}
            luminanceThreshold={preset.bloomThreshold}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  )
}

export default memo(Scene3D)
