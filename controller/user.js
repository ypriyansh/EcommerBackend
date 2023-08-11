const { print } = require("../helper/CommonFunction");
const userModel = require("../models/user");

const GetUsers = async (req, res, next) => {

        try {
                const id = req.query?.userId;
                // console.log(id, "id");
                let data;
                if (id) {
                        data = await userModel.findById(id);
                } else {
                        // console.log("here it is coming")
                        data = await userModel.find();
                }
                // Remove circular references
                const sanitizedUsers = JSON.parse(JSON.stringify(data));
                // console.log("data");

                // console.log(sanitizedUsers);
                if (data) {
                        return res.json({ data: sanitizedUsers, message: "success" }).status(200)
                }
                return res.json({ message: "No Data Found", status: 404 }).status(404)
        } catch (error) {
                console.error('Error in GetUsers Function', error);
                return res.status(500).json({ message: "something went wrong!" })
        }
}


const PostUser = async (req, res, next) => {
        try {

                const body = req.body;
                console.log(body);
                if (!body.firstName || !body.lastName || !body.email || !body.phone) {
                        return res.status(400).json({ message: "firstName, lastName, email and phone is manadatory!", status: 400 })
                }
                const insertData = await userModel.create(body);
                insertData.save();
                return res.status(201).json({ message: "user created!", status: 200 });

        } catch (error) {
                console.error('Error in PostUser', error);
                return res.json({ message: "internal server error", status: 500 }).status(500);
        }
}
const putUser = async (req, res, next) => {
        try {
                // console.log('req.paramas', req.params)
                const id = req.query?.userId;
                // console.log("yes it is working successsfully", id);
                const body = req.body; // {"lastName": "singh", email: "", phone: ""}
                const updateData = {}; // {"lastName": "singh"}

                //Object.keys[body] -> ["lastName", "email", "phone"]
                for(let key of Object.keys(body)) {
                        if (body[key]) {
                                updateData[key] = body[key];
                        }
                }
                const updatedUser = await userModel.findByIdAndUpdate(id, updateData);
                if (updatedUser) {
                        return res.json({ data: updatedUser, message: "User updated successfully" });
                } else {
                        return res.status(404).json({ message: "User not found" });
                }


        } catch (error) {
                console.log('error  in putUser', error);
                return res.json({ message: "internal server error", status: 500 }).status(500);
        }
}
const deleteUser = async (req, res, next) => {
        try {
                const id = req.query?.userId;
                print(id, "id");
                const body = req.body;
                if (id) {
                        print("yes it's working")
                        const data = await userModel.findByIdAndDelete(id);
                        print(data, "data");
                        if (!data) {
                                return res.status(400).json({ message: "you don't have data" });
                        }
                        if (data) {
                                return res.json({ data: data, message: "User deleted successfully" });
                        } else {
                                return res.status(404).json({ message: "User not found" });
                        }
                } else {
                        print("else mai hai ")
                        const exist_data = await userModel.findOneAndDelete(body);
                        if (!exist_data) {
                                return res.status(404).json({ message: "you don't have data" })
                        }
                        if(exist_data){
                                return res.json({ data: exist_data, message: "User deleted successfully" }); 
                        }else{
                                return res.status(404).json({ message: "User not found" });
                        }
                }

        } catch (error) {
                console.log("error", error);
                return res.status(500).json({ message: "internal server error" });
        }
}

module.exports = {
        GetUsers,
        PostUser,
        putUser,
        deleteUser
}