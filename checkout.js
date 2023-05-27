window.onload = alert(localStorage.getItem("UserCart"));// JavaScript Document

const cart = JSON.parse(localStorage.getItem('UserCart'));
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".mobile-navmenu");

window.onload= ShowBasket();


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


function ShowBasket() {
	alert(cart.length);
	for(var i = 0; i< cart.length; i++){
		
		var table = document.getElementById("ItemsList");
		
		var row = table.insertRow(-1);
		let img = cart[i][1];
		var image = row.insertCell(0);
		image.className = "image-prev";
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		image.innerHTML = '<img src="'+ img + '">';
		cell1.innerHTML = cart[i][2];
		cell2.innerHTML = cart[i][3];
		cell3.innerHTML = "£" + cart[i][4].toFixed(2);
	}
}