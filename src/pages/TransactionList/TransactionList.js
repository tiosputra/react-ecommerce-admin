import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTransactions } from "../../actions/transactions";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Title from "../../components/Title";
import Error from "../../components/Error";

class TransactionList extends Component {
  componentDidMount() {
    const { fetchTransactions } = this.props;
    fetchTransactions();
  }

  render() {
    const { match, classes, transactions, errors } = this.props;

    if (errors) return <Error errors={errors} />;

    return (
      <Fragment>
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper}>
            <Title>Data Pesanan</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Konsumer</TableCell>
                  <TableCell>Dikirim Ke</TableCell>
                  <TableCell>Metode Pembayaran</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="center">Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.transactions.map(transaction => (
                  <TableRow key={transaction._id}>
                    <TableCell>
                      {new Date(transaction.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {transaction.user.firstName +
                        " " +
                        transaction.user.lastName}
                    </TableCell>
                    <TableCell>{transaction.shippingAddress.address}</TableCell>
                    <TableCell>{transaction.payments.method}</TableCell>
                    <TableCell>{transaction.total}</TableCell>
                    <TableCell align="right">
                      {transaction.processStatus}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`${match.url}/${transaction._id}`}
                      >
                        <VisibilityIcon></VisibilityIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { isLoading, fetchSuccess, transactions, errors } = state;
  return { isLoading, fetchSuccess, transactions, errors };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTransactions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TransactionList));
