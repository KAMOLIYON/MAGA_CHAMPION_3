const products = [
    { id: 1, name: 'Молоко 1л', price: 12, img: 'https://images.unsplash.com/photo-1584270354949-3a4951c383d0?auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Хлеб свежий', price: 6, img: 'https://images.unsplash.com/photo-1604922494524-0f7f19bc9886?auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Яблоки красные', price: 8, img: 'https://images.unsplash.com/photo-1574226516831-e1dff420e9a1?auto=format&fit=crop&w=300&q=80' },
    { id: 4, name: 'Яйца 10шт', price: 15, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80' },
    { id: 5, name: 'Сок апельсиновый', price: 10, img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=300&q=80' },
    { id: 6, name: 'Кофе молотый', price: 18, img: 'https://images.unsplash.com/photo-1515442261605-4ca6b23983e7?auto=format&fit=crop&w=300&q=80' },
];

const productsContainer = document.querySelector('.products');
const cartIcon = document.getElementById('cart-icon');
const cartPanel = document.getElementById('cart-panel');
const cartCloseBtn = document.getElementById('cart-close');
const overlay = document.getElementById('overlay');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const totalElem = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const clearBtn = document.getElementById('clear-btn');
const searchInput = document.getElementById('search');

let cart = [];

// Рендерим товары
function renderProducts(items) {
    productsContainer.innerHTML = '';
    items.forEach(({ id, name, price, img }) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
      <img src="${img}" alt="${name}" />
      <h3>${name}</h3>
      <p>${price} сомони</p>
      <button data-id="${id}">Купить</button>
    `;
        productsContainer.appendChild(productCard);
    });
}

// Обновляем корзину
function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} сомони`;
        cartItemsList.appendChild(li);
    });

    totalElem.textContent = total;
    cartCount.textContent = cart.length;
}

// Добавляем товар в корзину
function addToCart(id) {
    const product = products.find(p => p.id == id);
    if (product) {
        cart.push(product);
        updateCart();
        openCart();
    }
}

// Открываем корзину
function openCart() {
    cartPanel.classList.add('open');
    overlay.classList.add('active');
}

// Закрываем корзину
function closeCart() {
    cartPanel.classList.remove('open');
    overlay.classList.remove('active');
}

// Очищаем корзину
function clearCart() {
    cart = [];
    updateCart();
}

// Оформляем заказ
function checkout() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    alert(`Спасибо за покупку! Вы заказали ${cart.length} товаров на сумму ${totalElem.textContent} сомони.`);
    clearCart();
    closeCart();
}

// Поиск товаров
function searchProducts() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        renderProducts(products);
        return;
    }
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Слушатели событий
productsContainer.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const id = e.target.dataset.id;
        addToCart(id);
    }
});

cartIcon.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', checkout);
clearBtn.addEventListener('click', clearCart);
searchInput.addEventListener('input', searchProducts);

// Инициализация
renderProducts(products);
updateCart();