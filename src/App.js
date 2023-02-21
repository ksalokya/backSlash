import React, { Component } from "react";
import './App.css'
import firebase from "firebase";
import EditorComponent from "./components/editor/editor";
import SidebarComponent from "./components/sidebar/sidebar";
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClimbingBoxLoader } from 'react-spinners'
import styles from './styles';
import { withStyles } from "@material-ui/core";
import AppBar from "./components/appbar/appbar"

class App extends Component {

    constructor() {
        super();
        this.state = {
            selectedNoteIndex: null,
            selectedNote: null,
            notes: null,
            user: "",
            loading: true
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.loading ?
                    <div className={classes.loaderBackground}>
                        <h3 className={classes.loader1}> &lt;\&gt; backSlash &nbsp;</h3>
                        <ClimbingBoxLoader
                            color={"#fff"}
                            speedMultiplier="1.2"
                            size={30}
                            loading={this.state.loading}
                        />
                        <p className={classes.loader2}>Gather your thoughts and make them even better!</p>
                    </div>
                    :
                    <div className="app-container">
                        <AppBar user={firebase.auth().currentUser} />
                        {/*<NavbarComponent user={this.state.user}/>*/}
                        <Row className="row-container">
                            <Col xs={12} md={4} lg={3} className="side-item">
                                <SidebarComponent
                                    selectedNoteIndex={this.state.selectedNoteIndex}
                                    notes={this.state.notes}
                                    deleteNote={this.deleteNote}
                                    selectNote={this.selectNote}
                                    newNote={this.newNote}
                                    user={this.state.user}
                                />
                            </Col>
                            <Col xs={12} md={8} lg={9}>
                                {this.state.selectedNote ? (
                                    <EditorComponent
                                        selectedNote={this.state.selectedNote}
                                        selectedNoteIndex={this.state.selectedNoteIndex}
                                        notes={this.state.notes}
                                        noteUpdate={this.noteUpdate}
                                    />
                                ) : null}
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
                this.props.history.push("/signin");
            } else {
                firebase
                    .firestore()
                    .collection('notes')
                    .where("user", "==", firebase.auth().currentUser.email)
                    .onSnapshot(async serverUpdate => {
                        const notes = serverUpdate.docs.map(_doc => {
                            const data = _doc.data();
                            data['id'] = _doc.id;
                            return data;
                        });
                        await this.setState({
                            notes: notes,
                            user: firebase.auth().currentUser.email,
                            loading: false
                        }, () => {
                            if (!this.state.selectedNoteIndex) {
                                this.setState({
                                    selectedNoteIndex: 0,
                                    selectedNote: this.state.notes[0]
                                })
                            }
                        });
                    });
            }
        });
    };

    selectNote = (note, index) => {
        this.setState({
            selectedNoteIndex: index,
            selectedNote: note
        })
    }

    noteUpdate = (id, noteObject) => {
        firebase
            .firestore()
            .collection('notes')
            .doc(id)
            .update({
                title: noteObject.title,
                body: noteObject.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: firebase.auth().currentUser.email
            });
    }

    newNote = async (title) => {
        const newFromDB = await firebase
            .firestore()
            .collection('notes')
            .add({
                title: title,
                body: '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: firebase.auth().currentUser.email
            });
        const newID = newFromDB.id;
        await this.setState({
            notes: [...this.state.notes]
        });
        const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
        this.setState({
            selectedNote: this.state.notes[newNoteIndex],
            selectedNoteIndex: newNoteIndex
        });
    }

    deleteNote = async (note) => {
        const noteIndex = this.state.notes.indexOf(note);
        await this.setState({ notes: this.state.notes.filter(_note => _note !== note) })
        if (this.state.selectedNoteIndex === noteIndex) {
            this.setState({
                selectedNoteIndex: null,
                selectedNote: null
            })
        } else {
            this.state.notes.length > 1 ?
                this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
                this.setState({
                    selectedNoteIndex: null,
                    selectedNote: null
                })
        }

        firebase
            .firestore()
            .collection('notes')
            .doc(note.id)
            .delete();
    }

    signOut = () => {
        firebase.auth().signOut();
    };
}

export default withStyles(styles)(App);