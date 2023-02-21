import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import {Divider, Button} from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@mui/material/Alert";


class SidebarComponent extends Component {
    constructor() {
        super();
        this.inputRef = React.createRef();
        this.state = {
            addingNote: false,
            title: null,
            openSnackbar: false
        };
    }

    componentDidMount() {
        AOS.init({
            duration: 500,
            once: true
        });
    }

    render() {
        const {notes, classes, selectedNoteIndex} = this.props

        if (notes) {
            return (
                <div className={classes.sidebarContainer}>
                    <Button
                        data-aos="zoom-in" data-aos-delay="800" data-aos-duration="800"
                        onClick={this.newNoteBtnClick}
                        className={classes.newNoteBtn}>{!this.state.addingNote ? "New Document" : "Cancel"}</Button>
                    {
                        this.state.addingNote ?
                            <div>
                                <input
                                    type="text"
                                    className={classes.newNoteInput}
                                    placeholder="Enter Document Title"
                                    onKeyUp={(e) => this.updateTitle(e.target.value)}
                                    ref={this.inputRef}
                                />
                                <Button
                                    className={classes.newNoteSubmitBtn}
                                    onClick={this.newNote}
                                >Submit</Button>
                            </div> : null
                    }
                    <List data-aos="zoom-in" data-aos-delay="1000" data-aos-duration="1000"
                    >
                        {
                            notes.map((_note, _index) => {
                                return (
                                    <div key={_index}>
                                        <SidebarItemComponent
                                            _note={_note}
                                            _index={_index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote}
                                            handleSnackbarOpen={this.handleSnackbarOpen}
                                        />
                                        <Divider/>
                                    </div>
                                )
                            })
                        }
                    </List>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openSnackbar}
                        autoHideDuration={3000}
                        onClose={this.handleSnackbarClose}
                    >
                        <Alert severity="success">
                            Successfully Deleted.
                        </Alert>
                    </Snackbar>
                </div>
            );
        } else {
            return (
                <div/>
            )
        }
    }

    handleSnackbarOpen = (flag) => {
        this.setState({
            openSnackbar: flag
        })
    };

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            openSnackbar: false
        })
    };

    newNoteBtnClick = () => {
        this.setState({
            title: null,
            addingNote: !this.state.addingNote
        }, () => {
            if(this.state.addingNote){
                this.inputRef.current.focus();
            }
        })
    }

    updateTitle = (txt) => {
        this.setState({
            title: txt
        })
    }

    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({
            title: null,
            addingNote: false
        })
    }

    selectNote = (n, i) => {
        this.props.selectNote(n, i);
    }

    deleteNote = (note) => {
        this.props.deleteNote(note);
    }
}

export default withStyles(styles)(SidebarComponent)