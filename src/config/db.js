const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose.connect(
    "mongodb+srv://actuallyakshay:akshay@cluster0.eifrxaw.mongodb.net/Facebook?retryWrites=true&w=majority"
  );
};

module.exports = connect;
