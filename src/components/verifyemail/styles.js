const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: '#FA8BFF',
            backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
            overflow: 'hidden'
        }
    },
    paper: {
        marginTop: '40%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border:"solid",
        padding: "50px 18px",
        borderColor:"#2BFF88"
    },
    logoContainer: {
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#00C170"
    },
    text:{
        textAlign:"center",
        color:"#fff"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#00C170",
        color:"#fff",
        '&:hover':{
            color: "#fff",
        }
    },
    title: {
        fontSize: "18px",
        marginBottom: "5px",
        textDecoration: "none",
        textAlign : "center"
    },
    link :{
        color:"#fff",
        textDecoration : "none",
        "&:hover" : {
            color:"#fff",
            textDecoration : "none",
        }
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    errorText: {
        color: "red",
        textAlign: "center"
    },
});

export default styles;