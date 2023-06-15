import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Shirt from "../../../../assets/images/tshirt.png";
import Underwear from "../../../../assets/images/underwear.png";
import Short from "../../../../assets/images/shorts.png";
import Trousers from "../../../../assets/images/trousers.png";
import Jacket from "../../../../assets/images/hooded-jacket.png";
import Blouse from "../../../../assets/images/blouse.png";
import Socks from "../../../../assets/images/socks.png";
import Handkerchief from "../../../../assets/images/handkerchief.png";

function WhiteGarments(props) {
  const { garments, handleChange } = props;

  return (
    <div>
      <section className="order-details-options mt-4">
        <div className="garment-count-wrapper">
          <article className="garment-count-container">
            <img src={Shirt} alt="Shirt" />
            <label htmlFor="shirtInput">Shirt</label>
            <Form.Control
              type="number"
              required
              onChange={handleChange}
              name="whitegart_tshirt"
              id="shirtInput"
              value={garments.values.whitegart_tshirt}
            />
          </article>
          <article className="garment-count-container">
            <img src={Underwear} alt="Underwear" />
            <label htmlFor="shirtInput">Underwear</label>
            <Form.Control
              type="number"
              id="underwearInput"
              required
              onChange={handleChange}
              name="whitegart_underwear"
              value={garments.values.whitegart_underwear}
            />
          </article>
          <article className="garment-count-container">
            <img src={Short} alt="Short" />
            <label htmlFor="shirtInput">Short</label>
            <Form.Control
              type="number"
              id="shortInput"
              required
              onChange={handleChange}
              name="whitegart_shorts"
              value={garments.values.whitegart_shorts}
            />
          </article>
          <article className="garment-count-container">
            <img src={Trousers} alt="Trousers" />
            <label htmlFor="shirtInput">Trouser</label>
            <Form.Control
              type="number"
              id="trousersInput"
              required
              onChange={handleChange}
              name="whitegart_trousers"
              value={garments.values.whitegart_trousers}
            />
          </article>
          <article className="garment-count-container">
            <img src={Jacket} alt="Jacket" />
            <label htmlFor="shirtInput">Jacket</label>
            <Form.Control
              type="number"
              id="hoodieInput"
              required
              onChange={handleChange}
              name="whitegart_jacket"
              value={garments.values.whitegart_jacket}
            />
          </article>
          <article className="garment-count-container">
            <img src={Blouse} alt="Blouse" />
            <label htmlFor="shirtInput">Blouse</label>
            <Form.Control
              type="number"
              id="blouseInput"
              required
              onChange={handleChange}
              name="whitegart_blouse"
              value={garments.values.whitegart_blouse}
            />
          </article>
          <article className="garment-count-container">
            <img src={Socks} alt="Socks" />
            <label htmlFor="shirtInput">Socks</label>
            <Form.Control
              type="number"
              id="socksInput"
              required
              onChange={handleChange}
              name="whitegart_socks"
              value={garments.values.whitegart_socks}
            />
          </article>
          <article className="garment-count-container">
            <img src={Handkerchief} alt="Handkerchief" />
            <label htmlFor="shirtInput">Handkerchief</label>
            <Form.Control
              type="number"
              id="handkerchiefInput"
              required
              onChange={handleChange}
              name="whitegart_handkerchief"
              value={garments.values.whitegart_handkerchief}
            />
          </article>
        </div>
      </section>
    </div>
  );
}

export default WhiteGarments;
