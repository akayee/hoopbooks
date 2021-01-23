import React from 'react';
import Grid from "@material-ui/core/Grid";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Create from "@material-ui/icons/Create";
//core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridItem from "components/Grid/GridItem.jsx";



class Login extends React.Component{

    state={
        user:[],
        KullaniciAdi:null,
        Password:null,
        Email:null,
        Phone:null,
        Image:null,
        KullaniciAdiCorrect:false
    }
    render(){

        return(
            <div>
                <Grid container>
                
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                labelText="With material Icons"
                id="material"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <People />
                    </InputAdornment>
                    )
                }}
                />
                <CustomInput
                labelText="With material Icons"
                id="material"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <Create />
                    </InputAdornment>
                    )
                }}
                />
                
                
                </GridItem>
                </Grid>
            </div>
        );
    }
}

export default withStyles(dashboardStyle)(Login);