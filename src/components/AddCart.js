import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function AddCart(props){
    const [item,setItem] = useState({itemName:"",itemCategory:"",itemPrice:""});
    function handleChange(event){
        const {name,value} = event.target;
        if (name === "itemPrice" && value !== "" && !/^\d+(\.\d*)?$|^\.\d+$/.test(value)) {
            return;}
        setItem(prev=>{return {...prev, [name]:value}});
    }
    function handleClick(event){
        if (!item.itemName || !item.itemCategory || !item.itemPrice){
            alert("Please complete your item form!");
            return;}
        const newPrice = item.itemPrice.replace(/\.$/, "");
        props.onClick({...item,itemPrice:newPrice});
        setItem({itemName:"",itemCategory:"",itemPrice:""});
        event.preventDefault();
    }
return(<Container>
    <Form >
    
    <Form.Group className="mb-4">
        <Form.Label className="mb-3">Name of Item</Form.Label>
        <Form.Control name="itemName" placeholder="Type the name of item" onChange={handleChange} value={item.itemName}/>
    </Form.Group>
    
    
        <Form.Group className="mb-4">
            <Form.Label className="mb-3">Category of Item</Form.Label>
            <Form.Select name="itemCategory" onChange={handleChange} value={item.itemCategory || ""} className="mb-3">
      <option value="" disabled>Select the Category of Item</option>
      <option value="Clothing">Clothing</option>
      <option value="Accessories">Accessories</option>
      <option value="Electronics">Electronics</option>
    </Form.Select></Form.Group>
    <Form.Group className="mb-4"><Form.Label className="mb-3">Price of Item</Form.Label>
        <Form.Control name="itemPrice" placeholder="Input the price" onChange={handleChange} value={item.itemPrice}/></Form.Group></Form>
    <Button onClick={handleClick} variant="light" style={{backgroundColor:"#80BCBD"}}>Add to Cart</Button>
  </Container>);
}

export default AddCart;