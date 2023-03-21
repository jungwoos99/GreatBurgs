import React from 'react'

export default function CartFoodCard(props) {
    return (
        <div className='cart-food-card'>
            <img src={props.imgUrl} className="cart-food-card-img"></img>
            <div className='cart-food-card-info'>
                <h3 style={{marginBottom: ".25rem"}}>{props.name}</h3>
                <h4 style={{color:"gray", margin: "0"}}>{props.desc}</h4>
            </div>
        </div>
    )
}