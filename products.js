 const URLparameters = new URLSearchParams(window.location.search);
 const productID = URLparameters.get('id');
 const productCard = document.getElementById('product-details');

 if (!productID) {
      productCard.innerHTML = "<p>Product ID not found in URL.</p>";
    } else {
      fetch(`https://fakestoreapi.com/products/${productID}`)
        .then(res => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then(product => {
          productCard.innerHTML = `
            <h1>${product.title}</h1>
            <img src="${product.image}" alt="${product.title}" />
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Description:</strong> ${product.description}</p>`;
        })
        .catch(err => {
          productCard.innerHTML = `<p>Error loading product: ${err.message}</p>`;
          
          console.error(err);
        });
    }