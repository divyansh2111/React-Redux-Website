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
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
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
    // console.log(this.state.comments.filter((comment) => comment.dishId === parseInt(dishID,10))[0]);
    return (
      <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(dishID,10))}
          addComment={this.props.addComment}
      />
    );
  }

  componentDidMount(){
    this.props.fetchDishes();
  }

  render(){
      return (
      <div>
        <Header />
        {/* <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)}/> */}
        {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
        <Routes>
          <Route path='/home' element={<Home 
            dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />}/>
          <Route exact path='/menu' element={<Menu dishes={this.props.dishes}/>}/>
          <Route path='/menu/:dishID' element={<this.DishWithId />} />
          <Route exact path='/contactus' element={<Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Route exact path='/aboutus' element={<About leaders={this.props.leaders}/>}/>
          <Route path="*" element={<Navigate to ="/home" />}/>
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
