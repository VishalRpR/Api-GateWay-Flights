const express = require('express');
const rateLimit=require('express-rate-limit')
const {createProxyMiddleware}=require('http-proxy-middleware')

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 30, // Limit each IP to 3 requests per `window` 
	
})
const proxyroutingflight=createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
})
const proxyroutingbooking=createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
})


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(limiter);
app.use('/flightsService',proxyroutingflight);
app.use('/bookingService',proxyroutingbooking);
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
