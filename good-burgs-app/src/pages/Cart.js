import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {

    const cart = useSelector(state => state.cart).cartItems

    return (
        <div>
            <h1>Cart</h1>
            <h1>Number of items: {cart}</h1>
        </div>
    )
}