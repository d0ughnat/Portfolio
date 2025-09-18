import { gsap } from "gsap";

// Project data with minimalist titles
const projects = [
  {
    id: 1,
    title: "Silence",
    year: "2021",
    image:
      "https://cdn.cosmos.so/7d47d4e2-0eff-4e2f-9734-9d24a8ba067e?format=jpeg"
  },
  {
    id: 2,
    title: "Resonance",
    year: "2022",
    image:
      "https://cdn.cosmos.so/5eee2d2d-3d4d-4ae5-96d4-cdbae70a2387?format=jpeg"
  },
  {
    id: 3,
    title: "Essence",
    year: "2022",
    image:
      "https://cdn.cosmos.so/def30e8a-34b2-48b1-86e1-07ec5c28f225?format=jpeg"
  },
  {
    id: 4,
    title: "Void",
    year: "2023",
    image:
      "https://cdn.cosmos.so/44d7cb23-6759-49e4-9dc1-acf771b3a0d1?format=jpeg"
  },
  {
    id: 5,
    title: "Presence",
    year: "2023",
    image:
      "https://cdn.cosmos.so/7712fe42-42ca-4fc5-9590-c89f2db99978?format=jpeg"
  },
  {
    id: 6,
    title: "Flow",
    year: "2024",
    image:
      "https://cdn.cosmos.so/cbee1ec5-01b6-4ffe-9f34-7da7980454cf?format=jpeg"
  },
  {
    id: 7,
    title: "Clarity",
    year: "2024",
    image:
      "https://cdn.cosmos.so/2e91a9d1-db85-4499-ad37-6222a6fea23b?format=jpeg"
  },
  {
    id: 8,
    title: "Breath",
    year: "2024",
    image:
      "https://cdn.cosmos.so/ff2ac3d3-fa94-4811-89f6-0d008b27e439?format=jpeg"
  },
  {
    id: 9,
    title: "Stillness",
    year: "2025",
    image:
      "https://cdn.cosmos.so/c39a4043-f489-4406-8018-a103a3f89802?format=jpeg"
  },
  {
    id: 10,
    title: "Surrender",
    year: "2025",
    image:
      "https://cdn.cosmos.so/e5e399f2-4050-463b-a781-4f5a1615f28e?format=jpeg"
  }
];

// GSAP Context for cleanup
let ctx;

document.addEventListener("DOMContentLoaded", function () {
  const projectsContainer = document.querySelector(".projects-container");
  const backgroundImage = document.getElementById("background-image");

  // Initialize GSAP context
  ctx = gsap.context(() => {
    // Render projects
    renderProjects(projectsContainer);

    // Initialize GSAP animations
    initializeGSAPAnimations();

    // Preload images
    preloadImages();

    // Add hover events to project items
    setupGSAPHoverEvents(backgroundImage, projectsContainer);
  });
});

// Render project items
function renderProjects(container) {
  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.dataset.id = project.id;
    projectItem.dataset.image = project.image;

    projectItem.innerHTML = `
      <div class="project-title">${project.title}</div>
      <div class="project-year">${project.year}</div>
    `;

    container.appendChild(projectItem);
  });
}

// Initialize GSAP animations for project items
function initializeGSAPAnimations() {
  const projectItems = document.querySelectorAll(".project-item");
  
  // Create timeline for coordinated animations
  const tl = gsap.timeline();
  
  // Set initial state for all project items
  gsap.set(projectItems, {
    opacity: 0,
    y: 60,
    scale: 0.95
  });

  // Animate container if it exists
  const container = document.querySelector(".projects-container");
  if (container) {
    gsap.set(container, { opacity: 0, scale: 0.98 });
    tl.to(container, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out"
    });
  }

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
  gsap.to(projectItems, {
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
}

// Setup GSAP-powered hover events for project items
function setupGSAPHoverEvents(backgroundImage, projectsContainer) {
  const projectItems = document.querySelectorAll(".project-item");
  let currentImageTween = null;
  let hoverTween = null;

  // Preload all images to ensure immediate display
  const preloadedImages = {};
  projects.forEach((project) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = project.image;
    preloadedImages[project.id] = img;
  });

  projectItems.forEach((item) => {
    // Mouse enter event
    item.addEventListener("mouseenter", function () {
      const imageUrl = this.dataset.image;

      // Kill any existing image animation
      if (currentImageTween) {
        currentImageTween.kill();
      }

      // Kill any existing hover animation
      if (hoverTween) {
        hoverTween.kill();
      }

      // Set initial scale and show image immediately
      gsap.set(backgroundImage, {
        scale: 1.3,
        opacity: 1
      });
      
      backgroundImage.src = imageUrl;

      // Create smooth zoom-out effect with GSAP
      currentImageTween = gsap.to(backgroundImage, {
        scale: 1.0,
        duration: 1.2,
        ease: "power2.out"
      });

      // Add hover effect to the project item itself
      hoverTween = gsap.to(this, {
        y: -5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });

      // Add subtle glow effect to title and year
      const title = this.querySelector(".project-title");
      const year = this.querySelector(".project-year");
      
      gsap.to([title, year], {
        color: "#ffffff",
        textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });
    });

    // Mouse leave event
    item.addEventListener("mouseleave", function () {
      // Kill any existing hover animation
      if (hoverTween) {
        hoverTween.kill();
      }

      // Reset project item position and scale
      gsap.to(this, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });

      // Reset text effects
      const title = this.querySelector(".project-title");
      const year = this.querySelector(".project-year");
      
      gsap.to([title, year], {
        color: "", // Reset to original color
        textShadow: "none",
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });

  // Handle mouse leaving the projects container
  projectsContainer.addEventListener("mouseleave", function () {
    // Kill any existing image animation
    if (currentImageTween) {
      currentImageTween.kill();
    }

    // Fade out the background image
    gsap.to(backgroundImage, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  });
}

// Preload images
function preloadImages() {
  projects.forEach((project) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = project.image;
  });
}

// Cleanup function
function cleanup() {
  if (ctx) {
    ctx.revert();
  }
}

// Export cleanup function for use in frameworks
export { cleanup };
