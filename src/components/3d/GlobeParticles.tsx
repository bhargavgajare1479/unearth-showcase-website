"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX_SHADER = `
  attribute float aSize;
  attribute vec3 aScattered;
  attribute vec3 aColor;
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec3 pos = mix(position, aScattered, uProgress);

    // Very subtle breathing motion
    float floatAmount = (1.0 - uProgress) * 0.02;
    pos.x += sin(uTime * 0.3 + position.y * 4.0) * floatAmount;
    pos.y += cos(uTime * 0.25 + position.x * 4.0) * floatAmount;
    pos.z += sin(uTime * 0.2 + position.z * 4.0) * floatAmount;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Small crisp dots
    gl_PointSize = aSize * uPixelRatio * (40.0 / -mvPosition.z);

    // Fade out as they scatter
    vAlpha = mix(0.9, 0.0, smoothstep(0.4, 1.0, uProgress));
  }
`;

const FRAGMENT_SHADER = `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    // Sharp crisp circle
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Slightly soften just the very edge
    float alpha = 1.0 - smoothstep(0.4, 0.5, dist);

    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

interface GlobeParticlesProps {
    count?: number;
    radius?: number;
    color?: string;
    scrollProgress: number;
    introProgress: number;
    position?: [number, number, number];
}

export default function GlobeParticles({
    count = 4000,
    radius = 2.5,
    color = "#2563eb",
    scrollProgress,
    introProgress,
    position = [0, 0, 0],
}: GlobeParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const { positions, scattered, sizes, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const scat = new Float32Array(count * 3);
        const s = new Float32Array(count);
        const col = new Float32Array(count * 3);

        const baseColor = new THREE.Color(color);
        const palette = [
            baseColor, // Primary
            new THREE.Color("#16a34a"), // Success Green
            new THREE.Color("#f59e0b"), // Warning Amber
            new THREE.Color("#dc2626"), // Error Red
        ];

        const goldenRatio = (1 + Math.sqrt(5)) / 2;

        for (let i = 0; i < count; i++) {
            // Fibonacci sphere — uniform distribution on surface
            const theta = 2 * Math.PI * i / goldenRatio;
            const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
            const r = radius;

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);

            // Scattered positions — random directions
            const scatterRadius = radius * (3 + Math.random() * 8);
            const sTheta = Math.random() * Math.PI * 2;
            const sPhi = Math.acos(2 * Math.random() - 1);

            scat[i * 3] = scatterRadius * Math.sin(sPhi) * Math.cos(sTheta);
            scat[i * 3 + 1] = scatterRadius * Math.sin(sPhi) * Math.sin(sTheta);
            scat[i * 3 + 2] = scatterRadius * Math.cos(sPhi);

            // Random sizes for variation
            s[i] = 0.4 + Math.random() * 0.75;

            // Assign colors (85% base color, 15% random accents)
            const rand = Math.random();
            let c = palette[0];
            if (rand > 0.85) {
                if (rand > 0.95) c = palette[1];
                else if (rand > 0.90) c = palette[2];
                else c = palette[3];
            }

            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }

        return { positions: pos, scattered: scat, sizes: s, colors: col };
    }, [count, radius, color]);

    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geom.setAttribute("aScattered", new THREE.BufferAttribute(scattered, 3));
        geom.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        geom.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
        return geom;
    }, [positions, scattered, sizes, colors]);

    const uniforms = useMemo(
        () => ({
            uProgress: { value: 1 },
            uTime: { value: 0 },
            uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
        }),
        []
    );

    useFrame((_, delta) => {
        if (materialRef.current) {
            // Use the greater of intro (forming) and scroll (exploding)
            const target = Math.max(introProgress, scrollProgress);
            materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uProgress.value,
                target,
                0.050
            );
            materialRef.current.uniforms.uTime.value += delta;
        }

        // Slow rotation when in globe form
        if (pointsRef.current) {
            const rotSpeed = THREE.MathUtils.lerp(0.08, 0.01, scrollProgress);
            pointsRef.current.rotation.y += delta * rotSpeed;
        }
    });

    return (
        <points ref={pointsRef} geometry={geometry} position={position}>
            <shaderMaterial
                ref={materialRef}
                vertexShader={VERTEX_SHADER}
                fragmentShader={FRAGMENT_SHADER}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </points>
    );
}
