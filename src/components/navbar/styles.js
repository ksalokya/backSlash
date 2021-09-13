const styles = theme => ({
    navContainer:{
        backgroundColor: '#29487d',
        width:'100% !important'
    },
    heading:{
        marginLeft:'5%',
        color:'#fff !important',
        fontSize:'1.4rem',
        fontWeight:'bold',
        "@media only screen and (max-width:520px)" :{
            marginLeft: '0'
        }
    },
    btn:{
        width:'100%',
        color: '#fff',
    }
})

export default styles;