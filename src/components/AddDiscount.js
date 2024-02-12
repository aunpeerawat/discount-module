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
            <Form.Label className="mb-3">Campaign</Form.Label>
            <Form.Select className="mb-3" name="campaigns" onChange={handleChange} value={discount.campaigns || ""}>
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
            <Form className="mb-4">
              <Form.Label className="mb-3">Discount Amount</Form.Label>
              <Form.Control className="mb-3" name="amount" placeholder="Discount Amount" onChange={handleChange} value={discount.amount}/>
              <Button style={{backgroundColor:"#80BCBD"}} variant="light" onClick={handleClick}>Add Discount</Button>
            </Form>
          )}
        {(discount.campaigns === "PercentbyItem") && (
            <Form className="mb-3">
              <Form.Label className="mb-3">Category</Form.Label>
            <Form.Select className="mb-4" name="secondAmount" onChange={handleChange} value={discount.secondAmount || ""}>
      <option value="" disabled>Select the Category of Item</option>
      <option value="Clothing">Clothing</option>
      <option value="Accessories">Accessories</option>
      <option value="Electronics">Electronics</option>
    </Form.Select>
              <Form.Label className="mb-3">Discount Amount</Form.Label>
              <Form.Control className="mb-3" name="amount" placeholder="Discount Amount" onChange={handleChange} value={discount.amount}/>
              <Button style={{backgroundColor:"#80BCBD"}} variant="light" className="mb-3" onClick={handleClick}>Add Discount</Button>
            </Form>
          )}
          {discount.campaigns === "PercentDis" && (
            <Form className="mb-4">
              <Form.Label className="mb-3">Percentage</Form.Label>
              <Form.Control className="mb-3" name="amount" placeholder="Discount Percentage" onChange={handleChange} value={discount.amount}/>
              <Button style={{backgroundColor:"#80BCBD"}} variant="light" className="mb-3" onClick={handleClick}>Add Discount</Button>
            </Form>
          )}
          {discount.campaigns === "DisbyPoint" && (
            <Form className="mb-4">
              <Form.Label className="mb-3">Customer Points</Form.Label>
              <Form.Control
                name="amount"
                placeholder="Discount from Customer Points"
                onChange={handleChange}
                value={discount.amount}
                className="mb-3"
              />
              <Button style={{backgroundColor:"#80BCBD"}} variant="light" className="mb-3" onClick={handleClick}>Add Discount</Button>
            </Form>
          )}
          {discount.campaigns === "Special" && (
            <Form className="mb-4">
              <Form.Label className="mb-3">Spectial Discount</Form.Label>
              <Form.Control className="mb-3" name="amount" placeholder="Every X THB" onChange={handleChange} value={discount.amount}/>
              <Form.Control className="mb-3" name="secondAmount" placeholder="Discount Y THB" onChange={handleChange} value={discount.secondAmount}/>
              <Button style={{backgroundColor:"#80BCBD"}} variant="light" className="mb-3" onClick={handleClick}>Add Discount</Button>
            </Form>
          )}</Row>
          
          </Container>);
}

export default AddDiscount;