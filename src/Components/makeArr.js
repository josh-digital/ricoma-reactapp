export default function deepCopy(
  productsList,
  prodId,
  id,
  eqCheck,
  selected = false,
  added = false
) {
  let copyProdList = [...productsList];
  let copyObj = { ...copyProdList[prodId] };
  let tempObj = [...copyObj["colorSchema"]];
  let index;
  if (!eqCheck) {
    for (var i = 0; i < tempObj?.length; i++) {
      if (tempObj[i].boxChecked) {
        index = i;
        break;
      }
    }
  } else {
    index = id;
  }
  let tempValue = {
    ...tempObj[index],
    addedToCart: added,
    boxChecked: selected,
  };
  tempObj[index] = tempValue;
  copyObj["colorSchema"] = tempObj;
  copyProdList[prodId] = copyObj;
  return copyProdList;
}

export const showCartItemsOnFirstRender = (colorIds) => {
  let count = 0;
  const data = colorIds;
  let flag = false;
  for (var j = 0; j < data?.length; j++) {
    if (data[j].addedToCart && data[j].boxChecked) {
      count++;
      flag = true;
    }
    //   if (data[j].addedToCart) {
    //     filteredData.push(productsList[i]);
    //     ;
    //   }
  }
  return [count, flag];
};

export const showCartItems = (productsList, productsAdded, prodId, id) => {
  const filteredData = [];
  let count = 0;
  let flag = true;
  let data;
  for (var i = 0; i < productsList?.length; i++) {
    data = productsList[i].colorSchema;
    flag = true;
    for (var j = 0; j < data?.length; j++) {
      if (data[j].addedToCart && data[j].boxChecked) {
        count++;
        if (flag) {
          filteredData.push(productsList[i]);
        }
        flag = false;
      }
      //   if (data[j].addedToCart) {
      //     filteredData.push(productsList[i]);
      //     ;
      //   }
    }
  }
  return [count, filteredData];
};

// export const countCartItems = (productsList, productsAdded, prodId, id) => {
//     let count = 0;
//     let data;
//     for (var i = 0; i < productsList.length; i++) {
//       data = productsList[i].colorSchema;
//       for (var j = 0; j < data.length; j++) {
//         if (data[j].addedToCart) {
//           count++;
//         }
//       }
//     }
//     return count;
//   };

export const reStructureData = (prodList, obj) => {
  const newStruct = [];
  const itemsInCart = [];
  let count = 0;
  let color;
  {
    prodList?.data.map((data) => {
      color = data.colorIds?.replace(/ /g, "").split(",");
      const newobj = {
        id: data.id,
        name: data.name,
        image:
          "https://i.picsum.photos/id/947/200/140.jpg?hmac=gqFoK0aqQULaf485hrQAiaohUocbFb0llPfQt5IalD8",
        description: data.description,
        colorSchema: [
          {
            color: "#143061",
            boxChecked: color?.includes("1"),
            addedToCart: color?.includes("1"),
          },
          {
            color: "#81396f",
            boxChecked: color?.includes("2"),
            addedToCart: color?.includes("2"),
          },
          {
            color: "#f6437d",
            boxChecked: color?.includes("3"),
            addedToCart: color?.includes("3"),
          },
        ],
      };
      newStruct.push(newobj);
      const isAdded = showCartItemsOnFirstRender(newobj["colorSchema"]);
      if (isAdded[1]) {
        itemsInCart.push(newobj);
      }
      count += isAdded[0];
    });
  }
  return [newStruct, itemsInCart, count];
};
