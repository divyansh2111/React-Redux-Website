import React, { Component } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom'; 
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './Header';
import Footer from './Footer';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
})


function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

class Main extends Component {

  constructor(props) {
    super(props);

  }

  DishWithId = (params) => {
    let { dishID } = useParams();
    // console.log("fff", this.props.dishes.dishes.filter((dish) => dish.id === parseInt(dishID,10))[0]);
    return (
      // <></>
      <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(dishID,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(dishID,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
      />
    );
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render(){
      
      return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={() => useLocation().key} classNames="page" timeout={300} onEnter={() => {
                        console.log('FIRED!', useLocation().key);
                    }} >
            <Routes >
              
              <Route path='/home' element={<Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
              />}/>
              <Route exact path='/menu' element={<Menu dishes={this.props.dishes}/>}/>
              <Route path='/menu/:dishID' element={<this.DishWithId />} />
              <Route exact path='/contactus' element={<Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
              <Route exact path='/aboutus' element={<About leaders={this.props.leaders}/>}/>
              <Route path="*" element={<Navigate to ="/home" />}/>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
