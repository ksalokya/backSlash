import React, {Component} from "react";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import LogoutIcon from '@mui/icons-material/Logout';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {Navbar, Nav, Button, Dropdown, ButtonGroup, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "firebase";
import MediaQuery from 'react-responsive'
import logo from "../images/brand.png"
import '../../App.css'

class NavbarComponent extends Component{

    constructor() {
        super();
        this.state = {
            show:false
        }
    }

    handleClose = () => {
        this.setState({
            show:false
        })
    }

    handleShow = () => {
        this.setState({
            show:true
        })
    }

    render(){
        const {user,classes} = this.props;

        return(
            <div className={classes.navContainer}>
                <Navbar>
                    <Navbar.Brand className={classes.heading}>
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="35"
                            className="d-inline-block align-top"
                        />{' '}
                        backSlash
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Item>
                                <Dropdown as={ButtonGroup} size="sm">
                                    <Button style={{backgroundColor:'#29487d'}} >
                                        <MediaQuery minWidth={720}><Chip icon={<FaceIcon />} label={user}/></MediaQuery>
                                        <MediaQuery maxWidth={720}><LogoutIcon onClick={() => {
                                            this.handleShow();
                                        }}/></MediaQuery>

                                        <Modal centered show={this.state.show} onHide={this.handleClose}>
                                            <Modal.Body className={classes.bodyText}>
                                                Are you sure you want to Sign Out?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="warning" onClick={this.handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="danger" onClick={() => this.signOut()}>
                                                    Sign Out
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                    </Button>

                                        <MediaQuery minWidth={720}>
                                            <Dropdown.Toggle split id="dropdown-split-basic" />
                                            <Dropdown.Menu style={{right:'0px'}}>
                                                <Button className={classes.btn} variant="danger" size="sm" onClick={this.signOut}>Sign Out</Button>{' '}
                                            </Dropdown.Menu>
                                        </MediaQuery>
                                </Dropdown>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </div>
        )
    }

    signOut = () => {
        firebase.auth().signOut();
    };
}
export default withStyles(styles)(NavbarComponent);