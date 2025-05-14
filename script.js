// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Create falling hearts
    createFallingHearts();
    
    // Initialize floating photos
    initFloatingPhotos();
    
    // Initialize photo carousel
    initPhotoCarousel();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Add confetti effect on page load
    createConfetti();
    
    // Initialize music player
    initMusicPlayer();
});

// Create falling hearts background
function createFallingHearts() {
    const heartsContainer = document.querySelector('.falling-hearts');
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 5 + 3}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.position = 'absolute';
        heart.style.top = '-50px';
        heart.style.animation = `fall ${Math.random() * 5 + 5}s linear ${Math.random() * 5}s infinite`;
        
        heartsContainer.appendChild(heart);
    }
    
    // Add keyframes for falling animation
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes fall {
            0% {
                transform: translateY(-50px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Initialize floating photos with random positions and movements
function initFloatingPhotos() {
    const floatingPhotos = document.querySelectorAll('.floating-photo');
    
    floatingPhotos.forEach((photo, index) => {
        // Set initial random positions
        const randomX = Math.random() * 60 + 10; // Between 10-70%
        const randomY = Math.random() * 60 + 10; // Between 10-70%
        const randomRotate = Math.random() * 20 - 10; // Between -10 and 10 degrees
        
        photo.style.left = `${randomX}%`;
        photo.style.top = `${randomY}%`;
        photo.style.transform = `rotate(${randomRotate}deg)`;
        photo.style.zIndex = index;
        
        // Add floating animation with unique timing
        photo.style.animation = `float ${Math.random() * 3 + 4}s infinite ease-in-out ${Math.random() * 2}s`;
        
        // Make photos draggable
        makeDraggable(photo);
        
        // Add click event to zoom in
        photo.addEventListener('click', () => {
            if (!photo.classList.contains('zoomed')) {
                // Zoom in
                photo.classList.add('zoomed');
                photo.style.position = 'fixed';
                photo.style.top = '50%';
                photo.style.left = '50%';
                photo.style.transform = 'translate(-50%, -50%) scale(2)';
                photo.style.width = 'auto';
                photo.style.height = 'auto';
                photo.style.maxHeight = '80vh';
                photo.style.maxWidth = '80vw';
                photo.style.zIndex = '1000';
                photo.style.animation = 'none';
                
                // Create overlay
                const overlay = document.createElement('div');
                overlay.classList.add('photo-overlay');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                overlay.style.zIndex = '999';
                document.body.appendChild(overlay);
                
                // Close on overlay click
                overlay.addEventListener('click', () => {
                    photo.classList.remove('zoomed');
                    photo.style.position = 'absolute';
                    photo.style.transform = `rotate(${randomRotate}deg)`;
                    photo.style.width = '150px';
                    photo.style.height = '150px';
                    photo.style.maxHeight = 'none';
                    photo.style.maxWidth = 'none';
                    photo.style.top = `${randomY}%`;
                    photo.style.left = `${randomX}%`;
                    photo.style.zIndex = index;
                    photo.style.animation = `float ${Math.random() * 3 + 4}s infinite ease-in-out`;
                    document.body.removeChild(overlay);
                });
            }
        });
    });
}

// Make elements draggable
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Initialize photo carousel
function initPhotoCarousel() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselImages = document.querySelectorAll('.carousel-img');
    let currentIndex = 0;
    
    // Show first image
    carouselImages[currentIndex].classList.add('active');
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        carouselImages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % carouselImages.length;
        carouselImages[currentIndex].classList.add('active');
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        carouselImages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        carouselImages[currentIndex].classList.add('active');
    });
    
    // Auto-rotate carousel
    setInterval(() => {
        carouselImages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % carouselImages.length;
        carouselImages[currentIndex].classList.add('active');
    }, 5000);
}

// Initialize interactive elements
function initInteractiveElements() {
    // Blow candle interaction
    const blowCandleBtn = document.querySelector('.blow-candle-btn');
    const flame = document.querySelector('.flame');
    
    blowCandleBtn.addEventListener('click', () => {
        flame.style.opacity = '0';
        flame.style.boxShadow = 'none';
        
        // Show celebration message
        setTimeout(() => {
            const message = document.createElement('div');
            message.textContent = '🎉 생일 축하해! 소원이 이루어질 거야! 🎉';
            message.style.position = 'absolute';
            message.style.top = '-80px';
            message.style.left = '50%';
            message.style.transform = 'translateX(-50%)';
            message.style.backgroundColor = '#ff6b9d';
            message.style.color = 'white';
            message.style.padding = '10px 20px';
            message.style.borderRadius = '30px';
            message.style.fontWeight = 'bold';
            message.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            message.style.animation = 'fadeInUp 0.5s forwards';
            
            document.querySelector('.cake').appendChild(message);
            
            // Create more confetti
            createConfetti();
        }, 500);
    });
    
    // Add balloon pop effect
    const balloons = document.querySelectorAll('.balloon');
    
    balloons.forEach((balloon, index) => {
        balloon.style.setProperty('--i', index);
        
        balloon.addEventListener('click', () => {
            // Pop animation
            balloon.style.transform = 'scale(1.5)';
            balloon.style.opacity = '0';
            
            // Play pop sound
            const popSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-balloon-popping-and-deflating-2557.mp3');
            popSound.volume = 0.3;
            popSound.play();
            
            // Create mini confetti burst
            createMiniBurst(balloon);
            
            // Reset balloon after animation
            setTimeout(() => {
                balloon.style.transform = 'scale(1)';
                balloon.style.opacity = '1';
            }, 1500);
        });
    });
    
    // Add hover effects to memory grid items
    const memoryItems = document.querySelectorAll('.memory-item');
    
    memoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -15,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Initialize Quiz Game
    initQuizGame();
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#ffb6c1', '#ffd700', '#87cefa', '#98fb98'];
    const confettiCount = 200;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.position = 'fixed';
        confetti.style.top = '-50px';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            document.body.removeChild(confetti);
        }, 5000);
    }
    
    // Add keyframes for confetti animation
    if (!document.querySelector('#confetti-style')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'confetti-style';
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Create mini confetti burst
function createMiniBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const colors = ['#ff6b9d', '#ffb6c1', '#ffd700', '#87cefa', '#98fb98'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = `${Math.random() * 8 + 4}px`;
        particle.style.height = `${Math.random() * 8 + 4}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.top = `${centerY}px`;
        particle.style.left = `${centerX}px`;
        particle.style.zIndex = '1000';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        // Animate the particle
        gsap.to(particle, {
            x: vx * 10,
            y: vy * 10,
            opacity: 0,
            duration: Math.random() * 1 + 0.5,
            onComplete: () => {
                document.body.removeChild(particle);
            }
        });
        
        document.body.appendChild(particle);
    }
}

// Add parallax effect to sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const scrollPosition = window.scrollY;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition > sectionTop - window.innerHeight && 
            scrollPosition < sectionTop + sectionHeight) {
            const parallaxValue = (scrollPosition - sectionTop) * 0.1;
            section.style.backgroundPosition = `center ${parallaxValue}px`;
        }
    });
});

// Add typing effect to letter section
const letterContent = document.querySelector('.letter-content');

letterContent.addEventListener('focus', () => {
    if (!letterContent.textContent.trim()) {
        letterContent.textContent = '여기에 편지를 작성하세요...';
        
        // Select all text when focused
        const range = document.createRange();
        range.selectNodeContents(letterContent);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

// Save letter content to local storage
letterContent.addEventListener('input', () => {
    localStorage.setItem('birthdayLetter', letterContent.innerHTML);
});

// Load saved letter if exists
if (localStorage.getItem('birthdayLetter')) {
    letterContent.innerHTML = localStorage.getItem('birthdayLetter');
}

// Initialize music player
function initMusicPlayer() {
    const musicBtn = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;
    
    // Set initial volume
    backgroundMusic.volume = 0.3;
    
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            backgroundMusic.play();
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}

// Initialize Quiz Game
function initQuizGame() {
    const startQuizBtn = document.querySelector('.start-quiz-btn');
    const restartQuizBtn = document.querySelector('.restart-quiz-btn');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizQuestions = document.querySelector('.quiz-questions');
    const quizResult = document.querySelector('.quiz-result');
    const quizNavigation = document.querySelector('.quiz-navigation');
    const questions = document.querySelectorAll('.question');
    const prevQuestionBtn = document.querySelector('.prev-question-btn');
    const nextQuestionBtn = document.querySelector('.next-question-btn');
    const questionCounter = document.querySelector('.question-counter');
    const resultMessage = document.querySelector('.result-message');
    const scoreDisplay = document.querySelector('.score');
    
    let currentQuestion = 1;
    let score = 0;
    let userAnswers = {};
    
    // Start Quiz
    startQuizBtn.addEventListener('click', () => {
        quizIntro.style.display = 'none';
        quizQuestions.style.display = 'block';
        quizNavigation.style.display = 'flex';
        showQuestion(currentQuestion);
    });
    
    // Restart Quiz
    restartQuizBtn.addEventListener('click', () => {
        quizResult.style.display = 'none';
        quizQuestions.style.display = 'block';
        quizNavigation.style.display = 'flex';
        
        // Reset quiz state
        currentQuestion = 1;
        score = 0;
        userAnswers = {};
        
        // Reset options
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        showQuestion(currentQuestion);
    });
    
    // Navigation buttons
    prevQuestionBtn.addEventListener('click', () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });
    
    nextQuestionBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length) {
            // If this is the last question and user hasn't answered, don't proceed
            if (currentQuestion === questions.length && !userAnswers[currentQuestion]) {
                alert('이 질문에 답해주세요!');
                return;
            }
            
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            // Show result if all questions answered
            if (Object.keys(userAnswers).length === questions.length) {
                showResult();
            } else {
                alert('모든 질문에 답해주세요!');
            }
        }
    });
    
    // Option selection
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const questionId = parseInt(option.parentElement.parentElement.dataset.question);
            const isCorrect = option.dataset.correct === 'true';
            
            // Remove previous selection for this question
            const questionOptions = option.parentElement.querySelectorAll('.option');
            questionOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Select this option
            option.classList.add('selected');
            
            // Save user answer
            userAnswers[questionId] = {
                selected: option,
                isCorrect: isCorrect
            };
            
            // Enable next button if this is the last question
            if (questionId === questions.length) {
                nextQuestionBtn.textContent = '결과 보기';
            }
        });
    });
    
    // Show specific question
    function showQuestion(number) {
        // Hide all questions
        questions.forEach(question => {
            question.style.display = 'none';
        });
        
        // Show current question
        const currentQuestionElement = document.querySelector(`.question[data-question="${number}"]`);
        currentQuestionElement.style.display = 'block';
        
        // Update counter
        questionCounter.textContent = `${number}/${questions.length}`;
        
        // Update navigation buttons
        prevQuestionBtn.disabled = number === 1;
        
        if (number === questions.length) {
            nextQuestionBtn.textContent = '결과 보기';
        } else {
            nextQuestionBtn.textContent = '다음';
        }
    }
    
    // Show quiz result
    function showResult() {
        // Calculate score
        score = Object.values(userAnswers).filter(answer => answer.isCorrect).length;
        
        // Show correct/incorrect answers
        Object.entries(userAnswers).forEach(([questionId, answer]) => {
            const selectedOption = answer.selected;
            
            if (answer.isCorrect) {
                selectedOption.classList.add('correct');
            } else {
                selectedOption.classList.add('incorrect');
                
                // Show correct answer
                const correctOption = document.querySelector(`.question[data-question="${questionId}"] .option[data-correct="true"]`);
                correctOption.classList.add('correct');
            }
        });
        
        // Update result message
        if (score === questions.length) {
            resultMessage.textContent = '와우! 완벽해요! 자기는 나를 정말 잘 알고 있네요! 💕';
            createConfetti();
        } else if (score >= questions.length * 0.7) {
            resultMessage.textContent = '정말 잘했어요! 자기는 나를 잘 알고 있어요! 💖';
        } else if (score >= questions.length * 0.4) {
            resultMessage.textContent = '괜찮아요! 앞으로 더 많이 알아가면 돼요! 😊';
        } else {
            resultMessage.textContent = '음... 우리 더 많은 시간을 함께 보내야겠어요! 😉';
        }
        
        // Update score display
        scoreDisplay.textContent = score;
        
        // Show result section
        quizQuestions.style.display = 'none';
        quizNavigation.style.display = 'none';
        quizResult.style.display = 'block';
    }
}

// Add page transition effects
document.addEventListener('DOMContentLoaded', () => {
    gsap.from('header', { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
    gsap.from('.intro', { opacity: 0, y: 50, duration: 1, delay: 0.5, ease: 'power3.out' });
    
    // Animate sections as they come into view
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index > 0) { // Skip intro section which is already animated
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });
});
