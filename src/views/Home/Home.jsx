import React, { Component } from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import axios from 'axios'

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const API_URL = 'http://localhost:63544/api/hesaplar';
const API_URL_EXPENSE = 'http://localhost:63544/api/masraflar';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      accounts: [],
      expenses:[],
      FirmId:localStorage.getItem('FirmId')
    };
    
  }

  componentDidMount() {
    const url = `${API_URL}/get/${this.state.FirmId}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ 
        accounts: data
       })
     })

     const urlexpense = `${API_URL_EXPENSE}/get/${this.state.FirmaId}`;
    axios.get(urlexpense).then(response => response.data)
    .then((data) => {
      this.setState({ 
        expenses: data
       })
     })
  }
  render (){
    const { classes} = this.props;
    const {accounts,expenses}=this.state;
    //HESAP TÜRLERİ LİSTESİ BAŞLANGIÇ
    const ranges = [
      {
        value: '0',
        label: 'Cash',
      },
      {
        value: '1',
        label: 'Bank',
      },
      {
        value: '2',
        label: 'POS',
      },
      {
        value: '3',
        label: 'Credit Card',
      },
      {
        value: '4',
        label: 'Cheque',
      },
      {
        value: '5',
        label: 'Multiple Owner Account',
      },
    ];
    //HESAP TÜRLERİ LİSTESİ BAŞLANGIÇ
    
      
    return(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Current Available</p>
                <h3 className={classes.cardTitle}> £{accounts.map((account)=>(account.GuncelBakiye)).reduce((sum,current)=>sum+current,0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                  <Icon>content_copy</Icon>
                  </Danger>
                  
                    Your Current Balance
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Revenue</p>
                <h3 className={classes.cardTitle}>£{expenses.map((account)=>(account.Tutar)).reduce((sum,current)=>sum+current,0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Will pay
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Unpaid</p>
                <h3 className={classes.cardTitle}>0</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Stock</p>
                <h3 className={classes.cardTitle}>0</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
       
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
          <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Balance</h4>
                <p className={classes.cardCategoryWhite}>
                £{accounts.map((account)=>(account.GuncelBakiye)).reduce((sum,current)=>sum+current,0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </p>
                
                
              </CardHeader>
              <CardBody>
              <Table
                tableHeaderColor="success"
                tableHead={["Name", "Account Type", "BankID", "Total"]}
                tableData={accounts.map((account)=>([account.Tanim,ranges[account.HesapTuru].label,account.HesapNo,'£'+account.GuncelBakiye.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')]))}
              />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Expenses</h4>
                <p className={classes.cardCategoryWhite}>
                £{expenses.map((account)=>(account.Tutar)).reduce((sum,current)=>sum+current,0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </p>
              </CardHeader>
              <CardBody>
              <Table
                tableHeaderColor="primary"
                onDelete={this.deleteAccount}
                tableHead={["Description", "Expense Type", "Validate","Tax", "Total"]}
                tableData={expenses.map((account)=>([account.Aciklama,ranges[account.MasrafKalemi].label,account.OdemeTarihi,account.KDVOrani,'£'+account.Tutar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')]))}
              />
              </CardBody>
            </Card>
          </GridItem>
         
        </GridContainer>
      </div>
    )
    
  
}
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Home);
