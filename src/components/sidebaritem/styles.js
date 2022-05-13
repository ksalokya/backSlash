const styles = theme => ({
    listItem: {
        cursor: 'pointer',
        border : "1.5px",
        borderStyle : "solid",
        borderColor : "#dc3545",
        borderRadius: '10px',
        marginBottom : "5px"
    },
    textSection: {
        maxWidth: '85%'
    },
    title:{
        fontSize:'1.6rem',
        textDecoration:'underline',
        fontWeight:'bold',
        color:'red',
    },
    bodyText:{
       fontWeight: '600'
    },
    deleteIcon: {
        position: 'absolute',
        right: '5px',
        top: 'calc(50% - 15px)',
        '&:hover': {
            color: 'red'
        }
    }
});

export default styles;