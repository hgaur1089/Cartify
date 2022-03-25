import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    };
  }

  componentDidMount() {
    
    firebase
      .firestore()
      .collection('products')
      .get()
      .then((snapshot) => {
        //console.log(snapshot);

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();

          data['id'] = doc.id;
        
          return data;
        })

        this.setState({
          products,
          loading: false
        });
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
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
