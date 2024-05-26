const Property = require("../models/Property");
const nodemailer = require('nodemailer');

exports.createProperty = async (req, res)=>{
    try{
        const sellerId = req.user.id
        console.log("sellerId:", sellerId);
        const {location, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges} = req.body;
        const newProperty = await Property.create({
            sellerId,
            location,
            area,
            bedrooms,
            bathrooms,
            nearbyHospitals,
            nearbyColleges
        })
        res.status(200).json({
            success: true,
            message: 'Property posted successfully',
            property: newProperty
        });
    }catch (error) {
        console.log('Error posting property:', error);
        return res.status(500).json({
            success: false,
            message: 'Error posting property. Please try again.'
        });
    }
}

exports.showAllProperty = async (req, res)=>{
    try{
        const id = req.user.id
        const properties = await Property.find({sellerId:id})
        res.status(200).json({
            success: true,
            message:"Properties fetched successfully",
            properties
        });
    }catch (error) {
        console.log('Error fetching properties:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching properties. Please try again.'
        });
    }
}

exports.updateProperty = async (req, res)=>{
    try{
        const {propertyId} = req.params;
        console.log("property id", propertyId);
        const sellerId = req.user.id;
        console.log("Seller id", sellerId);
        const {location, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges} = req.body
        const updatedProperty = await Property.findByIdAndUpdate({_id:propertyId, sellerId:sellerId},{location, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges},{new:true}) 
        if (!updatedProperty) {
            return res.status(404).json({
                success: false,
                message: 'Property not found or you are not authorized to update this property'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Property updated successfully',
            updatedProperty
        });
    }catch (error) {
        console.log('Error updating property:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating property. Please try again.'
        });
    }
}

exports.deleteProperty = async (req, res)=>{
    try{
        const { propertyId } = req.params;
        const sellerId = req.user.id; 

        const property = await Property.findOneAndDelete({ _id: propertyId, sellerId }); 

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found or you are not authorized to delete this property'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Property deleted successfully'
        });
    }catch (error) {
        console.error('Error deleting property:', error);
        return res.status(500).json({
            success: false,
            message: 'Error deleting property. Please try again.'
        });
    }
}

exports.showRentedProperties = async (req, res)=>{
    try{
        const propertyDetails = await Property.find({});
        res.status(200).json({
            success: true,
            message: "All Properties details",
            propertyDetails
        })
    }catch (error) {
        console.error('Error deleting property:', error);
        return res.status(500).json({
            success: false,
            message: 'Error Showing the properties. Please try again.'
        });
    }
}

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

exports.expressInterestProperty = async (req, res)=>{
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: 'Please log in to express interest.'
        });
    }
    try{
        const {propertyId} = req.params;
        const property = await Property.findById(propertyId).populate('sellerId', 'firstName email phoneNumber');
        console.log("property interest",property);
        const buyer = req.user;
        console.log("buyer", buyer);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        const seller = property.sellerId;
        console.log("seller", seller);

        //Send email to buyer
        const buyerMailOptions = {
            from: process.env.EMAIL_USER,
            to: buyer.email,
            subject: 'Property Interest',
            text: `You have expressed interest in the property located at ${property.location}. Seller Details:\nName: ${seller.firstName}\nEmail: ${seller.email}\nPhone: ${seller.phoneNumber}`
        };

        transporter.sendMail(buyerMailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email to buyer:', error);
            } else {
                console.log('Email sent to buyer:', info.response);
            }
        });

        // Send email to seller
        const sellerMailOptions = {
            from: process.env.EMAIL_USER,
            to: seller.email,
            subject: 'New Interested Buyer',
            text: `A buyer has expressed interest in your property located at ${property.location}. Buyer Details:\nName: ${buyer.firstName}\nEmail: ${buyer.email}\nPhone: ${buyer.phoneNumber}`
        };

        transporter.sendMail(sellerMailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email to seller:', error);
            } else {
                console.log('Email sent to seller:', info.response);
            }
        });

        res.status(200).json({
            success: true,
            seller
        });
    }catch (error) {
        console.error(error.message);
        console.log("Error expressing interest:", error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred. Please try again."
         });
    }
}

exports.likeProperty = async (req, res)=>{
  
  try {
    const { propertyId } = req.params;
    // Find the property and increment the like count
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    property.likes = (property.likes || 0) + 1;
    await property.save();
    
    res.json({ success: true, likes: property.likes });
  } catch (error) {
    console.error('Error liking property:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
