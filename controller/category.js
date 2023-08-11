const { print } = require("../helper/CommonFunction");
// const categoryModel = require("../models/category");
const categoryModel = require("../models/category");
print("yes it working")


const getCat = async (req, res, next) => {
        print("yes it getCat");

        try {
                // print("yes it is getcat");
                const id = req.query?.id;

                console.log(id);
                //     const body = req.body;
                let get_cat;
                if (id) {
                        get_cat = await categoryModel.findById(id);
                        print("get_cat", get_cat);
                } else {
                        get_cat = await categoryModel.find();
                }
                const data_cat = JSON.parse(JSON.stringify(get_cat))

                if (get_cat) {
                        return res.status(201).json({ message: "successfull ", categories: data_cat });
                } else {
                        return res.status(404).json({ message: "you do not have any  get_cat id" })
                }
        } catch (error) {
                console.log(error, "error");
                return res.status(500).json({ message: "something went wrong " });
        }
}


const postCat = async (req, res, next) => {

        try {
                print("cat is working")
                const body = req.body;
                // Create a new category
                if (!body.name) {
                        return res.status(400).json({ message: "name", status: 400 })
                }
                const insertData = await categoryModel.create(body);
                insertData.save();
                print(insertData, "data");
                return res.status(201).json({ message: "category created!", status: 200 });
        } catch (error) {
                print(error, "error")
                return res.status(500).json({ message: "interval server error" })
        }


};

const putCat = async (req, res, next) => {
        print("outer")
        try {
                const id = req.query?.id;
                print(id, "id");
                const body = req.body;
                if (id) {
                        print("yes  condition is working ");
                        let updatedata = {};
                        for (let key of Object.keys(body)) {
                                print("inner")
                                if (body[key]) {
                                        updatedata[key] = body[key];
                                }
                        }
                        const cat_updatedata = await categoryModel.findByIdAndUpdate(id, updatedata);
                        if (cat_updatedata) {
                                return res.status(201).json({ message: "cat data updated", info: cat_updatedata })
                        } else {
                                return res.status(404).json({ message: "put_cat not found" });
                        }
                }
        } catch (error) {
                print("error", error);
                return res.status(500).json({ message: "internal server errror" });
        }
}

const deleteCat = async (req, res, next) => {
        try {
                const id = req.query?.id;
                const body = req.body;
                // let delete_data
                if(id){
                      const   delete_data = await categoryModel.findByIdAndDelete(id);
                      if(!delete_data){
                            return res.status(404).json({message: "you don't have any data this id"})
                      }else{
                      return res.status(201).json({message: "delte_data successfully",info:delete_data});
                      }

                }else{
                      const  delete_body_data = await categoryModel.findOneAndDelete(body);
                      if(!delete_body_data){
                        return res.status(404).json({message: "you don't have any data this body"})
                      }else{
                        return res.status(201).json({message: "delte_data successfully",info:delete_body_data});
                      }
                }
                

        } catch {
                console.log(error, "error");
        }
}

module.exports = {
        getCat,
        postCat,
        putCat,
        deleteCat

}