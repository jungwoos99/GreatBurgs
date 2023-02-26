import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";
import { addItemId, addItemToCart, emptyItemIds, removeItemId } from "../features/cart/cartSlice";

export default function FoodCard(props) {
    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.user)
    const itemIds = useSelector(state => state.cart).itemIds
    const points = userInfo.userPoints
    const [isAdded, setIsAdded] = 
        useState(
            Cookies.get("ids") && JSON.parse(Cookies.get("ids")).includes(props.id)
        )

    //converts integers to dollar amount format
    // let USDollar = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    // });

    // function increasePoints() {
    //     const userData = {
    //         firstName: Cookies.get("firstName"),
    //         lastName: Cookies.get("lastName"),
    //         email: Cookies.get("email"),
    //         password: Cookies.get("password"),
    //         points: 100,
    //         role: Cookies.get("role")
    //     }

    //     // console.log(userData)
    //     axios({
    //         method: "put",
    //         url: "http://localhost:8080/api/user/1",
    //         data: userData,
    //         headers: {'Authorization' : 'Bearer ' + Cookies.get("token")}
    //     })
    //         .catch(function (error) {
    //             if(error.response) {
    //                 console.log(error.response)
    //             } else {
    //                 console.log("success")
    //             }
    //         })
    // }

    // function deductPoints(foodPoints) {
    //     const updateUserPointsUrl = "http://localhost:8080/api/user/" + Cookies.get("id")

    //     const userData = {
    //         firstName: Cookies.get("firstName"),
    //         lastName: Cookies.get("lastName"),
    //         email: Cookies.get("email"),
    //         password: Cookies.get("password"),
    //         points: -1 * foodPoints,
    //         role: Cookies.get("role")
    //     }

    //     axios({
    //         method: "put",
    //         url: updateUserPointsUrl,
    //         data: userData,
    //         headers: {"Authorization" : "Bearer " + userInfo.token}
    //     })
    //         .then(res => dispatch(setUserPoints(res.data.points)))
    //         .catch(function (error) {
    //             if(error.response) {
    //                 console.log(error.response)
    //             } else {
    //                 console.log("success")
    //             }
    //         })
    // }

    function addRemoveItem(id) {
        if(!isAdded) {
            dispatch(addItemToCart(1))
            setIsAdded(true)
            dispatch(addItemId(props.id))
            if(itemIds.includes("empty")) {
                dispatch(emptyItemIds())
            }
            
        } else if(isAdded) {
            dispatch(addItemToCart(-1))
            setIsAdded(false)
            dispatch(removeItemId(id))
        }
        console.log("First: " + itemIds)
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