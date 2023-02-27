import React from "react";
import { useSelector } from "react-redux";
import CartItems from "../components/CartItems";

export default function Cart() {

    const cart = useSelector(state => state.cart).cartItems

    return (
        <div>
            <h1>Number of Items: {cart}</h1>
            <CartItems/>
        </div>
    )
}