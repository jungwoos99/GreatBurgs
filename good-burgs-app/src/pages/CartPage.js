import Cookies from "js-cookie";
import React from "react";
import CartItems from "../components/CartItems";

export default function Cart() {

  return (
    <div className="cart-page-wrapper">
      <CartItems />
    </div>
  );
}
