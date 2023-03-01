import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initializeFoodItems } from '../features/menu/menuSlice';
import FoodCard from './FoodCard';
import Cookies from 'js-cookie';

export default function MenuBoard() {

    const [food, setFood] = useState([]);
    const dispatch = useDispatch()
    const itemIds = useSelector(state => state.cart).itemIds
    const foodCards = useSelector(state => state.menu).foodItems

    /*TODO: 
        - Create different sections for Entrees, Sides, Drinks, Desserts
    */

    function fillFoodList() {
        fetch("http://localhost:8080/api/food/all")
            .then(res => res.json())
            .then(data => setFood((data.map((food) => 
                <FoodCard
                    key={food.id}
                    id={food.id}
                    name={food.name}
                    desc={food.description}
                    ingredients={food.ingredients}
                    price={food.price}
                    pointValue={food.pointValue}
                    imgUrl={food.imgUrl}
                />
            ))))
    }

    function updateStoreIds() {
        const newIds = itemIds
        Cookies.remove("ids")
        Cookies.set("ids", newIds)
        console.log("ids: "+ Cookies.get("ids"))
    }

    useEffect(()=> updateStoreIds(), [itemIds])

    useEffect(()=> fillFoodList(), [])

    return (
        <div className='menu'>
            <div className='menu-container'>
                {food}
            </div>
        </div>
    )
}