import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addProducts,
  editTick,
  displayProducts,
  removeProducts,
  getProdInfo,
} from "../../Actions/index";
import ColorSelction from "../ColorSelction";
import Preload from "../PreLoader";
import "./style.css";

function Products(props) {
  const [tick, setTick] = useState({});
  useEffect(() => {
    props.getProdInfo();
  }, []);

  useEffect(() => {
    if (props.err) {
      alert("something went wrong!");
    }
  }, [props.err]);

  const handleAddProcess = (id, action) => {
    if (!action) {
      if (
        props.productList[id]?.colorSchema?.filter(
          (data) => data.boxChecked === false
        )?.length === 3
      ) {
        alert("select color!");
      } else {
        // let newSchema = [];
        // const currSchema = props.productList[id].colorSchema;
        // let objColor;
        // if(tick.prodId !== id)
        // for (var i = 0; i < currSchema?.length; i++) {
        //   if (i === tick.id) {
        //     objColor = {
        //       color: currSchema[i].color,
        //       boxChecked: true,
        //       addedToCart: true,
        //     };
        //   } else {
        //     objColor = {
        //       color: currSchema[i].color,
        //       boxChecked: false,
        //       addedToCart: false,
        //     };
        //   }
        //   newSchema = [...newSchema, objColor];
        // }
        // const obj = {
        //   id: props.productList[id].id,
        //   name: props.productList[id].name,
        //   image: props.productList[id].image,
        //   colorSchema: newSchema,
        // };
        const eqCheck = tick.prodId === id;
        props.addProducts(tick, id, eqCheck);
      }
    } else {
      const eqCheck = tick.prodId === id;
      props.removeProducts(tick, id, eqCheck);
      // if (tick.prodId !== id) {
      //   props.removeProducts(id, true);
      // } else {
      //   props.removeProducts(tick, false);
      // }
    }
  };

  const handleAddToCart = (prodId, id, value, addedToCart) => {
    setTick({ prodId: prodId, id: id });
    props.editTick(prodId, id, !value, addedToCart);
  };
  return (
    <div>
      {props.isLoading && <Preload />}
      <div className="div-container">
        {props.productList &&
          !props.isLoading &&
          props.productList?.length > 0 &&
          props.productList?.map((data, index) => (
            <div className="product-items" key={index}>
              <img
                className="img-style"
                alt={`${data.name} ${data.description}`}
                src={data.image}
              />
              <div className="info-content">
                <div>
                  <div className="title">{data.name}</div>
                  <div className="title-desp">{data.description}</div>
                </div>
                <ColorSelction
                  colorSchema={data.colorSchema}
                  handleAddToCart={handleAddToCart}
                  prodId={data.id - 1}
                />
              </div>
              <div
                className="add-to-cart-btn"
                onClick={() =>
                  handleAddProcess(
                    data.id - 1,
                    props.addToCartTitle[data.id - 1]
                  )
                }
                // () => props.addProducts("dattatatata")
              >
                {props.addToCartTitle[data.id - 1]
                  ? "Remove from Cart"
                  : "Add To Cart"}
              </div>
            </div>
          ))}

        {/* //   <div className="grid-items">
          //     <img className="img-style" src={prodImg} key={i} />
          //   <div className="info-content">
          //     <div>
          //       <div className="title">name</div>
          //       <div className="title-desp">
          //         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          //       </div>
          //     </div>
          //     <div className="add-to-cart-btn"> Add To Cart </div>
          //     <div className="box-conatiner">
          //       <div className="box blue"> </div>
          //       <div className="box purple"> </div>
          //       <div className="box pink"> </div>
          //     </div>
          //   </div>
          //   </div> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    productList: state.products.productsList,
    colorSchema: state.products.colorSchema,
    addToCartTitle: state.products.addToCartTitle,
    isLoading: state.products.isLoading,
    data: state.products.data,
    err: state.products.err,
  };
};

const mapDispatchToProps = {
  addProducts,
  editTick,
  displayProducts,
  removeProducts,
  getProdInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
