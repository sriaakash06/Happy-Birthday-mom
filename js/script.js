document.addEventListener('mousemove', function (e) {
    // Skip animation on mobile for performance
    if (window.innerWidth <= 768) return;

    let body = document.querySelector('body');
    let heart = document.createElement('span');
    let x = e.offsetX;
    let y = e.offsetY;
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    let size = Math.random() * 10;
    heart.style.width = 4 * size + 'px';
    heart.style.height = 4 * size + 'px';

    let transformValue = Math.random() * 360;
    heart.style.transform = 'rotate(' + transformValue + 'deg)';

    body.appendChild(heart);

    setTimeout(function () {
        heart.remove();
    }, 1000)
})

let mailBox = document.querySelector('.mail')
let boxmail = document.querySelector('.boxMail')
var close = document.querySelector('.fa-xmark')
mailBox.onclick = function () {
    mailBox.classList.toggle('active')
    boxmail.classList.add('active')
}

close.addEventListener('click', function () {
    boxmail.classList.remove('active')
})

// Photo Slider Logic
const memories = [
    {
        img: "assets/mom1.jpeg",
        title: "To My Dearest Mom!",
        text: "Happy Birthday to the most amazing Mom in the world! ❤️"
    },
    {
        img: "assets/mom2.jpeg",
        title: "Priceless Smiles!",
        text: "Your smile is the most beautiful thing in the world. ✨"
    },
    {
        img: "assets/mom3.jpeg",
        title: "Forever Love!",
        text: "You are my strength, my inspiration, and my best friend."
    },
    {
        img: "assets/mom4.jpeg",
        title: "Beautiful Moments!",
        text: "Every moment spent with you is a treasure. 💖"
    },
    {
        img: "assets/mom5.jpeg",
        title: "Our Guiding Light!",
        text: "Thank you for always showing us the right path."
    },
    {
        img: "assets/mom6.jpeg",
        title: "Sweet Memories!",
        text: "I wish you a day filled with love and laughter! 🎂"
    },
    {
        img: "assets/mom7.jpeg",
        title: "The Best Mom!",
        text: "To the world, you are a mother, but to me, you are the world."
    },
    {
        img: "assets/mom8.jpeg",
        title: "Happy Birthday!",
        text: "May all your dreams come true today and always! 🎈"
    }
];
// Image Preloader (Instant Loading)
memories.forEach(memory => {
    const img = new Image();
    img.src = memory.img;
});

let currentMemory = 0;
let isTyping = false;
const card2Content = document.getElementById('card2Content');
const sliderImg = document.getElementById('sliderImg');
const currentTitle = document.getElementById('currentTitle');
const sliderText = document.getElementById('sliderText');
const photoSlider = document.getElementById('photoSlider');
const finalWish = document.getElementById('finalWish');
const typingMessage = document.getElementById('typingMessage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateSlider(index) {
    sliderImg.style.opacity = 0;
    setTimeout(() => {
        sliderImg.src = memories[index].img;
        currentTitle.innerText = memories[index].title;
        sliderText.innerText = memories[index].text;
        sliderImg.style.opacity = 1;
    }, 300);
}

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        typingMessage.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true" class="cursor">|</span>';
        setTimeout(function () {
            typeWriter(text, i + 1, fnCallback)
        }, 50);
    } else if (typeof fnCallback == 'function') {
        typingMessage.innerHTML = text; // Remove cursor at end
        setTimeout(fnCallback, 700);
    }
}

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent parent click
    if (isTyping || currentMemory <= 0) return;
    currentMemory--;
    updateSlider(currentMemory);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent parent click
    if (isTyping) return;

    if (currentMemory < memories.length - 1) {
        currentMemory++;
        updateSlider(currentMemory);
    } else {
        // Show final wish with typing effect and confetti
        photoSlider.style.display = 'none';
        finalWish.style.display = 'block';
        isTyping = true;

        // Confetti Burst
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        const finalMsg = "Mom, you are my world. I hope this birthday brings you everything you've ever wanted. Always stay happy and healthy. Love you forever! ❤️";
        typeWriter(finalMsg, 0, function () {
            isTyping = false;
            // Extra confetti at the end
            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.8 }
            });
        });
    }
});
