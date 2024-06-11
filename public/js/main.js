document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filterForm');
    const productsContainer = document.getElementById('productsContainer');

    const fetchProducts = (filters = {}) => {
        const query = new URLSearchParams(filters).toString();
        fetch(`/api/products?${query}`)
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(products => {
                console.log("Products received:", products);
                productsContainer.innerHTML = "";
                if (products.length > 0) {
                    products.forEach(product => {
                        const productElement = document.createElement('div');
                        productElement.classList.add('relative', 'w-[11rem]', 'rounded-md', 'bg-white');
                        productElement.innerHTML = `
                            <div>
                                <div>
                                    <img src="/img/images.jpeg" class="h-[8rem] w-[11rem] object-cover rounded-t-md">
                                </div>
                                <div class="py-4 px-2">
                                    <h1>${product.name}</h1>
                                    <h2 class="text-green-600">${product.price}</h2>
                                </div>
                                <button data-id="${product._id}" class="add-to-cart absolute right-3 cursor-pointer bg-white p-2 top-[52%] shadow-md rounded-[50%]" style="padding: 8px;">
                                                <i data-id="${product._id}" class='add-to-cart bx bx-bookmark hover:shadow-lg text-xl text-green-600'></i>
                                </button>
                                <div class="absolute left-0 top-0 text-center text-white w-[4rem] h-[1.8rem] bg-orange-400 rounded-br-xl rounded-tl-md">
                                    <h1>Top</h1>
                                </div>
                                <div class="absolute left-0 top-[52%] text-center text-white px-1 text-sm rounded-tr-lg bg-[#0000007c]">
                                    2
                                </div>
                            </div>
                        `;
                        productsContainer.appendChild(productElement);
                    });
                } else {
                    productsContainer.innerHTML = '<p>There are no products to display...</p>';
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    };
    

    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(filterForm);
        const filters = {};
        formData.forEach((value, key) => {
            if (value) filters[key] = value;
        });

        const priceRange = filters.price ? filters.price.split('-') : [];
        if (priceRange.length === 2) {
            filters.minPrice = Number(priceRange[0]);
            filters.maxPrice = Number(priceRange[1]);
        } else if (priceRange.length === 1 && priceRange[0].endsWith('+')) {
            filters.minPrice = Number(priceRange[0].slice(0, -1));
        }

        delete filters.price;
        fetchProducts(filters);
    });

    // Initial fetch of products
    fetchProducts();

    document.getElementById('productsContainer').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-id');
            console.log(productId, "Clicked")
            addToCart(productId);
        }
    });
    
    //ADD to Cart
    const addToCart = (productId) => {
        fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            alert(`Added 1 item to cart`);
        })
        .catch(error => console.error('Error adding to cart:', error));
    };
});
