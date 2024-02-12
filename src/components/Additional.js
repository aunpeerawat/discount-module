import React from "react";
import Accordion from 'react-bootstrap/Accordion';

function Additional(){

    return (<Accordion style={{backgroundColor:"#80BCBD"}} defaultActiveKey="0">
        <Accordion.Header >Additional Rules</Accordion.Header>
        <Accordion.Body>
        <ul className="m-3">
            <li className="m-3"><ul><li className="campaign">Campaign : Fixed amount</li><li>Category : Coupon </li><li>Discount Rule : Discounts the entire cart
by subtracting an amount
from the total price</li></ul></li>
            <li className="m-3"><ul><li className="campaign">Campaign : Percentage discount</li> <li>Category : Coupon</li><li>Discount Rule : Discounts the entire cart
by subtracting a
percentage from the total
price</li></ul></li>
            <li className="m-3"><ul><li className="campaign">Campaign : Percentage discount by item category</li> <li>Category : On Top</li><li> Discount Rule : Discount the entire
amount of a specific
category of items in cart</li></ul></li>
            <li className="m-3"><ul><li className="campaign">Campaign : Discount by points </li><li>Category : On Top</li><li>Discount Rule : Users spent points for a
fixed amount of discount
(1 point = 1 THB). The
amount will be capped at
20% of total price</li></ul></li>
            <li className="m-3"><ul><li className="campaign">Campaign : Special campaigns</li><li>Category : Seasonal</li><li>Discount Rule : From the total price, at
every X THB, subtracting a
fixed amount Y THB</li></ul></li>
        </ul>
        <b>Users can apply multiple discount campaigns in an order. However, there are rules for applying as below:</b>
        <ul >
<li >1. Apply only one campaign from the same category, i.e. users have to choose either Fixed amount or
Percentage discount.</li>
<li >2. The order of applying campaigns is Coupon before On Top before Seasonal.</li></ul>
        </Accordion.Body>
    </Accordion>);

}

export default Additional;