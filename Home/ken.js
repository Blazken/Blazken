// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let productBox = document.querySelector(".product-box");
let seachBox = document.querySelector("#input");


cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

// cart workin js
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


//function for ready
function ready() {
    // reomve item from cart
    let reomveCartButtons = document.getElementsByClassName("cart-remove")
    console.log(reomveCartButtons)
    for (let i = 0; i < reomveCartButtons.length; i++) {
        let button = reomveCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    // quantity changes
    let quantityInputs = document.getElementsByClassName("cart-quantity")
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }

    // add to cart
    let addcart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addcart.length; i++) {
        let button = addcart[i];
        button.addEventListener('click', addCartClicked);
    }
    //Buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener('click', buyButtonClicked);
}

// Buy button function
function buyButtonClicked() {
    alert("your Order has been successfully Placed")
    let cartContent = document.querySelector("#cart-content");
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    countCart = 0
    document.getElementById("count-cart").innerText = countCart

    updatetotal();
}

// reomve item from cart fuction
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    countCart--
    document.getElementById("count-cart").innerText = countCart

    updatetotal();
}

// quantity changes function
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// add to cart function
let countCart = 0;
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    if (addProductToCart(title, price, productImg)) {
        countCart++;
        document.getElementById("count-cart").innerText = countCart

    }
    updatetotal();
}

//add to cart function
function addProductToCart(title, price, productImg) {
    let cartItems = document.getElementById("cart-content");
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerHTML === title) {
            alert("You have already add this item to cart");
            return false
        }
    }
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");


    // let seachBox = cartContent.indexOf("")
    let cartContent = `
    <img src=${productImg} alt="" class="Product-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <button type="button" class="cart-remove">&#10005;</button>
    `;
    cartShopBox.innerHTML = cartContent
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);

    return true;
}


function updatetotal() {
    let cartContent = document.getElementById("cart-content");
    let cartBoxes = cartContent.getElementsByClassName("cart-box");

    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = parseInt(quantityElement.value);
        total += price * quantity;
    }

    // Round the total to two decimal places
    total = Math.round(total * 100) / 100;

    // Update the total price display
    document.getElementsByClassName("total-price")[0].innerText = "$" + total.toFixed(2);
}


