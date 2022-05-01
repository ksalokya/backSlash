const styles = theme => ({
    loaderBackground:{
        backgroundColor: '#FA8BFF',
        backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
        height:'100vh'
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
});

export default styles;
