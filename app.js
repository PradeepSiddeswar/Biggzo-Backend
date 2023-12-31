const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const app = express()

app.use(cors({
  origin: 'http://localhost:3000/',
  methods:['GET', 'POT', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']

}))


const CategoryDetailsRoute = require('./Routes/CategoryDetails_Router')
const TopListRoute = require("./Routes/TopList_Router")
const WishListRoute = require("./Routes/WishList_Router")
const TabsListRoute = require("./Routes/TabsList_Router")
const BannerRoute = require("./Routes/Banner_Router")
const JWT_OTPRoute = require("./Routes/JWT_OTP_Router")
const AddressRoute = require("./Routes/Address_Router")
const DeliveryAddressRoute = require("./Routes/DeliveryAddress_Router")
const bp = require("body-parser")
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));


dotenv.config({ path: '.env'})
const PORT = process.env.PORT || 8080
console.log("Server Started", PORT)
const mongoose = require("mongoose");
mongoose.pluralize(null)

mongoose.connect(process.env.MONGO_URL, {

})
.then(() => console.log(`Connected To Database`))
.then(() => {
    app.listen(PORT);
})
.catch((error) => console.log(error));


app.get("/", (req, res) => {
    res.send("hello world")
})

app.use(express.static("upload"))
app.use('/Category-Details', CategoryDetailsRoute) // imported all Subcategory and ProductDetails here 
app.use('/Tabs-List', TopListRoute)
app.use('/WishList',WishListRoute)
app.use('/TabsList',TabsListRoute)
app.use('/Banner',BannerRoute)
app.use('/Login',JWT_OTPRoute)
app.use('/Address',AddressRoute)
app.use('/DeliveryAddress',DeliveryAddressRoute)
