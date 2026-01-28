

class ROGWebsite {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('rog-cart')) || [];
        this.currentLanguage = localStorage.getItem('rog-language') || 'en';
        this.currentCurrency = localStorage.getItem('rog-currency') || 'USD';
        this.products = this.getAllProducts();
        this.filteredProducts = [...this.products];
        this.init();
    }

    getAllProducts() {
        const allProducts = [];
        Object.keys(ROGProducts).forEach(category => {
            allProducts.push(...ROGProducts[category]);
        });
        return allProducts;
    }

    init() {
        this.initializeLanguage();
        this.initializeCurrency();
        this.updateCartDisplay();
        this.initializeAnimations();
        this.bindEvents();
        this.loadProducts();
        this.initializeWelcomeModal();
    }

    initializeWelcomeModal() {
        const welcomeShown = localStorage.getItem('rog-welcome-shown');
        if (!welcomeShown) {
            document.getElementById('welcomeModal').style.display = 'flex';
        } else {
            document.getElementById('welcomeModal').style.display = 'none';
        }
    }

    initializeLanguage() {
        document.getElementById('languageSelect').value = this.currentLanguage;
        this.updateLanguage();
    }

    initializeCurrency() {
        document.getElementById('currencySelect').value = this.currentCurrency;
        this.updatePrices();
    }

    bindEvents() {
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            localStorage.setItem('rog-language', this.currentLanguage);
            this.updateLanguage();
            this.loadProducts();
        });

        document.getElementById('currencySelect').addEventListener('change', (e) => {
            this.currentCurrency = e.target.value;
            localStorage.setItem('rog-currency', this.currentCurrency);
            this.updatePrices();
        });

        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.filterProducts(e.target.dataset.category);
                this.updateFilterTabs(e.target);
            });
        });

        document.getElementById('cartBtn').addEventListener('click', () => {
            window.location.href = 'cart.html';
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectLanguage(e.target.dataset.lang);
            });
        });

        document.querySelectorAll('.currency-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectCurrency(e.target.dataset.currency);
            });
        });
    }

    selectLanguage(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
        this.currentLanguage = lang;
    }

    selectCurrency(currency) {
        document.querySelectorAll('.currency-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-currency="${currency}"]`).classList.add('active');
        this.currentCurrency = currency;
    }

    updateLanguage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.dataset.translate;
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });

        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.dataset.translatePlaceholder;
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
    }

    getTranslation(key) {
        const translations = {
            en: {
                nav_home: 'Home',
                nav_products: 'Products',
                nav_laptops: 'Laptops',
                nav_phones: 'Phones',
                nav_components: 'Components',
                explore_products: 'Explore Products',
                view_cart: 'View Cart',
                our_products: 'Our Products',
                all_products: 'All',
                laptops: 'Laptops',
                phones: 'Phones',
                desktops: 'Desktops',
                motherboards: 'Motherboards',
                cases: 'Cases',
                graphics: 'Graphics Cards',
                accessories: 'Accessories',
                search_placeholder: 'Search products...',
                footer_text: '© 2025 ASUS ROG. All rights reserved. Republic of Gamers - For Those Who Dare.'
            },
            az: {
                nav_home: 'Ana Səhifə',
                nav_products: 'Məhsullar',
                nav_laptops: 'Noutbuklar',
                nav_phones: 'Telefonlar',
                nav_components: 'Komponentlər',
                explore_products: 'Məhsullara Bax',
                view_cart: 'Səbətə Bax',
                our_products: 'Məhsullarımız',
                all_products: 'Hamısı',
                laptops: 'Noutbuklar',
                phones: 'Telefonlar',
                desktops: 'Masaüstü',
                motherboards: 'Ana Platalar',
                cases: 'Korpusa',
                graphics: 'Qrafik Kartlar',
                accessories: 'Aksesuarlar',
                search_placeholder: 'Məhsul axtar...',
                footer_text: '© 2025 ASUS ROG. Bütün hüquqlar qorunur. Republic of Gamers - Cəsarət edənlər üçün.'
            },
            tr: {
                nav_home: 'Ana Sayfa',
                nav_products: 'Ürünler',
                nav_laptops: 'Dizüstü',
                nav_phones: 'Telefonlar',
                nav_components: 'Bileşenler',
                explore_products: 'Ürünleri İncele',
                view_cart: 'Sepeti Görüntüle',
                our_products: 'Ürünlerimiz',
                all_products: 'Tümü',
                laptops: 'Dizüstü',
                phones: 'Telefonlar',
                desktops: 'Masaüstü',
                motherboards: 'Anakartlar',
                cases: 'Kasalar',
                graphics: 'Ekran Kartları',
                accessories: 'Aksesuarlar',
                search_placeholder: 'Ürün ara...',
                footer_text: '© 2025 ASUS ROG. Tüm hakları saklıdır. Republic of Gamers - Cesur Olanlar İçin.'
            },
            ru: {
                nav_home: 'Главная',
                nav_products: 'Продукты',
                nav_laptops: 'Ноутбуки',
                nav_phones: 'Телефоны',
                nav_components: 'Компоненты',
                explore_products: 'Исследовать Продукты',
                view_cart: 'Просмотр Корзины',
                our_products: 'Наши Продукты',
                all_products: 'Все',
                laptops: 'Ноутбуки',
                phones: 'Телефоны',
                desktops: 'Настольные',
                motherboards: 'Материнские Платы',
                cases: 'Корпуса',
                graphics: 'Видеокарты',
                accessories: 'Аксессуары',
                search_placeholder: 'Поиск продуктов...',
                footer_text: '© 2025 ASUS ROG. Все права защищены. Republic of Gamers - Для Тех, Кто Смеет.'
            }
        };

        return translations[this.currentLanguage]?.[key] || translations.en[key];
    }

    updatePrices() {
        const priceElements = document.querySelectorAll('.price-display');
        priceElements.forEach(element => {
            const productId = element.dataset.productId;
            const product = this.products.find(p => p.id === productId);
            if (product) {
                const price = this.getProductPrice(product);
                element.textContent = price;
            }
        });
    }

    getProductPrice(product) {
        const currencyConfig = siteConfig.currencies[this.currentCurrency];
        const priceKey = `price${this.currentCurrency === 'USD' ? '' : this.currentCurrency}`;
        const price = product[priceKey] || product.price * currencyConfig.rate;
        return `${currencyConfig.symbol}${price.toFixed(2)}`;
    }

    loadProducts() {
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = '';

        this.filteredProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            grid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const nameKey = `name${this.currentLanguage === 'en' ? '' : this.currentLanguage.charAt(0).toUpperCase() + this.currentLanguage.slice(1)}`;
        const specsKey = `specs${this.currentLanguage === 'en' ? '' : this.currentLanguage.charAt(0).toUpperCase() + this.currentLanguage.slice(1)}`;
        const featuresKey = `features${this.currentLanguage === 'en' ? '' : this.currentLanguage.charAt(0).toUpperCase() + this.currentLanguage.slice(1)}`;
        
        const productName = product[nameKey] || product.name;
        const productSpecs = product[specsKey] || product.specs;
        const productFeatures = product[featuresKey] || product.features;
        const productPrice = this.getProductPrice(product);
        
        const stockStatus = this.getStockStatus(product.stock);
        const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';
        
        card.innerHTML = `
            <div class="mb-4">
                <img src="${product.image}" alt="${productName}" class="w-full h-48 object-cover rounded-lg" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMWExYTFhIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5OTyBJTUFHRTwvdGV4dD4KPC9zdmc+'">
            </div>
            <h3 class="font-orbitron text-xl font-bold mb-2 text-white">${productName}</h3>
            <p class="text-gray-400 text-sm mb-3">${productSpecs}</p>
            <div class="mb-3">
                ${productFeatures.slice(0, 3).map(feature => 
                    `<span class="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded mr-2 mb-1">${feature}</span>`
                ).join('')}
            </div>
            <div class="price-display font-orbitron text-2xl font-bold text-red-500 mb-3" data-product-id="${product.id}">${productPrice}</div>
            <div class="stock-indicator ${stockClass}">${stockStatus}</div>
            <button class="add-to-cart-btn font-semibold" 
                    onclick="rogWebsite.addToCart('${product.id}')" 
                    ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
        `;
        
        return card;
    }

    getStockStatus(stock) {
        if (stock === 0) return 'Out of Stock';
        if (stock <= 10) return `Only ${stock} left!`;
        return 'In Stock';
    }

    searchProducts(query) {
        if (!query.trim()) {
            this.filteredProducts = [...this.products];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredProducts = this.products.filter(product => {
                const nameKey = `name${this.currentLanguage === 'en' ? '' : this.currentLanguage.charAt(0).toUpperCase() + this.currentLanguage.slice(1)}`;
                const productName = (product[nameKey] || product.name).toLowerCase();
                const productSpecs = (product.specs || '').toLowerCase();
                const productCategory = product.category.toLowerCase();
                
                return productName.includes(searchTerm) || 
                       productSpecs.includes(searchTerm) || 
                       productCategory.includes(searchTerm);
            });
        }
        this.loadProducts();
    }

    filterProducts(category) {
        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => product.category === category);
        }
        this.loadProducts();
    }

    updateFilterTabs(activeTab) {
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || product.stock === 0) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity += 1;
            } else {
                this.showNotification('Not enough stock available!', 'error');
                return;
            }
        } else {
            this.cart.push({
                id: productId,
                quantity: 1,
                ...product
            });
        }

        localStorage.setItem('rog-cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        this.showNotification('Product added to cart!', 'success');
        this.animateAddToCart();
    }

    updateCartDisplay() {
        const cartBadge = document.getElementById('cartBadge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.classList.remove('hidden');
        } else {
            cartBadge.classList.add('hidden');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform translate-x-full`;
        
        if (type === 'success') {
            notification.classList.add('bg-green-600', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-600', 'text-white');
        } else {
            notification.classList.add('bg-blue-600', 'text-white');
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    animateAddToCart() {
        const cartBtn = document.getElementById('cartBtn');
        cartBtn.classList.add('animate-pulse');
        setTimeout(() => {
            cartBtn.classList.remove('animate-pulse');
        }, 1000);
    }

    initializeAnimations() {
        if (document.getElementById('typedText')) {
            const typed = new Typed('#typedText', {
                strings: ['BEAST', 'LEGEND', 'CHAMPION', 'WARRIOR'],
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }

        this.createHeroParticles();

        this.initializeScrollAnimations();
    }

    createHeroParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(particle);
        }
    }

    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    localStorage.setItem('rog-welcome-shown', 'true');
    
    rogWebsite.currentLanguage = document.querySelector('.lang-btn.active').dataset.lang;
    rogWebsite.currentCurrency = document.querySelector('.currency-btn.active').dataset.currency;
    
    localStorage.setItem('rog-language', rogWebsite.currentLanguage);
    localStorage.setItem('rog-currency', rogWebsite.currentCurrency);
    
    rogWebsite.initializeLanguage();
    rogWebsite.initializeCurrency();
    rogWebsite.loadProducts();
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });


    document.querySelectorAll('.currency-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });


    window.rogWebsite = new ROGWebsite();
});