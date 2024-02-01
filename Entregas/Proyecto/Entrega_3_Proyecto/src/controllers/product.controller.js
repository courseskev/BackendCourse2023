import productService from "../services/product.service.js";

class ProductController{
 
async findAllProducts(req, res){
    try {
        const result = await productService.findAllProducts(req.query);
        const info = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            hasPrevPage : result.hasPrevPage,
            hasNextPage : result.hasNextPage,
            prevLink: result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}`: null,
            nextLink: result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}`: null
        }
        res.status(200).json({ message: "Products", info })
    } catch (err) {
        const info = {
            status: "error",
            error: err.message,
            totalPages: null,
            prevPage: null,
            nextPage: null,
            hasPrevPage : null,
            hasNextPage : null,
            prevLink: null,
            nextLink: null
        }
        res.status(500).json({ message: "Products Error", info  })
    }
}

async findProductById(req, res) {
    const { pid } = req.params;
    try {
        const product = await productService.findProductById(pid)
        if (!product) {
            return res.status(404).json({ message: "Product not found with id provided"})
        }
        res.status(200).json({ message: "Product found", product })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


async createProduct(req, res){
    try {
        console.log("Cuerpo productos",req.body);
        const {title, description, code, price, stock, category, thumbnails} = req.body;
        const validateCode = await productService.findByCode(code);
        if(validateCode)
            return res.status(400).json({ message: "Code already used" });
        if(!title, !description, !code, !price, !stock, !category, !thumbnails)
            return res.status(400).json({ message: "Some data is missing" });
        const createProduct = await productService.createProduct(req.body);
        //res.status(201).json({ message: "Product created"})
        //res.redirect("/views/products?productAdded=true");
        //res.render("admin?productAdded=true");
        res.redirect("/views/products?productAdded=true");
    } catch (error) {
        res.redirect("/views/products?productAdded=false");
        //res.status(500).json({ message: error.message })
    }
};


async deleteProduct(req, res) {
    const { pCode } = req.params;
    console.log(pCode);
    try {
        const obj = await productService.findByCode(pCode);
        console.log(obj);
        const deletedProduct = await productService.deleteProduct(obj._id);
        res.status(200).json({ message: "Product deleted", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

}

const productController = new ProductController();
export default productController;