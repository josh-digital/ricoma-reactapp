import deepCopy, {
  showCartItems,
  reStructureData,
} from "../Components/makeArr";

const initialState = {
  count: 0,
  productsList: [],
  colorSchema: [
    {
      color: "#143061",
      boxChecked: true,
    },
    {
      color: "#81396f",
      boxChecked: false,
    },
    {
      color: "#f6437d",
      boxChecked: true,
    },
  ],
  addToCartTitle: [],
  productsAdded: [],
  err: null,
  data: [],
  isLoading: true,
};

const handleCartUpdate = (data) => {
  const isAddedToCart =
    data &&
    data?.colorSchema?.filter(
      (data) => data.boxChecked === true && data.addedToCart === true
    );
  return isAddedToCart && isAddedToCart?.length > 0 ? true : false;
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      let prodIdValue;
      if (action.eqCheck) {
        prodIdValue = action.prodInfo.prodId;
      } else {
        prodIdValue = action.id;
      }
      const copiedValue = deepCopy(
        state.productsList,
        prodIdValue,
        action.prodInfo.id,
        action.eqCheck,
        true,
        true
      );
      let copyTitle = [...state.addToCartTitle];
      const value = showCartItems(copiedValue);
      let addedProd = value[1];
      let countItems = value[0];
      copyTitle[prodIdValue] = true;
      return {
        ...state,
        productsList: copiedValue,
        addToCartTitle: copyTitle,
        productsAdded: addedProd,
        count: countItems,
      };
    }
    case "REMOVE_PRODUCT": {
      let prodIdValue;
      if (action.eqCheck) {
        prodIdValue = action.prodInfo.prodId;
      } else {
        prodIdValue = action.id;
      }
      const copiedValue = deepCopy(
        state.productsList,
        prodIdValue,
        action.prodInfo?.id,
        action.eqCheck,
        false,
        false
      );
      const value = showCartItems(copiedValue);
      let addedProd = value[1];
      let countItems = value[0];
      let copyTitle = [...state.addToCartTitle];
      copyTitle[prodIdValue] = false;
      return {
        ...state,
        productsList: copiedValue,
        addToCartTitle: copyTitle,
        productsAdded: addedProd,
        count: countItems,
      };
    }
    case "DISPLAY_PRODUCTS": {
      let value = showCartItems(state.productsList);
      let addedProd = value[1];
      let countItems = value[0];
      const copyData = [];
      state.productsList &&
        state.productsList?.map((data) => {
          copyData.push(handleCartUpdate(data));
        });
      // let newSchema = [];
      // const prodData = state.productsList;

      // let obj;
      // for (var i = 0; i < prodData.length; i++) {
      //   const colors = prodData[i].colorSchema;
      //   for (var j = 0; j < colors.length; j++) {
      //     if (colors[j].addedToCart) {
      //       // obj = {
      //       //   id: prodData[0].id,
      //       //   name: prodData[i].name,
      //       //   image: prodData[i].image,
      //       //   colorSchema: prodData[i].colorSchema,
      //       // };
      //       newSchema = [...newSchema, prodData[i]];
      //     }
      //   }
      // }
      //   for (var i = 0; i < prodData.length; i++) {
      //     const colors = prodData[i].colorSchema;
      //     for (var j = 0; j < colors.length; j++) {
      //       if (colors[j].addedToCart) {
      //         obj = {
      //           id: prodData[0].id,
      //           name: prodData[i].name,
      //           image: prodData[i].image,
      //           colorSchema: prodData[i].colorSchema,
      //         };
      //         newSchema = [...newSchema, obj];
      //       }
      //     }
      //   }
      return {
        ...state,
        addToCartTitle: copyData,
        productsAdded: addedProd,
        count: countItems,
      };
    }
    case "EDIT_TICK": {
      let copyTitle = [...state.addToCartTitle];
      let copyProdList = [...state.productsList];
      if (!action.addCart) {
        let copyObj = { ...copyProdList[action.prodId] };
        let tempObj = [...copyObj["colorSchema"]];
        const objLength = tempObj?.length;
        for (var i = 0; i < objLength; i++) {
          if (tempObj[i].boxChecked && !tempObj[i].addedToCart) {
            let tempValue = { ...tempObj[i], boxChecked: false };
            tempObj[i] = tempValue;
          }
        }
        let tempValue = { ...tempObj[action.id], boxChecked: action.value };
        tempObj[action.id] = tempValue;
        copyObj["colorSchema"] = tempObj;
        copyProdList[action.prodId] = copyObj;
      }
      copyTitle[action.prodId] = action.addCart;

      return {
        ...state,
        productsList: copyProdList,
        addToCartTitle: copyTitle,
      };
    }

    case "GET_PROD_INFO_FAILED": {
      return {
        ...state,
        isLoading: false,
        productsList: [],
        err: action.err,
      };
    }

    case "GET_PROD_INFO_STARTED": {
      return {
        ...state,
        isLoading: true,
        err: null,
      };
    }

    case "GET_PROD_INFO_SUCCESS": {
      const reStructure = reStructureData(action.data["data"]);
      const copyData = [];
      reStructure[0] &&
        reStructure[0]?.map((data) => {
          copyData.push(handleCartUpdate(data));
        });

      return {
        ...state,
        isLoading: false,
        err: null,
        productsList: reStructure[0],
        productsAdded: reStructure[1],
        count: reStructure[2],
        addToCartTitle: copyData,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
