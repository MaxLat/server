const mongoose = require('mongoose');
require('dotenv').config();
 export const connect = async () =>  {
    const uri = process.env.MONGODB_CONNECTION; 
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.log(error);
    }
}
