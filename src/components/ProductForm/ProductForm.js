import React, { Fragment, Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addProductAction,
  fetchProductAction,
  resetProductAction
} from "../../actions/productsAction";

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
      stock: "",
      color: "",
      image: null
    };
  }

  componentDidMount() {
    const { isEdit, getProduct, product } = this.props;
    const productCode = this.props.match.params.code;

    if (isEdit) getProduct(productCode);

    this.setState(product);
  }

  componentWillUnmount() {
    const { resetProduct } = this.props;

    resetProduct();
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleImageChange = e => this.setState({ image: e.target.files[0] });

  handleSubmit = e => {
    e.preventDefault();

    const { addProduct } = this.props;

    let formData = new FormData();

    formData.append("image", this.state.image, this.state.image.name);
    formData.append("code", this.state.code);
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("material", this.state.material);
    formData.append("width", this.state.width);
    formData.append("color", this.state.color);
    formData.append("description", this.state.description);
    formData.append("stock", this.state.stock);

    addProduct(formData);
  };

  render() {
    const { classes, success } = this.props;

    const {
      code,
      name,
      price,
      stock,
      width,
      material,
      description,
      color,
      fileUpload
    } = this.state;

    if (success) {
      const { resetProduct } = this.props;
      resetProduct();
      return <Redirect to="/admin/products" />;
    }

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
              <Grid item xs={12} sm={6}>
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
                  id="color"
                  name="color"
                  label="Warna"
                  fullWidth
                  value={color}
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

              <Grid item xs={12}>
                <input
                  type="file"
                  required
                  id="fileUpload"
                  name="fileUpload"
                  value={fileUpload}
                  onChange={this.handleImageChange}
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary">
              Tambah
            </Button>
          </form>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { product, pending, error, success } = state.products;

  return { product, pending, error, success };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addProduct: addProductAction,
      getProduct: fetchProductAction,
      resetProduct: resetProductAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductCreate));