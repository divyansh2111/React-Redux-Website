import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap'; 
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Stagger, Fade } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props){
        super(props);
    
        this.state = {
          isModalOpen: false
        };
      
          this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        // console.log("YO\n", values);
        this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment);
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> 
                    {' '}Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                            <Label htmlFor="rating" sm={12}>Rating</Label>
                                <Col sm={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="yourname" sm={12}>Your Name</Label>
                                <Col sm={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className='form-control'
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="comment" sm={12}>Comment</Label>
                                <Col sm={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col sm={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


    function RenderDish({dish}){
        if(dish){
            return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        {/* {console.log(dish)} */}
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }
        else{
            return(<div></div>);
            
        }
    }

    function RenderComments({comments}){
        // console.log(comments);
        if(comments){
            // var comments = dish.comments;
            const __comment = comments.map((_comment)=> {
                return (
                        <Fade in>
                            <div key={_comment.id}>
                                <p>{_comment.comment}</p>
                                <p>-- {_comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(_comment.date)))}</p>
                            </div>
                        </Fade>
                );
            });
            return (
                <div><Stagger in>{__comment}</Stagger></div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
            if(props.isLoading){
                return(
                    <div className='container'>
                        <div className='row'>
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if(props.errMess){
                return(
                    <div className='container'>
                        <div className='row'>
                            <h4>{props.errMess}</h4> 
                        </div>
                    </div>
                );
            }
            else if(props.dish)
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
                                    <CommentForm postComment={props.postComment}
                                        dishId={props.dish.id}/>
                                </div>
                        ) : (<div></div>)}
                            
                        </div>
                    </div>
                );
            else{
                return ( <div></div> );
            }
            
    }



export default DishDetail;