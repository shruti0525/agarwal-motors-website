document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--white)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = 'var(--shadow-md)';
                navLinks.style.gap = '15px';
                navLinks.style.alignItems = 'flex-start';
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.style.display = 'none';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Handling
    const bookingForm = document.getElementById('bookingForm');
    const bookingFormContainer = document.getElementById('bookingFormContainer');
    const bookingSlipContainer = document.getElementById('bookingSlipContainer');
    const bookAnotherBtn = document.getElementById('bookAnotherBtn');
    
    let previousBookings = [];

    if (bookingForm && bookingSlipContainer) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const modelSelect = document.getElementById('model');
            const model = modelSelect.options[modelSelect.selectedIndex].text;
            const reg = document.getElementById('reg').value;
            const serviceSelect = document.getElementById('service');
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const date = document.getElementById('date').value;
            const timeSelect = document.getElementById('time');
            const time = timeSelect.options[timeSelect.selectedIndex].text;

            // Store previous booking
            previousBookings.push({
                name,
                car: model,
                reg,
                service,
                date,
                time
            });

            // Populate slip
            document.getElementById('slip-name').textContent = name;
            document.getElementById('slip-car').textContent = model;
            document.getElementById('slip-reg').textContent = reg;
            document.getElementById('slip-service').textContent = service;
            document.getElementById('slip-datetime').textContent = `${date} | ${time}`;
            
            // Show slip inline
            bookingFormContainer.style.display = 'none';
            bookingSlipContainer.style.display = 'block';

            // Prepare notification message
            const message = `*New Service Booking Request*\n\n*Customer Name:* ${name}\n*Mobile Number:* ${mobile}\n*Car Model:* ${model}\n*Registration:* ${reg}\n*Service Type:* ${service}\n*Preferred Date:* ${date}\n*Preferred Time:* ${time}`;
            
            // Auto-trigger WhatsApp
            const whatsappUrl = `https://wa.me/919838172918?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            // Auto-trigger Email
            const mailtoLink = `mailto:Crmagarwalmotors@gmail.com,Shalabhmodi77@gmail.com?subject=New Service Booking - ${name}&body=${encodeURIComponent(message)}`;
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 500);
        });

        if (bookAnotherBtn) {
            bookAnotherBtn.addEventListener('click', () => {
                bookingSlipContainer.style.display = 'none';
                bookingFormContainer.style.display = 'block';
                bookingForm.reset();

                const prevContainer = document.getElementById('previousBookingsContainer');
                const prevList = document.getElementById('previousBookingsList');
                if (prevContainer && prevList && previousBookings.length > 0) {
                    prevContainer.style.display = 'block';
                    prevList.innerHTML = previousBookings.map((b, i) => `
                        <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-left: 4px solid var(--accent-blue); font-size: 0.9rem;">
                            <strong>Booking ${i + 1}:</strong> ${b.car} (${b.reg}) - ${b.service} on ${b.date} at ${b.time}
                        </div>
                    `).join('');
                }
            });
        }
    }

    // Scroll Animations using Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
