import React from "react";
import Shirt from "../../../../assets/images/tshirt.png";
import Short from "../../../../assets/images/shorts.png";
import Trousers from "../../../../assets/images/trousers.png";
import Jacket from "../../../../assets/images/hooded-jacket.png";
import Underwear from "../../../../assets/images/underwear.png";
import Blouse from "../../../../assets/images/blouse.png";
import Socks from "../../../../assets/images/socks.png";
import Handkerchief from "../../../../assets/images/handkerchief.png";

function ColoredGarments(props) {
  const { garments, handleChange } = props;

  return (
    <div>
      <section className="order-details-options mt-4">
        <div className="garment-count-wrapper">
          <article className="garment-count-container">
            <img src={Shirt} alt="Shirt" />
            <input
              type="number"
              name="colorgart_tshirt"
              required
              id="shirtInput"
              value={garments.values.colorgart_tshirt}
              onChange={handleChange}
            />
          </article>
          <article className="garment-count-container">
            <img src={Short} alt="Short" />
            <input
              type="number"
              name="colorgart_shorts"
              id="shZortInput"
              required
              value={garments.values.colorgart_shorts}
              onChange={handleChange}
            />
          </article>
          <article className="garment-count-container">
            <img src={Trousers} alt="Trousers" />
            <input
              type="number"
              name="colorgart_trousers"
              id="trouserInput"
              required
              value={garments.values.colorgart_trousers}
              onChange={handleChange}
            />
          </article>

          <article className="garment-count-container">
            <img src={Jacket} alt="Jacket" />
            <input
              type="number"
              name="colorgart_jacket"
              id="hoodieInput"
              required
              value={garments.values.colorgart_jacket}
              onChange={handleChange}
            />
          </article>
          <article className="garment-count-container">
            <img src={Underwear} alt="Underwear" />
            <input
              type="number"
              name="colorgart_underwear"
              id="underwearInput"
              required
              value={garments.values.colorgart_underwear}
              onChange={handleChange}
            />
          </article>
          <article className="garment-count-container">
            <img src={Blouse} alt="Blouse" />
            <input
              type="number"
              name="colorgart_blouse"
              id="blouseInput"
              required
              value={garments.values.colorgart_blouse}
              onChange={handleChange}
            />
          </article>
          <article className="garment-count-container">
            <img src={Socks} alt="Socks" />
            <input
              type="number"
              name="colorgart_socks"
              id="socksInput"
              required
              value={garments.values.colorgart_socks}
              onChange={handleChange}
            />
          </article>
          <article className="garment-count-container">
            <img src={Handkerchief} alt="Handkerchief" />
            <input
              type="number"
              name="colorgart_handkerchief"
              id="handkerchiefInput"
              required
              value={garments.values.colorgart_handkerchief}
              onChange={handleChange}
            />
          </article>
        </div>
      </section>
    </div>
  );
}

export default ColoredGarments;
