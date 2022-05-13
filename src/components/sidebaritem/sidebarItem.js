import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import {removeHTMLTags} from '../helper/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class SidebarItemComponent extends Component {

    constructor() {
        super();
        this.state = {
            show: false
        }
    }

    render() {

        const {_note, _index, selectedNoteIndex, classes} = this.props;

        return (
            <div key={_index}>
                <ListItem
                    className={classes.listItem}
                    selected={selectedNoteIndex === _index}
                    alignItems='flex-start'
                    onClick={() => this.selectNote(_note, _index)}
                >
                    <div className={classes.textSection}>
                        <ListItemText
                            primary={_note.title}
                            secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'}
                        />
                    </div>
                    <DeleteIcon onClick={() => {
                        this.handleShow();
                    }} className={classes.deleteIcon}></DeleteIcon>
                </ListItem>

                <Dialog
                    open={this.state.show}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete <span><u>{_note.title}</u></span>?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={() => {this.deleteNote(_note);this.handleSnackbar();}} color="secondary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    selectNote = (n, i) => {
        this.props.selectNote(n, i);
    }

    deleteNote = (note) => {
        this.handleClose();
        this.props.deleteNote(note);
    }

    handleSnackbar = () => {
        this.props.handleSnackbarOpen(true)
    };
}

export default withStyles(styles)(SidebarItemComponent)