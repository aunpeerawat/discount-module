import React, {useState} from "react";
import Container from "react-bootstrap/esm/Container";
import Toast from 'react-bootstrap/Toast';

function ShowCart(props){
    function handleClose(){
        props.onDelete(props);
    }
    return(<Container >

        <Toast onClose={handleClose}><Toast.Header><strong className="me-auto">{props.itemName}</strong><small>{props.itemCategory}</small></Toast.Header><Toast.Body>{props.itemPrice}</Toast.Body></Toast>
    </Container>);
}

export default ShowCart;