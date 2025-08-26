// DMAN Website Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading screen control
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time and hide loading screen
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Remove loading screen from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 3000); // Show loading for 3 seconds
    
    // Audio element for sound effects
    const wakkaSound = document.getElementById('wakka-sound');
    
    // Add click sound effect to power pellets
    const powerPellets = document.querySelectorAll('.power-pellet');
    powerPellets.forEach(pellet => {
        pellet.addEventListener('click', function() {
            // Play wakka sound
            if (wakkaSound) {
                wakkaSound.currentTime = 0;
                wakkaSound.play().catch(e => console.log('Audio play failed:', e));
            }
            
            // Add visual effect
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 150);
            
            // Create particle effect
            createParticleEffect(this);
        });
    });
    
    // Add hover effects to power pellets
    powerPellets.forEach(pellet => {
        pellet.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s infinite';
        });
        
        pellet.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.link-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Play wakka sound
            if (wakkaSound) {
                wakkaSound.currentTime = 0;
                wakkaSound.play().catch(e => console.log('Audio play failed:', e));
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Create particle effect function
    function createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #fff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (i / 12) * Math.PI * 2;
            const distance = 60 + Math.random() * 40;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1200,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
    
    // Enhanced typing effect function
    function typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 3500);
    }
    
    // Add typing effect to power text
    const powerText = document.querySelector('.power-text');
    if (powerText) {
        const originalPowerText = powerText.textContent;
        setTimeout(() => {
            typeWriter(powerText, originalPowerText, 50);
        }, 5000);
    }
    
    // Add glitch effect to titles randomly
    function addGlitchEffect() {
        const titles = document.querySelectorAll('.title, .hero-title, .section-title');
        titles.forEach(title => {
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance every interval
                    title.classList.add('glitch');
                    title.setAttribute('data-text', title.textContent);
                    
                    setTimeout(() => {
                        title.classList.remove('glitch');
                    }, 200);
                }
            }, 3000);
        });
    }
    
    // Start glitch effects after loading
    setTimeout(addGlitchEffect, 4000);
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add entrance animation
                entry.target.style.animation = 'entranceSlide 0.8s ease-out';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.about, .what-i-do, .join-quest, .cta, .links');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add entrance animation to CSS
    const entranceStyle = document.createElement('style');
    entranceStyle.textContent = `
        @keyframes entranceSlide {
            0% {
                transform: translateY(30px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(entranceStyle);
    
    // Add blockchain transaction effect
    function createBlockchainEffect() {
        const transaction = document.createElement('div');
        transaction.className = 'blockchain-transaction';
        transaction.textContent = '0x' + Math.random().toString(16).substr(2, 8);
        transaction.style.cssText = `
            position: fixed;
            color: #fff;
            font-size: 12px;
            font-family: monospace;
            pointer-events: none;
            z-index: 5;
            opacity: 0.7;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        `;
        
        document.body.appendChild(transaction);
        
        transaction.animate([
            {
                transform: 'translateY(0)',
                opacity: 0.7
            },
            {
                transform: 'translateY(-100px)',
                opacity: 0
            }
        ], {
            duration: 3000,
            easing: 'ease-out'
        }).onfinish = () => {
            transaction.remove();
        };
    }
    
    // Create blockchain effects periodically (start after loading)
    setTimeout(() => {
        setInterval(createBlockchainEffect, 5000);
    }, 3500);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Spacebar to trigger wakka effect
        if (e.code === 'Space') {
            e.preventDefault();
            if (wakkaSound) {
                wakkaSound.currentTime = 0;
                wakkaSound.play().catch(e => console.log('Audio play failed:', e));
            }
            
            // Create global particle effect
            createGlobalParticleEffect();
        }
        
        // 'W' key for wakka animation
        if (e.code === 'KeyW') {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.style.animation = 'wakka 0.2s infinite';
                setTimeout(() => {
                    heroTitle.style.animation = 'wakka 0.5s infinite';
                }, 1000);
            }
        }
        
        // 'G' key for glitch effect
        if (e.code === 'KeyG') {
            const titles = document.querySelectorAll('.title, .hero-title');
            titles.forEach(title => {
                title.classList.add('glitch');
                title.setAttribute('data-text', title.textContent);
                
                setTimeout(() => {
                    title.classList.remove('glitch');
                }, 500);
            });
        }
    });
    
    // Create global particle effect
    function createGlobalParticleEffect() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: #fff;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
                `;
                
                document.body.appendChild(particle);
                
                particle.animate([
                    {
                        transform: 'scale(1)',
                        opacity: 1
                    },
                    {
                        transform: 'scale(0)',
                        opacity: 0
                    }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                }).onfinish = () => {
                    particle.remove();
                };
            }, i * 30);
        }
    }
    
    // Enhanced mouse trail effect
    let mouseTrail = [];
    const maxTrailLength = 15;
    
    document.addEventListener('mousemove', function(e) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${e.clientX - 3}px;
            top: ${e.clientY - 3}px;
            opacity: 0.7;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        `;
        
        document.body.appendChild(dot);
        mouseTrail.push(dot);
        
        if (mouseTrail.length > maxTrailLength) {
            const oldDot = mouseTrail.shift();
            oldDot.remove();
        }
        
        // Fade out trail
        mouseTrail.forEach((trailDot, index) => {
            const opacity = (index / maxTrailLength) * 0.7;
            const scale = 1 - (index / maxTrailLength) * 0.5;
            trailDot.style.opacity = opacity;
            trailDot.style.transform = `scale(${scale})`;
        });
    });
    
    // Add power-up effect to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.filter = 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.8))';
            this.style.transform = 'scale(1.2) rotate(360deg)';
            
            // Create logo particle explosion
            createLogoParticleEffect(this);
            
            setTimeout(() => {
                this.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))';
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 1000);
            
            // Play wakka sound
            if (wakkaSound) {
                wakkaSound.currentTime = 0;
                wakkaSound.play().catch(e => console.log('Audio play failed:', e));
            }
        });
    }
    
    // Create logo particle effect
    function createLogoParticleEffect(logoElement) {
        const rect = logoElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: #fff;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
                `;
                
                document.body.appendChild(particle);
                
                const angle = (i / 20) * Math.PI * 2;
                const distance = 80 + Math.random() * 40;
                const endX = centerX + Math.cos(angle) * distance;
                const endY = centerY + Math.sin(angle) * distance;
                
                particle.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1
                    },
                    {
                        transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                }).onfinish = () => {
                    particle.remove();
                };
            }, i * 50);
        }
    }
    
    // Add easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Trigger special effect
            document.body.style.animation = 'shake 0.5s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
            
            // Create massive particle explosion
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    createGlobalParticleEffect();
                }, i * 50);
            }
            
            // Add glitch effect to all titles
            const allTitles = document.querySelectorAll('.title, .hero-title, .section-title');
            allTitles.forEach(title => {
                title.classList.add('glitch');
                title.setAttribute('data-text', title.textContent);
                
                setTimeout(() => {
                    title.classList.remove('glitch');
                }, 2000);
            });
        }
    });
    
    // Add shake animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Contract copy functionality
    const copyContractBtn = document.getElementById('copyContract');
    const contractAddress = document.getElementById('contractAddress');
    const notificationPopup = document.getElementById('notificationPopup');
    
    if (copyContractBtn) {
        copyContractBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(contractAddress.textContent);
                showNotification();
                createParticleEffect(copyContractBtn);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = contractAddress.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification();
                createParticleEffect(copyContractBtn);
            }
        });
    }
    
    function showNotification() {
        notificationPopup.classList.add('show');
        setTimeout(() => {
            notificationPopup.classList.remove('show');
        }, 3000);
    }

    // Initialize the page with a welcome effect (after loading)
    setTimeout(() => {
        createGlobalParticleEffect();
    }, 3500);
    
    console.log('$MALI Website loaded!');
    console.log('Controls:');
    console.log('- Spacebar: Trigger wakka effect');
    console.log('- W key: Intensify wakka animation');
    console.log('- G key: Trigger glitch effect');
    console.log('- Click logo: Power-up effect');
    console.log('- Konami code: Easter egg');
    console.log('- Copy contract: Click copy button');
});
