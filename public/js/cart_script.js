document.addEventListener('DOMContentLoaded', () => {
    fetchCartItems();
});

const fetchCartItems = () => {
    fetch('/api/cart')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(cartItems => {
        displayCartItems(cartItems);
    })
    .catch(error => console.error('Error fetching cart items:', error));
};

const displayCartItems = (cartItems) => {
    const cartContainer = document.getElementById('cartItem');
    cartContainer.innerHTML = ''; // Clear previous cart items
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <div class='cart-item' data-id="${item._id}">
                            <h2>${item.product_id.name} Lorem ipsum dolor</h2>
                            <input type="number" value="${item.quantity}" min="1" max="${item.product_id.stock}" class="cart-item-quantity" style="border: 1px solid gray; border-radius: 8px; padding: 0 3px; width: 5rem;"  /><button class="update-cart-item" style="display: inline-flex; padding: 1px 8px; background-color: green; color: white; border-radius: 8px;">Update</button>
                            <i class='delete-cart-item bx bx-trash' style="font-size: 28px; cursor:pointer"></i>
            </div>
            <div class="" style="display:flex; justify-content:start; margin-left:20px;">${item.product_id.stock} in stock</div>
        `;
        cartContainer.appendChild(cartItemElement);

        cartItemElement.querySelector('.update-cart-item').addEventListener('click', () => {
            const quantity = cartItemElement.querySelector('.cart-item-quantity').value;
            console.log(quantity, "Quantity value")
            updateCartItem(item._id, quantity);
        });

        cartItemElement.querySelector('.delete-cart-item').addEventListener('click', () => {
            deleteCartItem(item._id);
        });
    });

    // Add event listeners for updating cart item quantities
    document.querySelectorAll('.update-cart-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const cartItemElement = event.target.closest('.cart-item');
            const cartItemId = cartItemElement.getAttribute('data-id');
            const quantity = cartItemElement.querySelector('.cart-item-quantity').value;
            updateCartItem(cartItemId, quantity);
        });
    });

    const updateCartItem = (cartItemId, quantity) => {
        fetch(`/api/cart/${cartItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchCartItems();
            } else {
                alert(`Failed to update cart item: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error updating cart item:', error);
        });
    };

    const deleteCartItem = (cartItemId) => {
        fetch(`/api/cart/${cartItemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchCartItems();
            } else {
                alert(`Failed to delete cart item: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error deleting cart item:', error);
        });
    };
};