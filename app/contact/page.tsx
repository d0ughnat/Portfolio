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
            value: 'nathaniel.ledesma@example.com',
            display: 'nathaniel.ledesma@example.com',
            color: 'emerald'
        },
        {
            type: 'linkedin',
            title: 'LinkedIn',
            value: 'https://www.linkedin.com/in/nathaniel-ledesma-4547a2283/',
            display: 'Connect with me',
            color: 'blue'
        },
        {
            type: 'github',
            title: 'GitHub',
            value: 'https://github.com/d0ughnat',
            display: 'View my code',
            color: 'purple'
        },
        {
            type: 'facebook',
            title: 'Facebook',
            value: 'https://www.facebook.com/nathaniel.ledesma.7/',
            display: 'Let\'s connect',
            color: 'blue'
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
