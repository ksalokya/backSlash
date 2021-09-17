const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: '#4158D0',
            backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
            overflow:'hidden'
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
        textDecoration: "none"
    },
    submit: {
        margin: theme.spacing(2, 0, 2)
    },
    errorText: {
        color: "white",
        textAlign: "center"
    },
    linkContainer:{
        marginTop:"3%",
    },
    signUp: {
        color: "#29487d",
        textTransform: "upperCase",
        textDecoration: "underline #29487d"
    }
});

export default styles;
