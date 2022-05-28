import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'; 

class DishDetail extends Component {

    constructor(props){
        super(props);
    }

    renderDish(dish){
        if(dish){
            return(
                <Card>
                    {console.log(this.props.dish)}
                    <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(<div></div>);
            
        }
    }

    renderComments(dish){

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

    render(){
        return (
            <div className='container'>
                <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    {this.renderDish(this.props.dish)}
                </div>
                {this.props.dish ? (
                    <div className='col-12 col-md-5 m-1'>
                        <h4>Comments</h4>
                        {this.renderComments(this.props.dish)}
                    </div>
                ) : (<div></div>)}
                    
                </div>
            </div>
        );
    }

}

export default DishDetail;