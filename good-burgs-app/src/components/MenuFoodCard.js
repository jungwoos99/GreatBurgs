import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuFoodCard(props) {
    const dispatch = useDispatch()
    const userId = Cookies.get("userId")

    const userInfo = useSelector(state => state.user)
    const points = userInfo.userPoints
    const [isAdded, setIsAdded] = useState(false)
    const userIsLoggedIn = Cookies.get("token")
    
    function checkIfCartContains() { 
        let cartIds = []
        if(Cookies.get(`cart${userId}`)) {
            Cookies.get(`cart${userId}`).split("$-$").filter(n => n).forEach((card) => {
                cartIds.push(JSON.parse(card).id)
            })
        }
        if(cartIds.includes(props.id)) {
            setIsAdded(true)
        }
        // console.log(cartIds)
    }

    useEffect(() => checkIfCartContains())

    //converts integers to dollar amount format
    // let USDollar = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    // });

    function addRemoveItem() {
        const foodCard = {
            id: props.id, 
            img: props.imgUrl, 
            desc: props.desc, 
            price: props.price, 
            name: props.name
        }
        updatePoints(props.pointValue)
        if(!isAdded) {
            setIsAdded(true)
            if(Cookies.get(`cart${userId}`)) {
                Cookies.set(`cart${userId}`, Cookies.get(`cart${userId}`) + JSON.stringify(foodCard) + "$-$")
            } else {
                Cookies.set(`cart${userId}`, JSON.stringify(foodCard)+ "$-$")
            }
        } else if(isAdded) {
            setIsAdded(false)
            let cookieCards = Cookies.get(`cart${userId}`).split("$-$").filter(n => n)
            cookieCards.forEach((item) => {
                if(JSON.parse(item).id === props.id) {
                    cookieCards.splice(cookieCards.indexOf(item), 1)
                    Cookies.set(`cart${userId}`, JSON.stringify(cookieCards))
                } 
                if(Cookies.get(`cart${userId}`) === []) { 
                    Cookies.remove(`cart${userId}`)
                }
            })

            /*

                const items = Cookies.get(`cart${userId}`).split("$-$").filter(n => n)

                items.forEach((item) => {
                    if(JSON.parse(item).id === 1) {
                        items.splice(items.indexOf(item), 1)
                    }
                    console.log("New Items: " + items)
                })

            */
            
            // if(cookieIds.includes(props.id + "")) {
            //     let indexOfId = cookieIds.indexOf(props.id +"")
            //     cookieIds.splice(indexOfId, 1)
            // }
            // Cookies.set(`cart${userId}`, cookieIds.toString())
        }
    }

    function updatePoints(foodPoints) {
        const updateUserPointsUrl = "http://localhost:8080/api/user/" + userId
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

    if(Cookies.get(`cart${userId}`)) {
    console.log(Cookies.get(`cart${userId}`).split("$-$"))
    }

    // Cookies.remove(`cart${userId}`)

    return (
        <div className="menu-food-card">
            {props.pointValue <= points && 
                <div className="redeemable-label">
                    <h2>Redeemable</h2>
                </div>
            }
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
            : <h3 className="food-card-no-token">Log in to start your order!</h3>}
        </div> 
    )
}