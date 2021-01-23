/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from 'axios'


import MaterialTable from 'material-table';

import CardFooter from "components/Card/CardFooter.jsx";
const API_URL_DEPOLAR = 'http://localhost:63544/api/depolar';
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

class Stores extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { modalShow: false,
      accounts:[],
      Adi:null,
      FirmalarID:localStorage.getItem('FirmId'),
      HesapEkleme:null,
      columns: [       
        { title: 'Name', field: 'Adi' }
      ],
      data: [],
      changedData:[]
      
    };
  }
//ACCOUN BİLGİLERİNİ ÇEKME. SAYFA AÇILIRKEN YAPILIYOR
  componentDidMount() {
    const url = `${API_URL_DEPOLAR}/get/${this.state.FirmalarID}`;
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
  try
  {axios( {
    method:'post',
    url:API_URL_DEPOLAR+'/post', 
    data:data  }).then(obj=>{
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
  const id=this.state.accounts.find(el=>el.Adi == acc).Id
  try
  {axios( {
    method:'delete',
    url:API_URL_DEPOLAR+'/delete/'+id, 
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
    const {accounts}=this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Stores</h4>
                <p>{Object.keys(accounts).length} Store Available</p>               
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

export default withStyles(styles)(Stores);
