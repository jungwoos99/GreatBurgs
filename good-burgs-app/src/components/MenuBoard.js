import React, { useState, useEffect } from 'react'
import MenuFoodCard from './MenuFoodCard';

export default function MenuBoard() {

    const [food, setFood] = useState([]);

    function fillFoodList() {
        fetch("http://localhost:8080/api/food/all")
            .then(res => res.json())
            .then(data => setFood((data.map((food) => 
                <MenuFoodCard
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

    useEffect(()=> fillFoodList(), [])

    return (
        <div className='menu'>
            <div className='menu-container'>
                {food}
            </div>
        </div>
    )
}