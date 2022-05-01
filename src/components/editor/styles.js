const styles = theme => ({
    editorNavbar: {
        marginTop: '1%',
        display: "flex",
        backgroundColor: "#7719aa",
        color: "white",
        flexDirection: 'column'
    },
    borderIcon:{
        marginLeft:'1%',
        "@media only screen and (max-width:768px)":{
            display:'none'
        }
    },
    titleInput: {
        marginRight: "0",
        border: "none",
        fontSize: "20px",
        backgroundColor: "#7719aa",
        borderStyle:'solid',
        borderWidth:'2px',
        borderColor:'#fff',
        color: "white",
        marginLeft: '2%',
        paddingLeft: "10px",
        "@media only screen and (max-width:768px)":{
            width:'90%',
            marginTop:'1%',
            marginBottom:'2%',
            marginLeft:'0'
        }
    },
    editorContainer: {
        height:'70vh'
    },
    upDate: {
        flexWrap: "wrap",
        paddingRight: "10px",
        alignSelf: "flex-end",
        "@media only screen and (max-width: 768px)": {
            textAlign: "center",
            fontSize: '11px',
            marginBottom: '1%',
        }
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: "5px",
        marginLeft: "5px",
        "@media only screen and (max-width: 768px)": {
            flexDirection: "column"
        }
    }
});

export default styles;
