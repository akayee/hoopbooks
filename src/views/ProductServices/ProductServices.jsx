/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'

import MaterialTable from 'material-table';
import queryString from 'query-string';

import CardFooter from "components/Card/CardFooter.jsx";
const API_URL_PRODUCTS = 'http://localhost:63544/api/urunler';
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class ProductServices extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { modalShow: false,
      products:[],
      StokluUrun:false,
      SatisFiyatBirimi:"3",
      SatisFiyat:null,
      SatisKDVOrani:null,
      SatisFiyatinaKDVDahil:false,
      AlisFiyati:null,
      AlisFiyatBirimi:"3",
      AlisKDVOrani:null,
      AlisKDVDahil:false,
      AlisIskontoOrani:null,
      UrunKodu:null,
      UrunAciklama:null,
      BarkodKodu:null,
      KritikStokMiktari:null,
      SatisIskontoOrani:null,
      SatisAktif:true,
      FirmalarID:localStorage.getItem('FirmId'),
      HesapEkleme:null,
      columns: [
        { title: 'Name', field: 'UrunAciklama' },
        { title: 'Sale Price', field: 'SatisFiyat',type:'numeric' },
        { title: 'Sale Tax Rate', field: 'SatisKDVOrani',type:'numeric' },
        { title: 'Buy Price', field: 'AlisFiyati',type:'numeric' },
        { title: 'Buy Tax Rate', field: 'AlisKDVOrani',type:'numeric' },
        { title: 'Tax Rate Include', field: 'AlisKDVDahil',type:'boolean' },
        { title: 'Product Code', field: 'UrunKodu',type:'numeric' },
        { title: 'Sale Active', field: 'SatisAktif',type:'boolean' },
        { title: 'Sale Discount', field: 'SatisIskontoOrani',type:'numeric' }
      ],
      data: [],
      changedData:[]
      
    };
  }
//ACCOUN BİLGİLERİNİ ÇEKME. SAYFA AÇILIRKEN YAPILIYOR
  componentDidMount() {
    const url = `${API_URL_PRODUCTS}/get/${this.state.FirmalarID}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ 
        products: data,
        data:data
       })
     })
     
  }

  componentDidUpdate(){
    switch(this.state.HesapEkleme) {
      case 'add':        
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
 modalClose = () => this.setState({ modalShow: false });
 modalOpen = () => this.setState({ modalShow: true });
 handleClose = () => this.setState({ modalShow: false });
 addNewOne= (data)=>{
  const data1 =queryString.stringify(data);
  try
  {axios( {
    method:'post',
    url:API_URL_PRODUCTS+'/post', 
    data:data1  }).then(obj=>{
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
  const id=this.state.products.find(el=>el.UrunAciklama == acc).Id
  try
  {axios( {
    method:'delete',
    url:API_URL_PRODUCTS+'/delete/'+id, 
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
    url:API_URL+'/put/'+id+'/', 
    data:acc  }).then(obj=>{
      this.setState({HesapEkleme:null});
    })
  }
  catch(err){
    console.error(err);
  }
}
  render(){
    

    //DİZAYN CLASSLARININ PROPDAN ALINMA İŞLEMİ
    const { classes } = this.props;
    const {products}=this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose">
                <h4 className={classes.cardTitleWhite}>Products and Services</h4>
                <p>{Object.keys(products).length} Product Available</p>               
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
                        newData.FirmalarID=this.state.FirmalarID;
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
              
            />
                
              </CardBody>
              <CardFooter>                
              
              
              </CardFooter>
            </Card>
          </GridItem>
          
          
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ProductServices);
