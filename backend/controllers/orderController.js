import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from "stripe"
import sendMail from "../utils/sendMail.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const placeOrder = async (req, res) => {
  const frontend_url = "https://cravings-frontend.onrender.com"
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80
      },
      quantity: item.quantity
    }))
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2 * 100 * 80
      },
      quantity: 1
    })
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })
    res.json({ success: true, session_url: session.url })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
      const user = await userModel.findById(updatedOrder.userId);
      if (user && user.email) {
        const subject = "Order Confirmation - Your Order is Successful!";
        const text = `Hi ${user.name || 'Customer'},\n\nThank you for your order! Your payment has been successfully received. Your order ID is ${orderId}.\n\nWe will notify you once your order is shipped.\n\nBest regards,\nYour Company Name`;
        const html = `<h2>Hi ${user.name || 'Customer'},</h2>
                              <p>Thank you for your order! Your payment has been successfully received.</p>
                              <p><strong>Order ID:</strong> ${orderId}</p>
                              <p>We will notify you once your order is done.</p>
                              <br/>
                              <p>Best regards,<br/>CRAVINGS</p>`;
        await sendMail(user.email, subject, text, html);
      }
      res.json({ success: true, message: "Paid and confirmation email sent" });
    }
    else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' })
  }
}
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({ success: true, message: "Status Updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }
