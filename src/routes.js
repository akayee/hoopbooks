// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import Home from "views/Home/Home.jsx";
import MyAccounts from "views/MyAccounts/MyAccounts.jsx";
import Expenses from "views/Expenses/Expenses.jsx";
import Payslip from "views/Payslip/Payslip.jsx";
import ProductServices from "views/ProductServices/ProductServices.jsx";
import SuppliersCustomers from "views/SuppliersCustomers/SuppliersCustomers.jsx";
import Stores from "views/Stores/Stores.jsx";
import Invoices from "views/Invoices/Invoices.jsx";
import Login from "layouts/Login.jsx"

const dashboardRoutes = [
  {
    path: "/home/",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Home,
    layout: "/admin"
  },
  {
    path: "/myaccounts",
    name: "My Accounts",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: MyAccounts,
    layout: "/admin"
  },
  {
    path: "/expenses",
    name: "Expenses",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Expenses,
    layout: "/admin"
  },
  {
    path: "/productservices",
    name: "Product&Services",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: ProductServices,
    layout: "/admin"
  },
  {
    path: "/suppliercostumer",
    name: "Suppliers&Customers",
    rtlName: "خرائط",
    icon: LocationOn,
    component: SuppliersCustomers,
    layout: "/admin"
  },
  {
    path: "/stores",
    name: "Stores",
    rtlName: "إخطارات",
    icon: Notifications,
    component: Stores,
    layout: "/admin"
  },
  {
    path: "/invoices",
    name: "Invoices",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: Invoices,
    layout: "/admin"
  },
  {
    path: "/payslip",
    name: "Payslip",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Payslip,
    layout: "/admin",
  },
  {
    path:"/Login",
    name:"Login",
    rtlName:"",
    icon:Person,
    component: Login,
    layout:"",
    invisible:true

  }
  

];

export default dashboardRoutes;
