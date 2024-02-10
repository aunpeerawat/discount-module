import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddCart(props){
    const [item,setItem] = useState({itemName:"",itemCategory:"",itemPrice:""});
    function handleChange(event){
        const {name,value} = event.target;
        setItem(prev=>{return {...prev, [name]:value}});
    }
    function handleClick(event){
        props.onClick(item);
        setItem({itemName:"",itemCategory:"",itemPrice:""});
        event.preventDefault();
    }
return(<Container >
    <Form >
    <Row>
    <Form.Group>
        <Form.Label>Name of Item</Form.Label>
        <Form.Control name="itemName" placeholder="Type the name of item" onChange={handleChange} value={item.itemName}/>
    </Form.Group>
    </Row>
    <Row>
        <Form.Group>
            <Form.Label>Category of Item</Form.Label>
            <Form.Select name="itemCategory" onChange={handleChange} value={item.itemCategory || "defaultOption"}>
      <option value="defaultOption" disabled>Select the Category of Item</option>
      <option value="Clothing">Clothing</option>
      <option value="Accesories">Accesories</option>
      <option value="Electronics">Electronics</option>
    </Form.Select></Form.Group></Row>
    <Row><Form.Group><Form.Label>Price of Item</Form.Label>
        <Form.Control name="itemPrice" placeholder="Input the price" onChange={handleChange} value={item.itemPrice}/></Form.Group></Row></Form>
    <Row><Button onClick={handleClick}>Add to Cart</Button></Row>
  </Container>);
}

export default AddCart;