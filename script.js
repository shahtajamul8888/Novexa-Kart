// main.js (ES Module)
const products = [
  { id: 1, name: "Men's Jacket", price: 2499, img: "assets/jacket.jpg", category: "men", stock: 12 },
  { id: 2, name: "Women's Sneakers", price: 1999, img: "assets/shoes.jpg", category: "women", stock: 8 },
  { id: 3, name: "Classic Watch", price: 3499, img: "assets/watch.jpg", category: "accessories", stock: 5 },
  { id: 4, name: "Denim Jeans", price: 1299, img: "assets/jeans.jpg", category: "men", stock: 20 }
];

const container = document.getElementById('product-list');

function renderProducts(list){
  container.innerHTML = '';
  list.forEach(p => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <div style="margin-top:8px;">
        <button data-id="${p.id}" class="btn add-to-cart">Add to Cart</button>
        <button data-id="${p.id}" class="btn primary buy-now">Buy Now</button>
      </div>
    `;
    container.appendChild(el);
  });
}

renderProducts(products);

/* Event delegation for buttons */
container.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.add-to-cart');
  const buyBtn = e.target.closest('.buy-now');
  if(addBtn){
    const id = Number(addBtn.dataset.id);
    addToCart(id);
  } else if (buyBtn){
    const id = Number(buyBtn.dataset.id);
    buyNow(id);
  }
});

function addToCart(productId){
  const item = products.find(p => p.id === productId);
  alert(`${item.name} added to cart (demo).`);
  // In production: call backend to add to user's cart
}

async function buyNow(productId){
  const item = products.find(p => p.id === productId);
  // create order on backend then redirect to Cashfree checkout page
  try{
    const resp = await fetch('/api/payment/create', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ amount: item.price, name: item.name, email: 'customer@example.com', phone: '9999999999' })
    });
    const data = await resp.json();
    if(data.payment_link) {
      // open Cashfree hosted page (example)
      window.location.href = data.payment_link;
    } else {
      alert('Payment initialization failed (demo).');
    }
  } catch(err){
    console.error(err);
    alert('Error initializing payment (see console).');
  }
}