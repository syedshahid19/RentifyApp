const express = require("express");
const router = express.Router();
const {createProperty, showAllProperty, updateProperty, deleteProperty, showRentedProperties, expressInterestProperty, likeProperty} = require("../controllers/Property");
const {auth,isSeller} = require("../middleware/Auth");

router.post("/createProperty", auth, isSeller, createProperty);
router.get("/getProperty", auth, isSeller, showAllProperty);
router.put("/updateProperty/:propertyId", auth, isSeller, updateProperty);
router.delete("/deleteProperty/:propertyId", auth, isSeller, deleteProperty);

router.get("/showAllProperties",showRentedProperties);
router.post("/expressInterestProperty/:propertyId",auth, expressInterestProperty);
router.post("/likeProperty/:propertyId", likeProperty);

module.exports = router