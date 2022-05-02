import React, {Component} from "react";
import './App.css'
import firebase from "firebase";
import EditorComponent from "./components/editor/editor";
import SidebarComponent from "./components/sidebar/sidebar";
import NavbarComponent from "./components/navbar/navbar"
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ClimbingBoxLoader} from 'react-spinners'
import styles from './styles';
import {withStyles} from "@material-ui/core";

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

        const {classes} = this.props;

        return (
            <div>
                {this.state.loading ?
                    <div className={classes.loaderBackground}>
                        <h3 className={classes.loader1}> &lt; backSlash &gt;</h3>
                        <ClimbingBoxLoader
                            color={"#fff"}
                            speedMultiplier="1.2"
                            size={30}
                            loading={this.state.loading}
                        />
                        <p className={classes.loader2}>An online Text Editor + Notes App.</p>
                        <p className={classes.loader2}>Designed and Developed with ❤️by <a style={{color: 'blue'}}
                                                                                           href="https://www.linkedin.com/in/salokya-kumar/">Salokya
                            Kumar.</a></p>
                    </div>
                    :
                    <div className="app-container">
                        <NavbarComponent user={this.state.user}/>
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
                this.props.history.push("/login");
            } else {
                firebase
                    .firestore()
                    .collection('notes')
                    .where("user", "==", firebase.auth().currentUser.email)
                    //automatically get called when collection is updated
                    .onSnapshot(async serverUpdate => {
                        const notes = serverUpdate.docs.map(_doc => {
                            //grabs data from doc
                            const data = _doc.data();
                            data['id'] = _doc.id;
                            return data;
                        });
                        await this.setState({
                            notes: notes,
                            user: firebase.auth().currentUser.email,
                            loading: false
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
        const note = {
            title: title,
            body: ''
        };
        const newFromDB = await firebase
            .firestore()
            .collection('notes')
            .add({
                title: note.title,
                body: note.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: firebase.auth().currentUser.email
            });
        const newID = newFromDB.id;
        await this.setState({
            notes: [...this.state.notes, note]
        })
        const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
        this.setState({
            selectedNote: this.state.notes[newNoteIndex],
            selectedNoteIndex: newNoteIndex
        })
    }

    deleteNote = async (note) => {
        const noteIndex = this.state.notes.indexOf(note);
        await this.setState({notes: this.state.notes.filter(_note => _note !== note)})
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