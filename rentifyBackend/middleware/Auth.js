// Importing required modules
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next)=>{
    try{
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        // If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: "Token Missing" });
		}

        try{
            // Verifying the JWT using the secret key stored in environment variables
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode", decode);
            req.user = decode;
        }catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
    }catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: "Something Went Wrong While Validating the Token",
		});
	}
}

exports.isBuyer = async (req, res, next)=>{
    try {
		if (req.user.accountType !== "Buyer") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Buyer",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "User Role Can't be Verified" });
	}
}

exports.isSeller = async (req, res, next)=>{
    try {
		if (req.user.accountType !== "Seller") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Seller",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "User Role Can't be Verified" });
	}
}