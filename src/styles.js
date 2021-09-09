const styles = theme => ({
    loaderBackground:{
        backgroundColor: '#4158D0',
        backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
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
