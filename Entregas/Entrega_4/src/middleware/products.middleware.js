export const validatingData = ((request, response, next)=>{
    const {title, description, code, price, stock, category} = request.body
        if(!title || !description || !code || !price || !stock || !category)
            return response.status(400).json({message: "Cannot add the product. One or more attributes are missing."});
    next()
});