const { print } = require("../helper/CommonFunction");
const productModel = require("../models/product");

const getPro = async (req, res, next) => {
        try {

                const id = req.query?.categoryId;
                let get_data;
                if (id) {
                        get_data = await productModel.findOne({ categoryId: id });
                } else {
                        get_data = await productModel.find();

                }
                if (get_data) {
                        return res.status(201).json({ message: "successfully get data", product: get_data })
                } else {
                        return res.status(404).json({ message: "you don't have any data" })
                }
        } catch (error) {
                console.log(error, "error");
                return res.status(500).json({ message: "internal server error" });
        }
}





const postPro = async (req, res, next) => {
        try {
                const body = req.body;
                if (!body.categoryId || !body.name || !body.price || !body.image || !body.description) {
                        return res.status(404).json({ message: "categoryId  ,name ,price, description" });
                }

                const insertData = await productModel.create(body);
                print(insertData, "insertdata");
                insertData.save();
                return res.status(201).json({ message: "product data created!", status: 200 });



        } catch (error) {
                console.log("error", error);
                return res.status(500).json({ Message: "internal server error" });
        }
}




const putPro = async (req, res, next) => {
        try {

                const id = req.query?.categoryId

                const body = req.body;
                if (id) {
                        const data = await productModel.findOne({ categoryId: id }); // Changed to findOne to find by userId


                        if (!data) {
                                return res.status(404).json({ message: "data not found" });
                        }


                        let product_updateData = {};
                        for (let key of Object.keys(body)) {
                                if (body[key]) {
                                        product_updateData[key] = body[key];
                                }
                        }
                        const pro_data = await productModel.findByIdAndUpdate(data._id, product_updateData);
                        if (pro_data) {
                                return res.status(201).json({ message: "pro_data has been updated", product: pro_data })
                        } else {
                                return res.status(404).json({ messaage: "you don't have any data " })
                        }

                } else {

                        return res.status(400).json({ message: "categoryId parameter is missing" });

                }



        } catch (error) {
                console.log(error, "error");
                return res.status(500).json({ message: "internal server error" })
        }
}
const deletePro = async (req, res, next) => {
        try {
                const id = req.query?.categoryId;
                if (!id) {
                        return res.status(400).json({ messaage: " id is missing" })
                }
                const productdataTodelete = await productModel.findOne({ categoryId: id });
                if (!productdataTodelete) {
                        return res.status(404).json({ messaage: "we don't have any data this id" })
                }
                const deleteProduct = await productModel.findByIdAndDelete(productdataTodelete._id)


                if (deleteProduct) {
                        return res.json({ message: "product data deleted", product: deleteProduct }).status(200);
                } else {
                        return res.json({ message: " Failed to delete product data " }).status(500);
                }





        } catch (error) {
                console.log(error, 'error')
                return res.status(500).json({ messaage: "internal server errror" });
        }
}







module.exports = {
        postPro,
        getPro,
        putPro,
        deletePro
}





























