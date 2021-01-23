import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from 'axios'

import MaterialTable from 'material-table';

const API_URL = 'http://localhost:63544/api/hesaplar';
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
class MyAccounts extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { modalShow: false,
      accounts:[],
      HesapNo:null,
      HesapTuru:null,
      Tanim:null,
      ParaBirimi:null,
      GuncelBakiye:null,
      FirmaId:localStorage.getItem('FirmId'),
      HesapEkleme:null,
      columns: [
        { title: 'Account ID', field: 'HesapNo' },
        { title: 'Name', field: 'Tanim' },{
          title: 'Account Type',
          field: 'HesapTuru',
          lookup: { 0: 'Cash', 1: 'Bank',2:'POS',3:'Credit Card',4:'Cheque',5:'Multiple Owner' },
        },
        { title: 'Current Balance', field: 'GuncelBakiye'},
      ],
      data: [],
      changedData:[]
    };
  }
//ACCOUN BİLGİLERİNİ ÇEKME. SAYFA AÇILIRKEN YAPILIYOR
  componentDidMount() {
    const url = `${API_URL}/getlist/${this.state.FirmaId}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ 
        accounts: data,
        data:data
       });
       console.log('bu data',data)
     })
     
  }
  componentDidUpdate(){
    // TABLODA HANGİ İŞLEM YAPILDIYSA O FONKSİYONA YÖNLENDİRME BURADAN YAPILIYOR
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
   //DATA TAPLODAKİ GİRİLEN VERİYİ İÇERİR.
  try
  {axios( {
    method:'post',
    url:API_URL+'/post', 
    data:data  }).then(obj=>{
      this.setState({modalShow:false,
      HesapEkleme:null});
      //İŞLEM BİTTİKTEN SONRA YENİ BİR İŞLEM İÇİN HESAP EKLEME NULLA ÇEKİLİYOR.
    })
  }
  catch(err){
    console.error(err);
  }
 }
 //YENİ ACCOUNT EKLEME FONKSİYONLARI BİTİŞ
 
//DELETE ACCOUNT FONKSİYONU BAŞLANGIÇ
 deleteAccount= (acc)=>{
   //ACC DEĞERİ SİLİNECEK OLAN VERİYİ İÇERİR
  const id=acc;
  try
  {axios( {
    method:'delete',
    url:API_URL+'/delete/'+id, 
      }).then(obj=>{
        this.setState({HesapEkleme:null});
        //İŞLEM BİTTİKTEN SONRA YENİ BİR İŞLEM İÇİN HESAP EKLEME NULLA ÇEKİLİYOR.
      })
  }
  catch(err){
    console.error(err);
  }
 }
//DELETE ACCOUNT FONKSİYONU BİTİŞ


//UPDATE APP
updateOne=(acc)=>{
  //ACC DEĞERİ DEĞİŞTİRİLECEK OLAN VERİYİ İÇERİR
  const id=acc.Id;
  try
  {axios( {
    method:'put',
    url:API_URL+'/put/'+id+'/', 
    data:acc  }).then(obj=>{
      this.setState({HesapEkleme:null});
      //İŞLEM BİTTİKTEN SONRA YENİ BİR İŞLEM İÇİN HESAP EKLEME NULLA ÇEKİLİYOR.
    })
  }
  catch(err){
    console.error(err);
  }
}
//UPDATE APP
  render(){
    Number.prototype.format = function(n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
          num = this.toFixed(Math.max(0, ~~n));
    
      return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };
    

    //DİZAYN CLASSLARININ PROPDAN ALINMA İŞLEMİ
    const { classes } = this.props;
    const accounts=this.state.data;
    return (
      
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Accounts</h4>
                <p className={classes.cardCategoryWhite}>Total</p>
                {console.log(accounts)}
                <h5 className={classes.cardTitleWhite}> £{accounts.map((account)=>(account.GuncelBakiye)).reduce((sum,current)=>sum+current,0)}</h5>
              </CardHeader>
              <CardBody>
                {
                  // TABLO BAŞLANGIÇ.
                }
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
                        newData.FirmID=this.state.FirmaId;
                        data.push(newData);
                        this.setState({ changedData:newData,HesapEkleme:"add",data }, () => resolve());
                        //STATE ÜZERİNDEKİ HESAPEKLEME YAPILACAK İŞLEMİ BELİRTİR. İŞLEME GÖRE YUKARIDA DEĞİŞTİRLİYOR.
                        
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
                        //STATE ÜZERİNDEKİ HESAPEKLEME YAPILACAK İŞLEMİ BELİRTİR. İŞLEME GÖRE YUKARIDA DEĞİŞTİRLİYOR.
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
                        //STATE ÜZERİNDEKİ HESAPEKLEME YAPILACAK İŞLEMİ BELİRTİR. İŞLEME GÖRE YUKARIDA DEĞİŞTİRLİYOR.
                      }
                      resolve()
                    }, 1000)
                  }),
              }}
              
            />
            {
                  // TABLO BİTİŞ.
            }
              
              
              </CardBody>
              
            </Card>
          </GridItem>
         
          
        </GridContainer>
      </div>
    )

  }
  
  
}
MyAccounts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyAccounts);
