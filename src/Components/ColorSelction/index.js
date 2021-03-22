import React from "react";
import "./style.css";

export default function ColorSelection(props) {
  return (
    <div className={props.boxStyle ? props.boxStyle : "box-conatiner"}>
      {props.colorSchema.map((colors, index) => (
        <div
          style={{ backgroundColor: colors.color }}
          className={props.box ? `${props.box}` : "box blue"}
          key={index}
          onClick={() =>
            props.handleAddToCart(
              props.prodId,
              index,
              colors.boxChecked,
              colors.addedToCart
            )
          }
        >
          <div className="tick-mark">
            {colors.boxChecked && (
              <div
                className={`${
                  props.sizeSmall ? `tick-mark-icon-small` : `tick-mark-icon`
                }`}
              >
                &#10003;
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
