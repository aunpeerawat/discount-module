import React,{useState,useEffect} from "react"
import AddCart from "./components/AddCart";
import ShowCart from "./components/ShowCart";
import "./styles.css";
import AddDiscount from "./components/AddDiscount";
import ShowDiscount from "./components/ShowDiscount";
import CalculateTotal from "./components/CalculateTotal";
import Calculated from "./components/Calculated";

export default function App() {
  const [cartItems,setCartItems] = useState([]);
  const [discountArray,setDiscountArray] = useState([]);
  const [total,setTotal] = useState({Clothing:0,Accessories:0,Electronics:0,All:0});
  const [remain,setRemain] = useState(total.All);
  
  function addItem(props){
    const itemPrice = parseFloat(props.itemPrice);
    // setTotal((prev)=>{
    //   return{...prev,Clothing:prev.Clothing + (props.itemCategory==="Clothing" ? itemPrice : 0), Accessories:prev.Accessories + (props.itemCategory==="Accessories"? itemPrice : 0), Electronics:prev.Electronics+(props.itemCategory==="Electornics"? itemPrice : 0)};
    // });
    (props.itemCategory==="Clothing")&&(setTotal(prev=> {return {...prev,Clothing:prev.Clothing+itemPrice,All:prev.All+itemPrice}}));
    (props.itemCategory==="Accessories")&&(setTotal(prev=> {return {...prev,Accessories:prev.Accessories+itemPrice,All:prev.All+itemPrice}}));
    (props.itemCategory==="Electronics")&&(setTotal(prev=> {return {...prev,Electronics:prev.Electronics+itemPrice,All:prev.All+itemPrice}}));
    setCartItems(prev=>{return [...prev,props]});
  }
  function deleteItem(props){
    const itemPrice = parseFloat(props.itemPrice);
    // setTotal((prev)=>{
    //   return{...prev,Clothing:prev.Clothing - (props.itemCategory==="Clothing" ? itemPrice : 0), Accessories:prev.Accessories - (props.itemCategory==="Accessories"? itemPrice : 0), Electronics:prev.Electronics-(props.itemCategory==="Electornics"? itemPrice : 0)};
    // });
    (props.itemCategory==="Clothing")&&(setTotal(prev=> {return {...prev,Clothing:prev.Clothing-itemPrice,All:prev.All-itemPrice}}));
    (props.itemCategory==="Accessories")&&(setTotal(prev=> {return {...prev,Accessories:prev.Accessories-itemPrice,All:prev.All-itemPrice}}));
    (props.itemCategory==="Electronics")&&(setTotal(prev=> {return {...prev,Electronics:prev.Electronics-itemPrice,All:prev.All-itemPrice}}));
    
    setCartItems((prev)=>{
      return prev.filter((item,index)=>{
        return (index!==props.id);});
    });
  }
  function addDiscount(props){
    const discountType = props.type;
    if (discountArray.some((discount)=>{return (discount.type===discountType)})){
      alert('This type of coupon has already existed !.');
    }
    else{
      setDiscountArray(prev=>{return [...prev,props].sort(sortType)});
    }

  }
  function deleteDiscount(id){
    setDiscountArray((prev)=>{
      return prev.filter((item,index)=>{
        return (index!==id);});
    });
  }
  function sortType(a,b){
    const order = { coupon: 1, ontop: 2, seasonal: 3 };
    return order[a.type] - order[b.type];
}
const calculateRemaining = () => {
  let remaining = total.All; //
  discountArray.forEach((discount,index) => {
    if (discount.campaigns === "Fixed") {
      const substract = discount.amount;
      if (remaining-substract >= 0) {remaining -= substract;}
      else {
        alert("Couldn't add this discount");
        deleteDiscount(index);
        return;
      }
    } else if (discount.campaigns === "PercentDis") {
      const substract = (discount.amount * remaining) / 100;
      if (total.All===0){alert("Couldn't add this discount");
      deleteDiscount(index);
      return;}
      else if (remaining-substract >= 0) {remaining -= substract;}
      else {
        alert("Couldn't add this discount");
        deleteDiscount(index);
        return;
      }
    } else if (discount.campaigns === "PercentbyItem") {
      if (total.All===0){alert("Couldn't add this discount");
      deleteDiscount(index);
      return;}
      else if (discount.secondAmount === "Clothing") {
        const substract = discount.amount * total.Clothing / 100;
        if (remaining-substract >= 0) {remaining -= substract;}
        else {
          alert("Couldn't add this discount");
          deleteDiscount(index);
          return;
        }
      } else if (discount.secondAmount === "Accessories") {
        const substract = discount.amount * total.Accessories / 100;
        if (remaining-substract >= 0) {remaining -= substract;}
        else {
          alert("Couldn't add this discount");
          deleteDiscount(index);
          return;
        }
      } else if (discount.secondAmount === "Electronics") {
        const substract = discount.amount * total.Electronics / 100;
        if (remaining-substract >= 0) {remaining -= substract;}
        else {
          alert("Couldn't add this discount");
          deleteDiscount(index);
          return;
        }
      }
    } else if (discount.campaigns === "DisbyPoint") {
      const substract = discount.amount < 0.2 * remaining ? discount.amount : 0.2 * remaining;
      if (total.All===0){alert("Couldn't add this discount");
      deleteDiscount(index);
      return;}
      else if (remaining-substract >= 0) {remaining -= substract;}
      else {
        alert("Couldn't add this discount");
        deleteDiscount(index);
        return;
      }
    } else if (discount.campaigns === "Special") {
      const substract = Math.floor(remaining / discount.amount) * discount.secondAmount;
      if (total.All===0){alert("Couldn't add this discount");
      deleteDiscount(index);
      return;}
      else if (remaining-substract >= 0) {remaining -= substract;}
      else {
        alert("Couldn't add this discount");
        deleteDiscount(index);
        return;
      }
    }
    });
  setRemain(remaining);
};
useEffect(() => {
  calculateRemaining();
}, [cartItems, discountArray]);

  return (
    <div className="App">
      <h2>Item</h2>
      <AddCart onClick={addItem}/>
      {cartItems.map((item,index)=>{
        return (<ShowCart key={index} itemName={item.itemName} itemCategory={item.itemCategory} itemPrice={item.itemPrice} onDelete={deleteItem} id={index}/>)
      })}
      <h2>Discount</h2>
      <AddDiscount addDiscount={addDiscount}/>
      {discountArray.map((discount,index)=>{
        return (<ShowDiscount key={index} campaign={discount.campaigns} type={discount.type} amount={discount.amount} secondAmount={discount.secondAmount} onDelete={deleteDiscount} id={index}/>)
      })}
      <h2>Calculate Total</h2>
      <p>Total Clothing : {total.Clothing}, totalAccessories : {total.Accessories}, totalElectronics : {total.Electronics}, totalPrice : {total.All}</p>
      <p>Total Price : {remain}</p>
    </div>
  );
}
