import Cookies from 'js-cookie'
import React, { useState } from 'react'
import axios from 'axios'

export default function CartFoodCard(props) {

    const { id, imgUrl, desc, name, price, removeItem } = props
    const [isRemoved, setIsRemoved] = useState(false)
    const userId = Cookies.get("userId")

    function hideItem() {
        removeItem(id, price)
        // setIsRemoved(true)
    }

    return (
        <div className='cart-food-card'  style={{display: isRemoved && "none"}}>
            <img src={imgUrl} className="cart-food-card-img" alt={desc}></img>
            <div className='cart-food-card-info'>
                <h3 style={{marginBottom: ".25rem"}}>{name}</h3>
                <h4 style={{color:"gray", margin: "0"}}>{desc}</h4>
            </div>
            <div className='cart-food-card-remove-button' onClick={()=>hideItem()}>
                <h3>x</h3>
            </div>
        </div>
    )
}