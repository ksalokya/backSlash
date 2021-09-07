import React, {Component} from "react";
import firebase from "firebase";

class App extends Component{

    render(){

        const {classes} = this.props;

        return(
            <div>
                    <div className="app-container">
                        <NavbarComponent user={this.state.user}/>
                        <Row className="row-container">
                            <Col xs={12} md={4} lg={3} className="side-item">
                                <SidebarComponent
                                />
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }



export default withStyles(styles)(App);