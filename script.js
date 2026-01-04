// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect for children
            const children = entry.target.querySelectorAll('.fade-in-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Photo frame hover effect
document.querySelectorAll('.photo-frame, .collage-item, .polaroid').forEach(frame => {
    frame.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(0deg) scale(1.05)';
    });
    
    frame.addEventListener('mouseleave', function() {
        const originalRotation = this.classList.contains('collage-item') 
            ? (Array.from(this.parentElement.children).indexOf(this) % 2 === 0 ? '-3deg' : '2deg')
            : '-2deg';
        this.style.transform = `rotate(${originalRotation})`;
    });
});

// Parallax effect for decorative elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for doodles
    document.querySelectorAll('.doodle').forEach((doodle, index) => {
        const speed = 0.3 + (index * 0.1);
        doodle.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for decorative corners
    document.querySelectorAll('.decorative-corner').forEach((corner, index) => {
        const speed = 0.15 + (index * 0.05);
        corner.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing effect for cover title (optional)
const coverTitle = document.querySelector('.cover-title');
if (coverTitle) {
    const originalText = coverTitle.textContent;
    coverTitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            coverTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Add floating hearts animation randomly
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '♥';
    heart.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 20 + 15}px;
        color: rgba(212, 165, 165, 0.6);
        left: ${Math.random() * 100}vw;
        bottom: -50px;
        pointer-events: none;
        z-index: 9998;
        animation: floatUp ${Math.random() * 3 + 4}s ease-in forwards;
    `;
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 3000);

// Add CSS animation for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Tilt effect on photo frames
document.querySelectorAll('.photo-frame, .polaroid').forEach(frame => {
    frame.addEventListener('mousemove', (e) => {
        const rect = frame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    frame.addEventListener('mouseleave', () => {
        frame.style.transform = '';
    });
});

// Add page load animation
window.addEventListener('load', () => {
    const coverContent = document.querySelector('.cover-content');
    if (coverContent) {
        coverContent.style.animation = 'fadeInUp 1.5s ease-out';
    }
});

// Console easter egg
console.log('%c💕 Made with Love 💕', 'font-size: 24px; color: #d4a5a5; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%c🎉 Happy Birthday Davit! 🎉', 'font-size: 16px; color: #2c3e50; font-weight: bold;');

// Add cursor trail effect
const cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, rgba(212, 165, 165, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: trailFade 0.8s ease-out forwards;
    `;
    document.body.appendChild(trail);
    
    cursorTrail.push(trail);
    
    if (cursorTrail.length > trailLength) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }
});

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);

// Lazy load images with fade-in
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease-in';
            
            // Fade in when image is loaded
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
            
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Add sparkle effect on click
document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAnimation 1s ease-out forwards;
    `;
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Music note animation on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const notes = ['♪', '♫', '♬'];
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        const noteElement = document.createElement('div');
        
        noteElement.innerHTML = randomNote;
        noteElement.style.cssText = `
            position: fixed;
            right: 50px;
            top: 50%;
            font-size: 30px;
            color: rgba(44, 62, 80, 0.3);
            pointer-events: none;
            z-index: 9998;
            animation: noteFloat 2s ease-out forwards;
        `;
        document.body.appendChild(noteElement);
        
        setTimeout(() => noteElement.remove(), 2000);
    }, 100);
});

const noteStyle = document.createElement('style');
noteStyle.textContent = `
    @keyframes noteFloat {
        0% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateX(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(noteStyle);
