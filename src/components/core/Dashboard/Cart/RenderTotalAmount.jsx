import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconBtnComm from "../../../common/IconBtnComm";
import { buyCourse } from '../../../../services/operations/studentFreaturesAPI';
import { useNavigate } from 'react-router-dom';
import "./RenderTotalAmount.css";

const RenderTotalAmount = () => {
    const {total, cart } = useSelector((state)=>state.cart);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleBuyCourse = ()=>{
        const courses = cart.map((course) => course._id)
        buyCourse(token,courses,navigate,dispatch);
    }



  return (
    <div className="RenderTotalAmount-container">
        <p  className="RenderTotalAmount-label">Total:</p>
        <p className="RenderTotalAmount-total">Rs {total}</p>
        <IconBtnComm 
           text="Buy Now"
           onclick={handleBuyCourse}
        />
      
    </div>
  )
}

export default RenderTotalAmount
