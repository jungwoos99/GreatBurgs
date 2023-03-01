import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "../components/CartItems";
import { clearCart } from "../features/cart/cartSlice";

export default function Cart() {

    const cart = useSelector(state => state.cart).cartItems
    const dispatch = useDispatch()

    function emptyCart() {
        Cookies.remove("ids")
        dispatch(clearCart())
    }

    return (
        <div>
            <h1>Number of Items: {cart}</h1>
            <CartItems/>
            <h1 onClick={()=>emptyCart()}>Clear Cart</h1>
        </div>
    )
}