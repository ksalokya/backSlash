const styles = theme => ({
    navContainer: {
        backgroundColor: '#7719aa',
        width: '100% !important',
    },
    heading: {
        marginLeft: '1%',
        color: '#fff !important',
        fontSize: '1.8rem',
        "@media only screen and (max-width:520px)": {
            marginLeft: '3%'
        }
    },
    signOut: {
        color: '#fff',
        cursor: "pointer",
        textAlign: "center",
        marginBottom: "0px",
        "&:hover": {
            transform: "scale(1.1)"
        },
    }
})

export default styles;