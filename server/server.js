const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/auth/authRoutes');
const adminProductRouter = require('./routes/admin/productRoute')
const adminOrderRouter = require('./routes/admin/orderRoute')
const shopProductRouter = require('./routes/shop/shopProductRoute')
const shopAddressRouter = require('./routes/shop/address-routes')
const cartRoute = require('./routes/shop/cart-routes');
const shopOrderRouter = require('./routes/shop/order-routes')
const shopSearchRouter = require('./routes/shop/search-route')
const shopReviewRouter = require('./routes/shop/review-routes')
const commonFeatureRouter = require('./routes/common/feature-routes')

//database connection
const dbConnect = require('./config/database');
dbConnect();


//cors
app.use(
    cors({
        origin : 'http://localhost:5173' ,
        methods : ['GET','POST','PUT' ,'DELETE'] ,
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true
    })
);

//middleware
app.use(cookieParser());
app.use(express.json());

//routes
app.use('/api/auth',authRouter);

//admin routes
app.use('/api/admin/products',adminProductRouter);
app.use('/api/admin/orders',adminOrderRouter)

//shop routes
app.use('/api/shop/products',shopProductRouter)

//cart routes
app.use('/api/shop/cart',cartRoute)

//address route
app.use('/api/shop/address',shopAddressRouter)

//shop route
app.use('/api/shop/order',shopOrderRouter)

//search route
app.use('/api/shop/search',shopSearchRouter)

//review route
app.use('/api/shop/review',shopReviewRouter)

//common feature route
app.use('/api/common/feature',commonFeatureRouter)

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})