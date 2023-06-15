import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { setCartChange } from "../features/cart/cartSlice";
// import { increaseCartTotal, decreaseCartTotal, increaseCartQuantity, decreaseCartQuantity } from "../features/cart/cartSlice";

export default function MenuFoodCard(props) {
    const [isAdded, setIsAdded] = useState(false)
    const dispatch = useDispatch()
    const cartChanged = useSelector(state => state.cart).cartChange
    const {id, pointValue, price} = props
    const userId = Cookies.get("userId")
    const token = Cookies.get("token")
    // const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener("beforeunload", checkIfCartContains())
    })
    
    function checkIfCartContains() { 
        const checkIfCartContainsFoodUrl = `http://localhost:8080/api/cart/${userId}`

        if(token) {
            fetch(checkIfCartContainsFoodUrl)
                .then(res => res.json())
                .then(data => setIsAdded(data.cartItems.includes(id)))
                .catch((error) => {
                    if(error.message) {
                        console.log(error.message)
                    }
                }) 
        }
    }

    function addItem() {
        const addItemToCartUrl = `http://localhost:8080/api/cart/${userId}/add`
        axios.put(addItemToCartUrl, {
            id: id,
            price: price
        })
        setIsAdded(true)
        dispatch(setCartChange())
    }

    function removeItem() {
        const removeItemFromCartUrl = `http://localhost:8080/api/cart/${userId}/remove`
        axios.put(removeItemFromCartUrl, {
            id: id, 
            price: price
        })
        setIsAdded(false)
        dispatch(setCartChange())
    }

    return (
        <div className="menu-food-card">
            <img className="food-card-img" src={props.imgUrl} alt={props.desc}></img>
            <h2 className="food-card-name">{props.name}</h2>
            {token ? <div className="food-card-purchase-options">
                {!isAdded && <div className="add-to-order-button" onClick={()=> addItem()}>
                    <h3>Add to order</h3>
                </div>}
                {isAdded && <div className="remove-from-order-button" onClick={()=> removeItem()}>
                    <h3>Remove from order</h3>
                </div>}
            </div>
            : <h3 className="food-card-no-token" style={{cursor:"default"}}>Log in to start your order!</h3>}
        </div> 
    )
}