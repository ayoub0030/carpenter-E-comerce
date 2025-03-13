// Tamazight Woodcraft - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle between hamburger and close icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            event.target !== mobileMenuToggle && 
            !mobileMenuToggle.contains(event.target)) {
            nav.classList.remove('active');
            
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Shopping Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    
    // Get cart from localStorage or initialize empty cart
    let cart = JSON.parse(localStorage.getItem('amazighCart')) || [];
    
    // Update cart count display
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }
    
    // Initialize cart count
    updateCartCount();
    
    // Add to cart functionality
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productId = this.getAttribute('data-id');
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('img').getAttribute('src');
                
                // Create product object
                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };
                
                // Check if product already exists in cart
                const existingProductIndex = cart.findIndex(item => item.id === productId);
                
                if (existingProductIndex > -1) {
                    // Product exists, increase quantity
                    cart[existingProductIndex].quantity += 1;
                    showNotification(`Increased quantity of ${productName}`);
                } else {
                    // Add new product to cart
                    cart.push(product);
                    showNotification(`Added ${productName} to cart`);
                }
                
                // Save cart to localStorage
                localStorage.setItem('amazighCart', JSON.stringify(cart));
                
                // Update cart count
                updateCartCount();
                
                // Animate cart icon
                animateCartIcon();
            });
        });
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
            </div>
        `;
        
        // Add to the DOM
        document.body.appendChild(notification);
        
        // Add active class after a small delay (for animation)
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300); // Wait for the fade out animation
        }, 3000);
    }
    
    // Animate cart icon
    function animateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('shake');
        
        setTimeout(() => {
            cartIcon.classList.remove('shake');
        }, 500);
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real application, you would send this to your server
                showNotification('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
                
                // Store subscribed email in localStorage
                let subscribers = JSON.parse(localStorage.getItem('amazighSubscribers')) || [];
                subscribers.push(email);
                localStorage.setItem('amazighSubscribers', JSON.stringify(subscribers));
            } else {
                showNotification('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: white;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            padding: 15px;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 9999;
        }
        
        .notification.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
        }
        
        .notification-content i {
            color: var(--tertiary-color);
            font-size: 1.5rem;
            margin-right: 10px;
        }
        
        .notification-content p {
            margin: 0;
        }
        
        .cart-icon.shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
            10%, 90% {
                transform: translate3d(-1px, 0, 0);
            }
            20%, 80% {
                transform: translate3d(2px, 0, 0);
            }
            30%, 50%, 70% {
                transform: translate3d(-3px, 0, 0);
            }
            40%, 60% {
                transform: translate3d(3px, 0, 0);
            }
        }
    `;
    
    document.head.appendChild(style);
});
