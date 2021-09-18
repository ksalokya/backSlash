import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helper/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button} from "react-bootstrap"

class SidebarItemComponent extends Component{

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

    handleClose = () => this.setState({show:false})
    handleShow = () => this.setState({show:true})

    render(){

        const {_note,_index,selectedNoteIndex,classes} = this.props;

        return(
            <div key={_index}>
                <ListItem
                    className={classes.listItem}
                    selected={selectedNoteIndex === _index}
                    alignItems='flex-start'>
                    <div
                        className={classes.textSection}
                        onClick={()=>this.selectNote(_note,_index)}>
                        <ListItemText
                            primary={_note.title}
                            secondary={removeHTMLTags(_note.body.substring(0,30)) + '...'}
                        ></ListItemText>
                    </div>
                    <DeleteIcon onClick={() => {
                        //this.deleteNote(_note);
                        this.handleShow();
                    }} className={classes.deleteIcon}></DeleteIcon>
                </ListItem>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className={classes.title}>WARNING</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={classes.bodyText}>
                        Are you sure you want to delete : <strong>{_note.title} </strong> ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => this.deleteNote(_note)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    selectNote = (n,i) =>{
        this.props.selectNote(n,i);
    }

    deleteNote = (note) => {
        this.handleClose();
        this.props.deleteNote(note);
    }
}
export default withStyles(styles)(SidebarItemComponent)