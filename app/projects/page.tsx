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
                {opacity: 0, scale: 0.8}, 
                {duration: 1.2, opacity: 1, scale: 1, ease: "back.out(1.7)"}
            )
        }

        // Handle scroll to navigate home
        const handleScroll = (e: WheelEvent) => {
            e.preventDefault()
            
            if (e.deltaY > 0) {
                // Scroll down - go to main page
                router.push('/')
            }
        }

        // Add scroll event listener
        window.addEventListener('wheel', handleScroll, { passive: false })
        
        // Cleanup
        return () => {
            window.removeEventListener('wheel', handleScroll)
        }
    }, [router])

    const projects = [
        { 
            name: "Bijou Platform", 
            tech: "Laravel, React, MySQL", 
            url: "https://bijou.laravel.cloud",
            type: "web"
        },
        { 
            name: "BWC Platform", 
            tech: "Laravel, React, Database", 
            url: "https://bwc.laravel.cloud/",
            type: "web"
        },
        { 
            name: "MCQ Maker with Generative AI", 
            tech: "Python, AI/ML, OpenAI API", 
            url: "https://github.com/d0ughnat/MCQ-maker-with-generative-ai",
            type: "github"
        },
        { 
            name: "Chatbot using Golang", 
            tech: "Go, Backend Development", 
            url: "https://github.com/d0ughnat/chatbot-using-golang",
            type: "github"
        }
    ]

    const handleProjectClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div ref={effects} className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-5xl px-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap- lg:gap-16 mt-60">
                    {projects.map((project, index) => (
                        <div 
                            key={index} 
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer group hover:scale-105 transform shadow-2xl hover:shadow-emerald-500/10"
                            onClick={() => handleProjectClick(project.url)}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                    {project.name}
                                </h3>
                                <div className="flex items-center space-x-3">
                                    {project.type === 'github' ? (
                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    )}
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-lg mb-6">{project.tech}</p>
                            <div className="mt-6 text-sm text-emerald-400/70 group-hover:text-emerald-400 transition-colors font-medium">
                                Click to visit →
                            </div>
                        </div>
                    ))}
                </div>
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
