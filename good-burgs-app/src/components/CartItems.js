import React from 'react'
import { useSelector } from 'react-redux'

export default function CartItems() {

    const cartItemIds = useSelector(state => state.cart).itemIds

    return (
        <div>
            <h1>Cart Items</h1>
            <h1>{"Item ids: "+cartItemIds.toString()}</h1>
            <h1 style={{border:"1px solid black", cursor:"pointer"}}>Get food</h1>
        </div>
    )
}