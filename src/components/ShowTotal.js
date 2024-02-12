import React from "react";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/esm/Row";

function ShowTotal(props) {
    return (
        <Card className="text-center mb-5" style={{backgroundColor:"#F9F7C9"}}>
        <Card.Body>
        <Card.Text style={{fontSize : "25px"}}>
            <ul>
            <li>Price : {props.total}</li>
            <li>Discount : {props.total-props.remain} </li>
                 <li>Total : {props.remain}</li></ul>
                 
        </Card.Text>
        </Card.Body>
        </Card>
    );
  }
  
  export default ShowTotal;