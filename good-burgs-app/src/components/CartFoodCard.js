import React from 'react'

export default function CartFoodCard(props) {
    return (
        <div className='cart-food-card'>
            <img src={props.imgUrl} className="cart-food-card-img"></img>
        </div>
    )
}