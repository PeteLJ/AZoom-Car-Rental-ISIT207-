// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function updateAuthNav() {
    const greeting = document.getElementById('greeting');
    const logoutBtn = document.getElementById('logoutBtn');
    const authNav = document.getElementById('authNav');
    const loginNavItem = document.querySelector('.nav-item a.login-btn')?.parentElement;

    const user = localStorage.getItem('azoomLoggedInUser');
    // Show "My Reservations" tab if user is logged in
    const myResLink = document.querySelector('.nav-item a[href="myreservations.html"]')?.parentElement;
    if (myResLink) {
        myResLink.style.display = user ? 'block' : 'none';
    }

    if (authNav && greeting && logoutBtn) {
        if (user) {
            const userData = JSON.parse(user);
            greeting.textContent = `Hi, ${userData.name}`;
            greeting.style.display = 'inline-block';
            greeting.style.marginLeft = '20px';
            logoutBtn.style.display = 'inline-block';
            // Hide Login button
            if (loginNavItem) loginNavItem.style.display = 'none';
        } else {
            greeting.style.display = 'none';
            logoutBtn.style.display = 'none';
            if (loginNavItem) loginNavItem.style.display = 'block';
        }
    }
}

// Attach logout handler
function setupLogoutHandler() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('azoomLoggedInUser');
            updateAuthNav();
            alert('You have been logged out.');
        });
    }
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Sliding carousel
let currentCarIndex = 0;
const track = document.querySelector('.carousel-track');
const totalCars = document.querySelectorAll('.car-card').length;
const dots = document.querySelectorAll('.dot');

function showCar(index) {
    currentCarIndex = index;
    const offset = -index * 33.333; // Each car takes up ~33.333% of the track
    if (track) {
        track.style.transform = `translateX(${offset}%)`;
    }
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function changeCar(direction) {
    let newIndex = currentCarIndex + direction;

    // Handle continuous car carousel loop
    if (newIndex >= totalCars) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = totalCars - 1;
    }

    showCar(newIndex);
}

// Initialize carousel
if (track && totalCars > 0) {
    showCar(0); // Start with car 1 (index 0)

    // Auto-advance every 5 seconds
    setInterval(() => {
        changeCar(1);
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle for Homepage
    document.addEventListener('DOMContentLoaded', function () {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function () {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close hamburger menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    });

    // Carousel initialization
    const track = document.querySelector('.carousel-track');
    const totalCars = document.querySelectorAll('.car-card').length;

    if (track && totalCars > 0) {
        showCar(0); // Start with car 1

        // Every 5 seconds
        setInterval(() => {
            changeCar(1);
        }, 5000);
    }

    updateAuthNav();
    setupLogoutHandler();

    console.log('AZoom website loaded successfully');
});
