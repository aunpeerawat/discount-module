import React, {useState} from "react";

function CalculateTotal(props){
    const {Clothing,Accessories,Electronics,All} = props.cartTotal
    const discounts=props.discount;
    let total = All;
    if (discounts.some(discount=>discount.type==="coupon")){
        const index = discounts.findIndex(discount=>discount.type==="coupon");
        if (discounts[index].campaigns==="Fixed"){
            total = total - discounts[index].amount;
        }
        else if (discounts[index].campaigns==="PercentDis"){
            total = total - ((discounts[index].amount)*All/100);
        }
        console.log(total);
    }
    return(<p>It's calculate total!</p>)}


export default CalculateTotal;