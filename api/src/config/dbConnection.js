const mongoose = require("mongoose");

const connectToDB = async () => {

    await mongoose.connect(
      "mongodb+srv://ashok03012000:55345534@cluster0.vf0q0.mongodb.net/"
    );
   
 
};

module.exports  ={connectToDB}
