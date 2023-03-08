import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartFoodCard from './CartFoodCard'

export default function CartItems() {

    const [cartFoodCards, setCartFoodCards] = useState([])
    const cartCardsData = useSelector(state => state.cart).cartFoodCards

    function fillFoodList() {
        setCartFoodCards(cartCardsData.map((card) => 
            <CartFoodCard
                // key={cartCardsData.indexOf(card).id}
                id={card.id}
                imgUrl={card.img}
                desc={card.desc}
                price={card.price}
                name={card.name}
            />
        ))
    }

    console.log(cartFoodCards)

    useEffect(()=>fillFoodList(),[])

    return (
        <div className='cart-items-container'>
            <h1 className='cart-items-header'>Your Order</h1>
            {cartFoodCards}
        </div>
    )
}