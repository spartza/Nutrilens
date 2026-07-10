const validate = (schema) => {
    return (req, res, next) => {
        // 'abortEarly: false' ka matlab hai saari galtiyan ek saath batao, pehli galti milte hi mat ruko
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            // Saari error messages ko ek clean string mein map kar lo
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ 
                success: false, 
                message: errorMessage 
            });
        }
        
        // Agar data ekdum sahi hai, toh aage controller ke paas bhej do
        next();
    };
};

module.exports = { validate };