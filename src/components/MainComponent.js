import React, { Component } from 'react';

import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutUsComponent';
 
// import {DISHES} from "../shared/dishes";
// import {LEADERS} from "../shared/leaders";
// import {COMMENTS} from "../shared/comments";
// import {PROMOTIONS} from "../shared/promotions";


import {Switch ,Route,Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment,fetchDishes} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps =state=>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions: state.promotions,
    leaders:state.leaders
  }
}

// const mapDispatchToProps = dispatch =>({
//   addComment:(dishId, rating,author, comment)=>dispatch(addComment(dishId,rating,author,comment))
// })
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: ()=>{dispatch(fetchDishes())},
  resetFeedbackForm: () =>{dispatch(actions.reset('feedback'))}
});


class Main extends Component {

  constructor(props) {
    
    super(props);
    
  }

  componentDidMount(){
    this.props.fetchDishes();
  }
 
 

  render() {
    const HomePage=()=>{
      return(
        
        <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }


    const DishWithId=({match})=>{
        return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id=== parseInt(match.params.dishId,10))[0]}
                      isLoading={this.props.dishes.isLoading}
                      ErrMess={this.props.dishes.errMess}
                      comments={this.props.comments.filter((comment)=> comment.dishId ===parseInt(match.params.dishId,10))}
                      addComment={this.props.addComment}
          />
        )
    }


    return (
      <div>
        <Header/>
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dishdetails={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Switch>
          <Route path="/Home" component={HomePage}/>
          <Route exact path="/Menu" component={()=> <Menu dishes={this.props.dishes}/>}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/ContactUs" component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Route path="/Aboutus" component={()=><About leaders={this.props.leaders}/>}/>
          <Redirect to="/Home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));



// class Main extends Component {

//   constructor(props){
//     super(props);
//     this.state={
//       dishes:DISHES,
//       selectedDish: null
//     };
//   }

//   onDishSelect(dishId){
//     this.setState({selectedDish: dishId});
//   }

//   render() {
//     return(
//       <div >
//         <Navbar dark color="primary">
//           <div className="container">
//             <NavbarBrand href="/">Ristorante Con FUsion</NavbarBrand>
//           </div>
//         </Navbar>
//         <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>

//         <DishDetail dishdetails={this.state.dishes.filter((dish) => (dish === this.state.selectedDish))}/>
//       </div>
//     );
//   }
// }

// export default Main;
