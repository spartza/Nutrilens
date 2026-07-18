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
        const nutriments = productData.nutriments || {};

        // Humein sirf specific details chahiye
        const formattedProduct = {
            barcode: barcode,
            name: productData.product_name || 'Unknown Product',
            brand: productData.brands || 'Unknown Brand',
            ingredientsText: productData.ingredients_text || '',
            imageUrl: productData.image_url || '',
            grade: productData.nutrition_grades ? productData.nutrition_grades.toUpperCase() : null,
            macros: {
                energy_100g: nutriments['energy-kcal_100g'] !== undefined ? Number(nutriments['energy-kcal_100g']) : (nutriments['energy_100g'] !== undefined ? Math.round(Number(nutriments['energy_100g']) / 4.184) : 0),
                sugars_100g: nutriments['sugars_100g'] !== undefined ? Number(nutriments['sugars_100g']) : 0,
                saturated_fat_100g: nutriments['saturated-fat_100g'] !== undefined ? Number(nutriments['saturated-fat_100g']) : 0,
                salt_100g: nutriments['salt_100g'] !== undefined ? Number(nutriments['salt_100g']) : 0,
                fiber_100g: nutriments['fiber_100g'] !== undefined ? Number(nutriments['fiber_100g']) : 0,
                protein_100g: nutriments['proteins_100g'] !== undefined ? Number(nutriments['proteins_100g']) : (nutriments['protein_100g'] !== undefined ? Number(nutriments['protein_100g']) : 0),
                fruits_veg_nuts_100g: nutriments['fruits-vegetables-nuts_100g'] !== undefined ? Number(nutriments['fruits-vegetables-nuts_100g']) : 0,
                is_beverage: productData.categories_tags ? productData.categories_tags.some(tag => tag.includes('beverage')) : false,
                is_cheese: productData.categories_tags ? productData.categories_tags.some(tag => tag.includes('cheese')) : false,
                is_organic: productData.ingredients_text ? (productData.ingredients_text.toLowerCase().includes('organic') || productData.ingredients_text.toLowerCase().includes('bio')) : false
            }
        };

        return formattedProduct;

    } catch (error) {
        console.error("External API Error:", error.message);
        throw new Error('Failed to fetch product from external API');
    }
};

module.exports = { fetchProductFromExternalAPI };