import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function CartItems() {

    const dispatch = useDispatch()
    const cartItemIds = useSelector(state => state.cart).itemIds
    const [food, setFood] = useState([])



    return (
        <div>
            <h1>Cart Items</h1>
            <h1>{"Item ids: "+cartItemIds.toString()}</h1>
            <h1 style={{border:"1px solid black", cursor:"pointer"}}>Get food</h1>
            <div>
                {food}
            </div>
        </div>
    )
}