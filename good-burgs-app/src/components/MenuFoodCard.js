import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUserPoints } from "../features/user/userSlice";
import { addCartFoodCard, removeCartFoodCard } from "../features/cart/cartSlice";

export default function MenuFoodCard(props) {
    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.user)
    const cartItems = useSelector(state => state.cart).cartFoodCards
    const points = userInfo.userPoints
    // const [isAdded, setIsAdded] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    
    function checkIfCartContains() {
        const cartItemIds = Cookies.get("ids")
        let cartItemIdsArray;
        if(cartItemIds) {
            cartItemIdsArray = cartItemIds.split(",")
            if(cartItemIdsArray.includes(props.id + "")) {
                setIsAdded(true)
            }
        }
    }

    useEffect(() => checkIfCartContains())

    //converts integers to dollar amount format
    // let USDollar = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    // });

    function addRemoveItem() {
        updatePoints(props.pointValue)
        if(!isAdded) {
            setIsAdded(true)
            dispatch(addCartFoodCard({id: props.id, img: props.imgUrl, desc: props.desc, price: props.price, name: props.name}))
            if(Cookies.get("ids")) {
                Cookies.set("ids", Cookies.get("ids") + props.id + ",")
            } else {
                Cookies.set("ids", props.id+",")
            }
        } else if(isAdded) {
            setIsAdded(false)
            dispatch(removeCartFoodCard(props.id))


            let cookieIds = Cookies.get("ids").split(",")
            if(cookieIds.includes(props.id + "")) {
                let indexOfId = cookieIds.indexOf(props.id +"")
                cookieIds.splice(indexOfId, 1)
            }
            Cookies.set("ids", cookieIds.toString())
        }
    }

    function updatePoints(foodPoints) {
        const updateUserPointsUrl = "http://localhost:8080/api/user/" + Cookies.get("id")
        const pointValue = isAdded === true ? foodPoints : -(foodPoints)
        const userData = {
            firstName: Cookies.get("firstName"),
            lastName: Cookies.get("lastName"),
            email: Cookies.get("email"),
            password: Cookies.get("password"),
            points: pointValue,
            role: Cookies.get("role")
        }
        axios({
            method: "put",
            url: updateUserPointsUrl,
            data: userData,
            headers: {"Authorization" : "Bearer " + userInfo.token}
        })
            .then(res => dispatch(setUserPoints(res.data.points)))
            .catch(function (error) {
                if(error.response) {
                    console.log(error.response)
                }
            })
    }

    return (
        <div className="menu-food-card">
            {props.pointValue <= points && 
                <div className="redeemable-label">
                    <h2>Redeemable</h2>
                </div>
            }
            <img className="food-card-img" src={props.imgUrl} alt={props.desc}></img>
            <h2 className="food-card-name">{props.name}</h2>
            <div className="food-card-purchase-options">
                {!isAdded && <div className="add-to-order-button" onClick={()=> addRemoveItem()}>
                    <h3>Add to order</h3>
                </div>}
                {isAdded && <div className="add-to-order-button" onClick={()=> addRemoveItem()}>
                    <h3>Remove from order</h3>
                </div>}
            </div>
        </div> 
    )
}