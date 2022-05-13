const styles = theme => ({
    header1: {
        backgroundColor: "unset"
    },
    header2: {
        backgroundColor: "#7719aa",
    },
    title: {
        flexGrow: 1,
        marginLeft: '1%',
        color: '#fff !important',
        fontSize: '2rem !important',
        "@media only screen and (max-width:520px)": {
            fontSize: '1.6rem !important',
        }
    },
    iconBtn: {
        padding: '0px !important'
    },
    large: {
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
        marginRight: '15px',
        "@media only screen and (max-width:520px)": {
            width: theme.spacing(5),
            height: theme.spacing(5)
        }
    },
    profileDialogue: {
        minWidth : "30vw",
        maxWidth : "38vw",
        overflow : "hidden",
        "@media only screen and (max-width:520px)": {
            minWidth : "80vw",
            maxWidth : "80vw",
        }
    },
    profileImage: {
        display: "inline-block",
        borderRadius : "50%",
        width : "25%",
        height : "35%"
    },
    profileDetails: {
        display: "inline-block",
        position : "absolute",
        marginLeft: "7%",
        paddingTop : "3%"
    },
   profileDetailsText:{
       "@media only screen and (max-width:520px)": {
           fontSize: "0.9rem"
       }
   },
});

export default styles;
