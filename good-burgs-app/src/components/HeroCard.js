import React from 'react'

export default function HeroCard(props) {
    const flowNormal = props.flow

    return (
        <div className='hero-card-container' style={{display: "flex", flexDirection: flowNormal ? "row" : "row-reverse"}}>

        </div>
    )
}