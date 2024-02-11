import React,{useState} from "react"
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
      setDiscountArray(prev=>{return [...prev,props]});
    }
  }
  function deleteDiscount(id){
    setDiscountArray((prev)=>{
      return prev.filter((item,index)=>{
        return (index!==id);});
    });
  }
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
      {/* <CalculateTotal cartTotal={total} discount={discountArray}/> */}
      <Calculated cartTotal={total} discount={discountArray}/>
    </div>
  );
}
