import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import MenuBoard from '../components/MenuBoard'
// import { setUserPoints } from "../features/user/userSlice";
// import axios from "axios";
// import Cookies from "js-cookie";


export default function Menu() {
    const userInfo = useSelector(state => state.user)
    const cartCards = useSelector(state => state.cart).cartFoodCards
    const userLoggedIn = userInfo.loggedIn
    const userPoints = userInfo.userPoints
    // const dispatch = useDispatch()

    // function increasePoints(points) {

    //     const userInfo = {
    //         firstName: Cookies.get("firstName"),
    //         lastName: Cookies.get("lastName"),
    //         email: Cookies.get("email"),
    //         password: Cookies.get("password"),
    //         points: 100,
    //         role: Cookies.get("role")
    //     }
        
    //     axios({
    //         method: "put",
    //         url: "http://localhost:8080/api/user/" + Cookies.get("id"),
    //         data: userInfo,
    //         headers: {'Authorization' : 'Bearer ' + Cookies.get("token")}
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

    // console.log(cartCards)
    cartCards.forEach((card)=> console.log(card.name))

    console.log(Cookies.get("ids").split(","))


    return (
        <div className="menu-page">
            <h1>GreatBurgs Menu Items</h1>
            {userLoggedIn && <h2 className="menu-user-points">Available Points: {userPoints}</h2>}
            {/* <h2 style={{border:".4rem solid black", cursor:"pointer"}} onClick={()=> increasePoints()}>Give 100 points</h2> */}
            <MenuBoard/>
        </div>
    )
}