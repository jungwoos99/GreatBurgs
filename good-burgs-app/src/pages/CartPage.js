import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import CartItems from "../components/CartItems";
import { clearCart } from "../features/cart/cartSlice";

export default function Cart() {

    const dispatch = useDispatch()

    function emptyCart() {
        Cookies.remove("ids")
        dispatch(clearCart())
    }

    return (
        <div>
            <CartItems/>
            <h1 onClick={()=>emptyCart()}>Clear Cart</h1>
        </div>
    )
}