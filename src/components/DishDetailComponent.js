import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'; 
import { Link } from 'react-router-dom';

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

    function RenderComments({comments}){
        console.log(comments);
        if(comments){
            // var comments = dish.comments;
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
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderDish dish={props.dish}/>
                    </div>
                    {props.dish ? (
                        <div className='col-12 col-md-5 m-1'>
                            <h4>Comments</h4>
                            <RenderComments comments={props.comments}/>
                        </div>
                    ) : (<div></div>)}
                        
                    </div>
                </div>
            );
    }



export default DishDetail;