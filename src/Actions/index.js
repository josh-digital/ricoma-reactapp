import axios from "axios";

export const addProducts = (prodInfo, id, eqCheck) => ({
  type: "ADD_PRODUCT",
  prodInfo,
  id,
  eqCheck,
});

export const removeProducts = (prodInfo, id, eqCheck) => ({
  type: "REMOVE_PRODUCT",
  prodInfo,
  id,
  eqCheck,
});

export const editTick = (prodId, id, value, addCart) => ({
  type: "EDIT_TICK",
  prodId,
  id,
  value,
  addCart,
});

export const displayProducts = (prodId, id, value) => ({
  type: "DISPLAY_PRODUCTS",
});

export const getProdInfoStarted = () => {
  return {
    type: "GET_PROD_INFO_STARTED",
  };
};

export const getProdInfoFailed = (err) => {
  return {
    type: "GET_PROD_INFO_FAILED",
    err: err,
  };
};

export const getProdInfoSuccess = (data) => {
  return {
    type: "GET_PROD_INFO_SUCCESS",
    data: data,
  };
};

export const getProdInfo = (url = "http://localhost:4000/api/product/1") => {
  return (dispatch) => {
    dispatch(getProdInfoStarted());
    axios
      .get(url)
      .then((response) => dispatch(getProdInfoSuccess(response)))
      .catch((error) => dispatch(getProdInfoFailed(error)));
  };
};
