const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: '#FA8BFF',
            backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
            overflow: 'hidden'
        }
    },
    loader1: {
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        top: '25vh',
        textDecoration: 'underline',
        fontSize: '40px'
    },
    loader2: {
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        top: '60vh',
        fontSize: '25px',
        "@media only screen and (max-width:768px)": {
            fontSize: '1.05rem'
        }
    },
    paper: {
        marginTop: '35%',
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
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
        backgroundColor: "#00C170",
        color: "#fff"
    },
    errorText: {
        color: "red",
        textAlign: "center"
    },
    link: {
        color: "#000000",
        textDecoration: "none"
    },
    signIn: {
        color: "#29487d",
        textTransform: "upperCase",
        textDecoration: "underline #29487d"
    }
});

export default styles;
