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

function WhiteGarments() {
  const [clothingItems, setClothingItems] = useState({
    tshirt: { checked: false, quantity: 0 },
    underwear: { checked: false, quantity: 0 },
    shorts: { checked: false, quantity: 0 },
    trousers: { checked: false, quantity: 0 },
    jacket: { checked: false, quantity: 0 },
    blouse: { checked: false, quantity: 0 },
    socks: { checked: false, quantity: 0 },
    handkerchief: { checked: false, quantity: 0 },
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
            <img src={Shirt} alt="Shirt" />
            <input type="number" required id="shirtInput" defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Underwear} alt="Underwear" />
            <input
              type="number"
              id="underwearInput"
              required
              defaultValue={0}
            />
          </article>
          <article className="garment-count-container">
            <img src={Short} alt="Short" />
            <input type="number" id="shortInput" required defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Trousers} alt="Trousers" />
            <input type="number" id="trousersInput" required defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Jacket} alt="Jacket" />
            <input type="number" id="hoodieInput" required defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Blouse} alt="Blouse" />
            <input type="number" id="blouseInput" required defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Socks} alt="Socks" />
            <input type="number" id="socksInput" required defaultValue={0} />
          </article>
          <article className="garment-count-container">
            <img src={Handkerchief} alt="Handkerchief" />
            <input
              type="number"
              id="handkerchiefInput"
              required
              defaultValue={0}
            />
          </article>
        </div>
      </section>
    </div>
  );
}

export default WhiteGarments;
