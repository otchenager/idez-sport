import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { useMotionValue } from 'framer-motion'
import * as THREE from 'three'

const GRN = '#00c878'

/* ─── Label texture ─── */
function makeLabelTex() {
  const W = 2048, H = 1024
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const c = cv.getContext('2d')

  const bg = c.createLinearGradient(0, 0, W, 0)
  bg.addColorStop(0,    '#d8e2ec')
  bg.addColorStop(0.35, '#ecf3fa')
  bg.addColorStop(0.65, '#ecf3fa')
  bg.addColorStop(1,    '#d8e2ec')
  c.fillStyle = bg
  c.fillRect(0, 0, W, H)

  c.fillStyle = GRN
  c.fillRect(0, 0, 44, H)
  c.fillRect(W - 18, 0, 18, H)

  c.font = '900 300px "Barlow Condensed", "Arial Black", Arial, sans-serif'
  c.textAlign = 'center'
  c.textBaseline = 'alphabetic'
  c.fillStyle = GRN
  c.fillText('iDEZ', W / 2, 330)

  c.fillStyle = '#163860'
  c.fillText('SPORT', W / 2, 640)

  c.strokeStyle = GRN
  c.lineWidth = 9
  c.lineCap = 'round'
  c.beginPath()
  c.moveTo(110, 716); c.lineTo(W - 110, 716)
  c.stroke()

  c.font = '300 72px "Barlow", Arial, sans-serif'
  c.fillStyle = '#4a6a88'
  c.fillText('нейтрализатор запаха', W / 2, 868)

  c.beginPath()
  c.arc(W - 120, 92, 48, 0, Math.PI * 2)
  c.fillStyle = GRN
  c.fill()

  const tex = new THREE.CanvasTexture(cv)
  tex.needsUpdate = true
  return tex
}

/* ─── Bottle scene ─── */
function BottleScene({ scrollProgress }) {
  const groupRef = useRef()
  const rotY = useRef(Math.PI)

  const [labelTex, setLabelTex] = useState(() => makeLabelTex())
  useEffect(() => {
    document.fonts.ready.then(() => setLabelTex(makeLabelTex()))
  }, [])

  const bodyPts = useMemo(() => [
    new THREE.Vector2(0.001, 0.000),
    new THREE.Vector2(0.355, 0.000),
    new THREE.Vector2(0.402, 0.065),
    new THREE.Vector2(0.430, 0.210),
    new THREE.Vector2(0.442, 0.700),
    new THREE.Vector2(0.442, 1.300),
    new THREE.Vector2(0.430, 1.510),
    new THREE.Vector2(0.306, 1.665),
    new THREE.Vector2(0.200, 1.780),
    new THREE.Vector2(0.194, 1.935),
  ], [])

  // Единый материал для всего флакона — однотонный белый
  const mWhite = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ecf1f7',
    roughness: 0.10,
    metalness: 0.03,
    envMapIntensity: 2.0,
  }), [])

  const mLabel = useMemo(() => new THREE.MeshStandardMaterial({
    map: labelTex,
    roughness: 0.28,
    metalness: 0.0,
    polygonOffset: true,
    polygonOffsetFactor: -4,
  }), [labelTex])

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return
    rotY.current -= delta * 0.35
    groupRef.current.rotation.y = rotY.current
    groupRef.current.position.x = 0.63
    groupRef.current.position.y = -1.5 + Math.sin(clock.elapsedTime * 0.85) * 0.09
    groupRef.current.rotation.x = scrollProgress.get() * 0.26
  })

  const COLLAR_TOP = 2.270
  const ACT_H      = 0.360
  const ACT_R      = 0.136
  const ACT_CY     = COLLAR_TOP + ACT_H / 2
  const ACT_TOP    = COLLAR_TOP + ACT_H

  const collarRibY = Array.from({ length: 8 }, (_, i) => 1.948 + i * 0.036)

  return (
    // scale=1.3 — флакон крупнее на 30%
    <group ref={groupRef} rotation={[0, Math.PI, 0]} position={[0.63, -1.5, 0]} scale={1.17}>

      {/* ── Тело флакона ── */}
      <mesh material={mWhite} castShadow receiveShadow>
        <latheGeometry args={[bodyPts, 96]} />
      </mesh>

      {/* ── Дно ── */}
      <mesh material={mWhite} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <circleGeometry args={[0.355, 64]} />
      </mesh>

      {/* ── Этикетка ── */}
      <mesh material={mLabel} position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.449, 0.449, 1.06, 80, 1, true]} />
      </mesh>

      {/* ════ ПОМПА — однотонная, без торчащего носика ════ */}

      {/* Коллар: переходный конус с горлышка */}
      <mesh material={mWhite} position={[0, 1.944, 0]}>
        <cylinderGeometry args={[0.226, 0.200, 0.028, 52]} />
      </mesh>

      {/* Коллар: основной цилиндр */}
      <mesh material={mWhite} position={[0, 2.100, 0]} castShadow>
        <cylinderGeometry args={[0.226, 0.226, 0.294, 52]} />
      </mesh>

      {/* Коллар: 8 рёбер */}
      {collarRibY.map((y, i) => (
        <mesh key={i} material={mWhite} position={[0, y, 0]}>
          <cylinderGeometry args={[0.234, 0.234, 0.011, 52]} />
        </mesh>
      ))}

      {/* Коллар: верхний конус переходит в актуатор */}
      <mesh material={mWhite} position={[0, COLLAR_TOP - 0.015, 0]}>
        <cylinderGeometry args={[ACT_R + 0.004, 0.226, 0.032, 52]} />
      </mesh>

      {/* Актуатор: основной цилиндр — того же белого цвета */}
      <mesh material={mWhite} position={[0, ACT_CY, 0]} castShadow>
        <cylinderGeometry args={[ACT_R, ACT_R + 0.004, ACT_H, 40]} />
      </mesh>

      {/* Актуатор: плоская крышка */}
      <mesh material={mWhite} position={[0, ACT_TOP, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[ACT_R, 40]} />
      </mesh>

      {/* Актуатор: верхний бортик */}
      <mesh material={mWhite} position={[0, ACT_TOP - 0.010, 0]}>
        <cylinderGeometry args={[ACT_R + 0.005, ACT_R, 0.020, 40]} />
      </mesh>

    </group>
  )
}

/* ─── Свет ─── */
function Scene({ scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[1, 6, 6]}  intensity={2.4} castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-5, 2, 1]} intensity={0.6} color="#b8d4f0" />
      <directionalLight position={[3, 0, -4]} intensity={0.7} color="#e0f0ff" />
      <pointLight position={[0, -2.2, 1.8]} intensity={6} color={GRN} distance={8} decay={2} />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <BottleScene scrollProgress={scrollProgress} />
        <ContactShadows
          position={[0, -1.56, 0]} opacity={0.50} scale={3.5} blur={2.5} color={GRN}
        />
      </Suspense>
    </>
  )
}

/* ─── Экспорт ─── */
export default function SprayBottle3D({ scrollProgress: sp }) {
  const zero = useMotionValue(0)
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
