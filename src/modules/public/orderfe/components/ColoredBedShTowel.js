import React from "react";
import BedSheet from "../../../../assets/images/bed-sheets.png";
import Towel from "../../../../assets/images/towel.png";
import Curtain from "../../../../assets/images/curtains.png";
import Blanket from "../../../../assets/images/blanket.png";
import Pillowcase from "../../../../assets/images/pillows.png";

function ColoredBedShTowel(props) {
  const { garments, handleChange } = props;

  return (
    <div>
      <section className="order-details-options mt-4">
        <div className="garment-count-wrapper">
          <article className="garment-count-container">
            <img src={BedSheet} alt="Bed Sheet" />
            <input
              type="number"
              name="colorbdst_bedsheet"
              onChange={handleChange}
              value={garments.values.colorbdst_bedsheet}
              id="bedSheetInput"
              required
            />
          </article>
          <article className="garment-count-container">
            <img src={Towel} alt="Towel" />
            <input
              type="number"
              name="colorbdst_towel"
              onChange={handleChange}
              value={garments.values.colorbdst_towel}
              id="towelInput"
              required
            />
          </article>
          <article className="garment-count-container">
            <img src={Curtain} alt="Curtain" />
            <input
              type="number"
              name="colorbdst_curtain"
              onChange={handleChange}
              value={garments.values.colorbdst_curtain}
              id="curtainInput"
              required
            />
          </article>
          <article className="garment-count-container">
            <img src={Blanket} alt="Blanket" />
            <input
              type="number"
              name="colorbdst_blanket"
              onChange={handleChange}
              value={garments.values.colorbdst_blanket}
              id="blanketInput"
              required
            />
          </article>
          <article className="garment-count-container">
            <img src={Pillowcase} alt="Pillowcase" />
            <input
              type="number"
              name="colorbdst_pillowcase"
              onChange={handleChange}
              value={garments.values.colorbdst_pillowcase}
              id="pillowcaseInput"
              required
            />
          </article>
        </div>
      </section>
    </div>
  );
}

export default ColoredBedShTowel;
