import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

// const override = CSSProperties`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

function Beat({ color }) {
  return <BeatLoader size={10} color={color ?? "#ffffff"} />;
}

export { Beat };
