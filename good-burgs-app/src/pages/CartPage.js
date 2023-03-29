import Cookies from "js-cookie";
import React  from "react";
import CartItems from "../components/CartItems";

export default function CartPage() {

  const cookieToken = Cookies.get("token")

  return (
    <div className="cart-page-wrapper">
      {cookieToken && <CartItems />}
      {!cookieToken && 
      <div>
        <h1>Log in to view your order!</h1>
      </div>}
    </div>
  );
}
