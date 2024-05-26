const express = require("express");
const app = express();
const {dbConnect} = require("./config/database");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/User");
const propertyRoutes = require("./routes/Property");
var cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", userRoutes);
app.use("/api/v1", propertyRoutes);

app.listen(PORT, ()=>{
    console.log(`Server started successfully at ${PORT}`);
});