import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Media } from 'reactstrap'; 

class DishDetail extends Component {

    constructor(props){
        super(props);
    }

    renderComments(comments){
        // console.log(comments);
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const __comment = comments.map((_comment)=> {
            // console.log(_comment.date.split('T')[0].split('-'));
            var date = _comment.date.split('T')[0].split('-');
            return (
                <div key={_comment.id}>
                    <p>{_comment.comment}</p>
                    
                    <p>-- {_comment.author}, {month[parseInt(date[1])-1]} {date[2]}, {date[0]}</p>
                </div>
            );
        });

        if(comments){
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
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>
        );
    }

}

export default DishDetail;