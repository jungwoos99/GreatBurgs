import React, { useState, useEffect } from 'react'
import FoodCard from './FoodCard';

export default function MenuBoard() {

    const [food, setFood] = useState([]);

    function fillFoodList() {

        fetch("http://localhost:8080/api/food/all")
            .then(res => res.json())
            .then(data => setFood(data.map((food) => 
                <FoodCard
                    key={food.id}
                    name={food.name}
                    desc={food.description}
                    ingredients={food.ingredients}
                    price={food.price}
                    pointValue={food.pointValue}
                    imgUrl={food.imgUrl}
                />
            )))
    }

    useEffect(()=> fillFoodList(), [])

    return (
        <div className='menu'>
            <div className='menu-container'>
                {food}
            </div>
        </div>
    )
}