const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: '#4158D0',
            backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
            overflow:'hidden'
        }
    },
    loader1:{
        color:'#fff',
        textAlign: 'center',
        position:'relative',
        top:'25vh',
        textDecoration:'underline',
        fontSize: '40px'
    },
    loader2:{
        color:'#fff',
        textAlign: 'center',
        position:'relative',
        top:'60vh',
        fontSize: '25px',
        "@media only screen and (max-width:768px)" : {
            fontSize:'1.05rem'
        }
    },
    paper: {
        marginTop: '50%',
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
    errorText: {
        color: "#000",
        textAlign: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    linkContainer:{
        marginTop:"3%",
    },
    link: {
        color: "#000000",
        textDecoration: "none"
    },
    signUp: {
        color: "#29487d",
        textTransform: "upperCase",
        textDecoration: "underline #29487d"
    }
});

export default styles;
