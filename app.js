let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".mobile-navmenu");
let cartCard = document.querySelector(".card");
let CheckoutBar = document.querySelector(".checkOut");

listCard.addEventListener('DOMSubtreeModified', () =>{
	if (listCard.childElementCount > 11) {
    CheckoutBar.classList.add('more-than-eleven');
  } else {
	CheckoutBar.classList.remove('more-than-eleven');
  }
})

hamburger.addEventListener("click", () =>{
	hamburger.classList.toggle("active");
	navMenu.classList.toggle("active");
})

document.onclick = function(e){
	if(e.target.className !== "mobile-navMenu" && e.target.id !== hamburger.id)
	{
		hamburger.classList.remove("active");
		navMenu.classList.remove("active");
		
	}
}

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

total.addEventListener("click",()=>{
	window.open("checkout.html", "_self");
})

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: 'Images/1.png',
        price: 1200.20
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: 'Images/2.png',
        price: 120.99
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: 'Images/3.png',
        price: 220.00
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: 'Images/4.png',
        price: 123.00
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: 'Images/5.png',
        price: 32.00
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: 'Images/6.png',
        price: 12.00
    }
];
let special = [
    {
        id: 7,
        name: 'PRODUCT NAME 7',
        image: 'Images/1.png',
        price: 1200.20
    },
    {
        id: 8,
        name: 'PRODUCT NAME 8',
        image: 'Images/2.png',
        price: 120.99
    },
    {
        id: 9,
        name: 'PRODUCT NAME 9',
        image: 'Images/3.png',
        price: 220.00
    },
    {
        id: 10,
        name: 'PRODUCT NAME 10',
        image: 'Images/4.png',
        price: 123.00
    },
    {
        id: 11,
        name: 'PRODUCT NAME 11',
        image: 'Images/5.png',
        price: 32.00
    },
    {
        id: 12,
        name: 'PRODUCT NAME 12',
        image: 'Images/6.png',
        price: 12.00
    }
];

let listCards  = [];
function initApp(){
	const currentDate = new Date();
  
  // Check if it's Sunday
  if (currentDate.getDay() == 0) {
    // Set the special_list as the current list
		special.forEach((value, key) =>{
			let newDiv = document.createElement('div');
			newDiv.classList.add('item');
			newDiv.innerHTML = `
				<img src="${value.image}">
				<div class="title">${value.name}</div>
				<div class="price">£${value.price.toFixed(2).toLocaleString()}</div>
				<button onclick="addToCart(${key})">Add To Cart</button>`;
			list.appendChild(newDiv);
		})
}
	else {
    // Set the normal_list as the current list
		products.forEach((value, key) =>{
			let newDiv = document.createElement('div');
			newDiv.classList.add('item');
			newDiv.innerHTML = `
				<img src="${value.image}">
				<div class="title">${value.name}</div>
				<div class="price">£${value.price.toFixed(2).toLocaleString()}</div>
				<button onclick="addToCart(${key})">Add To Cart</button>`;
			list.appendChild(newDiv);
		})
}
  }

    
initApp();

function addcarttolocal(cart){
	localStorage.setItem("UserCart",JSON.stringify(cart));
	alert(localStorage.getItem("UserCart"));
}
function addToCart(key){
    if(listCards[key] == null){
        // copy product from list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
		
    }
    reloadCard();
}
function reloadCard() {
  // Create a document fragment to build the updated content
  const fragment = document.createDocumentFragment();
  
  let count = 0;
  let totalPrice = 0;
	let cart = []
  
  // Iterate over the list cards and add elements to the fragment
  listCards.forEach((value, key) => {
    totalPrice += value.price;
    count += value.quantity;
    
    if (value != null) {
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        
        <div>${value.name}</div>
        <div>£${value.price.toFixed(2).toLocaleString()}</div>
        <div>
          <button class="quant_change" onclick="changeQuantity(${key}, ${value.quantity - 1})"><img src="Symbols/Minus.svg"></button>
          <div class="count">${value.quantity}</div>
          <button class="quant_change" onclick="changeQuantity(${key}, ${value.quantity + 1})"><img src="Symbols/Plus.svg"></button>
        </div>`;
      fragment.appendChild(newDiv);
		cart.push([listCards[key].id, value.image, value.name , value.quantity, value.price])
		
    }
  });

  // Clear the existing content of listCard
  addcarttolocal(cart);
  listCard.innerHTML = '';

  // Append the fragment to listCard
  listCard.appendChild(fragment);

  total.innerText ="£"+totalPrice.toFixed(2).toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
