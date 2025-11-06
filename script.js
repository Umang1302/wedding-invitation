// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Countdown Timer
function initCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = '<p class="countdown-finished">The Wedding Day is Here! 🎉</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Set your wedding date here (Year, Month (0-11), Day, Hour, Minute)
// Wedding Date: December 4, 2025 at 6:00 PM
const weddingDate = new Date(2025, 11, 4, 18, 0, 0).getTime();
initCountdown(weddingDate);

// Update displayed date
document.getElementById('wedding-date').textContent = new Date(weddingDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// Smooth Scroll with Offset for Fixed Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100; // Increased offset to prevent navbar overlap
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation - EXCLUDING MENU SECTION
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log('Section observer:', entry.target.id || entry.target.className, 'visible:', entry.isIntersecting);
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to sections - but SKIP menu section entirely
document.querySelectorAll('section').forEach(section => {
    // Skip animation for menu section - always keep it visible
    if (section.id === 'menu') {
        console.log('Skipping animation for menu section - keeping it always visible');
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.transform = 'translateY(0)';
        return; // Don't apply animation to menu
    }
    
    // For other sections, start visible
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    // Then apply animation effect after a brief delay
    setTimeout(() => {
        if (!isElementInViewport(section)) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
        }
        observer.observe(section);
    }, 100);
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// RSVP Form Handler
const rsvpForm = document.getElementById('rsvp-form');
const formMessage = document.getElementById('form-message');

rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(rsvpForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        guests: formData.get('guests'),
        attendance: formData.get('attendance'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    // Show loading state
    const submitBtn = rsvpForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // For GitHub Pages deployment, you can integrate with:
        // 1. Google Forms
        // 2. Formspree (https://formspree.io/)
        // 3. EmailJS (https://www.emailjs.com/)
        // 4. Netlify Forms
        
        // Example with Formspree (uncomment and add your form ID):
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });

        // For now, simulate successful submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Log to console (for demo purposes)
        console.log('RSVP Submission:', data);

        // Show success message
        formMessage.textContent = 'Thank you! Your RSVP has been received. We look forward to celebrating with you! ❤️';
        formMessage.className = 'form-message success';
        
        // Reset form
        rsvpForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

    } catch (error) {
        console.error('RSVP Error:', error);
        formMessage.textContent = 'Oops! Something went wrong. Please try again or contact us directly.';
        formMessage.className = 'form-message error';
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Add animation to couple cards
document.querySelectorAll('.couple-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    card.style.transitionDelay = `${index * 0.2}s`;
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cardObserver.observe(card);
});

// Add animation to event cards
document.querySelectorAll('.event-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.15}s`;
    
    const eventObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    eventObserver.observe(card);
});

// Data Configuration - Complete Wedding Schedule
const eventsData = [
    {
        icon: '🕉️',
        name: 'Night Jagran',
        date: 'December 1, 2025',
        venue: 'Home',
        description: 'Traditional night vigil with devotional songs and prayers.'
    },
    {
        icon: '🌅',
        name: 'Day 2 Celebrations',
        date: 'December 2, 2025',
        venue: 'Home',
        description: 'Day-long celebrations with breakfast, lunch, hi-tea, and dinner for family and close friends.'
    },
    {
        icon: '💛',
        name: 'Haldi Ceremony',
        date: 'December 3, 2025',
        venue: 'Metro Location',
        description: 'Traditional turmeric ceremony with breakfast, lunch, and grand dinner celebration.'
    },
    {
        icon: '💒',
        name: 'Wedding Day - Tika/Faldaan',
        date: 'December 4, 2025',
        venue: 'Metro Location',
        description: 'The main wedding day! Starting with breakfast, traditional Tika ceremony, Rajasthani lunch, and grand reception dinner for 1500+ guests.'
    },
    {
        icon: '🎉',
        name: 'Farewell Breakfast',
        date: 'December 5, 2025',
        venue: 'Metro Location',
        description: 'Final gathering with traditional breakfast and Mithai packets for all guests.'
    }
];

// Detailed Menu Data by Day and Meal
const completeMenuData = {
    day1: {
        title: 'December 1, 2025 - Night Jagran',
        meals: []
    },
    day2: {
        title: 'December 2, 2025',
        meals: [
            {
                name: 'Breakfast',
                guests: '50-100 people',
                items: {
                    snacks: ['Poha', 'Jalebi'],
                    drinks: ['Tea']
                }
            },
            {
                name: 'Lunch',
                guests: '250-300 people',
                items: {
                    curries: ['Chole', 'Kadi', 'Dal', 'Mix Vegetables'],
                    breads: ['Bhature', 'Plain Poori', 'Masala Poori'],
                    rice: ['Jeera Fried Rice'],
                    sides: ['Papad', 'Salad', 'Achar'],
                    sweets: ['Boondi', 'Sev', 'Gulab Jamun'],
                    drinks: ['Water']
                }
            },
            {
                name: 'Hi-Tea',
                guests: '50-100 people',
                items: {
                    snacks: ['Cookies'],
                    drinks: ['Tea']
                }
            },
            {
                name: 'Dinner',
                guests: '100-150 people',
                items: {
                    curries: ['Aloo-Tamatar Curry', 'Dal'],
                    breads: ['Tawa Roti'],
                    rice: ['Rice'],
                    sides: ['Salad', 'Papad'],
                    drinks: ['Water']
                }
            }
        ]
    },
    day3: {
        title: 'December 3, 2025 - Haldi Day',
        venue: 'Metro Location',
        meals: [
            {
                name: 'Breakfast',
                guests: '100-150 people',
                items: {
                    snacks: ['Poha with Namkeen', 'Jalebi', 'Uttapam/Upma', 'Khaman', 'Fried Chillies', 'Cookies'],
                    chutneys: ['Green Chutney', 'Sweet Chutney'],
                    drinks: ['Tea', 'Coffee', 'Water']
                }
            },
            {
                name: 'Haldi Snacks',
                guests: '150-200 people',
                items: {
                    snacks: ['Green Kebab'],
                    chutneys: ['Green Chutney', 'Sweet Chutney'],
                    drinks: ['Water']
                }
            },
            {
                name: 'Lunch',
                guests: '250-300 people',
                items: {
                    curries: ['Crispy Bhindi', 'Palak Paneer', 'Mix Veg', 'Dal Tadka'],
                    breads: ['Tawa Roti', 'Plain Poori', 'Masala Poori'],
                    rice: ['Jeera Rice'],
                    sides: ['Papad', 'Salad', 'Chutney'],
                    sweets: ['Baarik Boondi', 'Moong Ka Halwa'],
                    drinks: ['Water']
                }
            },
            {
                name: 'Hi-Tea',
                guests: '100-150 people',
                items: {
                    snacks: ['Biscuits'],
                    drinks: ['Tea', 'Coffee']
                }
            },
            {
                name: 'Dinner',
                guests: '300-400 people',
                items: {
                    southIndian: ['Idli Sambar', 'Dosa'],
                    liveCounters: ['Pav Bhaji', 'Pizza', 'French Fries', 'Garlic Bread', 'Crispy Corn', 'Chole Kulcha', 'Maggie', 'Manchurian Dry', 'Manchow Soup', 'Coffee'],
                    breads: ['Tawa Paratha', 'Tandoori Roti', 'Namkeen Poori', 'Sada Poori'],
                    curries: ['Dum Aloo', 'Kofta', 'Dal', 'Shahi Paneer'],
                    rice: ['Pulao'],
                    sides: ['Papad', 'Salad', 'Achar'],
                    sweets: ['Dry Fruit Halwa', 'Kesar Katli'],
                    groundService: ['Spanish Chana Kebab', 'Dry Soya Chaap']
                }
            }
        ]
    },
    day4: {
        title: 'December 4, 2025 - Wedding Day',
        venue: 'Metro Location',
        highlight: true,
        meals: [
            {
                name: 'Breakfast',
                guests: '250-300 people',
                items: {
                    snacks: ['Poha with Namkeen', 'Kesar Jalebi', 'Samosa/Kachori', 'Aloo Bada', 'Side Toast', 'Bread Sandwich', 'Mirchi Pakoda/Veg Pakoda'],
                    curries: ['Kadi'],
                    chutneys: ['Green Chutney'],
                    drinks: ['Tea', 'Coffee', 'Water']
                }
            },
            {
                name: 'Tika/Faldaan Snacks',
                guests: '200-250 people',
                items: {
                    snacks: ['Spring Roll', 'Cutlet'],
                    chutneys: ['Green Chutney', 'Sweet Chutney'],
                    drinks: ['Water']
                }
            },
            {
                name: 'Rajasthani Lunch',
                guests: '300-400 people',
                items: {
                    curries: ['Daal', 'Kadi', 'Besan Gatte Ki Sukhi Sabji', 'Aloo Matar Ki Sukhi Sabji'],
                    breads: ['Masala Baati', 'Bafle'],
                    rice: ['Pulao'],
                    sides: ['Papad', 'Salad', 'Lehsun Chutney', 'Guava Chutney'],
                    sweets: ['2 types of Laddo'],
                    drinks: ['Chaanch', 'Water']
                }
            },
            {
                name: 'Hi-Tea',
                guests: '100-150 people',
                items: {
                    snacks: ['Cookies'],
                    drinks: ['Tea', 'Coffee']
                }
            },
            {
                name: 'Grand Reception Dinner',
                guests: '1500-1700 people',
                highlight: true,
                items: {
                    soups: ['Tomato Soup', 'Manchow Soup'],
                    starters: ['Soya Chaap', 'Masala Paneer Tikka', 'Malai Paneer Tikka'],
                    breads: ['Tawa Roti', 'Tandoori Roti', 'Missi Roti', 'Namkeen Poori', 'Sada Poori', 'Makka Ki Roti'],
                    southIndian: ['Idli Sambar', 'Dosa with 3 types of chutney', 'Cheela Moong Ka'],
                    chaats: ['Chole Tikki', 'Katori Chaat', 'Paani Tikki (3 types of Paani)', 'Mangode', 'White Pasta', 'Red Pasta', 'Cheese Garlic Noodles', 'Hakka Noodles', 'Manchurian'],
                    namkeen: ['Gathia', 'Papdi', 'Lehsun Sev'],
                    curries: ['Sev Tamatar', 'Daal Makhani', 'Daal Tadka', 'Kashmiri Aloo', 'Kofta', 'Palak Corn', 'Mutter Paneer', 'Kaju Curry', '5 Seasonal Sabji'],
                    sweets: ['Rasmalai', 'Ghewar Rabdi', 'Sitafal Rabdi', 'Akhrot Halwa', 'Gajar Halwa', 'Kesar Barfi', 'Kaju Katli', 'Rajbhog'],
                    drinks: ['Doodh', 'Chaanch'],
                    sides: ['Papad', 'Salad', 'Pan Stall'],
                    special: ['Punjabi Dhaba Theme Counter']
                }
            }
        ]
    },
    day5: {
        title: 'December 5, 2025 - Farewell',
        venue: 'Metro Location',
        meals: [
            {
                name: 'Farewell Breakfast',
                guests: '200 people',
                items: {
                    snacks: ['Aloo Bada', 'Poori Parathe'],
                    curries: ['Aloo Tamatar'],
                    drinks: ['Tea']
                }
            },
            {
                name: 'Mithai Packets',
                guests: '200 packets',
                items: {
                    special: ['Traditional sweets packed for guests']
                }
            }
        ]
    }
};

// Function to update events dynamically
function updateEvents(events) {
    const eventsTimeline = document.getElementById('events-timeline');
    eventsTimeline.innerHTML = events.map(event => `
        <div class="event-card">
            <div class="event-icon">${event.icon}</div>
            <div class="event-content">
                <h3 class="event-name">${event.name}</h3>
                <p class="event-date">${event.date}</p>
                <p class="event-venue">Venue: ${event.venue}</p>
                <p class="event-description">${event.description}</p>
            </div>
        </div>
    `).join('');
}

// Function to update menu dynamically with complete schedule
function updateCompleteMenu(menuData) {
    const menuContainer = document.getElementById('menu-container');
    
    if (!menuContainer) {
        console.error('Menu container not found!');
        return;
    }
    
    console.log('Updating menu with data:', menuData);
    let menuHTML = '';

    Object.keys(menuData).forEach(dayKey => {
        const day = menuData[dayKey];
        if (day.meals && day.meals.length > 0) {
            console.log(`Adding menu for ${day.title}`);
            menuHTML += `
                <div class="day-menu-section ${day.highlight ? 'highlight-day' : ''}">
                    <h2 class="day-title">${day.title}</h2>
                    ${day.venue ? `<p class="day-venue">📍 ${day.venue}</p>` : ''}
                    <div class="meals-grid">
            `;

            day.meals.forEach(meal => {
                menuHTML += `
                    <div class="meal-card ${meal.highlight ? 'highlight-meal' : ''}">
                        <h3 class="meal-name">${meal.name}</h3>
                        ${meal.guests ? `<p class="meal-guests">👥 ${meal.guests}</p>` : ''}
                        <div class="meal-items">
                `;

                // Display all categories
                Object.keys(meal.items).forEach(category => {
                    const items = meal.items[category];
                    if (items && items.length > 0) {
                        const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)
                            .replace(/([A-Z])/g, ' $1').trim();
                        menuHTML += `
                            <div class="item-category">
                                <h4 class="category-title">${categoryTitle}</h4>
                                <ul class="category-items">
                                    ${items.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                });

                menuHTML += `
                        </div>
                    </div>
                `;
            });

            menuHTML += `
                    </div>
                </div>
            `;
        }
    });

    if (menuHTML) {
        menuContainer.innerHTML = menuHTML;
        console.log('Menu updated successfully! Total HTML length:', menuHTML.length);
        
        // Force visibility after rendering
        setTimeout(() => {
            const dayMenuSections = document.querySelectorAll('.day-menu-section');
            console.log('Found day-menu-section elements:', dayMenuSections.length);
            dayMenuSections.forEach((section, index) => {
                console.log(`Day section ${index}:`, {
                    display: window.getComputedStyle(section).display,
                    visibility: window.getComputedStyle(section).visibility,
                    opacity: window.getComputedStyle(section).opacity,
                    height: section.offsetHeight,
                    width: section.offsetWidth
                });
                // Force visibility
                section.style.opacity = '1';
                section.style.visibility = 'visible';
                section.style.display = 'block';
            });
        }, 100);
    } else {
        console.warn('No menu HTML generated!');
        menuContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Menu data is being loaded...</p>';
    }
}

// Initialize with data after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing wedding website...');
    updateEvents(eventsData);
    updateCompleteMenu(completeMenuData);
    console.log('Menu and events loaded successfully!');
    
    // Debug: Check if menu is actually in the DOM
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        console.log('Menu container found!');
        console.log('Menu container children:', menuContainer.children.length);
        console.log('Menu container innerHTML length:', menuContainer.innerHTML.length);
        console.log('Menu container computed style:', window.getComputedStyle(menuContainer).display);
        console.log('Menu container visibility:', window.getComputedStyle(menuContainer).visibility);
        console.log('Menu container opacity:', window.getComputedStyle(menuContainer).opacity);
    }
    
    // Handle image loading errors
    const coupleImages = document.querySelectorAll('.couple-image img');
    coupleImages.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.display = 'none'; // Hide broken image icon
        });
        
        img.addEventListener('load', function() {
            // Hide the placeholder icon when image loads
            this.parentElement.querySelector('::before')?.remove();
        });
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message for customization
console.log('%c💒 Wedding Invitation Website', 'color: #8B7355; font-size: 20px; font-weight: bold;');
console.log('%cTo customize events and menu, update the data in script.js', 'color: #666; font-size: 14px;');

