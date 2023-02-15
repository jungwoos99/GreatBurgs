import React from "react";
import { useSelector } from "react-redux";

export default function Home() {

    const userToken = useSelector(state => state.user.token)

    return (
        <>
            <h1>Token: {userToken}</h1>
        </>
    )
}