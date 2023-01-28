import React from "react";
import {Badge,Button,Row,Col,Card,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Postcard = (props) => {

    const { id, likes, topic } = props.post;
    return (
     <Card id="id"  border="primary" style={{ width: '40rem' }}
     key={id}>
    
    <Card.Title>
        <Badge pill bg="primary">
        {likes}
        </Badge>
    </Card.Title>
  <Card.Body>
     <h6 id='issuename'>{topic}</h6>
   
 -
      <Button id='viewbtn'  variant="outline-primary"
      onClick={() => props.clickHander(id,likes,topic)}
      >Like</Button>
-
   
    
  </Card.Body>
     </Card>
    );
  };
  
  export default Postcard;
  