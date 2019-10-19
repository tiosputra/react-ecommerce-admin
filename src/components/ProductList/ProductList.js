import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import {
  fetchProductsAction,
  deleteProductAction
} from "../../actions/productsAction";
import styles from "./styles";
// Material UI
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// Components
import Title from "../Title";
import ProductDeleteModal from "../ProductDeleteModal";

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      deleteId: ""
    };
  }
  componentDidMount() {
    const { fetchProducts } = this.props;

    fetchProducts();
  }

  // shouldComponentRender = () => {
  //   const { pending } = this.props;
  //   if (pending === false) return false;
  //   return true;
  // };

  handleDelete = () => {
    const { deleteProduct, fetchProducts } = this.props;
    deleteProduct(this.state.deleteId);
    this.setState({ deleteId: "", modalOpen: false });
    fetchProducts();
  };

  handleModalOpen = id => {
    this.setState({ modalOpen: true, deleteId: id });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false, deleteId: "" });
  };

  render() {
    const { classes, match, products } = this.props;

    // If Pending
    // if (!this.shouldComponentRender()) return <h1>Pending</h1>;

    return (
      <Fragment>
        <Container maxWidth="lg" className={classes.container}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`${match.url}/create`}
          >
            Tambah Produk
          </Button>
          <Paper className={classes.paper}>
            <Title>Daftar Produk</Title>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Gambar</TableCell>
                  <TableCell>Kode</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Harga</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>Lebar</TableCell>
                  <TableCell>Stok</TableCell>
                  <TableCell>Deskripsi</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {error && <span>{error}</span>} */}
                {products.map(product => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/${product.image}`}
                        alt={product.name}
                      />
                    </TableCell>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.material}</TableCell>
                    <TableCell>{product.width}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      {product.description.substring(0, 60)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`${match.url}/${product._id}/edit`}
                      >
                        <EditIcon />
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleModalOpen(product._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>

        <ProductDeleteModal
          open={this.state.modalOpen}
          handleClose={this.handleModalClose}
          handleDelete={this.handleDelete}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { products, pending, error } = state.products;

  return { products, pending, error };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts: fetchProductsAction,
      deleteProduct: deleteProductAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductList));
