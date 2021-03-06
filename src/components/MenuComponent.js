import React from 'react';
import {Card , CardImg,CardImgOverlay,CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';

function RenderMenuItem({dish}){
    return(
                    // <Card onClick={()=>onClick(dish.id) }>
                    <Card>
                        <Link to={`/menu/${dish.id}`}>
                            <CardImg object width="100%" src={dish.image} alt={dish.name} />
                            
                            <CardImgOverlay>
                                <CardTitle heading>{dish.name}</CardTitle>
                                
                            </CardImgOverlay>
                        </Link>
                    </Card>
    )
}
const Menu=(props) => {
        const menu=props.dishes.dishes.map(dish=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                   {/* <RenderMenuItem dish={dish} onClick={props.onClick}/> */}
                   <RenderMenuItem dish={dish}/>
                </div>

                );
            });
            if(props.dishes.isLoading){
                return(
                    <div className="container">
                       <div className="row">
                           <Loading/>
                       </div>
                    </div>
                )
            }
            else if(props.dishes.errMess){
                return(
                    <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                    </div>
                )
               
            }
            else return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                
            </div>
        );
}

    
export default Menu;






// import React, { Component } from 'react';
// import {Card , CardImg,CardImgOverlay,CardTitle} from "reactstrap";

// class Menu extends Component {

    

   
  


//     render() {
//         const menu=this.props.dishes.map((dish)=>{
//             return(
//                 <div key={dish.id} className="col-12 col-md-5 m-1">
//                     <Card onClick={()=>this.props.onClick(dish) }>
                        
//                         <CardImg object width="100%" src={dish.image} alt={dish.name} />
                        
//                         <CardImgOverlay>
//                             <CardTitle heading>{dish.name}</CardTitle>
                            
//                         </CardImgOverlay>
//                     </Card>
//                 </div>

//             );
//         });
//         return (
//             <div className="container">
//                 <div className="row">
//                     {menu}
//                 </div>
               
//             </div>
//         );
//     }
// }

// export default Menu; 
