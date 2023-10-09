const socketClient = io();

const formGuardar = document.getElementById("crearProductoForm")
const formEliminar = document.getElementById("eliminarProductoForm")
const productList = document.getElementById("productList");


formGuardar.onsubmit = (e)=>{
    e.preventDefault();
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const code = document.getElementById("code").value
    const price = document.getElementById("price").value
    const category = document.getElementById("category").value
    const thumbnail = document.getElementById("thumbnail").value
    const stock = document.getElementById("stock").value

    socketClient.emit("saveProduct", {title, description, code, price, category, thumbnail, stock})

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("code").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("thumbnail").value = "";
    document.getElementById("stock").value = "";
}

formEliminar.onsubmit = (e)=>{
    e.preventDefault();
    const id = document.getElementById("id").value   
    socketClient.emit("deleteProduct", id)
    document.getElementById("id").value = "";
}

socketClient.on("productUpdated", (products) => {
    if(products === -1)
        alert("Code already exist. Enter a different code")   
    else{
        alert("Product created!")
        const result = products.map(p=>{
        const product = `<div><strong>Id: </strong>${p.id}</div>
            <div><strong>Title: </strong> ${p.title}</div>
            <div><strong>Description: </strong> ${p.description}</div>
            <div><strong>Code: </strong>${p.code}</div>
            <div><strong>Price: </strong>${p.price}</div>
            <div><strong>Category: </strong>${p.category}</div>
            <div><strong>Thumbnail: </strong>${p.thumbnail}</div>
            <div><strong>Stock: </strong>${p.stock}</div>
            <div><strong>Status: </strong>${p.status}</div>
            <div>============================</div>
            <br>`
            return product
        }).join(" ")
        productList.innerHTML = result
    }
  });

socketClient.on("productDeleted", (products)=>{ 
    if(products ===-1)
        alert("ID doesn't found")   
    else{
        alert("Product was deleted")
        const result = products.map(p=>{
        const product = `<div><strong>Id: </strong>${p.id}</div>
            <div><strong>Title: </strong> ${p.title}</div>
            <div><strong>Description: </strong> ${p.description}</div>
            <div><strong>Code: </strong>${p.code}</div>
            <div><strong>Price: </strong>${p.price}</div>
            <div><strong>Category: </strong>${p.category}</div>
            <div><strong>Thumbnail: </strong>${p.thumbnail}</div>
            <div><strong>Stock: </strong>${p.stock}</div>
            <div><strong>Status: </strong>${p.status}</div>
            <div>============================</div>
            <br>`
            return product
        }).join(" ")
        productList.innerHTML = result
    }
})

