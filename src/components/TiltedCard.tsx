import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./TiltedCard.css";

const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2,
};

export interface TiltedCardProps {
    imageSrc?: string;
    altText?: string;
    captionText?: string;
    containerHeight?: string | number;
    containerWidth?: string | number;
    imageHeight?: string | number;
    imageWidth?: string | number;
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    showTooltip?: boolean;
    overlayContent?: React.ReactNode;
    displayOverlayContent?: boolean;
    textBlock?: string;
    children?: React.ReactNode;
}

export default function TiltedCard({
    imageSrc,
    altText = "Tilted card image",
    captionText = "",
    containerHeight = "300px",
    containerWidth = "100%",
    imageHeight = "100%",
    imageWidth = "100%",
    scaleOnHover = 1.05,
    rotateAmplitude = 14,
    showMobileWarning = false, // disabled for showcase
    showTooltip = false, // disabled for showcase
    overlayContent = null,
    displayOverlayContent = false,
    textBlock = "",
    children = null, // Added support for injecting React children
}: TiltedCardProps) {
    const ref = useRef<HTMLElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1,
    });

    const [lastY, setLastY] = useState(0);

    function handleMouse(e: any) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleMouseLeave() {
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <figure
            ref={ref}
            className="tilted-card-figure"
            style={{
                height: containerHeight,
                width: containerWidth,
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="tilted-card-mobile-alert">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}

            <motion.div
                className="tilted-card-inner"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX,
                    rotateY,
                    scale,
                }}
            >
                {/* If imageSrc is provided, render it, else rely on injected children payload */}
                {imageSrc && (
                    <motion.img
                        src={imageSrc}
                        alt={altText}
                        className="tilted-card-img"
                        style={{
                            width: imageWidth,
                            height: imageHeight,
                        }}
                    />
                )}

                {/* Render children (like feature text) as the primary content if no image is passed or if both exist */}
                {children && (
                    <div className="w-full h-full text-left p-8 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col tilted-card-content-bg shadow-sm">
                        {children}
                    </div>
                )}

                {/* Overlay content (buttons etc.) */}
                {displayOverlayContent && overlayContent && (
                    <motion.div className="tilted-card-overlay">
                        {overlayContent}
                    </motion.div>
                )}

                {/* Always-visible text block */}
                {textBlock && (
                    <motion.div
                        className="tilted-card-textblock"
                        style={{
                            transform: "translateZ(40px)",
                        }}
                    >
                        {textBlock}
                    </motion.div>
                )}
            </motion.div>

            {showTooltip && (
                <motion.figcaption
                    className="tilted-card-caption"
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption,
                    }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    );
}
