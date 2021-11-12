import React, {Component} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import debounce from '../helper/helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Typography from "@material-ui/core/Typography";

import katex from "katex";
import "katex/dist/katex.min.css";
window.katex = katex;

class EditorComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text:'',
            title:'',
            id:'',
            update:''
        }
    }

    componentDidMount = () => {
        this.setState({
            text:this.props.selectedNote.body,
            title:this.props.selectedNote.title,
            id:this.props.selectedNote.id,
            update: this.props.selectedNote.timestamp
                ? this.props.selectedNote.timestamp.toDate()
                : new Date().toDateString()
        });
    }

    componentDidUpdate = () => {
        if(this.props.selectedNote.id !== this.state.id){
            this.setState({
                text:this.props.selectedNote.body,
                title:this.props.selectedNote.title,
                id:this.props.selectedNote.id,
                update: this.props.selectedNote.timestamp
                    ? this.props.selectedNote.timestamp.toDate()
                    : new Date().toDateString()
            });
        }
    };

    render(){

        const { classes } = this.props;

        return (
            <div className={classes.editorContainer}>
                <div className={classes.editorNavbar}>
                    <div className={classes.inputContainer}>
                        <BorderColorIcon className={classes.borderIcon}/>
                        <input
                            className={classes.titleInput}
                            placeholder="Note title..."
                            value={this.state.title ? this.state.title : ""}
                            onChange={e => this.updateTitle(e.target.value)}
                        />
                    </div>
                    <Typography
                        value={this.state.update}
                        className={classes.upDate}
                        variant="body2"
                        onChange={e => this.updateDate(e.target.value)}
                    >
                        Last update: {this.state.update.toString()}
                    </Typography>
                </div>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.updateBody}
                    placeholder={"Start writing from here..."}
                    modules={EditorComponent.modules}
                    formats={EditorComponent.formats}
                />
            </div>
        );
    }


    updateBody = async (val) =>{
        await this.setState({text:val});
        this.update();
    };

    updateDate = async val => {
        await this.setState({ update: val });
        this.update();
    };

    updateTitle = async (txt) => {
        await this.setState({
            title:txt
        });
        this.update();
    }

    update = debounce(() =>{
        this.props.noteUpdate(this.state.id,{
            title:this.state.title,
            body:this.state.text,
            update: this.state.update
        })
    },1500);
}

let Font = Quill.import('formats/font');
Font.whitelist = ['sansserif','serif','monospace','times-new-roman', 'arial'];
Quill.register(Font, true);

EditorComponent.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { size: [] }],
        [{ font: ['sansserif','serif','monospace','times-new-roman', 'arial'] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [
            { list: "ordered" },
            { list: "bullet" },
        ],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [
            { indent: "-1" },
            { 'align': [] },
            { indent: "+1" }
        ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'direction': 'rtl' }],
        ["link", "image", "video","formula"],
        ['clean']
    ],
    clipboard: {
        matchVisual: false
    }
};

export default withStyles(styles)(EditorComponent);