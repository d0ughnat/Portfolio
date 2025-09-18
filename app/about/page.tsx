"use client"
import { gsap } from "gsap"
import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
    const effects = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        if(effects.current){
            gsap.fromTo(effects.current, 
                {opacity: 0, y: 50}, 
                {duration: 1, opacity: 1, y: 0}
            )
        }

        // Handle scroll to navigate home
        const handleScroll = (e: WheelEvent) => {
            e.preventDefault()
            
            if (e.deltaY > 0) {
                router.push('/')
            }
        }

        // Add scroll event listener
        window.addEventListener('wheel', handleScroll, { passive: false })
        
        // Cleanup
        return () => {
            window.removeEventListener('wheel', handleScroll)
        }
    }, [])

    return (
        <div ref={effects} className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-2xl px-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">About Me</h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                    I'm a passionate developer who loves creating beautiful and functional web experiences. 
                    With expertise in modern technologies like React, Next.js, and GSAP animations.
                </p>
                <p className="text-lg text-gray-400">
                    Always learning, always building, always pushing the boundaries of what's possible on the web.
                </p>
            </div>
            
            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 right-0 flex flex-col items-center space-y-2 animate-bounce">
                <span className="text-white/70 text-sm font-light tracking-wider rotate-90 origin-center">
                    SCROLL DOWN
                </span>
                <div className="flex flex-col space-y-1">
                    <div className="w-px h-8 bg-gradient-to-b from-white/70 to-transparent"></div>
                    <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/70"></div>
                </div>
            </div>
        </div>
    )
}
