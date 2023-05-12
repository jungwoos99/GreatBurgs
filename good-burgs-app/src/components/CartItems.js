import React, { useEffect, useState } from 'react'
import CartFoodCard from './CartFoodCard'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { initializeFoodIds } from '../features/menu/menuSlice'
import { addCartItem, setCartTotal } from '../features/cart/cartSlice'

export default function CartItems() {

    const dispatch = useDispatch()
    const foodIdsInStore = useSelector(state => state.menu).foodIds
    const cartTotal = useSelector(state => state.cart).cartTotal
    const foodDataUrl = "http://localhost:8080/api/food/"
    const userId = Cookies.get("userId")
    const navigate = useNavigate()
    const [foodCards, setFoodCards] = useState([])

    console.log("TOTAL: " + cartTotal)
    console.log(`COOKIE TOTAL: ${Cookies.get(`cartTotal${userId}`)}`)

    dispatch(initializeFoodIds(Cookies.get(`cart${userId}`)))

    function setCartInfo() {
        const cookieCartTotal = Cookies.get(`cartTotal${userId}`)
        console.log("COOKIE CART TOTAL: " + cookieCartTotal)
        if(cookieCartTotal) {
            dispatch(setCartTotal(Number.prototype.valueOf(cookieCartTotal)))
        }
        dispatch(initializeFoodIds(Cookies.get(`cart${userId}`)))
    }

    function handleNavigate(event) {
        const path = "../menu"
        navigate(path)
    }

    function removeCartItem(){

    }

    useEffect(() => {
        window.addEventListener("beforeunload", setCartInfo())
        return() => {
            window.removeEventListener("beforeunload", sayHello())
        }
    })

    function sayHello() {
        console.log("hello")
    }

    // converts integers to dollar amount format
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    function fillCartCards() {
        let foodIds = foodIdsInStore
        if(foodIds) {
            foodIds = foodIds.split(",").filter(n => n)
            for(let i = 0; i < foodIds.length; i++) {
                fetch(foodDataUrl + foodIds[i])
                .then(res => res.json())
                .then(data => setFoodCards((prevFoodCards) => {
                    return (
                        [
                            ...prevFoodCards,
                            <CartFoodCard
                                key={data.id}
                                id={data.id}
                                name={data.name}
                                desc={data.description}
                                imgUrl={data.imgUrl}
                                removeCartItem={removeCartItem}
                            />
                        ]
                    )
                }))
            }
        }
    }

    function fillStoreInfo() {
        let foodIds = Cookies.get(`cart${userId}`)
        console.log("foodIds before: " + foodIds)
        if(foodIds) {
        foodIds = foodIds.split(",").filter(n => n)
        }
        console.log("foodIds after: " + foodIds)
        foodIds.forEach((id) => {
            fetch(foodDataUrl + id)
                .then(res => res.json())
                .then(data => dispatch(addCartItem(createCardObject(data))))
        })
    }

    /*
        helper function that takes in data from an api call (passed by fillStoreInfo()), 
        consolidates data into an object to be stored in the store
    */
    function createCardObject(data) {
        let object;

        object = {
            name: data.name,
            desc: data.description,
            imgUrl: data.imgUrl,
            id: data.id
        }

        return object
    }

    //eslint-disable-next-line
    useEffect(()=> fillCartCards, [foodIdsInStore])

    useEffect(()=> getCartData(), [])


    function getCartData() {
        const cartDataUrl = `http://localhost:8080/api/cart/${userId}`
        const foodDataUrl = "http://localhost:8080/api/food/"

        fetch(cartDataUrl)
            .then(res => res.json())
            .then(data => data.cartItems.forEach((item) => {
                fetch(foodDataUrl + item)
                    .then(res => res.json())
                    .then(data => console.log(data))
            }))
    }





    return (
        <div className='cart-items-container'> 
            <h1 className='cart-items-header' onClick={()=> fillStoreInfo()}>Your Order</h1>
            {
            foodIdsInStore && foodIdsInStore.length >= 2 ? 
                <div>
                    <div>
                        {foodCards}
                    </div>
                    <section className='cart-checkout'>
                        <h3 className='cart-total-price'>Your Total: {USDollar.format(cartTotal)}</h3>
                        <h3 className='cart-checkout-button'>Checkout</h3>
                    </section>
                </div>
                : <h2 onClick={handleNavigate} style={{cursor:"pointer", marginLeft:"1rem", textAlign: "center"}}>Your cart is empty. Click here to add your order!</h2>
            }
        </div>
    )
}