import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { addItemId, removeItemId } from "../features/cart/cartSlice";
import axios from "axios";
import { setUserPoints } from "../features/user/userSlice";

export default function FoodCard(props) {
    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.user)
    const itemIds = useSelector(state => state.cart).itemIds
    const points = userInfo.userPoints
    const [isAdded, setIsAdded] = useState(false)

    //converts integers to dollar amount format
    // let USDollar = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    // });

    function addRemoveItem(id) {
        updatePoints(props.pointValue)
        if(!isAdded) {
            setIsAdded(true)
            dispatch(addItemId(id))
        } else if(isAdded) {
            setIsAdded(false)
            dispatch(removeItemId(id))
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
        <div className="food-card">
            {props.pointValue <= points && 
                <div className="redeemable-label">
                    <h2>Redeemable</h2>
                </div>
            }
            <img className="food-card-img" src={props.imgUrl} alt={props.desc}></img>
            <h2 className="food-card-name">{props.name}</h2>
            <div className="food-card-purchase-options">
                {!isAdded && <div className="add-to-order-button" onClick={()=> addRemoveItem(props.id)}>
                    <h3>Add to order</h3>
                </div>}
                {isAdded && <div className="add-to-order-button" onClick={()=> addRemoveItem(props.id)}>
                    <h3>Remove from order</h3>
                </div>}
            </div>
        </div> 
    )
}