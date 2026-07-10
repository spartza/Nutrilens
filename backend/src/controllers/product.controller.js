const { getProductByBarcode } = require('../services/product.service');

const getProductDetails = async (req, res) => {
    try {
        const { barcode } = req.params;

        if (!barcode) {
            return res.status(400).json({ success: false, message: 'Barcode is required' });
        }

        const product = await getProductByBarcode(barcode);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found in any database' });
        }

        res.status(200).json({
            success: true,
            product: product
        });

    } catch (error) {
        console.error("Product Controller Error:", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { getProductDetails };