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
    const [bool, setBool] = useState({isSpecial:false,haveSecondAmount:false});
    function handleChange(event){
        const {name,value} = event.target;
        let typeValue = "";
        let updatedBool = {...bool};
        if (name==="campaigns"){

            if (value === "Fixed" || value === "PercentDis") {
                typeValue = "coupon";
                updatedBool.isSpecial = false;
                updatedBool.haveSecondAmount=false;
              } else if (value === "PercentbyItem" || value === "DisbyPoint") {
                typeValue = "ontop";
                if (value === "PercentbyItem"){
                  updatedBool.isSpecial=false;
                  updatedBool.haveSecondAmount=true;
                }
                else{
                  updatedBool.isSpecial=false;
                  updatedBool.haveSecondAmount=false;}
              } else if (value === "Special") {
                typeValue = "seasonal";
                updatedBool.isSpecial=true;
                updatedBool.haveSecondAmount=true;
              }
            setDiscount(prev=>{return {...prev,[name]:value,type:typeValue}});
            setBool(updatedBool);
        }
        else if (name === "amount" && value !== "" && !/^\d+(\.\d*)?$|^\.\d+$/.test(value)) {
          return;
        }
        else if (name === "secondAmount" && bool.isSpecial && value !== "" && !/^\d+(\.\d*)?$|^\.\d+$/.test(value)) {
        return;
      }

        else{
          setDiscount(prev=>{return {...prev,[name]:value}});
        }
    }

    function handleClick(event){
      if (!discount.campaigns || !discount.amount || (bool.haveSecondAmount && !discount.secondAmount)){
        alert("Please complete your discount form!");
        return;}
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
            <Form.Select name="campaigns" onChange={handleChange} value={discount.campaigns || ""}>
      <option value="" disabled>Select the Campaign</option>
      <option value="Fixed">Fixed Amount</option>
      <option value="PercentDis">Percentage
discount</option>
      <option value="PercentbyItem">Percentage
discount by item
category</option>
<option value="DisbyPoint">Discount by points</option>
<option value="Special">Special campaigns</option>
    </Form.Select></Row>
    <Row>
        {
    (discount.campaigns === "Fixed") && (
            <Form>
              <Form.Label>Discount Amount</Form.Label>
              <Form.Control name="amount" placeholder="Discount Amount" onChange={handleChange} value={discount.amount}/>
              <Button onClick={handleClick}>Add Discount</Button>
            </Form>
          )}
        {(discount.campaigns === "PercentbyItem") && (
            <Form>
              <Form.Label>Category</Form.Label>
            <Form.Select name="secondAmount" onChange={handleChange} value={discount.secondAmount || ""}>
      <option value="" disabled>Select the Category of Item</option>
      <option value="Clothing">Clothing</option>
      <option value="Accessories">Accessories</option>
      <option value="Electronics">Electronics</option>
    </Form.Select>
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