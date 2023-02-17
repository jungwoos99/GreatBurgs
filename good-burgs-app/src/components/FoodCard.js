import { useDispatch, useSelector } from "react-redux";
import { descreaseUserPoints } from "../features/user/userSlice";

export default function FoodCard(props) {
    const dispatch = useDispatch()

    const points = useSelector(state => state.user.userPoints)
    

    //converts integers to dollar amount format
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className="food-card">
            <h3 className="food-card-name">{props.name}</h3>
            <img className="food-card-img" src={props.imgUrl} alt={props.desc}></img>
            <div className="food-card-purchase-options">
                <div className="food-card-price-container"> 
                    <h3 className="food-card-price">{USDollar.format(props.price)}</h3>
                </div>
                {points >= props.pointValue && 
                    <div className="food-card-redeem-container" onClick={() => dispatch(descreaseUserPoints(props.pointValue))}>
                        <h3 className="food-card-redeem" >{props.pointValue}</h3>
                    </div>
                }
            </div>
            {/* <h4>{points}</h4> */}
        </div> 
    )
}