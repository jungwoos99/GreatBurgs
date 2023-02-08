import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreasePoints } from "../features/menu/menuSlice";

export default function FoodCard(props) {
    const dispatch = useDispatch()

    const account = useSelector(state => state.menu)
    const [points, setPoints] = useState(0)

    //converts integers to dollar amount format
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    //eslint-disable-next-line
    useEffect(() => setPoints(account.availablePoints,[]))

    return (
        <div className="food-card">
            <h3 className="food-card-name">{props.name}</h3>
            <img className="food-card-img" src={props.imgUrl} alt={props.desc}></img>
            <div className="food-card-purchase-options">
                <div className="food-card-price-container"> 
                    <h2 className="food-card-price">{USDollar.format(props.price)}</h2>
                </div>
                {points > props.pointValue && 
                    <div className="food-card-redeem-container">
                        <h2 className="food-card-redeem" onClick={() => dispatch(decreasePoints(props.pointValue))}>Redeem</h2>
                    </div>
                }
            </div>
            {/* <h4>{points}</h4> */}
        </div> 
    )
}