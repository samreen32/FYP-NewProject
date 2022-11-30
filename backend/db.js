const mongoose = require('mongoose');           //importing mongoose in express.
const mongoURI = 'mongodb+srv://Samreen:samreen321@fypcluster.sr5ylub.mongodb.net/test';      //for creating db file of name '/inotebook' in monogose. 

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected To Mongoose Successfully");
    })
}
module.exports = connectToMongo; 


// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI).then(() => {
//     console.log('Our db is connected')
// }).catch(err => {
//     console.log(err.message)
// });