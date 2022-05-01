const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px black"
    },
    newChatBtn: {
        borderRadius: '0px'
    },
    newNoteBtn: {
        width: '100%',
        height: '8.5%',
        borderBottom: '1px solid black',
        borderRadius: '10px',
        backgroundColor: '#7719aa;',
        marginBottom:'10px',
        color: 'white',
        '&:hover': {
            backgroundColor: '#E83F24'
        }
    },
    sidebarContainer: {
        marginTop: '3%',
        width:'100%',
        height: '88vh',
        paddingLeft: "1%",
        paddingRight: "1%",
        overflowY: 'scroll',
        overflowX: 'hidden',
        "@media only screen and (max-width: 768px)": {
            height:'initial',
            paddingLeft: "3%",
            paddingRight: '3%'
        }
    },
    newNoteInput: {
        marginBottom: '5px',
        height: '35px',
        width:'100%',
        outline: 'none',
        border: 'none',
        paddingLeft: '5px',
        '&:focus': {
            outline: '2px solid rgba(81, 203, 238, 1)'
        }
    },
    newNoteSubmitBtn: {
        width: '100%',
        backgroundColor: '#d61579',
        borderRadius: '0px',
        color: 'white',
        '&:hover' :{
            backgroundColor:'#2596be'
        }
    }
});

export default styles;