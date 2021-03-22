import React, { useState } from "react";
import { removeProducts } from "../../Actions/index";
import ColorSelction from "../ColorSelction/index";
import { connect } from "react-redux";
import "./style.css";

function CartContents(props) {
  const [items, setItems] = useState(null);
  const handleAddToCart = (prodId, id) => {
    setItems({ prodId: prodId, id: id });
  };

  const handleRemove = (id) => {
    const eqCheck = items?.prodId === id;
    props.removeProducts(items, id, eqCheck);
  };
  const productLength = props.productsAdded?.length - 1;
  return (
    <div className="cart-container">
      {/* <img className="cart-content-img" src={prodImg} /> */}
      {/* <h2>Lorem Ipsum</h2> */}

      {props.productsAdded && props.productsAdded.length > 0 ? (
        props.productsAdded.map((data, index) => (
          <>
            <div className="cart-outer-container" key={data.id - 1}>
              <img
                className="cart-content-img"
                alt={`${data.name}`}
                src={data.image}
              />
              <div className="cart-details">
                <p className="cart-items cart-item-title">{data.name}</p>
                {/* <div className="cart-items">
            <span className="colors purple"></span>
            <span className="colors blue"></span>
            <span className="colors pink"></span>
          </div> */}
                <ColorSelction
                  colorSchema={data.colorSchema}
                  handleAddToCart={handleAddToCart}
                  prodId={data.id - 1}
                  boxStyle="box-conatiner-cart"
                  box="box-cart"
                  sizeSmall={true}
                />
                <p
                  className="cart-items cart-item-remove"
                  onClick={() => handleRemove(data.id - 1)}
                >
                  remove
                </p>
              </div>
              {/* <hr className="hr-style" /> */}
            </div>
            {index !== productLength && <hr className="hr-style" />}
          </>
        ))
      ) : (
        <div className="empty-cart">Cart is Empty</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    productList: state.products.productsList,
    colorSchema: state.products.colorSchema,
    addToCartTitle: state.products.addToCartTitle,
    productsAdded: state.products.productsAdded,
  };
};

const mapDispatchToProps = {
  removeProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContents);
