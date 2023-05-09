import React, { useState } from 'react'

export default function CartFoodCard(props) {

    const { id, imgUrl, desc, name, removeCartItem } = props
    const [isRemoved, setIsRemoved] = useState(false)

    function removeItem() {
        removeCartItem(id)
        setIsRemoved(true)
    }

    return (
        <div className='cart-food-card'  style={{display: isRemoved && "none"}}>
            <img src={imgUrl} className="cart-food-card-img" alt={desc}></img>
            <div className='cart-food-card-info'>
                <h3 style={{marginBottom: ".25rem"}}>{name}</h3>
                <h4 style={{color:"gray", margin: "0"}}>{desc}</h4>
            </div>
            <div className='cart-food-card-remove-button' onClick={removeItem}>
                <h3>x</h3>
            </div>
        </div>
    )
}