import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";

function AddDiscount(props){
    const [discount, setDiscount] = useState({
        campaigns: "",
        type: "",
        amount: "",
        secondAmount: "",
      });
    function handleChange(event){
        const {name,value} = event.target;
        let typeValue = "";
        if (name==="campaigns"){

            if (value === "Fixed" || value === "PercentDis") {
                typeValue = "coupon";
              } else if (value === "PercentbyItem" || value === "DisbyPoint") {
                typeValue = "ontop";
              } else if (value === "Special") {
                typeValue = "seasonal";
              }
            console.log(value,typeValue);
            setDiscount(prev=>{return {...prev,[name]:value,type:typeValue}});
        }
        else{
          setDiscount(prev=>{return {...prev,[name]:value}});
        }
    }

    function handleClick(event){
       props.addDiscount(discount);
       setDiscount({
        campaigns: "",
        type: "",
        amount: "",
        secondAmount: "",
      });
      event.preventDefault();
    }
    
    return(<Container><Row>
            <Form.Label>Campaigns</Form.Label>
            <Form.Select name="campaigns" onChange={handleChange} value={discount.campaigns || "defaultOption"}>
      <option value="defaultOption" disabled>Select the Campaign</option>
      <option value="Fixed">Fixed Amount</option>
      <option value="PercentDis">Percentage
discount</option>
      <option value="PercentbyItem">Percentage
discount by item
category</option>
<option value="DisbyPoint">Discount by points</option>
<option value="Special">Special campaigns</option>
    </Form.Select></Row>
    <Row>{console.log(discount.campaigns)}
        {
    (discount.campaigns === "Fixed" ||discount.campaigns === "PercentbyItem") && (
            <Form>
              <Form.Label>Discount Amount</Form.Label>
              <Form.Control name="amount" placeholder="Discount Amount" onChange={handleChange} value={discount.amount}/>
              <Button onClick={handleClick}>Add Discount</Button>
            </Form>
          )}
          {discount.campaigns === "PercentDis" && (
            <Form>
              <Form.Label>Percentage</Form.Label>
              <Form.Control name="amount" placeholder="Discount Percentage" onChange={handleChange} value={discount.amount}/>
              <Button onClick={handleClick}>Add Discount</Button>
            </Form>
          )}
          {discount.campaigns === "DisbyPoint" && (
            <Form>
              <Form.Label>Customer Points</Form.Label>
              <Form.Control
                name="amount"
                placeholder="Discount from Customer Points"
                onChange={handleChange}
                value={discount.amount}
              />
              <Button onClick={handleClick}>Add Discount</Button>
            </Form>
          )}
          {discount.campaigns === "Special" && (
            <Form>
              <Form.Label>Spectial Discount</Form.Label>
              <Form.Control name="amount" placeholder="Every X THB" onChange={handleChange} value={discount.amount}/>
              <Form.Control name="secondAmount" placeholder="Discount Y THB" onChange={handleChange} value={discount.secondAmount}/>
              <Button onClick={handleClick}>Add Discount</Button>
            </Form>
          )}</Row>
          
          </Container>);
}

export default AddDiscount;