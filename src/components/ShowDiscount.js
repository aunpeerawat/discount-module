import React from "react";
import Container from "react-bootstrap/esm/Container";
import Toast from 'react-bootstrap/Toast';

function ShowDiscount(props){
    function handleClose(){
        props.onDelete(props.id)
    }
    return(<Container >

        <Toast onClose={handleClose} className="m-3">
        {(props.campaign==="Fixed")&&(<div><Toast.Header><strong className="me-auto">Fixed</strong><small>Coupon</small></Toast.Header><Toast.Body>Discount {props.amount} baht</Toast.Body></div>)}
        {(props.campaign==="PercentDis")&&(<div><Toast.Header><strong className="me-auto">Percentage Discount</strong><small>Coupon</small></Toast.Header><Toast.Body>Discount {props.amount} %</Toast.Body></div>)}
        {(props.campaign==="PercentbyItem")&&(<div><Toast.Header><strong className="me-auto">Percentage Discount by Item Category</strong><small>On Top</small></Toast.Header><Toast.Body>Discount {props.amount} % by Item</Toast.Body></div>)}
        {(props.campaign==="DisbyPoint")&&(<div><Toast.Header><strong className="me-auto">Discount by Points</strong><small>On Top</small></Toast.Header><Toast.Body>Discount from {props.amount} points</Toast.Body></div>)}
        {(props.campaign==="Special")&&(<div><Toast.Header><strong className="me-auto">Special</strong><small>Seasonal</small></Toast.Header><Toast.Body>Discount {props.amount} baht every {props.secondAmount}</Toast.Body></div>)}
        </Toast>
    </Container>);
}

export default ShowDiscount;