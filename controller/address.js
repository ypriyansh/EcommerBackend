const { print } = require("../helper/CommonFunction");
const addressModel = require("../models/address");

// const userModel = require("../models/user");
// console.log("yes");

// console.log(addressModel);


const getAdd = async (req, res, next) => {
  print("check")
  try {
    print("check ineer")
    const id = req.query?.userId;
    print(id);
    let add_data;
    if (id) {
      add_data = await addressModel.findOne({ userId: id });
     

    } else {
      add_data = await addressModel.find();
    }

    if (add_data) {
      print(add_data)
      return res.json({ data: add_data, message: "success" }).status(200)
    }
    return res.json({ message: "No Data Found", status: 404 }).status(404)
  } catch (error) {
    print("error", error);//yaha pr hum hamesh console.log krna hi hai taki mujhe jo internal server error aayua hai vo mujhe pata  cha le 
    return res.status(500).json({ message: "internal server error" });
  }
}




const postAdd = async (req, res, next) => {
  console.log("inner")
  try {
    console.log("amazing");
    const body = req.body;

    if (!body.userId || !body.city || !body.street || !body.village || !body.state || !body.pincode) {
      return res.status(400).json({ message: " userId,city, street, village, state and pincode is manadatory!", status: 400 })
    }

    const insertData = await addressModel.create(body);
    console.log(insertData, "yeah hai data")
    insertData.save();
    console.log(insertData, "data");
    return res.status(201).json({ message: "user created!", status: 200 });
  } catch (error) {
    print("interval ", error)//yaha dikkat hai 
    return res.json({ message: "internal server error", status: 500 }).status(500);
  }                                                                                     // const { userId, city, street, village, state, pincode } = req.body;
};




const putAdd = async (req, res, next) => {
  try {
    print("yes it is working "); // Changed from "print" to "console.log"

    const id = req.query?.userId;
    const body = req.body;
    
    if (id) {
      const data = await addressModel.findOne({ userId: id }); // Changed to findOne to find by userId

      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }

      let updateData = {};
      for (let key of Object.keys(body)) {
        if (body[key]) {
          updateData[key] = body[key];
        }
      }

      const add_updatedata = await addressModel.findByIdAndUpdate(data._id, updateData);
      // The third parameter { new: true } ensures that the updated document is returned in the add_updatedata variable.

      if (add_updatedata) {
        return res.status(201).json({ message: "address data updated", info: add_updatedata });
      } else {
        return res.status(404).json({ message: "address data not found" });
      }
    } else {
      return res.status(400).json({ message: "userId parameter is missing" });
    }
  } catch (error) {
    console.error(error, " error"); // Changed from "print" to "console.error"
    return res.status(500).json({ message: "internal server error", error: error.message });
  }
};
const deleteAdd = async (req, res, next) => {
  try {
    const id = req.query?.userId;

    if (!id) {
      return res.status(400).json({ message: "userId parameter is missing" });
    }

    // Find the address document by userId
    const addressToDelete = await addressModel.findOne({ userId: id });

    if (!addressToDelete) {
      return res.status(404).json({ message: "Address data not found" });
    }

    // If the address is found, proceed to delete it by _id
    const deletedAddress = await addressModel.findByIdAndDelete(addressToDelete._id);

    if (deletedAddress) {
      return res.json({ message: "Address data deleted", info: deletedAddress }).status(200);
    } else {
      return res.json({ message: "Failed to delete address data" }).status(500);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAdd,
  postAdd,
  putAdd,
  deleteAdd

}