import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'; 
// import DishDetail from './DishDetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    // renderDish(dish){
    //     if(dish){
    //         return (
    //             <DishDetail dish = {dish}/>
    //         );
    //     }
    //     else
    //         return (
    //             <div></div>
    //         );
            
    // }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div className="col-12 col-md-5 m-1">
                <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
                  {menu}
            </div>
            {/* {this.renderDish(this.state.selectedDish)} */}
          </div>
        );
    }
}

export default Menu;