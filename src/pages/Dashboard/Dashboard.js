import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../actions/login";
import useStyles from "./styles";

// Material
import { CssBaseline, Container, Grid, Paper } from "@material-ui/core";

// Components
import MyDrawer from "../../components/Drawer";
import AppBar from "../../components/Appbar";
import Chart from "../../components/Chart";
import Deposits from "../../components/Deposits";
import Orders from "../../components/Orders";
import Copyright from "../../components/Copyright";

import Products from "../ProductList";
import Customers from "../Customers";
import Transactions from "../TransactionList";

function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { match, logout, auth } = props;

  if (!auth.isLogin) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleLogout={logout}
      />

      <MyDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        match={match}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Route path={`${match.path}/dashboard`} component={DashboardContent} />
        <Route path={`${match.path}/products`} component={Products} />
        <Route path={`${match.path}/customers`} component={Customers} />
        <Route path={`${match.path}/transactions`} component={Transactions} />
      </main>
    </div>
  );
}

function DashboardContent() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Copyright />
    </Fragment>
  );
}

const mapStateToProps = state => {
  const { auth } = state;

  return { auth };
};

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
