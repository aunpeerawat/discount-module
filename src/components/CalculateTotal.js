import React, {useState} from "react";
import Container from "react-bootstrap/esm/Container";

function CalculateTotal(props){
    const {Clothing,Accessories,Electronics,All} = props.cartTotal;
    const discounts = [...props.discounts];
    const [remain,setRemain] = useState({coupon:"",ontop:"",special:"",remain:""});
    let updatedRemain = {...remain};
    let remaining = All;
    // let remaining = remain;
    // discountArray.forEach((discount,index) => {
    //   const prevRemain = remaining;
    //   if (discount.campaigns === "Fixed") {
    //     remaining -= discount.amount;
    //   } else if (discount.campaigns === "PercentDis") {
    //     remaining -= (discount.amount * remaining) / 100;
    //   } else if (discount.campaigns === "PercentbyItem") {
    //     if (discount.secondAmount === "Clothing") {
    //       remaining -= discount.amount * total.Clothing / 100;
    //     } else if (discount.secondAmount === "Accessories") {
    //       remaining -= discount.amount * total.Accessories / 100;
    //     } else if (discount.secondAmount === "Electronics") {
    //       remaining -= discount.amount * total.Electronics / 100;
    //     }
    //   } else if (discount.campaigns === "DisbyPoint") {
    //     remaining -= discount.amount < 0.2 * remaining ? discount.amount : 0.2 * remaining;
    //   } else if (discount.campaigns === "Special") {
    //     remaining -= Math.floor(remaining / discount.amount) * discount.secondAmount;
    //   }
    //   if (remaining<0){
    //     alert ("Couldn't Add Discouny !");
    //     deleteDiscount(index);
    //     remaining = prevRemain
    //     return ;
    //   }
    //   console.log(remaining);
    // });
    // setRemain(remaining);
return (<div>
    {discounts.map((discount,index)=>{
        if (discount.campaigns === "Fixed") {
            if (remaining-discount.amount<0){
                return;
            }
            else {
                remaining -= discount.amount;
                updatedRemain.coupon = discount.amount;
            }}
        else if (discount.campaigns === "PercentDis"){
            if (remaining-discount.amount<0){
                return;
            }
            else {
                remaining -= (discount.amount*remaining)/100;
                updatedRemain.coupon = (discount.amount*remaining)/100;
            }
        }
        else if (discount.campaigns === "PercentbyItem"){
            if (remaining-discount.amount<0){
                return;
            }
            else{
                if (discount.secondAmount === "Clothing") {
                remaining -= discount.amount * Clothing / 100;
                updatedRemain.ontop = discount.amount * Clothing / 100;
                } else if (discount.secondAmount === "Accessories") {
                remaining -= discount.amount * Accessories / 100;
                updatedRemain.ontop = discount.amount * Accessories / 100;
                } else if (discount.secondAmount === "Electronics") {
                remaining -= discount.amount * Electronics / 100;
                updatedRemain.ontop = discount.amount * Accessories / 100;
                }        
            }
        }
        else if (discount.campaigns === "DisbyPoint"){
            if (remaining-discount.amount<0){
                return;
        }
            else {
                remaining -= discount.amount < 0.2 * remaining ? discount.amount : 0.2 * remaining;
                updatedRemain = discount.amount < 0.2 * remaining ? discount.amount : 0.2 * remaining;
            }}
        else if (discount.campaigns=== "Special"){
            if (remaining-discount.amount<0){
                return;
        }
           else{
            remaining -= Math.floor(remaining / discount.amount) * discount.secondAmount;
        }}
        updatedRemain.remain = remaining;
    })}
    {setRemain((prev)=>{
            return {...prev,updatedRemain}
        })}
    <p> Discount from Coupon: {remain.coupon} baht, Discount from On Top: {remain.ontop}, Discount from Seasonal: {remain.special}, Total Price: {remain.remain}</p>
</div>);  
};


export default CalculateTotal;