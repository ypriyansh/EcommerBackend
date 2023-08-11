const { print } = require("../helper/CommonFunction");
const cartModel = require("../models/cart");

const getCart = async (req, res, next) => {
        try {
            const userId = req.query?.userId;
    
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
    
            const cartItems = await cartModel.find({ userId, ordered: false }).populate('productId');
        //     console.log(cartItems,"cartItems")
    
            if (cartItems.length === 0) {
                return res.status(404).json({ message: "No Item Available in the Cart!" });
            }
    
           
            const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
    
            return res.status(200).json({
                message: "Successfully retrieved cart data",
                cart: {
                    items: cartItems,
                    totalQuantity,
                    totalPrice
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    

const postCart = async (req, res, next) => {

        try {
                const body = req.body;
                console.log(body);
                if (!body.userId || !body.productId || !body.quantity) {
                        return res.status(400).json({ message: "userId, productId, and quantity are required" });
                }
                const { userId, productId, quantity } = body; //

                let cartItem = await cartModel.findOne({ userId, productId });
                if (cartItem) {
                        cartItem.quantity += quantity;
                        await cartItem.save();
                } else {
                        cartItem = new cartModel({
                                userId,
                                items: [{ productId, quantity }] // Add the item with productId and quantity
                            });
                        await cartItem.save();
                }


                return res.status(201).json({ success: "true", cart: cartItem, message: "product add the cart successfullly " })

        } catch (error) {
                console.log(error, "error");
                return res.status(500).json({ Message: "internal server error" });
        }
}


const putCart = async (req, res, next) => {
        try {

                const id = req.query?.userId;
                const body = req.body;
                if (id) {
                        const data = await cartModel.findOne({ userId: id })
                        if (!data) {
                                return res.status(400).json({ message: "data not found" });
                        }
                        let cart_updateData = {};
                        for (let key of Object.keys(body)) {
                                if (body[key]) {
                                        cart_updateData[key] = body[key];
                                }
                        }


                        const cart_put_data = await cartModel.findByIdAndUpdate(data._id, cart_updateData)
                        if (cart_put_data) {

                                return res.status(201).json({ message: "successfully ", cart_put_data });
                        } else {
                                return res.status(404).json({ messaage: "you don't have any data " })
                        }
                } else {
                        return res.status(404).json({ message: "id is missing" })
                }

        } catch (error) {
                print(error, "error");
                return res.status(404).json({ message: "internal sever error" });
        }
}
const deleteCart = async (req, res, next) => {
        try {
                const id = req.query.userId;


                if (id) {

                        const delete_data = await cartModel.findOne({ userId: id });
                        if (!delete_data) {
                                return res.status(404).json({ message: "we don't have  any data in this id " })
                        }
                        const delete_cart_data = await cartModel.findByIdAndDelete(delete_data._id);
                        if (delete_cart_data) {
                                return res.status(201).json({ message: "successfullly data deleted", info: delete_cart_data })
                        } else {
                                return res.status(404).json({ message: "somthing went wrong for delete cart" })
                        }

                }
        } catch (error) {
                print(error, "error");
                return res.status(404).json({ message: "interval server error" })
        }
}




module.exports = {
        postCart,
        getCart,
        putCart,
        deleteCart
}