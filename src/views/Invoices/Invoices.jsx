import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import InvoicesTabs from "components/InvoicesTabs/InvoicesTabs.jsx"


import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Invoices extends React.Component {
  state = {
    value: 0
  };
  handleChange = (value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <h3 className={classes.cardTitle}>
                  35/50 <small>Paid</small>
                </h3>
              </CardHeader>
              <CardBody>
                <InvoicesTabs/>
              </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
        </GridContainer>
      </div>
    );
  }
}

Invoices.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Invoices);
