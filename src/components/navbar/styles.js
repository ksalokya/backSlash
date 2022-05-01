const styles = theme => ({
    navContainer:{
        backgroundColor: '#7719aa',
        width:'100% !important',
    },
    heading:{
        marginLeft:'1%',
        color:'#fff !important',
        fontSize:'1.8rem',
        "@media only screen and (max-width:520px)" :{
            marginLeft: '3%'
        }
    },
    btn:{
        width:'100%',
        color: '#fff',
        backgroundColor: 'red',
    }
})

export default styles;