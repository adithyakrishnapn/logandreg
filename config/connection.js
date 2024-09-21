const mongoose = require('mongoose');

const connect = ()=>{
    const url = 'mongodb://localhost:27017';
    const dbname = 'log';

    return mongoose.connect(url+'/'+dbname)
    .then(()=>{
        console.log("connected to database");
    })
    .catch((error)=>{
        throw error;
    })
}


module.exports.connect = connect;

module.exports.get = ()=>{
    return mongoose.connection;
}