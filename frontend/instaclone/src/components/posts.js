import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';
import {Badge,Button,Row,Col,Card,Container} from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import axios,{BASE_URL} from '../api/axios';
import { Link } from 'react-router-dom';
import Postcard from './postCard';

export default function Counter(props) {

  const { auth } = useAuth();

  
   const [posts,setPosts]=useState([])
   const [issueid,setIssueid]=useState('')
   const [nulla,setNulla]=useState(false)
   const [counter,setCounter]=useState(true)
  
  

   const { setAuth } = useAuth();
  const Token=auth?.accessToken
   console.log(auth?.user)

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization :`Bearer ${Token}`
    }
  })

  
    const viewPostHandler = async(id,queue_num,name) => {
      try {
        const res = await authAxios.put(`api/cuser/issuecalle/${id}`);
       console.log(res)
       const res1 = await authAxios.put(`api/cuser/nextissuecalled/${queue_num}`);
       
       } 
       catch (error) {
              console.log(error);         
       }
    };
    
  

    


  useEffect(() => {

    const fetchPosts = async () => {
       try {
        
        const response = await authAxios.post('/api/posts/allposts');
        if(!response.data.length===0)
        {setPosts(response.data)}
        else{
          setNulla(true)
        }
       
          
       
       console.log(response.data)
        
        
       
       } catch (error) {
              console.log(error);         
       }
    }  
     
  



    fetchPosts();
  },[])


  const closecounter = async () => {
    try {
     
    } 
   catch (error) {
          console.log(error);         
   }
  }

  
  const logout = async () => {
    try {
      localStorage.clear();
      setAuth();
    } 
   catch (error) {
          console.log(error);         
   }
  }
  
  const renderpostlist = posts.map((post) =>(
    <Postcard
    issue={post}
    key={post.id}
    clickHander={viewPostHandler}
    />
  )) 
  
  return (
    <div>
        <Container> 
  <Row>
     <Col> 
   
    </Col>
    <Col>
   
    <Card.Body id="profilename"  border="primary" style={{ width: '13rem' }}>
    <Badge pill bg="primary"><h6>x</h6></Badge>
    <Button id='logoutbtn' variant="outline-danger"
      onClick={() => logout()}
    >Logout</Button>
    </Card.Body>
   {/*  <Button id='closebtn' variant="danger"
      onClick={() => closecounter()}
    >Close Counter</Button> */}
    </Col>
  </Row>
    <Row>
    <Col md={{ span: 6, offset: 3 }}>
    
    <div className='issues'>
    <>
            {nulla ? (
                <section>
                    <h3>No Posts to display</h3>
                   
                </section>
            ) : (  
              <section>
              {renderpostlist}
               </section> )}
    </>
         </div>
     
       
        
        
   
    </Col>
   

    </Row>
    
    
    
     
    </Container>
    </div>
    
    
  )
}
