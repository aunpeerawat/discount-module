import React, {useState} from "react";
import Container from "react-bootstrap/esm/Container";
import Toast from 'react-bootstrap/Toast';

function ShowDiscount(props){
    function handleClose(){
        props.onDelete(props.id)
    }
    return(<Container >

        <Toast onClose={handleClose}><Toast.Header><strong className="me-auto">{props.campaign}</strong><small>{props.type}</small></Toast.Header>
        {(props.campaign==="Fixed")&&(<Toast.Body>Discount {props.amount} baht</Toast.Body>)}
        {(props.campaign==="PercentDis")&&(<Toast.Body>Discount {props.amount} %</Toast.Body>)}
        {(props.campaign==="PercentbyItem")&&(<Toast.Body>Discount {props.amount} % by Item</Toast.Body>)}
        {(props.campaign==="DisbyPoint")&&(<Toast.Body>Discount from {props.amount} points</Toast.Body>)}
        {(props.campaign==="Special")&&(<Toast.Body>Discount {props.amount} baht every {props.secondAmount}</Toast.Body>)}
        </Toast>
    </Container>);
}

export default ShowDiscount;