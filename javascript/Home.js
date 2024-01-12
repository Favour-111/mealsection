// Sample product data as an array of objects
const products = [
  {
    Image:
      "https://nigeriaprofiles.com/wp-content/uploads/2022/01/amala_bg.jpg",
    description: "cafeteria",
    about: "the original",
    href: "./cafetaria.html",
  },

  {
    Image:
      "https://zenaskitchen.com/wp-content/uploads/2022/12/jollof-rice.jpg",
    description: "elegance",
    about: "best restaurant in the school? You tell us",
    href: "./Elegance.html",
  },
  {
    Image:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2021/10/12/b2550e10-2837-11ec-8f06-8f17bcf6e46a_image_hires_181951.jpg?itok=a53lcHfQ&v=1634033998",
    description: "EDS",
    href: "./EDS.html",
  },

  {
    Image:
      "https://www.lifesambrosia.com/wp-content/uploads/macaroni-and-tomatoes-1-500x500.jpg",
    description: "savours",
    about: "THE REAL SAVORS IS BACK !",
    href: "./savour.html",
  },

  {
    Image:
      "https://eatgourmet.ng/wp-content/uploads/2014/07/INDOMIE-WITH-PLANTAIN.jpg",
    description: "Ffo",
    href: "./FFO.html",
    about: "SIMPLY CANT GET ENOUGH",
  },

  {
    Image:
      "https://www.allrecipes.com/thmb/SoBuPU73KcbYHl3Kp3j8Xx4A3fc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg",
    description: "the huts",
    about: "This is the real sensation 🔥",
    href: "./Huts.html",
  },

  {
    Image:
      "https://www.mydiasporakitchen.com/wp-content/uploads/2017/07/Mydiasporakitchen-3.jpg-1-1024x1024.jpeg",
    description: "sweetyme",
    about: "YOU KNOW WHAT TIME IT IS.",
    href: "Sweetyme.html",
  },

  {
    Image:
      "https://images.axios.com/gww320DTHEzDbCjNwaLuMT6aUrY=/2023/03/19/1679258388192.jpg",
    description: "school complex",
    about: "drinks,snacks and your favorite edibles",
    href: "complex.html",
  },

  {
    Image:
      "https://foodienotachef.com/wp-content/uploads/2020/09/FlakyGhanaianMeatPie-1.png",
    description: "snack ville(BOC)",
    about: "drinks,snacks and your favorite edibles",
    href: "snack.html",
  },

  {
    Image:
      "https://i0.wp.com/breakthespicerecipes.com/wp-content/uploads/2023/05/DSC01429_Original-1.jpg?resize=768%2C1024&ssl=1",
    description: "dupsey (BOC)",
    about: "Best noodles in the school??",
    href: "dupseys.html",
  },

  {
    Image:
      "https://travelfoodatlas.com/wp-content/uploads/2022/07/Waakye-735x490.jpg",
    description: "waakye (BOC)",
    about: "mummy Waakye does it best",
    href: "waakye.html",
  },
  {
    Image:
      "https://urbanblisslife.com/wp-content/uploads/2023/01/Jolibee-Spaghetti-FEATURE.jpg",
    description: "annie's eatery",
    about: "Even the Italiano's don’t make spaghetti this good",
    href: "annies.html",
  },

  {
    Image:
      "https://littlespicejar.com/wp-content/uploads/2017/04/Beef-Shawarma-1-735x1103.jpg",
    description: "yummy taste",
    about: "You know the name best in the business",
    href: "yummy.html",
  },
  {
    Image:
      "https://www.recipetineats.com/wp-content/uploads/2019/08/Sausage-Rolls-recipe_5-SQ.jpg",
    description: "OLA'S snacks(BOC)",
    href: "ola.html",
  },
  {
    Image:
      "https://www.foxyfolksy.com/wp-content/uploads/2018/12/filipino-fruit-salad-640.jpg",
    description: "TK fruit Arena(BOC)",
    href: "fruit.html",
  },
  {
    Image:
      "https://grandbaby-cakes.com/wp-content/uploads/2023/04/jollof-rice-recipe-23.jpg",
    description: "kings food(BOC)",
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
     <a href="${product.href}" class="product text-dark ">
     <img  height="250px"
     width="350px"
     class="resturantImages mt-2" src="${product.Image}"/>
     <p class="text-capitalize box-text mt-1">${product.description}</p>
     </a>
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
