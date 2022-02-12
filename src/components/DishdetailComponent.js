import React , {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button ,
    Label, Modal, ModalHeader, ModalBody, Row,Col} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';    
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


const maxLength= (len) => (val) => !(val) ||  (val.length <= len);
const minLenght= (len) => (val) => (val) && (val.length>=len);


function RenderDish({dish}){
    return (
           <div>
               <Card >
                   <CardImg  src={dish.image} alt={dish.name} />
                   <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                   </CardBody>
               </Card>
           </div>
    );
}

function RenderComments({comments, addComment, dishId}){
    if (comments!=null){
        const commentListItems=this.props.comments.map((comment=>{
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
            );
        }));
        return( 
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentListItems}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
        ) } else{
            return (<div></div>
                );
        }  
    }               

    class CommentForm extends Component {

        constructor(props){
            super(props);

            this.toggleModal=this.toggleModal.bind(this);
            this.handleSubmit=this.handleComment.bind(this);
            
            this.state={
                Modal:false
            }
        }
    
        toggleModal(){
            this.setState({
                Modal: !this.state.Modal
              });
            }
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
        }
            render(){
                return(
                   <div>
                    <Button  onClick={this.toggleModal}  color="light" className="border-dark">
                        <span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                    <Modal isOpen={this.state.Modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>       
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={10}>
                                        <Control.select model=".rating" name="rating"
                                                className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="yourname" md={2}>Your Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".yourname" id="yourname" name="yourname"
                                           
                                            className="form-control"
                                            validators={{
                                            minLenght: minLenght(3), maxLength:maxLength(15)
                                            }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required:'Required',
                                            minLenght:'Must be greater than 2 numbers',
                                            maxLength:"Must be 15 numbers or less" 
                                        }}
                                        /> 
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="message" md={2}>Comment</Label>
                                        <Col md={10}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="6"
                                            className="form-control" />
                                        </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10, offset: 2}}>
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


    const DishDetail=(props)=>{
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        if(props.dish!=null){ 
                return(
                    <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>                
                    </div>
                    <div className="row ">
                        <div className="col-12 col-md-5 m-1">
                           < RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                           < RenderComments comments={props.comments}
                           addComment={props.addComment}
                           dishId={props.dish.id} />
                        </div>
                    </div>
                </div>
                ) ;
         }else{
            return (<div></div>
                );
        }
    };

    

export default DishDetail;


