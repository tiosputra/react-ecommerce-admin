import React, { Fragment, Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addProductAction,
  fetchProductAction
} from "../../actions/productsAction";
import {
  pendingState,
  errorState,
  productState
} from "../../reducers/productsReducer";

// Components
import Title from "../Title";

// Material UI
import { Container, Grid, TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
});

class ProductCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      code: "",
      name: "",
      price: "",
      material: "",
      width: "",
      description: "",
      stock: ""
    };
  }

  componentDidMount() {
    // If this is edit
    const { isEdit, getProduct } = this.props;
    if (isEdit) {
      const productCode = this.props.match.params.code;
      getProduct(productCode);
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    const {
      code,
      name,
      price,
      material,
      width,
      description,
      stock
    } = this.state;

    const { addProduct } = this.props;

    if (
      !code ||
      !name ||
      !price ||
      !material ||
      !width ||
      !description ||
      !stock
    ) {
      return alert("Please fill in all fields");
    }

    addProduct({
      code,
      name,
      price,
      material,
      width,
      description,
      stock
    });
  };

  render() {
    const { classes } = this.props;
    const { isEdit } = this.props;
    const {
      code,
      name,
      price,
      stock,
      width,
      material,
      description
    } = this.state;

    return (
      <Fragment>
        <Container maxWidth="lg" className={classes.container}>
          <Title>Form Produk</Title>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="code"
                  name="code"
                  label="Kode Produk"
                  fullWidth
                  value={code}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Nama Produk"
                  fullWidth
                  value={name}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="price"
                  name="price"
                  label="Harga"
                  fullWidth
                  value={price}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="stock"
                  name="stock"
                  label="Stok"
                  fullWidth
                  value={stock}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="material"
                  name="material"
                  label="Bahan dan Material"
                  fullWidth
                  value={material}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="width"
                  name="width"
                  label="Lebar (cm)"
                  fullWidth
                  value={width}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Deskripsi Produk"
                  fullWidth
                  value={description}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>

            <br />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              {isEdit ? "Ubah" : "Tambah"}
            </Button>
          </form>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  pending: pendingState(state),
  error: errorState(state),
  product: productState(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addProduct: addProductAction,
      getProduct: fetchProductAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductCreate));
