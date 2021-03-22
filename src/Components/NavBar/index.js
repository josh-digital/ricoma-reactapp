import React, { useState, Suspense, lazy, useRef } from "react";
import cart from "../../Assets/cart.svg";
import CartContents from "../../Components/cartContents";
import "./style.css";
import Loader from "../PreLoader";
import { connect } from "react-redux";

const OpenDrawer = lazy(() => import("./openDrawer"));

function NavBar(props) {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const ref = useRef(null);
  const outerContainer = useRef(null);

  const fn = React.useCallback(
    (e) => {
      if (
        openCart &&
        outerContainer.current &&
        !outerContainer.current.contains(e.target)
      ) {
        setOpenCart(false);
      }
    },
    [openCart]
  );

  React.useEffect(() => {
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, [openCart]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenCart = () => {
    setOpenCart((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", border: "1px solid #E6E6E7" }}>
      <nav className="main-container">
        {open && (
          <Suspense fallback={<Loader />}>
            <OpenDrawer handleClose={handleClose} />
          </Suspense>
        )}
        <div className="hamburger-menu">
          <a href="#" onClick={handleOpen}>
            <svg viewBox="0 0 100 80" width="20" height="20">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
            {/* <i class="fa fa-bars"></i> */}
          </a>
        </div>
        <ul className="outer-container">
          <li>
            <a href="#">Lorem ipsum</a>
          </li>
          <li>
            <a href="#">Lorem</a>
          </li>
          <li>
            <a href="#">ipsum</a>
          </li>
          <li>
            <a href="#">Excepteur</a>
          </li>
          <li>
            <a href="#">Consectetur</a>
          </li>
          <li>
            <a href="#">Veniam</a>
          </li>
        </ul>
        <div className="logo logo-small">
          <a href="#">Lorem ipsum</a>
        </div>
        <div ref={ref} className="cart-style" onClick={handleOpenCart}>
          <img alt="cart icon" src={cart} className="cart-icon" />
          <div className="open-tri"></div>
          {props.count && props.count > 0 ? (
            <div className="cart-quantity">{props.count}</div>
          ) : null}
        </div>
      </nav>
      {openCart && (
        <div ref={outerContainer}>
          <CartContents />{" "}
        </div>
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
    count: state.products.count,
  };
};

// const mapDispatchToProps = {
//   addProducts,
//   editTick,
//   displayProducts,
// };

export default connect(mapStateToProps)(NavBar);
