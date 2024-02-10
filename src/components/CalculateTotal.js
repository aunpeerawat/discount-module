import React, {useState} from "react";

function CalculateTotal(props){
    const {Clothing,Accessories,Electronics,All} = props.cartTotal
    console.log(Clothing,Accessories,Electronics,All);
    return(<p>It's calculate total!</p>)
}

export default CalculateTotal;