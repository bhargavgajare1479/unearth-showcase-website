"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
    count?: number;
    radius?: number;
    color?: string;
    speed?: number;
    size?: number;
}

export default function ParticleField({
    count = 2000,
    radius = 4,
    color = "#2563eb",
    speed = 0.15,
    size = 2,
}: ParticleFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);

    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random());

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }

        geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return geom;
    }, [count, radius]);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * speed;
            pointsRef.current.rotation.x += delta * speed * 0.3;
        }
    });

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial
                color={color}
                size={size}
                sizeAttenuation
                transparent
                opacity={0.6}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
