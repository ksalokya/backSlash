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
        alignItems: "center"
    },
    logoContainer: {
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        alignItems: "center"
    },
    title: {
        fontSize: "18px",
        marginBottom: "5px",
        textDecoration: "none"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#00C170"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(2)
    },
    link: {
        color: "#000000",
        textDecoration: "none",
        textAlign: "center"
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
        backgroundColor: "#00C170",
        color:"#fff"
    },
    errorText: {
        color: "red",
        textAlign: "center"
    },
    linkContainer:{
        marginTop:"3%",
    },
    signUp: {
        color: "#29487d",
        textTransform: "upperCase",
        textDecoration: "underline #29487d",
        cursor:'pointer'
    }
});

export default styles;
