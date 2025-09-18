"use client"
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import img from '../../public/home.jpg'

// Register GSAP plugins
gsap.registerPlugin(TextPlugin)

export default function Page() {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
    const [hoveredRole, setHoveredRole] = useState<number | null>(null)
    const [isScrolling, setIsScrolling] = useState(false)
    const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)
    const [animationsComplete, setAnimationsComplete] = useState(false)
    const router = useRouter()
    
    // Refs for GSAP animations
    const nameRef = useRef<HTMLHeadingElement>(null)
    const text1Ref = useRef<HTMLParagraphElement>(null)
    const text2Ref = useRef<HTMLParagraphElement>(null)
    const rolesContainerRef = useRef<HTMLDivElement>(null)
    const centerDisplayRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    const scroll = [
        { name : "QA Tester", description: "Ensuring Software Quality Through Rigorous Testing" },
        { name : "Frontend Developer", description: "Building Modern Web Applications with React & Next.js" },
        { name : "Cybersecurity Specialist", description: "Protecting Systems from Cyber Threats & Vulnerabilities" }
    ]

    // GSAP Entry Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([nameRef.current, text1Ref.current, text2Ref.current, rolesContainerRef.current, centerDisplayRef.current, imageRef.current], {
                opacity: 0
            })
            
            // Create timeline
            const tl = gsap.timeline({
                onComplete: () => setAnimationsComplete(true)
            })
            
            // 1. Name appears first with glitch effect
            tl.to(nameRef.current, {
                opacity: 1,
                duration: 0.1,
                ease: "none"
            })
            .to(nameRef.current, {
                x: -5,
                duration: 0.05,
                ease: "none"
            })
            .to(nameRef.current, {
                x: 5,
                duration: 0.05,
                ease: "none"
            })
            .to(nameRef.current, {
                x: -3,
                duration: 0.05,
                ease: "none"
            })
            .to(nameRef.current, {
                x: 0,
                duration: 0.05,
                ease: "none"
            })
            
            // 2. Typewriter effect for first paragraph
            .to(text1Ref.current, {
                opacity: 1,
                duration: 0.5
            })
            .to(text1Ref.current, {
                text: "A versatile tech professional with a passion for quality, security, and modern web development.",
                duration: 2,
                ease: "none"
            })
            
            // 3. Typewriter effect for second paragraph
            .to(text2Ref.current, {
                opacity: 1,
                duration: 0.5
            })
            .to(text2Ref.current, {
                text: "I ensure software quality, build secure and modern web applications, and protect systems from cyber threats.",
                duration: 2.5,
                ease: "none"
            })
            
            // 4. Image appears with glitch effect
            .to(imageRef.current, {
                opacity: 1,
                duration: 0.1,
                ease: "none"
            })
            .to(imageRef.current, {
                x: -5,
                y: -3,
                rotation: -2,
                duration: 0.05,
                ease: "none"
            })
            .to(imageRef.current, {
                x: 5,
                y: 3,
                rotation: 2,
                duration: 0.05,
                ease: "none"
            })
            .to(imageRef.current, {
                x: -3,
                y: -2,
                rotation: -1,
                duration: 0.05,
                ease: "none"
            })
            .to(imageRef.current, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.05,
                ease: "none"
            })
            
            // 5. Glitch in center display
            .to(centerDisplayRef.current, {
                opacity: 1,
                duration: 0.1,
                ease: "none"
            })
            .to(centerDisplayRef.current, {
                x: -3,
                duration: 0.05,
                ease: "none"
            })
            .to(centerDisplayRef.current, {
                x: 3,
                duration: 0.05,
                ease: "none"
            })
            .to(centerDisplayRef.current, {
                x: 0,
                duration: 0.05,
                ease: "none"
            })
            
            // 6. Glitch in roles with stagger
            .to(rolesContainerRef.current, {
                opacity: 1,
                duration: 0.1
            })
            .from(rolesContainerRef.current?.children || [], {
                opacity: 0,
                x: -10,
                duration: 0.1,
                stagger: 0.05,
                ease: "none"
            })
            .to(rolesContainerRef.current?.children || [], {
                x: 5,
                duration: 0.05,
                stagger: 0.02,
                ease: "none"
            })
            .to(rolesContainerRef.current?.children || [], {
                x: 0,
                duration: 0.05,
                stagger: 0.02,
                ease: "none"
            })
        })
        
        return () => ctx.revert()
    }, [])

    // Handle scroll-based role advancement (only after animations complete)
    useEffect(() => {
        if (!animationsComplete) return
        
        const handleScroll = (e: WheelEvent) => {
            e.preventDefault()
            
            // Clear existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }
            
            // Handle both up and down scrolling
            if (!hoveredRole) {
                setIsScrolling(true)
                
                const newTimeout = setTimeout(() => {
                    setCurrentRoleIndex((prev) => {
                        if (e.deltaY > 0) {
                            // Scroll down - next role or navigate to main page
                            const nextIndex = prev + 1
                            if (nextIndex >= scroll.length) {
                                router.push('/')
                                return prev
                            }
                            return nextIndex
                        } else {
                            // Scroll up - previous role (with wrapping)
                            return prev === 0 ? scroll.length - 1 : prev - 1
                        }
                    })
                    setIsScrolling(false)
                }, 300)
                
                setScrollTimeout(newTimeout)
            }
        }

        // Add scroll event listener
        window.addEventListener('wheel', handleScroll, { passive: false })
        
        // Cleanup
        return () => {
            window.removeEventListener('wheel', handleScroll)
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }
        }
    }, [hoveredRole, scrollTimeout, scroll.length, animationsComplete, router])

    const handleRoleHover = (index: number) => {
        setHoveredRole(index)
        setCurrentRoleIndex(index)
    }

    const handleRoleLeave = () => {
        setHoveredRole(null)
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 text-left pl-4 pt-8 pb-4 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
                <h1 ref={nameRef} className="text-5xl md:text-7xl font-bold mask-radial-from-neutral-700 mb-6">
                    I am <span className="text-emerald-400">Nathaniel Ledesma</span>
                </h1>
                <p ref={text1Ref} className="text-xl mask-radial-from-neutral-700 mb-8">
                    {/* Text will be animated via GSAP */}
                </p>
                <p ref={text2Ref} className="text-lg mask-radial-from-neutral-700">
                    {/* Text will be animated via GSAP */}
                </p>
            </div> 
            
            {/* Center Description Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-5">
                <div ref={imageRef} className="mb-8 opacity-0">
                    <Image 
                        src={img} 
                        alt="Profile" 
                        className="w-64 h-64 object-cover rounded-full border-4 border-emerald-400/30 shadow-2xl"
                        width={256}
                        height={256}
                    />
                </div>
                <div className="text-center px-8">
                    <div 
                        ref={centerDisplayRef}
                        className={`transition-all duration-700 ease-in-out transform opacity-0 scale-95 ${
                            isScrolling ? 'opacity-0 scale-95 translate-y-4' : animationsComplete ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95'
                        }`}
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mask-radial-from-neutral-700 mb-4 tracking-wide">
                            {scroll[currentRoleIndex].name}
                        </h2>
                        <p className="text-xl md:text-2xl text-emerald-400 font-light tracking-wider">
                            {scroll[currentRoleIndex].description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Role Navigation */}
            <div ref={rolesContainerRef} className="absolute bottom-8 right-8 z-10 opacity-0">
                <div className="flex flex-col items-end space-y-4">
                    {scroll.map((item, index) => (
                        <span 
                            key={index} 
                            className={`text-2xl md:text-3xl lg:text-4xl font-bold cursor-pointer transition-all duration-500 text-right transform ${
                                currentRoleIndex === index 
                                    ? 'text-emerald-400 scale-110 translate-x-0' 
                                    : 'mask-radial-from-neutral-700 hover:text-white scale-100 hover:scale-105'
                            } ${
                                hoveredRole === index ? 'text-emerald-300' : ''
                            }`}
                            style={{
                                // Remove CSS animation as GSAP will handle it
                            }}
                            onMouseEnter={() => handleRoleHover(index)}
                            onMouseLeave={handleRoleLeave}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
                
                {/* Progress Indicator */}
                <div className="mt-6 flex justify-end space-x-2">
                    {scroll.map((_, index) => (
                        <div 
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                currentRoleIndex === index ? 'bg-emerald-400 w-6' : 'bg-white/30'
                            }`}
                        />
                    ))}
                </div>
            </div>
            
            {/* Portfolio Label */}
            <div className="absolute top-4 right-4 z-10">
                <span className="text-gray-400 text-sm">Natty Portfolio</span>
            </div>
            
            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 left-8 flex flex-col items-center space-y-2 animate-bounce z-10">
                <span className="text-white text-sm font-light tracking-wider rotate-90 origin-center">
                    SCROLL DOWN
                </span>
                <div className="flex flex-col space-y-1">
                    <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
                    <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
                </div>
            </div>
        </div>
    )
}