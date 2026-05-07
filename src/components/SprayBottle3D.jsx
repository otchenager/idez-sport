import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { useMotionValue } from 'framer-motion'
import * as THREE from 'three'

const GRN = '#00c878'

/* ─── Label texture drawn on a 2048×1024 canvas ─── */
function makeLabelTex() {
  const W = 2048, H = 1024
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const c = cv.getContext('2d')

  // Background: soft gradient so edges look natural on the curved body
  const bg = c.createLinearGradient(0, 0, W, 0)
  bg.addColorStop(0,    '#d8e2ec')
  bg.addColorStop(0.35, '#ecf3fa')
  bg.addColorStop(0.65, '#ecf3fa')
  bg.addColorStop(1,    '#d8e2ec')
  c.fillStyle = bg
  c.fillRect(0, 0, W, H)

  // Left emerald accent strip
  c.fillStyle = GRN
  c.fillRect(0, 0, 44, H)

  // Thin right strip (mirrors left)
  c.fillStyle = GRN
  c.fillRect(W - 18, 0, 18, H)

  // — iDEZ (Barlow Condensed loaded via Google Fonts in index.html)
  c.font = '900 300px "Barlow Condensed", "Arial Black", Arial, sans-serif'
  c.textAlign = 'center'
  c.textBaseline = 'alphabetic'
  c.fillStyle = GRN
  c.fillText('iDEZ', W / 2, 330)

  // — SPORT
  c.fillStyle = '#163860'
  c.fillText('SPORT', W / 2, 640)

  // Divider
  c.strokeStyle = GRN
  c.lineWidth = 9
  c.lineCap = 'round'
  c.beginPath()
  c.moveTo(110, 716); c.lineTo(W - 110, 716)
  c.stroke()

  // Subtitle — lighter weight
  c.font = '300 72px "Barlow", Arial, sans-serif'
  c.fillStyle = '#4a6a88'
  c.fillText('нейтрализатор запаха', W / 2, 868)

  // Emerald dot (matches the brand photo)
  c.beginPath()
  c.arc(W - 120, 92, 48, 0, Math.PI * 2)
  c.fillStyle = GRN
  c.fill()

  const tex = new THREE.CanvasTexture(cv)
  tex.needsUpdate = true
  return tex
}

/* ─── Geometry + animation ─── */
function BottleScene({ scrollProgress }) {
  const groupRef = useRef()

  // rotY ref: starts at π so the label (u=0.5 on cylinder) faces camera (+Z)
  // decrements each frame → right-to-left rotation from viewer's perspective
  const rotY = useRef(Math.PI)

  // Create label texture immediately, then redo it once Barlow Condensed is confirmed loaded
  const [labelTex, setLabelTex] = useState(() => makeLabelTex())
  useEffect(() => {
    document.fonts.ready.then(() => setLabelTex(makeLabelTex()))
  }, [])

  const bodyPts = useMemo(() => [
    new THREE.Vector2(0.001, 0.000), // center (closes bottom face)
    new THREE.Vector2(0.355, 0.000), // base edge
    new THREE.Vector2(0.400, 0.060), // bottom bevel
    new THREE.Vector2(0.428, 0.200), // lower body
    new THREE.Vector2(0.440, 0.680), // body widest
    new THREE.Vector2(0.440, 1.290), // upper body
    new THREE.Vector2(0.432, 1.500), // shoulder start
    new THREE.Vector2(0.315, 1.658), // shoulder curve
    new THREE.Vector2(0.205, 1.775), // neck
    new THREE.Vector2(0.198, 1.930), // neck top
  ], [])

  const mBody = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#edf2f8', roughness: 0.07, metalness: 0.04, envMapIntensity: 1.8,
  }), [])

  const mPump = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e4eaf0', roughness: 0.24, metalness: 0.0, envMapIntensity: 1.2,
  }), [])

  const mLabel = useMemo(() => new THREE.MeshStandardMaterial({
    map: labelTex, roughness: 0.28, metalness: 0.0,
    polygonOffset: true, polygonOffsetFactor: -4,
  }), [labelTex])

  const mNozzle = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d8e0e8', roughness: 0.14, metalness: 0.09, envMapIntensity: 2.0,
  }), [])

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return
    rotY.current      -= delta * 0.35                              // right-to-left
    groupRef.current.rotation.y = rotY.current
    groupRef.current.position.y = -1.5 + Math.sin(clock.elapsedTime * 0.85) * 0.09
    groupRef.current.rotation.x = scrollProgress.get() * 0.26
  })

  return (
    // Initial rotation-y = π so the label faces the camera on first paint
    <group ref={groupRef} rotation={[0, Math.PI, 0]} position={[0, -1.5, 0]}>

      {/* ── Bottle body ── */}
      <mesh material={mBody} castShadow receiveShadow>
        <latheGeometry args={[bodyPts, 96]} />
      </mesh>

      {/* ── Bottom cap ── */}
      <mesh material={mBody} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <circleGeometry args={[0.355, 64]} />
      </mesh>

      {/* ── Label band ── */}
      <mesh material={mLabel} position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.447, 0.447, 1.06, 80, 1, true]} />
      </mesh>

      {/* ── Neck ring (detail groove) ── */}
      <mesh material={mPump} position={[0, 1.955, 0]}>
        <cylinderGeometry args={[0.220, 0.220, 0.040, 48]} />
      </mesh>

      {/* ── Pump collar ── */}
      <mesh material={mPump} position={[0, 2.100, 0]} castShadow>
        <cylinderGeometry args={[0.215, 0.208, 0.330, 52]} />
      </mesh>

      {/* ── Pump collar top ring ── */}
      <mesh material={mPump} position={[0, 2.268, 0]}>
        <cylinderGeometry args={[0.222, 0.215, 0.040, 48]} />
      </mesh>

      {/* ── Pump inner stub ── */}
      <mesh material={mPump} position={[0, 2.320, 0]}>
        <cylinderGeometry args={[0.175, 0.175, 0.060, 32]} />
      </mesh>

      {/* ── Nozzle stem ── */}
      <mesh material={mNozzle} position={[0, 2.660, 0]} castShadow>
        <cylinderGeometry args={[0.032, 0.032, 0.620, 24]} />
      </mesh>

      {/* ── Spray head horizontal arm ── */}
      <mesh material={mPump} position={[0.068, 2.965, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.050, 0.040, 0.165, 24]} />
      </mesh>

      {/* ── Spray head vertical connector ── */}
      <mesh material={mPump} position={[0, 2.925, 0]}>
        <cylinderGeometry args={[0.038, 0.033, 0.080, 20]} />
      </mesh>

      {/* ── Nozzle tip sphere ── */}
      <mesh material={mNozzle} position={[0.152, 2.965, 0]}>
        <sphereGeometry args={[0.042, 20, 20]} />
      </mesh>

      {/* ── Orifice hole ── */}
      <mesh position={[0.195, 2.965, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.010, 12]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>

    </group>
  )
}

/* ─── Lights + environment ─── */
function Scene({ scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 7, 5]}  intensity={2.2} castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#b0d4ff" />
      <directionalLight position={[2, 1, -5]}  intensity={0.6} />
      <pointLight position={[0, -2.5, 1.5]} intensity={5} color={GRN} distance={8} decay={2} />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <BottleScene scrollProgress={scrollProgress} />
        <ContactShadows
          position={[0, -1.56, 0]} opacity={0.45} scale={3} blur={2.8} color={GRN}
        />
      </Suspense>
    </>
  )
}

/* ─── Public export — scrollProgress is optional ─── */
export default function SprayBottle3D({ scrollProgress: sp }) {
  const zero = useMotionValue(0)               // fallback when used without scroll
  const scrollProgress = sp ?? zero
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Scene scrollProgress={scrollProgress} />
    </Canvas>
  )
}
