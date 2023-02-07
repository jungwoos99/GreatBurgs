import React, { useState } from 'react'
import NavBar from './components/NavBar'
import "/Users/jungwooseo/Desktop/GreatBurgs/good-burgs-app/src/App.css"

export default function App() {

  const [food, setFood] = useState([]);

  function fillFoodList() {
    fetch("http://localhost:8080/api/food")
      .then(res => res.json())
      .then(data => setFood(data.map((food) => <h1>{food.name}</h1>)))
  }

  console.log({food})

  return (
    <div className='app'>
      <NavBar/>
      <div className='food-list'>
        {food}
      </div>
      <h1 onClick={() => fillFoodList()}>Click</h1>
    </div>
  )
}