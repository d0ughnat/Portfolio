"use client"
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AICodeEntranceProps {
  onComplete: () => void
}

export default function AICodeEntrance({ onComplete }: AICodeEntranceProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showWarp, setShowWarp] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const warpRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // AI typing code simulation - Reduced for faster completion
  const codeLines = [
    "// AI System Initialization...",
    "const universe = new QuantumSpace()",
    "const consciousness = await AI.bootstrap()",
    "",
    "class DigitalReality {",
    "  constructor() {",
    "    this.dimensions = Infinity",
    "    this.possibilities = ∞",
    "  }",
    "",
    "  async materialize() {",
    "    return new SpaceTimePortal().open()",
    "  }",
    "}",
    "",
    "// Establishing neural pathways...",
    "const synapses = new NeuralNetwork()",
    "synapses.connect(mind, machine)",
    "",
    "// Reality synthesis complete.",
    "system.status = 'ONLINE'",
    "portal.activate()",
    "",
    "// Initiating warp sequence...",
    "warp.engage()"
  ]

  useEffect(() => {
    // Cursor blinking animation
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    })

    // Matrix-style background effect
    const createMatrixRain = () => {
      const chars = "01ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ"
      for (let i = 0; i < 100; i++) {
        const span = document.createElement('span')
        span.innerText = chars[Math.floor(Math.random() * chars.length)]
        span.className = 'matrix-char absolute text-green-400/30 text-sm pointer-events-none'
        span.style.left = Math.random() * 100 + '%'
        span.style.top = '-50px'
        span.style.animationDelay = Math.random() * 5 + 's'
        containerRef.current?.appendChild(span)

        gsap.to(span, {
          y: window.innerHeight + 100,
          duration: 5 + Math.random() * 10,
          ease: "none",
          repeat: -1,
          delay: Math.random() * 5
        })
      }
    }

    createMatrixRain()

    // Start typing animation
    let lineIndex = 0
    let charIndex = 0
    
    const typeCode = () => {
      if (lineIndex >= codeLines.length) {
        setIsTyping(false)
        setTimeout(() => {
          setShowWarp(true)
          startWarpSequence()
        }, 500)
        return
      }

      const currentLineText = codeLines[lineIndex]
      
      if (charIndex <= currentLineText.length) {
        setCurrentLine(lineIndex)
        charIndex++
        setTimeout(typeCode, Math.random() * 15 + 10) // Faster typing speed
      } else {
        lineIndex++
        charIndex = 0
        setTimeout(typeCode, 100) // Shorter pause between lines
      }
    }

    setTimeout(typeCode, 200) // Reduced initial delay

    return () => {
      // Cleanup matrix chars
      document.querySelectorAll('.matrix-char').forEach(el => el.remove())
    }
  }, [])

  const startWarpSequence = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 200)
      }
    })

    // Code glitch and distort - Faster
    tl.to(codeRef.current, {
      duration: 0.3,
      skewX: 10,
      scaleY: 1.2,
      filter: "blur(2px) hue-rotate(90deg)",
      ease: "power2.inOut"
    })

    // Warp rings appear
    .to(warpRef.current, {
      duration: 0.2,
      scale: 1,
      opacity: 1,
      ease: "back.out(1.7)"
    })

    // Warp expansion - Faster
    .to(".warp-ring", {
      duration: 1.0,
      scale: 3,
      opacity: 0,
      ease: "power3.out",
      stagger: 0.05
    }, "-=0.1")

    // Code sucked into warp
    .to(codeRef.current, {
      duration: 1,
      scale: 0,
      rotation: 360,
      filter: "blur(20px) brightness(3)",
      ease: "power4.in"
    }, "-=1")

    // Screen distortion
    .to(containerRef.current, {
      duration: 1,
      scale: 1.5,
      filter: "blur(30px) brightness(2) contrast(2)",
      ease: "power4.inOut"
    }, "-=0.8")

    // Final flash
    .to(containerRef.current, {
      duration: 0.3,
      opacity: 0,
      ease: "power2.inOut"
    })
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 overflow-hidden"
    >
      {/* Matrix rain background */}
      <div className="absolute inset-0 opacity-20" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-green-400/10"
            style={{
              top: `${i * 2}%`,
              animation: `scanline 2s linear infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* AI Terminal Header */}
      <div className="absolute top-8 left-8 text-green-400 font-mono text-sm">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="ml-4">AI_SYSTEM_TERMINAL v2.4.7</span>
        </div>
        <div className="text-xs opacity-70">
          Neural Network Status: ACTIVE | Quantum Processors: ONLINE
        </div>
      </div>

      {/* Code Display */}
      <div 
        ref={codeRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-black/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-8 max-w-4xl w-full mx-8">
          <div className="font-mono text-green-400 text-lg leading-relaxed">
            {codeLines.slice(0, currentLine + 1).map((line, index) => (
              <div key={index} className="flex items-center">
                <span className="text-green-600/50 mr-4 text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={index === currentLine ? 'animate-pulse' : ''}>
                  {index === currentLine ? line.slice(0, Math.random() * line.length + 1) : line}
                </span>
                {index === currentLine && isTyping && (
                  <div 
                    ref={cursorRef}
                    className="inline-block w-2 h-6 bg-green-400 ml-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warp Effect */}
      {showWarp && (
        <div 
          ref={warpRef}
          className="absolute inset-0 flex items-center justify-center scale-0 opacity-0"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="warp-ring absolute border-2 border-cyan-400/50 rounded-full"
              style={{
                width: `${(i + 1) * 100}px`,
                height: `${(i + 1) * 100}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
          
          {/* Central warp core */}
          <div className="absolute w-20 h-20 bg-cyan-400/50 rounded-full animate-pulse">
            <div className="absolute inset-2 bg-white rounded-full animate-ping" />
          </div>
        </div>
      )}

      {/* Holographic UI Elements */}
      <div className="absolute bottom-8 left-8 font-mono text-green-400 text-xs space-y-1">
        <div>SYSTEM_LOAD: {Math.floor(Math.random() * 100)}%</div>
        <div>MEMORY: {Math.floor(Math.random() * 8096)}MB</div>
        <div>NEURAL_ACTIVITY: MAXIMUM</div>
      </div>

      <div className="absolute bottom-8 right-8 font-mono text-green-400 text-xs space-y-1">
        <div>REALITY_MESH: STABLE</div>
        <div>CONSCIOUSNESS: ACTIVE</div>
        <div>PORTAL_STATUS: MATERIALIZING</div>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
