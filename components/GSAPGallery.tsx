"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Project data with minimalist titles
const projects = [
  {
    id: 1,
    title: "Silence",
    year: "2021",
    image: "https://cdn.cosmos.so/7d47d4e2-0eff-4e2f-9734-9d24a8ba067e?format=jpeg"
  },
  {
    id: 2,
    title: "Resonance",
    year: "2022",
    image: "https://cdn.cosmos.so/5eee2d2d-3d4d-4ae5-96d4-cdbae70a2387?format=jpeg"
  },
  {
    id: 3,
    title: "Essence",
    year: "2022",
    image: "https://cdn.cosmos.so/def30e8a-34b2-48b1-86e1-07ec5c28f225?format=jpeg"
  },
  {
    id: 4,
    title: "Void",
    year: "2023",
    image: "https://cdn.cosmos.so/44d7cb23-6759-49e4-9dc1-acf771b3a0d1?format=jpeg"
  },
  {
    id: 5,
    title: "Presence",
    year: "2023",
    image: "https://cdn.cosmos.so/7712fe42-42ca-4fc5-9590-c89f2db99978?format=jpeg"
  },
  {
    id: 6,
    title: "Flow",
    year: "2024",
    image: "https://cdn.cosmos.so/cbee1ec5-01b6-4ffe-9f34-7da7980454cf?format=jpeg"
  },
  {
    id: 7,
    title: "Clarity",
    year: "2024",
    image: "https://cdn.cosmos.so/2e91a9d1-db85-4499-ad37-6222a6fea23b?format=jpeg"
  },
  {
    id: 8,
    title: "Breath",
    year: "2024",
    image: "https://cdn.cosmos.so/ff2ac3d3-fa94-4811-89f6-0d008b27e439?format=jpeg"
  },
  {
    id: 9,
    title: "Stillness",
    year: "2025",
    image: "https://cdn.cosmos.so/c39a4043-f489-4406-8018-a103a3f89802?format=jpeg"
  },
  {
    id: 10,
    title: "Surrender",
    year: "2025",
    image: "https://cdn.cosmos.so/e5e399f2-4050-463b-a781-4f5a1615f28e?format=jpeg"
  }
];

interface GSAPGalleryProps {
  className?: string;
}

const GSAPGallery: React.FC<GSAPGalleryProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement>(null);
  const projectItemsRef = useRef<HTMLDivElement[]>([]);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  // Store GSAP tweens for cleanup
  const tweensRef = useRef<{
    currentImageTween?: gsap.core.Tween;
    hoverTween?: gsap.core.Tween;
    floatingTween?: gsap.core.Tween;
  }>({});

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = projects.map((project) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = resolve;
          img.onerror = reject;
          img.src = project.image;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
      } catch (error) {
        console.warn("Some images failed to preload:", error);
        setImagesPreloaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    if (!imagesPreloaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const projectItems = projectItemsRef.current.filter(Boolean);
      
      // Create timeline for coordinated animations
      const tl = gsap.timeline();
      
      // Set initial state for all project items
      gsap.set(projectItems, {
        opacity: 0,
        y: 60,
        scale: 0.95
      });

      // Animate container
      gsap.set(containerRef.current, { opacity: 0, scale: 0.98 });
      tl.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });

      // Staggered animation for project items
      tl.to(projectItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out"
      }, "-=0.6");

      // Add subtle floating animation
      tweensRef.current.floatingTween = gsap.to(projectItems, {
        y: "random(-3, 3)",
        rotation: "random(-0.5, 0.5)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      // Clean up any remaining tweens
      Object.values(tweensRef.current).forEach(tween => {
        if (tween) tween.kill();
      });
    };
  }, [imagesPreloaded]);

  // Handle mouse enter
  const handleMouseEnter = (project: typeof projects[0], itemElement: HTMLDivElement) => {
    if (!backgroundImageRef.current) return;

    // Kill any existing animations
    if (tweensRef.current.currentImageTween) {
      tweensRef.current.currentImageTween.kill();
    }
    if (tweensRef.current.hoverTween) {
      tweensRef.current.hoverTween.kill();
    }

    // Set initial scale and show image immediately
    gsap.set(backgroundImageRef.current, {
      scale: 1.3,
      opacity: 1
    });
    
    backgroundImageRef.current.src = project.image;

    // Create smooth zoom-out effect with GSAP
    tweensRef.current.currentImageTween = gsap.to(backgroundImageRef.current, {
      scale: 1.0,
      duration: 1.2,
      ease: "power2.out"
    });

    // Add hover effect to the project item itself
    tweensRef.current.hoverTween = gsap.to(itemElement, {
      y: -5,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });

    // Add subtle glow effect to title and year
    const title = itemElement.querySelector(".project-title");
    const year = itemElement.querySelector(".project-year");
    
    gsap.to([title, year], {
      color: "#ffffff",
      textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Handle mouse leave
  const handleMouseLeave = (itemElement: HTMLDivElement) => {
    // Kill any existing hover animation
    if (tweensRef.current.hoverTween) {
      tweensRef.current.hoverTween.kill();
    }

    // Reset project item position and scale
    gsap.to(itemElement, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    // Reset text effects
    const title = itemElement.querySelector(".project-title");
    const year = itemElement.querySelector(".project-year");
    
    gsap.to([title, year], {
      color: "", // Reset to original color
      textShadow: "none",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  // Handle container mouse leave
  const handleContainerMouseLeave = () => {
    if (!backgroundImageRef.current) return;

    // Kill any existing image animation
    if (tweensRef.current.currentImageTween) {
      tweensRef.current.currentImageTween.kill();
    }

    // Fade out the background image
    gsap.to(backgroundImageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div className={`gsap-gallery ${className}`}>
      {/* Background Image */}
      <img
        ref={backgroundImageRef}
        id="background-image"
        className="background-image"
        alt=""
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Projects Container */}
      <div
        ref={containerRef}
        className="projects-container"
        onMouseLeave={handleContainerMouseLeave}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) projectItemsRef.current[index] = el;
            }}
            className="project-item"
            data-id={project.id}
            data-image={project.image}
            onMouseEnter={(e) => handleMouseEnter(project, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            style={{
              cursor: 'pointer',
              padding: '1.5rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'background-color 0.3s ease'
            }}
          >
            <div 
              className="project-title"
              style={{
                fontSize: '1.5rem',
                fontWeight: '300',
                marginBottom: '0.5rem',
                color: '#e0e0e0'
              }}
            >
              {project.title}
            </div>
            <div 
              className="project-year"
              style={{
                fontSize: '0.9rem',
                color: '#a0a0a0',
                fontWeight: '400'
              }}
            >
              {project.year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GSAPGallery;
