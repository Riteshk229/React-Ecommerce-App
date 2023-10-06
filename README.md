# E-commerce (React)

This React Project is made using viteJS and it shows a basic E-commerce site where users can view the products available and add them to a cart for further purchasing and sellers can post their products to be sold and change the product details if necessary.

When opening the web app an automatic userID (range 0 - 7) will be assigned, and a loading screen will appear until all the products are fetched. **Home** screen consists of 2 parts **Navbar** and **Product container**.

**Navbar** has the name of the App your cart and the userID that was assigned to you. On clicking the **Cart** button you will you can see the product you have added to the cart. On clicking the **User** button a menu will pop up which will show 2 items **My Cart** and **Add Product**, you can add a new product by filling out the form and submitting the data.

**Product Container** will you with a list of different products in card format consisting of the product image and details. You can **Delete** products from the product container by clicking on the trashcan icon. **Product details** will show the name, price and rating of the product, on clicking it will take you to the product page where you can get more information about the product and **Edit** the product by clicking the pencil button updating product information and submitting it by clicking on the **Save** button. If you like the product you can add the product to your cart.

In **Cart**, you can see the products you have selected on the left and the **Sub Total** of all the products on the right. you can adjust the quantity of the product by clicking the +/- button. You can also remove the product by clicking the **Delete** button on the top-right corner.


*  Styling is incoperated using **MUI**.
*  **Redux** for state management.
*  **React-router-dom** for routes.
*  API calls using **Axios**.
*  Data fetched by an API made with **JSON server**[^1].

## Steps to Run this project

1. Run ``npm install`` in the VS code terminal to  install all the dependencies.
2. Type ``npm run dev`` in the VS code terminal to start the server and run the application.
3. Click on the link in th terminal or type  ``http://localhost:8080/`` in your browser.


## Folder Structure
<pre>
Ecommerce-App-React
└── src
    ├── app                     # Redux Store
    │   └── store.js
    ├── assets
    │   ├── JS                  # API call functions
    │   │   └── index.js
    │   ├── images              # Images used
    │   │   └── icon.png
    │   └── styles              # styles used
    │       ├── App.css
    │       └── index.css
    ├── components              
    │   ├── App.jsx
    │   ├── Loader.jsx
    │   ├── Navbar.jsx
    │   ├── Products.jsx
    │   └── index.js
    ├── features                 # Reduc Actions and Reducers
    │   ├── cartSlice.js
    │   ├── index.js
    │   ├── productSlice.js
    │   └── productsSlice.js
    ├── pages
    │   ├── 404.jsx
    │   ├── AddProduct.jsx
    │   ├── Cart.jsx
    │   ├── Home.jsx
    │   ├── Product.jsx
    │   └── index.js
    └── main.jsx

</pre>

## Tech Stack

**React**, **MUI**, **JavaScript**, **React-Redux**, **React Toolkit**

## Hoisted

Firebse : [Ecommerce (React)](https://react-ecommerce-51d79.firebaseapp.com/)

[^1]: https://fakedata-ch1p.onrender.com
