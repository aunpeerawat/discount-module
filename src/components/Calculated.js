import React,{useState} from "react";

function Calculated(props){
    const {Clothing,Accessories,Electronics,All} = props.cartTotal;
    const [discount,setDiscount] = useState({});
    let coup = 0;
    let nTop = 0;
    let season = 0;
    let totalDiscount = 0;
    let remaining = All;
    const discountArray = props.discount;
    if (discountArray.some((dis)=>{return (dis.type==="coupon");})){
        const indexDiscount = discountArray.findIndex((dis)=>{
            return (dis.type==="coupon");
        });
        coup = discountArray[indexDiscount].campaigns==="Fixed" ? discountArray[indexDiscount].amount : (discountArray[indexDiscount].amount)*remaining/100 ;
        remaining-=coup
    }
    if (discountArray.some((dis)=>{return (dis.type==="ontop");})){
        const indexDiscount = discountArray.findIndex((dis)=>{
            return (dis.type==="ontop");
        });
        if (discountArray[indexDiscount].campaigns==="PercentbyItem"){
            const category = discountArray[indexDiscount].secondAmount;
            (category==="Clothing")&&(nTop=discountArray[indexDiscount].amount*Clothing/100);
            (category==="Accessories")&&(nTop=discountArray[indexDiscount].amount*Accessories/100);
            (category==="Electronics")&&(nTop=discountArray[indexDiscount].amount*Electronics/100);
            remaining-=nTop;
        }
        else if (discountArray[indexDiscount].campaigns==="DisbyPoint"){
            const limit = 0.2 * remaining;
            nTop = discountArray[indexDiscount].amount <= limit ? discountArray[indexDiscount].amount : limit ;
            remaining -= nTop;
        }
    }
    if (discountArray.some((dis)=>{return (dis.type==="seasonal");})){
        const times = Math.floor(remaining / discountArray[indexDiscount].amount);
        season = (discountArray[indexDiscount].secondAmount)*times;
        remaining -= season;
    }
    totalDiscount = coup+nTop+season;
    console.log(coup,nTop,season,totalDiscount);
    setDiscount({coupon:coup,ontop:nTop,seasonal:season,total:totalDiscount});
    console.log(discount);
    
}

export default Calculated;