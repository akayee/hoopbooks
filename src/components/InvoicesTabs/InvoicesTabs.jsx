import React from "react";
// @material-ui/icons
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import Tabs from "components/CustomTabs/CustomTabs.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import axios from 'axios'

import MaterialTable from 'material-table';

import { bugs, website, server } from "variables/general.jsx";
const API_URL = 'http://localhost:63544/api/satislar';

class InvoicesTabs extends React.Component {

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
      //Aşağıdaki rowlar satışlara göre ayarlanacak. Hangi verilerin nasıl görüneceği aşağıdaki verilere göre ayarlanıyor.
      columns: [
        { title: 'Account ID', field: 'HesapNo' },
        { title: 'Explanation', field: 'Aciklama' },
        { title: 'Total', field: 'Tutar'},
        { title: 'Sale', field: 'Iskonto'},        
        { title: 'File Number', field: 'BelgeNo'},        
        { title: 'Due Date', field: 'VadeTarihi'},        
        { title: 'waybill Number', field: 'IrsaliyeNo'},        
        { title: 'Whom', field: 'MusteriVeTedarikciler.Adi'},
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
     }).then({
       
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
  
  render() {
    
    const accounts=this.state.data;
    return (
    <Tabs
      title="Tasks:"
      headerColor="warning"
      tabs={[
        {
          tabName: "All",
          tabIcon: Code,
          tabContent: (
            
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
        
          ),
        },
        {
          tabName: "Sales",
          tabIcon: Code,
          tabContent: (
            <MaterialTable
          title="Accounts"
          columns={this.state.columns}
          data={accounts.map((account)=>(account.SiparisDurumu=='0'))}
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
          )
        },
        {
          tabName: "Provision",
          tabIcon: Code,
          tabContent: (
            <MaterialTable
          title="Accounts"
          columns={this.state.columns}
          data={accounts.map((account)=>(account.SiparisDurumu=='1'))}
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
          )
        },
        {
          tabName: "Expenses",
          tabIcon: Code,
          tabContent: (
            <Tasks
              checkedIndexes={[1]}
              tasksIndexes={[0, 1, 2]}
              tasks={server}
            />
          )
        },
        {
          tabName: "Consigment Note",
          tabIcon: Code,
          tabContent: (
            <Tasks
              checkedIndexes={[1]}
              tasksIndexes={[0, 1, 2]}
              tasks={server}
            />
          )
        },
        {
          tabName: "Invoiced",
          tabIcon: Code,
          tabContent: (
            <Tasks
              checkedIndexes={[1]}
              tasksIndexes={[0, 1, 2]}
              tasks={server}
            />
          )
        },
        {
          tabName: "Draft",
          tabIcon: Code,
          tabContent: (
            <Tasks
              checkedIndexes={[1]}
              tasksIndexes={[0, 1, 2]}
              tasks={server}
            />
          )
        },
        {
          tabName: "Order",
          tabIcon: Code,
          tabContent: (
            <Tasks
              checkedIndexes={[1]}
              tasksIndexes={[0, 1, 2]}
              tasks={server}
            />
          )
        },
        {
          tabName: "Delete",
          tabIcon: Code,
          tabContent: (
            <Tasks
              checkedIndexes={[1]}
              tasksIndexes={[0, 1, 2]}
              tasks={server}
            />
          )
        }
      ]}
    />
  );}
}

export default InvoicesTabs;