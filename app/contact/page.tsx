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
                {opacity: 0, x: -100}, 
                {duration: 1, opacity: 1, x: 0, ease: "power2.out"}
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

    const handleContactClick = (type: string, value: string) => {
        switch(type) {
            case 'email':
                window.open(`mailto:${value}`, '_self')
                break
            case 'linkedin':
                window.open(value, '_blank', 'noopener,noreferrer')
                break
            case 'github':
                window.open(value, '_blank', 'noopener,noreferrer')
                break
            case 'facebook':
                window.open(value, '_blank', 'noopener,noreferrer')
                break
            case 'phone':
                window.open(`tel:${value}`, '_self')
                break
        }
    }

    const contactInfo = [
        {
            type: 'email',
            title: 'Email',
            value: 'nledesma35@gmail.com',
            display: 'nledesma35@gmail.com',
            color: 'emerald',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
            )
        },
        {
            type: 'linkedin',
            title: 'LinkedIn',
            value: 'https://www.linkedin.com/in/nathaniel-ledesma-4547a2283/',
            display: 'Connect with me',
            color: 'blue',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            )
        },
        {
            type: 'github',
            title: 'GitHub',
            value: 'https://github.com/d0ughnat',
            display: 'View my code',
            color: 'purple',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            )
        },
        {
            type: 'facebook',
            title: 'Facebook',
            value: 'https://www.facebook.com/nathaniel.ledesma.7/',
            display: 'Let\'s connect',
            color: 'blue',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            )
        }
    ]

    return (
        <div ref={effects} className="min-h-screen flex items-center justify-center">
            <div className="max-w-4xl px-6 w-full text-center">
                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Let's Connect
                    </h1>
                    <p className="text-md md:text-md font-semibold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                        Ready to collaborate on your next project? Let's discuss how we can work together to bring your ideas to life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 justify-items-center">
                    {contactInfo.map((contact, index) => (
                        <div
                            key={index}
                            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer hover:scale-105 transform shadow-2xl hover:shadow-emerald-500/10 w-full max-w-sm"
                            onClick={() => handleContactClick(contact.type, contact.value)}
                        >
                            <div className="flex flex-col items-center text-center space-y-4 mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${
                                    contact.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                                    contact.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                    'from-purple-500 to-purple-600'
                                } text-white group-hover:scale-110 transition-transform duration-300`}>
                                    {contact.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                        {contact.title}
                                    </h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                        {contact.display}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-center">
                                <span className="text-sm text-emerald-400/70 group-hover:text-emerald-400 transition-colors font-medium">
                                    Click to {contact.type === 'email' ? 'send email' : 'visit profile'} →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info Section */}
                
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
