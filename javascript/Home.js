// Sample product data as an array of objects
const products = [
  {
    Image: "../images/IMG-20240115-WA0015.jpg",
    description: "cafeteria",
    about: "the original",
    href: "./cafetaria.html",
  },

  {
    Image: "../images/IMG-20240115-WA0013.jpg",
    description: "elegance",
    about: "best restaurant in the school? You tell us",
    href: "./Elegance.html",
  },
  {
    Image: "../images/IMG-20240115-WA0012.jpg",
    description: "EDS",
    href: "./EDS.html",
  },

  {
    Image: "../images/IMG-20240115-WA0014.jpg",
    description: "savours",
    about: "THE REAL SAVORS IS BACK !",
    href: "./savour.html",
  },
  {
    Image: "../images/WhatsApp Image 2024-03-19 at 15.54.38_5b3d672e.jpg",
    description: "Chow on Deck",
    href: "chickenRepublic.html",
  },

  {
    Image: "../images/WhatsApp Image 2024-01-15 at 02.27.52_22a3d6c1.jpg",
    description: "Ffo",
    href: "./FFO.html",
    about: "SIMPLY CANT GET ENOUGH",
  },

  {
    Image: "../images/IMG-20240115-WA0010.jpg",
    description: 'the huts<span class="text-danger"> (UNAVAILABLE.....)</span>',
    about: "This is the real sensation 🔥",
    href: "#",
  },

  {
    Image: "../images/IMG-20240115-WA0007.jpg",
    description: "sweetyme",
    about: "YOU KNOW WHAT TIME IT IS.",
    href: "Sweetyme.html",
  },
  {
    Image: "../images/IMG-20240115-WA0001.jpg",
    description: "yummy taste",
    about: "You know the name best in the business",
    href: "yummy.html",
  },

  // {
  //   Image: "../images/IMG-20240115-WA0003.jpg",
  //   description: "school complex",
  //   about: "drinks,snacks and your favorite edibles",
  //   href: "complex.html",
  // },
  {
    Image:
      "https://urbanblisslife.com/wp-content/uploads/2023/01/Jolibee-Spaghetti-FEATURE.jpg",
    description: "annie's eatery",
    about: "Even the Italiano's don’t make spaghetti this good",
    href: "annies.html",
  },
  {
    Image:
      "https://img-global.cpcdn.com/recipes/17518cf43171332e/1200x630cq70/photo.jpg",
    description: "Rhike’s foods(Aunty Funmi)",
    about: "Even the Italiano's don’t make spaghetti this good",
    href: "funmi.html",
  },
  {
    Image: "../images/WhatsApp Image 2024-03-04 at 10.24.29_30e07e41.jpg",
    description: "waffle dom(BOC)",
    href: "waffle.html",
  },
  {
    Image: "../images/IMG-20240115-WA0005.jpg",
    description: "snack ville(BOC)",
    about: "drinks,snacks and your favorite edibles",
    href: "snack.html",
  },

  {
    Image: "../images/IMG-20240115-WA0006.jpg",
    description: "dupsey (BOC)",
    about: "Best noodles in the school??",
    href: "dupseys.html",
  },

  {
    Image: "../images/IMG-20240115-WA0004.jpg",
    description: "waakye (BOC)",
    about: "mummy Waakye does it best",
    href: "waakye.html",
  },

  {
    Image: "../images/IMG-20240115-WA0008.jpg",
    description: "OLA'S snacks(BOC)",
    href: "ola.html",
  },
  {
    Image: "../images/IMG-20240115-WA0002.jpg",
    description: "TK fruit Arena(BOC)",
    href: "fruit.html",
  },
  {
    Image: "../images/IMG-20240115-WA0009.jpg",
    description: "kings food(BOC)6pm",
    href: "kings.html",
  },
];

// Function to display products
function displayProducts(productArray) {
  const productListElement = document.getElementById("productList");
  productListElement.innerHTML = "";

  if (productArray.length === 0) {
    productListElement.innerHTML = "<div>store not found.</div>";
  } else {
    productArray.forEach((product) => {
      const listItem = document.createElement("div");
      listItem.innerHTML = `
     <div >
     <a href="${product.href}"  class="product text-dark" >
     <img  height="250px"
     width="370px"
     class="resturantImages mt-2" src="${product.Image}"/>
     <p class="text-capitalize mt-1">${product.description}</p>
      </a>
     </div>
      `;
      productListElement.appendChild(listItem);
    });
  }
}

// Function to search products
function searchProducts() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm)
  );

  // Display filtered products or all products if search input is empty
  displayProducts(searchTerm ? filteredProducts : products);
}

// Initial display of all products
displayProducts(products);

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
