import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'; 

    function RenderDish({dish}){
        if(dish){
            return(
                <Card>
                    {console.log(dish)}
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(<div></div>);
            
        }
    }

    function RenderComments({dish}){

        if(dish){
            var comments = dish.comments;
            const __comment = comments.map((_comment)=> {
                return (
                    
                        <div key={_comment.id}>
                            <p>{_comment.comment}</p>
                            <p>-- {_comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(_comment.date)))}</p>
                        </div>
                    
                );
            });
            return (
                <div>{__comment}</div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {

        
            return (
                <div className='container'>
                    <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderDish dish={props.dish}/>
                    </div>
                    {props.dish ? (
                        <div className='col-12 col-md-5 m-1'>
                            <h4>Comments</h4>
                            <RenderComments dish={props.dish}/>
                        </div>
                    ) : (<div></div>)}
                        
                    </div>
                </div>
            );
    }



export default DishDetail;