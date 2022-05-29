import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Menu from './MenuComponent';
// import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './Header';
import Footer from './Footer';
import Home from './HomeComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render(){
      return (
      <div>
        <Header />
        {/* <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)}/> */}
        {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
        <Routes>
          <Route path='/home' element={<Home />}/>
          <Route exact path='/menu' element={<Menu dishes={this.state.dishes}/>}/>
          <Route path="*" element={<Navigate to ="/home" />}/>
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
