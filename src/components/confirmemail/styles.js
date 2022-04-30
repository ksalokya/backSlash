const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: '#4158D0',
            backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
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
        borderColor:"orange"
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
        color:"#F4EBD4"
    }
});

export default styles;