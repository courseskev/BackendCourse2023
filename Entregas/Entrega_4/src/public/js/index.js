const socketClient = io();




socketClient.on('updateProductList', (products) => {
    console.log("PRODUCTOS:", products);
    updateProductList(products);
});


function updateProductList(products) {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = ''; // Limpiamos el contenido actual

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.textContent = `ID: ${product.id}, Title: ${product.title}, Description: ${product.description}, Code: ${product.code}, Price: ${product.price}, Category: ${product.category}, Thumbnail: ${product.thumbnail}, Stock: ${product.stock}`;
        productListDiv.appendChild(productItem);
    });
}


