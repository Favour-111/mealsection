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
  if (confirm("Confirm Removal?")) {
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
// Add Cart
function addCart() {
  let food = this.parentElement;
  let title = food.querySelector(".food-title").innerHTML;
  let priceElement = food.querySelector(".food-price");
  let imgSrc = food.querySelector(".food-img").src;

  let price = priceElement ? priceElement.textContent : ""; // Get the actual price

  let newProduct = { title, price, imgSrc, quantity: 1 };

  // Check if Product already exists in Cart
  if (itemList.find((el) => el.title == newProduct.title)) {
    showAlert("Product Already added in Cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(
    title,
    price, // Use the actual price here
    imgSrc,
    newProduct.quantity
  );
  let element = document.createElement("div");
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  loadContent();

  showAlert("Product added to Cart");
}

// Function to show an alert and make it disappear after 2 seconds
function showAlert(message) {
  let alertDiv = document.createElement("div");
  alertDiv.classList.add("alert");
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);

  // Set a timeout to remove the alert after 2 seconds
  setTimeout(function () {
    alertDiv.remove();
  }, 500);
}

function changeQty() {
  const inputValue = parseInt(this.parentElement.querySelector("input").value);

  if (isNaN(inputValue) || inputValue < 1) {
    this.parentElement.querySelector("input").value = 1;
  }

  let title = this.parentElement.querySelector(".cart-food-title").innerHTML;
  let item = itemList.find((el) => el.title === title);
  if (item) {
    item.quantity = parseInt(this.parentElement.querySelector("input").value);
  }

  loadContent();
}
// Increment and Decrement Buttons
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("quantity-btn")) {
    const action = event.target.getAttribute("data-action");
    const quantityElement = event.target.parentElement.querySelector("input");
    let quantity = parseInt(quantityElement.value);

    if (action === "increment") {
      quantity++;
    } else if (action === "decrement" && quantity > 1) {
      quantity--;
    }

    quantityElement.value = quantity;

    let title = event.target
      .closest(".cart-box")
      .querySelector(".cart-food-title").innerHTML;
    let item = itemList.find((el) => el.title === title);
    if (item) {
      item.quantity = quantity;
    }

    loadContent();
  }
});

function createCartProduct(title, price, imgSrc, quantity) {
  let isSoup = title.toLowerCase().includes("soup");

  if (isSoup) {
    return `
      <div class="cart-box">
        <img src="${imgSrc}" class="cart-img">
        <div class="detail-box">
          <div class="cart-food-title">${title}</div>
        </div>
        <ion-icon name="trash" class="cart-remove"></ion-icon>
      </div>
    `;
  }

  return `
    <div class="cart-box">
      <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
        </div>
        <div class="cart-quantity">
          <button class="quantity-btn" data-action="decrement">-</button>
          <input type="text" value="${quantity}" readonly class="QuantityBox">
          <button class="quantity-btn" data-action="increment">+</button>
        </div>
      </div>
      <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>
  `;
}

let productSelect = document.getElementById("select");
productSelect.addEventListener("change", updateTotal);

function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-box");
  const totalValue = document.querySelector(".total-price");
  const selectedValue = parseInt(productSelect.value);
  let total = selectedValue + 200;

  cartItems.forEach((product) => {
    let priceElement = product.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("₦", ""));
    let qty = parseInt(product.querySelector(".cart-quantity input").value);
    total += price * qty;
    product.querySelector(".cart-amt").innerText =
      "₦" + (price * qty).toFixed(2);
  });

  // Update the total value displayed
  totalValue.innerHTML = "₦" + total.toFixed(2);

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
  if (!name || !number || !hostel || !date || !gender) {
    alert("Please fill out all required fields before placing the order.");
    return;
  }
  var PhoneNumber = "+2348069989705";
  var selectedPackElement = document.getElementById("select");
  var selectedPack =
    selectedPackElement.options[selectedPackElement.selectedIndex].text;

  var message =
    "*Dupseys order*\n" +
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
    "*Orders:*\n" +
    "Selected pack: " +
    selectedPack;

  itemList.forEach((item) => {
    message +=
      "\n" + `${item.title} x${item.quantity} N. ${item.price * item.quantity}`;
  });

  // Calculate the total price separately
  var totalPrice = itemList.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  // Add the pack and delivery fee to the total price
  var selectedValue = parseInt(document.getElementById("select").value);
  var deliveryFee = 150;
  totalPrice += selectedValue + deliveryFee;

  message += "\n\n" + "*Total*: N." + totalPrice.toFixed(2);

  // URL Encode the message
  var encodedMessage = encodeURIComponent(message);

  var url = "https://wa.me/" + PhoneNumber + "?text=" + encodedMessage;
  window.open(url, "_blank").focus();
}
