console.log("hii i am working you don't worry");
const { print } = require("../helper/CommonFunction");
const orderCartModel = require("../models/cart");
// print("i am working");
const orderpost = async (req, res, next) => {
        try {


                const body = req.body;

                if (!body.userId) {
                        return res.status(400).json({ message: " userId is required" })
                }
                await orderCartModel.updateMany({ userId: body.userId, ordered: false }, { $set: { ordered: true } })
                return res.status(200).json({ message: "Order Placed Successfully! Thank you for shopping with us." })

        } catch (error) {
                console.log(error);
                return res.status(500).json({ message: "internal server error" })
        }
}


const orderget = async (req, res) => {

        try {
                const { userId } = req.query;
                if (!userId) {
                        return res.send({ message: "userId is required in query params!", status: 400 }).status(400)
                }
                const order_data = await orderCartModel.find({userId, ordered: true}).populate('productId');                ;
                if (!order_data || !order_data.length) {
                        return res.send({message: "No Orders yet placed!"}).status(200)
                }
                return res.send({message: "Your orders!", orders: order_data});

        } catch (error) {
                console.log('Error While Fetching Order', error)
                return res.send({ message: "Something Went Wront" }).status(500)
        }
}
module.exports = {
        orderpost,
        orderget
}