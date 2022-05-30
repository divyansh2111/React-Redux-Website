import React, { Component } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom'; 
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Header from './Header';
import Footer from './Footer';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  DishWithId = (params) => {
    let { dishID } = useParams();
    // console.log(this.state.comments.filter((comment) => comment.dishId === parseInt(dishID,10))[0]);
    return (
      <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(dishID,10))[0]}
      comments={this.state.comments.filter((comment) => comment.dishId === parseInt(dishID,10))}
      />
    );
  }

  render(){
      return (
      <div>
        <Header />
        {/* <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)}/> */}
        {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
        <Routes>
          <Route path='/home' element={<Home 
            dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />}/>
          <Route exact path='/menu' element={<Menu dishes={this.state.dishes}/>}/>
          <Route path='/menu/:dishID' element={<this.DishWithId />} />
          <Route exact path='/contactus' element={<Contact />}/>
          <Route exact path='/aboutus' element={<About leaders={this.state.leaders}/>}/>
          <Route path="*" element={<Navigate to ="/home" />}/>
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
