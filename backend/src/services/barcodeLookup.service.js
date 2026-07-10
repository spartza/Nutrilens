const fetchProductFromExternalAPI = async (barcode) => {
    try {
        // Open Food Facts v2 API endpoint
        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
        const data = await response.json();

        // Agar product database mein nahi mila
        if (data.status === 0) {
            return null; // Product not found
        }

        const productData = data.product;

        // Humein sirf specific details chahiye
        const formattedProduct = {
            barcode: barcode,
            name: productData.product_name || 'Unknown Product',
            brand: productData.brands || 'Unknown Brand',
            ingredientsText: productData.ingredients_text || '',
            imageUrl: productData.image_url || ''
        };

        return formattedProduct;

    } catch (error) {
        console.error("External API Error:", error.message);
        throw new Error('Failed to fetch product from external API');
    }
};

module.exports = { fetchProductFromExternalAPI };