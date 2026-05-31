const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const demoButton = document.getElementById('Demo');
const moreButton = document.getElementById('More');
const scrolledImage = document.getElementById('scrolled');
const infoText = document.getElementById('Info-text');
const holderImage = document.getElementById('Holder');
const indicators = document.querySelectorAll('.indicator');

const imageData = [
    {
        src: '1.png',
        piece: '1piece.png',
        info: 'Our chess coaching platform delivers a personalized 1-on-1 learning experience designed to help every player improve with confidence. Through advanced game analysis and dedicated coaching sessions, users receive tailored guidance based on their unique playing style, strengths, and weaknesses. From mastering openings to improving endgame strategies, our software creates a focused environment where players can learn directly from experienced chess mentors in real time.<br><br>With interactive lessons, move-by-move feedback, and customized training plans, our application transforms the way players train and grow. Every session is built to provide practical insights, smarter decision-making, and measurable progress. Whether you are just starting your chess journey or preparing for competitive tournaments, our platform gives you the tools, coaching, and support needed to reach the next level.'
    },
    {
        src: '2.png',
        piece: '2piece.png',
        info: 'Our chess coaching website makes professional chess learning accessible from anywhere in the world. With flexible online sessions, players can connect with experienced coaches without the limitations of location or fixed schedules. The platform is designed for convenience, allowing students to practice, review games, and attend lessons directly from their computer or mobile device. This flexible approach helps players maintain consistent improvement while balancing school, work, or other commitments.<br><br>Beyond live coaching, the platform provides an organized learning environment where players can revisit lessons, study important concepts, and continue training at their own pace. Easy access to resources, practice tools, and expert guidance creates a smooth learning experience that keeps users motivated and focused on long-term growth. Whether practicing casually or training seriously, players can continue improving whenever and wherever they choose.'
    },
    {
        src: '3.png',
        piece: '3piece.png',
        info: 'Our website transforms traditional chess learning into an engaging and interactive experience designed to keep players motivated. Instead of relying only on theory, the platform encourages hands-on learning through live gameplay reviews, practical exercises, and interactive challenges that help users apply strategies in real situations. This active learning approach improves understanding, sharpens critical thinking, and helps players build confidence through consistent practice and direct application.<br><br>To make improvement more effective, the platform creates a supportive environment where players can actively track achievements, monitor progress, and stay focused on personal goals. Every feature is designed to make learning enjoyable while still maintaining a professional coaching experience. By combining interactive training methods with expert instruction, our website helps players stay engaged, improve faster, and enjoy the process of mastering chess.'
    }
];

let currentIndex = 0;
let autoScrollInterval;

// — Hamburger menu —
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// — More button scrolls to Info section —
moreButton.addEventListener('click', () => {
    document.getElementById('Info').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// — Demo button scrolls to contact/footer —
demoButton.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// — Carousel —
function updateCarousel(index) {
    if (index < 0) index = imageData.length - 1;
    if (index >= imageData.length) index = 0;
    currentIndex = index;

    scrolledImage.style.opacity = '0';
    setTimeout(() => {
        scrolledImage.src = imageData[currentIndex].src;
        holderImage.src = imageData[currentIndex].piece;
        infoText.innerHTML = imageData[currentIndex].info;
        scrolledImage.style.opacity = '1';
    }, 300);

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentIndex);
    });
}

indicators.forEach((indicator, index) => {
    indicator.style.pointerEvents = 'auto';
    indicator.style.position = 'relative';
    indicator.style.zIndex = '10';

    indicator.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCarousel(index);
        resetAutoScroll();
    });

    indicator.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateCarousel(index);
        resetAutoScroll();
    });
});

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        updateCarousel((currentIndex + 1) % imageData.length);
    }, 5000);
}

function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
}

startAutoScroll();

const scrollerEl = document.getElementById('scroller');
scrollerEl.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
scrollerEl.addEventListener('mouseleave', () => startAutoScroll());

// — Navbar shadow (light-theme appropriate) —
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.pageYOffset <= 0
        ? 'none'
        : '0 2px 16px rgba(22, 140, 60, 0.1)';
});

// — Fade-in on scroll —
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('#Info, .footer').forEach(el => observer.observe(el));

// — Responsive: close menu on resize —
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});