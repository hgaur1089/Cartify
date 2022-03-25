import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          price: 99,
          title: 'Watch',
          qty: 1,
          img: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=404&q=80',
          id: 1,
        },
        {
          price: 999,
          title: 'Mobile Phone',
          qty: 10,
          img: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=819&q=80',
          id: 2,
        },
        {
          price: 999,
          title: 'Laptop',
          qty: 4,
          img: 'https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=951&q=80',
          id: 3,
        },
      ],
    };
  }

  componentDidMount() {
    console.log('l');
    firebase
      .firestore
      .collection('products')
      .get()
      .then((snapshot) => {
        console.log(snapshot);
      })
  }

  handleIncreaseQuantity = (product) => {
    //console.log("increase ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
      //products: products
      products,
    });
  };

  handleDecreaseQuantity = (product) => {
    console.log('decrease ', product);

    if (product.qty === 0) {
      return;
    }

    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty -= 1;

    this.setState({
      //products: products
      products,
    });
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id);
    this.setState({
      products: items,
    });
  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if (product.qyu > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return '';
    });

    return cartTotal;
  };

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
