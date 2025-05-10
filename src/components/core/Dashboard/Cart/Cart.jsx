import React from 'react';
import { useSelector } from 'react-redux';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';
import "./Cart.css";


const Cart = () => {

  const {total,totalItems} = useSelector((state)=> state.cart);



  return (
    <div className="Cart-container">
      <h1 className="Cart-title">Cart</h1>
      <p className="Cart-subtitle">{totalItems} Courses in Cart</p>

      {
        total > 0 ? (
            <div className="Cart-content">
                <RenderCartCourses />
                <RenderTotalAmount />
            </div>
        ):(
            <div className="Cart-empty">Your Cart is Empty</div>
        )
      }
    </div>
  )
}

export default Cart
