import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuFoodCard(props) {
    const userId = Cookies.get("userId")
    const foodId = props.id
    const foodPoints = props.pointValue
    const userInfo = useSelector(state => state.user)
    const [userPoints, setUserPoints] = useState(Cookies.get("points"))
    const [isAdded, setIsAdded] = useState(false)
    const userIsLoggedIn = Cookies.get("token")
    
    function checkIfCartContains() { 
        if(Cookies.get(`cart${userId}`)) {
            const cartIds = Cookies.get(`cart${userId}`).split(",").filter(n => n)
            if(cartIds.includes(foodId.toString())) {
                setIsAdded(true)
            }
        }
    }

    //eslint-disable-next-line
    useEffect(() => checkIfCartContains(), [])

    //converts integers to dollar amount format
    // let USDollar = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    // });

    function addRemoveItem() {
        updatePoints(foodPoints)
        if(!isAdded) {
            setIsAdded(true)
            setUserPoints(prevUserPoints => prevUserPoints += foodPoints)
            if(Cookies.get(`cart${userId}`)) {
                const cookieCart = Cookies.get(`cart${userId}`)
                Cookies.set(`cart${userId}`, cookieCart + (foodId + ","))
            } else {
                Cookies.set(`cart${userId}`, (foodId+ ","))
            }
        } else if(isAdded) {
            setIsAdded(false)
            setUserPoints(prevUserPoints => prevUserPoints -= foodPoints)
            const cookieCart = Cookies.get(`cart${userId}`).split(",").filter(n => n)
            // console.log(cookieCart)
            cookieCart.forEach((item) => {
                if(item === foodId.toString()) {
                    cookieCart.splice(cookieCart.indexOf(item), 1)
                    Cookies.set(`cart${userId}`, (cookieCart))
                }
            })
        }
        // console.log(Cookies.get(`cart${userId}`))
    }

    function updatePoints() {
        const updateUserPointsUrl = "http://localhost:8080/api/user/" + userId.toString()
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
            .then(res => Cookies.set("points", (res.data.points)))
            .catch(function (error) {
                if(error.response) {
                    console.log(error.response)
                }
            })
    }

    return (
        <div className="menu-food-card">
            <img className="food-card-img" src={props.imgUrl} alt={props.desc}></img>
            <h2 className="food-card-name">{props.name}</h2>
            {userIsLoggedIn ? <div className="food-card-purchase-options">
                {!isAdded && <div className="add-to-order-button" onClick={()=> addRemoveItem()}>
                    <h3>Add to order</h3>
                </div>}
                {isAdded && <div className="remove-from-order-button" onClick={()=> addRemoveItem()}>
                    <h3>Remove from order</h3>
                </div>}
            </div>
            : <h3 className="food-card-no-token" style={{cursor:"default"}}>Log in to start your order!</h3>}
        </div> 
    )
}