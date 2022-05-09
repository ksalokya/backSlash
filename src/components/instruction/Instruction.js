import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from './styles';

import Avatar from "@material-ui/core/Avatar";
import Mail from "@material-ui/icons/Mail";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

import AOS from 'aos';
import 'aos/dist/aos.css';

class Instruction extends React.Component {

    componentDidMount() {
        AOS.init({
            duration: 500,
            once : true
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Mail/>
                    </Avatar>
                    <Typography component="h1" variant="h5" className={classes.text}>
                        Please check your email and follow the steps to enjoy the features of backSlash.
                    </Typography>
                    <Link to="/signin" className={classes.link}>
                        <Button
                            data-aos="zoom-in"
                            data-aos-delay="500"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Back To Login
                        </Button>
                    </Link>
            </div>
    </Container>
    )
    }
}

export default withStyles(styles)(Instruction);
