import React, {useState} from "react";
import Container from "react-bootstrap/esm/Container";
import Toast from 'react-bootstrap/Toast';

function ShowCart(props){
    function handleClose(){
        props.onDelete(props);
    }
    return(
        <Toast onClose={handleClose} className="m-3"><Toast.Header><strong className="me-auto ">{props.itemName}</strong><small>{props.itemCategory}</small></Toast.Header><Toast.Body>{props.itemPrice}</Toast.Body></Toast>)

}

export default ShowCart;