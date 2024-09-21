var db = require('../config/connection');
const bcrypt = require("bcrypt");

module.exports = {
  register: (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Hash the user's password with 10 salt rounds
        userData.password = await bcrypt.hash(userData.password, 10);

        // Insert the user into the "users" collection
        db.get()
          .collection("users")
          .insertOne(userData)
          .then((data) => {
            resolve(data.insertedId);  // Return the inserted user's ID
          })
          .catch((err) => {
            reject(err);  // Handle the case when insertion fails
          });
      } catch (error) {
        reject(error);  // Handle errors in the async block
      }
    });
  },

  checkusers: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await db
          .get()
          .collection("users")
          .find()
          .toArray();
        
        resolve(users);  // Return the array of users
      } catch (error) {
        reject(error);  // Handle any errors
      }
    });
  },

  login : (data) => {
    return new Promise(async(resolve, reject)=>{
        let response={};
        let user = await db.get().collection("users").findOne({mail : data.mail});
        if (user) {
            bcrypt.compare(data.password, user.password).then((status) => {
                if (status) {
                    response.user = user;
                    response.status = true;
                    console.log("Login Successful");
                    resolve(response);
                } else {
                    console.log("Login Failed - Incorrect Password");
                    resolve({ status: false });
                }
            }).catch((error) => {
                console.error("Error during password comparison:", error);
                reject(error);
            });
        } else {
            console.log("User not found");
            resolve({ status: false });
        }
    })
  }
};
