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


import MaterialTable from 'material-table';

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
class Expenses extends React.Component {
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
    FirmaId:localStorage.getItem('FirmId'),
    HesapEkleme:null,
      columns: [
        { title: 'Description', field: 'Aciklama' },
        { title: 'Pay Date', field: 'OdemeTarihi',type:'time' },{
          title: 'Tax Rate', field:'KDVOrani'
        },{title: 'Expense Type',field: 'HesapTuru'},
        { title: 'Is Paid', field: 'OdemeBilgisi',type:'boolean' },
        { title: 'Currency', field: 'Tutar', type: 'numeric' },
      ],
      data: [],
      changedData:[]
  };
  }
  //ACCOUN BİLGİLERİNİ ÇEKME. SAYFA AÇILIRKEN YAPILIYOR
  componentDidMount() {
    const url = `${API_URL_EXPENSE}/get/${this.state.FirmaId}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ 
        accounts: data,
        data:data
       })
     })
     
  }
  componentDidUpdate(){
    switch(this.state.HesapEkleme) {
      case 'add':
        
          console.log(this.state.changedData);
        return this.addNewOne(this.state.changedData);
      case 'update':
        return this.updateOne(this.state.changedData);
      case 'delete':
        return this.deleteAccount(this.state.changedData) ;
      default:
        return null;
    }
  }


  //YENİ ACCOUNT EKLEME FONKSİYONLARI BAŞLANGIÇ
 modalClose = () => {this.setState({ modalShow: false }); console.log(this.state)};
 modalOpen = () => this.setState({ modalShow: true });
 handleClose = () => this.setState({ modalShow: false });
 addNewOne= (data)=>{
  try
  {axios( {
    method:'post',
    url:API_URL_EXPENSE+'/post', 
    data:data   }).then(obj=>{
      this.setState({modalShow:false,
      HesapEkleme:null});
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
 

//UPDATE APP
updateOne=(acc)=>{
  const id=acc.Id;
  try
  {axios( {
    method:'put',
    url:API_URL_EXPENSE+'/put/'+id+'/', 
    data:acc  }).then(obj=>{
      this.setState({HesapEkleme:null});
    })
  }
  catch(err){
    console.error(err);
  }
}
  
  render(){
    const { classes } = this.props;
    

    
    const {accounts}=this.state;
    return (
      
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Expenses</h4>
                <p className={classes.cardCategoryWhite}>Total</p>
                <h5 className={classes.cardTitleWhite}> £{accounts.map((account)=>(account.Tutar)).reduce((sum,current)=>sum+current,0)}</h5>
              </CardHeader>
              <CardBody>
              <MaterialTable
              title="Accounts"
              columns={this.state.columns}
              data={this.state.data}
              editable={{
                onRowAdd: (newData,) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.data;
                        newData.FirmaId=this.state.FirmaId;
                        data.push(newData);
                        this.setState({ changedData:newData,HesapEkleme:"add",data }, () => resolve());
                        
                      }
                      resolve()
                    }, 1000)
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        this.setState({ changedData:newData,HesapEkleme:"update",data }, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        let data = this.state.data;
                        const index = data.indexOf(oldData);
                        data.splice(index, 1);
                        this.setState({ changedData:oldData.Id,HesapEkleme:"delete",data }, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),
              }}
              options={{
                rowStyle: rowData => ({
                  backgroundColor: ( rowData.tableData.OdemeBilgisi) ? '#EEE' : '#FFF'
                })
              }}
              
            />
                
              </CardBody>
              <CardFooter>
                
              

               
                
              </CardFooter>
            </Card>
          </GridItem>
          
        </GridContainer>
      </div>
    )

  }
  
  
}
Expenses.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Expenses);
