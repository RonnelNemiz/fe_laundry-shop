import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import BedSheet from "../../../../assets/images/bed-sheets.png";
import Towel from "../../../../assets/images/towel.png";
import Curtain from "../../../../assets/images/curtains.png";
import Blanket from "../../../../assets/images/blanket.png";
import Pillowcase from "../../../../assets/images/pillows.png";

function ColoredBedShTowel() {
  return (
    <div>
      <section className="order-details-options mt-4">
        <div className="garment-count-wrapper">
          <article className="garment-count-container">
            <img src={BedSheet} alt="Bed Sheet" />
            <input type="number" id="bedSheetInput" required defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Towel} alt="Towel" />
            <input type="number" id="towelInput" required defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Curtain} alt="Curtain" />
            <input type="number" id="curtainInput" required defaultValue={0} />
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
        </div>
      </section>
    </div>
  );
}

export default ColoredBedShTowel;
