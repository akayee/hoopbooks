import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from "components/CustomButtons/Button.jsx";

import Table from "components/Table/Table.jsx";
import axios from 'axios'
const API_URL_EXPENSE = 'http://localhost:63544/api/masraflar';
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
//component/task table yapısı kullanılarak oradaki icon buttonlarla icon eklenecek
class Payslip extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
    accounts:[],
    modalShow: false,
    Aciklama:null,
    OdemeBilgisi:false,
    OdemeTarihi:null,
    Tutar:null,
    KDVOrani:null,
    MasrafKalemi:null,
    FirmaId:localStorage.getItem('FirmId')
  };
  }
  //ACCOUN BİLGİLERİNİ ÇEKME. SAYFA AÇILIRKEN YAPILIYOR
  componentDidMount() {
    const url = `${API_URL_EXPENSE}/get/${this.state.FirmaId}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ 
        accounts: data
       })
     })
     
  }


  //YENİ ACCOUNT EKLEME FONKSİYONLARI BAŞLANGIÇ
 modalClose = () => {this.setState({ modalShow: false }); console.log(this.state)};
 modalOpen = () => this.setState({ modalShow: true });
 handleClose = () => this.setState({ modalShow: false });
 addNewOne= ()=>{
  try
  {axios( {
    method:'post',
    url:API_URL_EXPENSE+'/post', 
    data:{
    Aciklama:this.state.Aciklama,
    OdemeBilgisi:this.state.OdemeBilgisi,
    OdemeTarihi:this.state.OdemeTarihi,
    Tutar:this.state.Tutar,
    KDVOrani:this.state.KDVOrani,
    MasrafKalemi:this.state.MasrafKalemi,
    FirmaId:this.state.FirmaId}  }).then(obj=>{
      this.setState({modalShow:false,
      HesapEkleme:true});
    })
  }
  catch(err){
    console.error(err);
  }
 }
 //YENİ ACCOUNT EKLEME FONKSİYONLARI BİTİŞ

  //DELETE ACCOUNT FONKSİYONU BAŞLANGIÇ
 deleteAccount= (acc)=>{
  //ACC DEĞERİ BANKANIN ADI VE TABLE COMPONENTİNDEN GELİYOR
 const id=this.state.accounts.find(el=>el.Tanim === acc).Id
 try
 {axios( {
   method:'delete',
   url:API_URL_EXPENSE+'/delete/'+id, 
     })
 }
 catch(err){
   console.error(err);
 }
}
//DELETE ACCOUNT FONKSİYONU BİTİŞ
 
  
  render(){
    const { classes } = this.props;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const ranges = [
      {
        value: '0',
        label: 'Common',
      },
      {
        value: '1',
        label: 'Employee',
      },
      {
        value: '2',
        label: 'Daily Expense',
      },
      {
        value: '3',
        label: 'Hire',
      },
      {
        value: '4',
        label: 'Bills',
      },
      {
        value: '5',
        label: 'Debt',
      },
    ];
    const {accounts}=this.state;
    return (
      
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Payslip</h4>
                <p className={classes.cardCategoryWhite}>Total Employee</p>
                <h5 className={classes.cardTitleWhite}> </h5>
              </CardHeader>
              <CardBody>
              <Table
                tableHeaderColor="primary"
                onDelete={this.deleteAccount}
                tableHead={["Name", "Join Date", "Salary"]}
                tableData={accounts.map((account)=>([account.Aciklama,ranges[account.MasrafKalemi].label,account.OdemeTarihi,account.KDVOrani,'£'+account.Tutar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')]))}
              />
                
              </CardBody>
              <CardFooter>
                
              <Button
                    
                    color="primary"
                    onClick={this.modalOpen}
                  >
                    Show Payslip
              </Button>


                <Dialog open={this.state.modalShow} 
                  onClose={this.handleClose}
                  fullScreen="true"             
                  aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Payslip</DialogTitle>
                        <DialogContent>
                          
                          <GridContainer>
                            
                                <GridItem xs={12} sm={12} md={4}>
                                  <Card>
                                  <CardHeader color="warning">
                                    
                                    <p> NI Number:</p>               
                                  </CardHeader>
                                  <CardBody>
                                  <Table
                                    tableHeaderColor="warning"
                                    tableHead={["Description","Hours","Rate","Amount"]}
                                    tableData={[["","","",""]]}
                                  />
                                  
                                  
                                    
                                  </CardBody>
                                  
                                </Card>
                              </GridItem>
                                  <GridItem xs={12} sm={12} md={4}>
                                  <Card>
                                  <CardHeader color="warning" >
                                    <p>{Object.keys(accounts).length} Pay Period: Week</p>               
                                  </CardHeader>
                                  <CardBody>
                                  <Table
                                    tableHeaderColor="warning"
                                    tableHead={["Description","Amount"]}
                                    tableData={[["Pay",""],["Pay Tax",""],["Nat Ins.",""],["EE Pension",""],["ER Pension",""]]}
                                  />
                                    
                                  </CardBody>
                                  
                                </Card>
                              </GridItem>
                                  <GridItem xs={12} sm={12} md={4}>
                                  <Card>
                                  <CardHeader color="warning" >
                                    <p>{Object.keys(accounts).length} Pay Method: Bank</p>               
                                  </CardHeader>
                                  <CardBody>
                                  <Table
                                    tableHeaderColor="warning"
                                    tableHead={["Description","Amount"]}
                                    tableData={[["Pay",""],["Pay Tax",""],["Nat Ins.",""],["EE Pension",""],["ER Pension",""]]}
                                  />
                                    
                                  </CardBody>
                                  
                                </Card>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                  <Card>
                                  
                                  <CardBody>
                                  <Table
                                    tableHeaderColor="warning"
                                    tableHead={["Pay Period","Date","Department","Tax Code","Employee No","Employee Name","Net Pay"]}
                                    tableData={[["","","",""]]}
                                  />
                                  
                                  
                                    
                                  </CardBody>
                                  
                                </Card>
                              </GridItem>
                            </GridContainer>
                               
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.modalClose} color="danger">
                            Cancel
                          </Button>
                          <Button onClick={this.addNewOne}
                            disabled={!this.state.Aciklama} color="success">
                            Add
                          </Button>
                        </DialogActions>
                      </Dialog>
                
              </CardFooter>
            </Card>
          </GridItem>
          
        </GridContainer>
      </div>
    )

  }
  
  
}
Payslip.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Payslip);
