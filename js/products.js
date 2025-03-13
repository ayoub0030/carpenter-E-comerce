// Tamazight Woodcraft - Products Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Product filtering and sorting functionality
    const filterListItems = document.querySelectorAll('.filter-list li');
    const priceRange = document.getElementById('max-price');
    const priceValue = document.getElementById('price-value');
    const sortSelect = document.getElementById('sort-select');
    const productsShown = document.getElementById('products-shown');
    const productsTotal = document.getElementById('products-total');
    const productGrid = document.querySelector('.product-grid');
    const productCards = document.querySelectorAll('.product-card');
    
    // Initialize products count
    const totalProducts = productCards.length;
    productsTotal.textContent = totalProducts;
    
    // Set initial filters
    let activeCategory = 'all';
    let maxPrice = 2000;
    let sortBy = 'featured';
    
    // Initialize price slider
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            maxPrice = this.value;
            priceValue.textContent = `$${maxPrice}`;
            
            filterProducts();
        });
    }
    
    // Category filter functionality
    if (filterListItems.length > 0) {
        filterListItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                filterListItems.forEach(li => li.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Update active category
                activeCategory = this.getAttribute('data-filter');
                
                filterProducts();
            });
        });
    }
    
    // Sort select functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortBy = this.value;
            filterProducts();
        });
    }
    
    // Main function to filter and sort products
    function filterProducts() {
        let visibleCount = 0;
        
        // Create an array from product cards for easier sorting
        const productArray = Array.from(productCards);
        
        // Sort products based on selected option
        productArray.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            const nameA = a.querySelector('h3').textContent;
            const nameB = b.querySelector('h3').textContent;
            
            switch(sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                default:
                    return 0; // Keep original order for featured
            }
        });
        
        // Remove all products from grid
        productGrid.innerHTML = '';
        
        // Add sorted products back to grid and apply filters
        productArray.forEach(card => {
            const category = card.getAttribute('data-category');
            const price = parseFloat(card.getAttribute('data-price'));
            
            // Check if product meets the filter criteria
            if ((activeCategory === 'all' || category === activeCategory) && price <= maxPrice) {
                productGrid.appendChild(card);
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update products shown count
        productsShown.textContent = visibleCount;
        
        // Show message if no products match filters
        if (visibleCount === 0) {
            const noProductsMsg = document.createElement('div');
            noProductsMsg.className = 'no-products-message';
            noProductsMsg.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters to find what you're looking for.</p>
            `;
            productGrid.appendChild(noProductsMsg);
        }
    }
    
    // Add animation effects for product grid
    function animateProductGrid() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            // Add fade-in animation with delay based on index
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0';
        });
    }
    
    // Call the animation function
    animateProductGrid();
    
    // Add fade-in animation to the stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .no-products-message {
            text-align: center;
            padding: 50px 0;
            width: 100%;
            grid-column: 1 / -1;
        }
        
        .no-products-message i {
            font-size: 3rem;
            color: var(--primary-color);
            opacity: 0.5;
            margin-bottom: 20px;
        }
        
        .no-products-message h3 {
            margin-bottom: 10px;
            color: var(--dark-color);
        }
        
        .no-products-message p {
            color: #777;
        }
    `;
    
    document.head.appendChild(style);
});
