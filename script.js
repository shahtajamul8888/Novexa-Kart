// main.js
const products = [
  { id: 1, name: "Men’s Jacket", price: 2499, img: "img/jacket.jpg" },
  { id: 2, name: "Women’s Sneakers", price: 1999, img: "img/shoes.jpg" },
];

const container = document.getElementById("product-list");
products.forEach((p) => {
  const item = document.createElement("div");
  item.className = "border p-3 rounded shadow hover:shadow-lg";
  item.innerHTML = `
    <img src="${p.img}" alt="${p.name}" class="w-full rounded" />
    <h3 class="text-lg font-bold mt-2">${p.name}</h3>
    <p class="text-gray-700">₹${p.price}</p>
    <button class="btn-primary mt-2">Add to Cart</button>
  `;
  container.appendChild(item);
})
