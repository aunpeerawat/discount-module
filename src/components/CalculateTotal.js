import React, {useState} from "react";

function CalculateTotal(props){
    function sortType(a,b){
        const order = { coupon: 1, ontop: 2, seasonal: 3 };
        return order[a.type] - order[b.type];
    }
    let {Clothing,Accessories,Electronics,All} = props.cartTotal;
    const discounts=props.discount;
    console.log(discounts);
    const [eachDiscount,setEachDiscount] = useState({coupon:0,ontop:0,seasonal:0,total:0});
    let thisDiscount = 0;
    let index = 0;
    let sumDiscount = 0;
    
    // if (discounts.some(discount=>{return (discount.type==="coupon")})){
    //     index = discounts.findIndex(discount=>{return (discount.type==="coupon")});
    //     thisDiscount = (discounts[index].campaigns==="Fixed") ? discounts[index].amount : (discounts[index].amount)*All.final/100;
    //     All-=thisDiscount;
    //     sumDiscount+=thisDiscount;
    //     setEachDiscount(prev=> {
    //         return ({...prev,coupon:thisDiscount})});
    //     console.log("coupon",thisDiscount);
    // }
    // if (discounts.some(discount=>{return (discount.type==="ontop")})){
    //     index = discounts.findIndex(discount=>discount.type==="ontop");
    //     if (discounts[index].campaigns==="PercentbyItem"){
    //         (discounts[index].secondAmount==="Clothing")&&(thisDiscount = (discounts[index].amount)*Clothing/100);
    //         (discounts[index].secondAmount==="Accessories")&&(thisDiscount = (discounts[index].amount)*Accessories/100);
    //         (discounts[index].secondAmount==="Electronics")&&(thisDiscount = (discounts[index].amount)*Electronics/100);
    //     }
    //     else if (discounts[index].campaigns==="DisbyPoint"){
    //         const limit = 0.2*All;
    //         thisDiscount = (discounts[index].amount<= limit) ? discounts[index].amount : limit;
    //     }
    //     All-=thisDiscount;
    //     sumDiscount+=thisDiscount;
    //     setEachDiscount(prev=> {
    //         return ({...prev,ontop: thisDiscount})});
    //     console.log("ontop",thisDiscount);
    // }
    // if (discounts.some(discount=>{return (discount.type==="seasonal")})){
    //     index = discounts.findIndex(discount=>discount.type==="seasonal");
    //     const timeSubstract = Math.floor(All / discounts[index].amount);
    //     thisDiscount = (discounts[index].secondAmount) * timeSubstract;
    //     All-=thisDiscount
    //     sumDiscount+=thisDiscount
    //     setEachDiscount(prev=> {
    //         return ({...prev,seasonal:thisDiscount})});
    //     console.log("seasonal",thisDiscount);
    //     }
    // setEachDiscount(prev=> {
    //     return ({...prev,total:sumDiscount})});
    // console.log("Sum Discount",eachDiscount.total);

        return(<p>It's calculate total!</p>)}


export default CalculateTotal;