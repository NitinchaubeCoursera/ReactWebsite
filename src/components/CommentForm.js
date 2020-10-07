import React, { Component } from 'react';
import {Button, Label,Row, Col,Modal, ModalHeader, ModalBody} from 'reactstrap';

import {Control, LocalForm, Errors} from 'react-redux-form';
import { addComment } from '../redux/ActionCreators';





const required =(val)=>val && val.length;
const maxLength=(len)=> (val)=> !(val)||(val.length <= len);
const minLength=(len)=>(val)=>(val) && (val.length>=len);

 class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal()
    {
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    handleSubmit(values){
        // console.log("Current State is:" +JSON.stringify(this.state));
        // alert("Current State is:" +JSON.stringify(values));
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.Comment);
        
    }




    render() {
        return (
            <React.Fragment>
                <div>
                    <button onClick={this.toggleModal}><span className="fa fa-pencil"></span>Submit Comment</button>
                </div>



                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row >
                                <Col>
                                    <Label htmlFor="Rating">Ratings</Label>
                                    <Control.select model=".Rating" className="form-control" name="Rating"
                                                >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                    </Control.select>
                                </Col>
                                   
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" placeholder="Your Name" className="form-control" id="author" name="author" validators={{required, minLength:minLength(3), maxLength:maxLength(16)}} />
                                    <Errors className="text-danger" model=".author" show="touched" messages={{ required:'required',minLength:'Must be Greater than 2 characters.',maxLength:'Must be 15 characters or less.'}}/>

                                </Col>
                                
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="Comment">Comment</Label>
                                    <Control.textarea model=".Comment" id="Comment" className="form-control" name="Comment" rows="12"/>
                                </Col>
                                
                            </Row>
                            
                            <Button type="submit" value="submit" className="bg-primary" >Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
            

        )
    }
}

export default CommentForm;
