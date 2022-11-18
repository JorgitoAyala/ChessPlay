let getById = (id) => document.getElementById(id);
let shopItems = appData.storeData[0].products;

let shop = getById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItems
    .map((el) => {
      let { id, name, brand, img, price, stock } = el;
      //let search = basket.find((y) => y.id === id) || [];
      return `
        <div class="p-5 flex items-center bg-white shadow-lg rounded-lg" id="item_${id}">
          <div class="flex flex-col gap-5">
            <div class="p-2 relative">
              <img class="rounded-lg" src="${img[0]}" alt="pro_${id}" />
              <button class="px-3 py-2 absolute right-0 top-0 flex items-center border text-yellow-900 border-yellow-900 hover:bg-yellow-900 hover:text-white transition duration-300 rounded-full gap-2" type="button">
                <i class="ri-heart-3-fill"></i>
              </button>
              <div class="px-3 py-1 absolute right-0 bottom-0 text-white bg-yellow-900">S/. ${price}.00</div>
            </div>
            <a href="chess.html" class="text-sm font-semibold hover:text-yellow-900 cursor-pointer">
              ${name}
            </a>
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm">
                <b>Brand:</b> ${brand} <br/>
                <b>Stock:</b> ${stock}
              </p>
              <button class="px-3 py-1 flex items-center border text-yellow-900 border-yellow-900 hover:bg-yellow-900 hover:text-white transition duration-300 rounded-full gap-2" 
              onclick="increment(this)" type="button" id="${id}">
                <p class="text-xs">Agregar al carrito</p>
                <i class="ri-shopping-cart-fill"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join(""));
};

generateShop();

let increment = (el) => {
  let selectedItem = el;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (el) => {
  let selectedItem = el;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  generateCartItems();
  TotalAmount();
  calculation();
};

let calculation = () => {
  let cartIcon = getById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let cartItems = getById("cartItems");
let finalPrice = getById("finalPrice");

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (cartItems.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItems.find((x) => x.id === id) || [];
        let { img, price, name } = search;
        return `
          <div class="px-5 pb-5 pt-8 relative bg-white border border-white rounded-lg shadow">
            <img class="w-[30%] float-right rounded-lg" src="${img}" alt="product_${id}" />

            <p class="font-semibold text-xs">${name}</p>

            <button class="px-1.5 py-0.5 absolute right-2 top-2 flex items-center border text-red-700 border-red-700 hover:bg-red-700 hover:text-white transition duration-300 rounded-full gap-2" onclick="removeItemCart(this)" type="button" id="${id}">
              <i class="ri-delete-bin-2-line"></i>
            </button>

            <div class="mt-4 flex justify-between items-center gap-3 text-sm">
              <div class="flex items-center gap-3 bg-yellow-300 border rounded-full">
                <button class="px-1.5 py-0.5 flex items-center border bg-white text-red-700 border-red-700 hover:bg-red-700 hover:text-white transition duration-300 rounded-full gap-2" onclick="decrementCart(this)" type="button" id="${id}">
                  <i class="ri-subtract-line"></i>
                </button>
                <p id="quantity_${id}">${item}</p>
                <button class="px-1.5 py-0.5 flex items-center border bg-white text-green-700 border-green-700 hover:bg-green-700 hover:text-white transition duration-300 rounded-full gap-2" onclick="incrementCart(this)" type="button" id="${id}">
                  <i class="ri-add-fill"></i>
                </button>
              </div>
              
              <div class="px-3 py-1 bg-yellow-300 border rounded-full">
                <p class="text-sm">
                  <b>Precio total:</b> S/. ${item * price}.00
                </p>
              </div>
            </div>
          </div>
        `;
      })
      .join(""));
  } else {
    cartItems.innerHTML = "";
    finalPrice.innerHTML = `
      <div class="py-1 w-full flex justify-center items-center gap-3 bg-yellow-700 text-white text-sm rounded-full">
        <p>El carrito está vacío</p>
        <i class="ri-emotion-sad-fill"></i>
      </div>
      <p class="text-center text-sm">Hay nuevos productos esperando por ti!!</p>
    `;
  }
};

generateCartItems();

let incrementCart = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  updateCart(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrementCart = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  updateCart(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let updateCart = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(`quantity_${id}`).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItemCart = (el) => {
  let selectedItem = el;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItems.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (finalPrice.innerHTML = `
      <div class="py-1 w-full bg-yellow-700 rounded-full">
        <p class="text-white text-sm text-center">Hay 4 artículos en su carrito</p>
      </div>
      <div class="flex flex-col gap-2 text-sm">
        <div class="flex justify-between">
          <p>Subtotal:</p>
          <p>S/. ${amount}.00</p>
        </div>
        <div class="flex justify-between">
          <p>Envío:</p>
          <p>Consultar</p>
        </div>
        <div class="flex justify-between">
          <p class="font-semibold">Precio Final:</p>
          <p>S/. ${amount}.00</p>
        </div>
      </div>
      <div class="flex justify-around items-center">
        <button class="px-3 py-1 flex items-center border bg-white text-green-900 border-green-900 hover:bg-green-900 hover:text-white transition duration-300 rounded-full gap-2" type="button">
          <p class="text-xs">Paga seguro</p>
          <i class="ri-secure-payment-fill"></i>
        </button>
        <button class="px-3 py-1 flex items-center border bg-white text-red-900 border-red-900 hover:bg-red-900 hover:text-white transition duration-300 rounded-full gap-2" onclick="clearCart()" type="button">
          <p class="text-xs">Vaciar carrito</p>
          <i class="ri-delete-bin-fill"></i>
        </button>
      </div>
    `);
  } else return;
};

TotalAmount();

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
