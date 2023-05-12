import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { initializeFoodIds } from "../features/menu/menuSlice";
import { increaseCartTotal, decreaseCartTotal, increaseCartQuantity, decreaseCartQuantity } from "../features/cart/cartSlice";

export default function MenuFoodCard(props) {
    const [isAdded, setIsAdded] = useState(false)

    const {id, pointValue, price} = props
    const userId = Cookies.get("userId")
    const token = Cookies.get("token")
    // console.log(token)
    const dispatch = useDispatch()
    const cartTotal = useSelector(state => state.cart).cartTotal
    const userCart = Cookies.get(`cart${userId}`)
    
    function checkIfCartContains() { 
        const checkIfCartContainsFoodUrl = `http://localhost:8080/api/cart/${userId}`

        if(token) {
            fetch(checkIfCartContainsFoodUrl)
                .then(res => res.json())
                .then(data => setIsAdded(data.cartItems.includes(id)))
        }
    }

    //eslint-disable-next-line
    useEffect(() => checkIfCartContains(), [])

    // function addRemoveItem() {
    //     const previousCartTotal = Number(Cookies.get(`cartTotal${userId}`))
    //     updatePoints(pointValue)
    //     if(!isAdded) {
    //         Cookies.set(`cartTotal${userId}`, (previousCartTotal + foodPrice))
    //         dispatch(increaseCartTotal(Number.prototype.valueOf(foodPrice)))
    //         dispatch(increaseCartQuantity())
    //         setIsAdded(true)
    //         if(Cookies.get(`cart${userId}`)) {
    //             const cookieCart = Cookies.get(`cart${userId}`)
    //             Cookies.set(`cart${userId}`, cookieCart + (foodId + ","))
    //         } else {
    //             Cookies.set(`cart${userId}`, (foodId+ ","))
    //         }
    //     } else {
    //         if(cartTotal >= foodPrice) {
    //             dispatch(decreaseCartTotal(Number.prototype.valueOf(foodPrice)))
    //             dispatch(decreaseCartQuantity())
    //             Cookies.set(`cartTotal${userId}`, previousCartTotal - foodPrice)
    //         }
    //         setIsAdded(false)
    //         const cookieCart = Cookies.get(`cart${userId}`).split(",").filter(n => n)
    //         cookieCart.forEach((item) => {
    //             if(item === foodId.toString()) {
    //                 cookieCart.splice(cookieCart.indexOf(item), 1)
    //                 Cookies.set(`cart${userId}`, (cookieCart))
    //             }
    //         })
    //     }
    //     dispatch(initializeFoodIds(Cookies.get(`cart${userId}`)))
    // }

    function updatePoints() {
        const updateUserPointsUrl = "http://localhost:8080/api/user/" + userId
        const userData = {
            firstName: Cookies.get("firstName"),
            lastName: Cookies.get("lastName"),
            email: Cookies.get("email"),
            password: Cookies.get("password"),
            points: isAdded ? pointValue : -(pointValue),
            role: Cookies.get("role")
        }
        axios({
            method: "put",
            url: updateUserPointsUrl,
            data: userData,
            headers: {"Authorization" : "Bearer " + token}
        })
            .then(res => Cookies.set("points", (res.data.points)))
            .catch(function (error) {
                if(error.response) {
                    console.log(error.response)
                }
            })
    }

    function addItem() {
        const addItemToCartUrl = `http://localhost:8080/api/cart/${userId}/add`
        axios.put(addItemToCartUrl, {
            id: id,
            price: price
        })
        checkIfCartContains()
    }

    function removeItem() {
        const removeItemFromCartUrl = `http://localhost:8080/api/cart/${userId}/remove`
        axios.put(removeItemFromCartUrl, {
            id: id, 
            price: price
        })
        checkIfCartContains()
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