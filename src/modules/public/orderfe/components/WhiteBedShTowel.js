import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Towel from "../../../../assets/images/towel.png";
import BedSheet from "../../../../assets/images/bed-sheets.png";
import Blanket from "../../../../assets/images/blanket.png";
import Pillowcase from "../../../../assets/images/pillows.png";
import Curtain from "../../../../assets/images/curtains.png";

function WhiteBedShTowel() {
  const [clothingItems, setClothingItems] = useState({
    towel: { checked: false, quantity: 0 },
    bedsheet: { checked: false, quantity: 0 },
    blanket: { checked: false, quantity: 0 },
    pillowcase: { checked: false, quantity: 0 },
    curtain: { checked: false, quantity: 0 },
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setClothingItems({
      ...clothingItems,
      [name]: { ...clothingItems[name], checked },
    });
  };

  const handleQuantityChange = (event) => {
    const { name, value } = event.target;
    setClothingItems({
      ...clothingItems,
      [name]: { ...clothingItems[name], quantity: parseInt(value) },
    });
  };

  return (
    <div>
      <section className="order-details-options mt-4">
        <div className="garment-count-wrapper">
          <article className="garment-count-container">
            <img src={Towel} alt="Towel" />
            <input type="number" required id="towelInput" defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={BedSheet} alt="BedSheet" />
            <input type="number" id="bedsheetInput" required defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Blanket} alt="Blanket" />
            <input type="number" id="blanketInput" required defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Pillowcase} alt="Pillowcase" />
            <input
              type="number"
              id="pillowcaseInput"
              required
              defaultValue={0}
            />
          </article>
          <article className="garment-count-container">
            <img src={Curtain} alt="Curtain" />
            <input type="number" id="curtainInput" required defaultValue={0} />
          </article>
        </div>
      </section>
    </div>
  );
}

export default WhiteBedShTowel;
