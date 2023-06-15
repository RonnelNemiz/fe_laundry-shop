import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Towel from "../../../../assets/images/towel.png";
import BedSheet from "../../../../assets/images/bed-sheets.png";
import Blanket from "../../../../assets/images/blanket.png";
import Pillowcase from "../../../../assets/images/pillows.png";
import Curtain from "../../../../assets/images/curtains.png";


function WhiteBedShTowel(props) {
  const { garments, handleChange } = props;

  return (
    <div>
      <section className="order-details-options mt-4">
        <div className="garment-count-wrapper">
          <article className="garment-count-container">
            <img src={Towel} alt="Towel" />
            <label htmlFor="shirtInput">Towel</label>
            <Form.Control
              type="number"
              required
              onChange={handleChange}
              id="towelInput"
              value={garments.values.whitebdst_towel}
              name="whitebdst_towel"
            />
          </article>
          <article className="garment-count-container">
            <img src={BedSheet} alt="BedSheet" />
            <label htmlFor="shirtInput">BedSheet</label>
            <Form.Control
              type="number"
              id="bedsheetInput"
              required
              onChange={handleChange}
              value={garments.values.whitebdst_bedsheet}
              name="whitebdst_bedsheet"
            />
          </article>
          <article className="garment-count-container">
            <img src={Blanket} alt="Blanket" />
            <label htmlFor="shirtInput">Blanket</label>
            <Form.Control
              type="number"
              id="blanketInput"
              required
              onChange={handleChange}
              value={garments.values.whitebdst_blanket}
              name="whitebdst_blanket"
            />
          </article>
          <article className="garment-count-container">
            <img src={Pillowcase} alt="Pillowcase" />
            <label htmlFor="shirtInput">Pillowcase</label>
            <Form.Control
              type="number"
              id="pillowcaseInput"
              required
              onChange={handleChange}
              value={garments.values.whitebdst_pillowcase}
              name="whitebdst_pillowcase"
            />
          </article>
          <article className="garment-count-container">
            <img src={Curtain} alt="Curtain" />
            <label htmlFor="shirtInput">Curtain</label>
            <Form.Control
              type="number"
              id="curtainInput"
              required
              onChange={handleChange}
              value={garments.values.whitebdst_curtain}
              name="whitebdst_curtain"
            />
          </article>
        </div>
      </section>
    </div>
  );
}

export default WhiteBedShTowel;
