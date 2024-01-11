const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

btnClose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadFood);

function loadFood() {
  loadContent();
}

function loadContent() {
  //Remove Food Items  From Cart
  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  //Product Item Change Event
  let qtyElements = document.querySelectorAll(".cart-quantity");
  qtyElements.forEach((input) => {
    input.addEventListener("change", changeQty);
  });

  //Product Cart

  let cartBtns = document.querySelectorAll(".add-cart");
  cartBtns.forEach((btn) => {
    btn.addEventListener("click", addCart);
  });

  updateTotal();
}

//Remove Item
function removeItem() {
  if (confirm("Are Your Sure to Remove")) {
    let title = this.parentElement.querySelector(".cart-food-title").innerHTML;
    itemList = itemList.filter((el) => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
// Change Quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }

  // Update the quantity in the itemList
  let title = this.parentElement.querySelector(".cart-food-title").innerHTML;
  let item = itemList.find((el) => el.title === title);
  if (item) {
    item.quantity = parseInt(this.value);
  }

  // Reload content after updating quantity
  loadContent();
}

let itemList = [];

//Add Cart
//Add Cart
function addCart() {
  let food = this.parentElement;
  let title = food.querySelector(".food-title").innerHTML;
  let price = food.querySelector(".food-price").innerHTML;
  let imgSrc = food.querySelector(".food-img").src;

  let newProduct = { title, price, imgSrc, quantity: 1 };

  // Check Product already Exist in Cart
  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product Already added in Cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(
    title,
    price,
    imgSrc,
    newProduct.quantity
  );
  let element = document.createElement("div");
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  loadContent();
}

function createCartProduct(title, price, imgSrc, quantity) {
  return `
    <div class="cart-box">
      <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="${quantity}" class="cart-quantity">
      </div>
      <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>
  `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-box");
  const totalValue = document.querySelector(".total-price");
  let total = +150;

  cartItems.forEach((product) => {
    let priceElement = product.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("N.", ""));
    let qty = product.querySelector(".cart-quantity").value;
    total += price * qty;
    product.querySelector(".cart-amt").innerText = "N." + price * qty;
  });

  totalValue.innerHTML = "N." + total;

  // Add Product Count in Cart Icon
  const cartCount = document.querySelector(".cart-count");
  let count = itemList.length;
  cartCount.innerHTML = count;
}
// Function to scroll to the top of the page
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

// Show/hide the "Back to Top" button based on the scroll position
window.onscroll = function () {
  showBackToTopButton();
};

function showBackToTopButton() {
  var backToTopBtn = document.getElementById("backToTopBtn");

  // Display the button if the scroll position is greater than 20 pixels
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}
function moveItemsToForm() {
  let formContainer = document.getElementById("form-cart-items");
  formContainer.innerHTML = ""; // Clear existing content

  itemList.forEach((item) => {
    let formCartItem = document.createElement("div");
    formCartItem.classList.add("form-cart-item");

    formCartItem.innerHTML = `
      <span class="form-cart-title">${item.title}</span>
      <span class="form-cart-quantity">Quantity: ${item.quantity}</span>
      <span class="form-cart-total">N. ${item.price * item.quantity}</span>
    `;

    formContainer.appendChild(formCartItem);
  });

  updateTotalAmount();
}

// Event listener for the "Move to Form" button
document
  .getElementById("move-to-form-btn")
  .addEventListener("click", moveItemsToForm);

function validateForm() {
  // Reset error messages
  document.getElementById("nameError").innerHTML = "";
  document.getElementById("numbererror").innerHTML = "";
  document.getElementById("hostelerror").innerHTML = "";
  document.getElementById("dateerror").innerHTML = "";
  document.getElementById("gendererror").innerHTML = "";

  // Get form values
  var name = document.getElementById("name").value;
  var number = document.getElementById("phoneNumber").value;
  var hostel = document.getElementById("hostel").value;
  var date = document.getElementById("date").value;
  var gender = document.getElementById("gender").value;

  if (name === "") {
    document.getElementById("nameError").innerHTML = "Name is required";
    return false;
  }
  if (number === "") {
    document.getElementById("numbererror").innerHTML = "number is required";
    return false;
  }
  if (hostel === "") {
    document.getElementById("hostelerror").innerHTML = "hostel is required";
    return false;
  }

  if (date === "") {
    document.getElementById("receipterror").innerHTML = "receipt is required";
    return false;
  }
  if (gender === "") {
    document.getElementById("gendererror").innerHTML = "receipt is required";
    return false;
  }
}

function sendmessage() {
  var name = document.getElementById("name").value;
  var number = document.getElementById("phoneNumber").value;
  var hostel = document.getElementById("Hostel").value;
  var date = document.getElementById("date").value;
  var gender = document.getElementById("gender").value;
  var PhoneNumber = "+2348069989705";

  var message =
    "*COMPLEX order*\n" +
    "Name: " +
    name +
    "\n" +
    "Number: " +
    number +
    "\n" +
    "Address: " +
    hostel +
    "\n" +
    "Date: " +
    date +
    "\n" +
    "Gender: " +
    gender +
    "\n\n" +
    "*Orders:*\n";

  itemList.forEach((item) => {
    message +=
      "\n" + `${item.title} x${item.quantity} N. ${item.price * item.quantity}`;
  });

  message +=
    "\n\n" +
    "*Total*: N." +
    document.querySelector(".total-price").innerText.split("N.")[1];

  // URL Encode the message
  var encodedMessage = encodeURIComponent(message);

  var url = "https://wa.me/" + PhoneNumber + "?text=" + encodedMessage;
  window.open(url, "_blank").focus();
}
