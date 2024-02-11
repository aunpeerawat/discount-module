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

    function calculateTotal(){if (discountArray.some((dis)=>{return (dis.type==="coupon");})){
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
    totalDiscount = coup+nTop+season;}
}

export default Calculated;

// {setRemain(total.All)}
//       {discountArray.map((discount)=>{
//         (discount.campaigns==="Fixed")&&(setRemain((prev)=>{return prev-discount.amount}));
//         (discount.campaigns==="PercentDis")&&(setRemain((prev)=>{return prev-discount.amount*prev/100}));
//         if (discount.campaigns==="PercentbyItem"){
//           (discount.secondAmount==="Clothing")&&(setRemain((prev)=>{return prev-discount.amount*total.Clothing/100}));
//           (discount.secondAmount==="Accessories")&&(setRemain((prev)=>{return prev-discount.amount*total.Accessories/100}));
//           (discount.secondAmount==="Electronics")&&(setRemain((prev)=>{return prev-discount.amount*total.Electronics/100}));
//         }
//         if (discount.campaigns==="DisbyPoint"){
//           setRemain((prev)=>{return ((discount.amount < 0.2*prev) ? (prev-discount.amount) : (prev-0.2*prev))});
//         }
//         (discount.campaigns==="Special")&&(setRemain((prev)=>{return prev-(Math.floor(prev/discount.amount)*discount.secondAmount)}));
//         return <CalculateTotal campaign={discount.campaigns} type={discount.type} remain={remain}/>
//       })}