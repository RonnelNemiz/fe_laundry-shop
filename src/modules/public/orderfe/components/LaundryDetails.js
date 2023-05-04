import React, { useState } from "react";
import ColoredGarments from "./ColoredGarments";
import ColoredBedShTowel from "./ColoredBedShTowel";
import WhiteBedShTowel from "./WhiteBedShTowel";
import WhiteGarments from "./WhiteGarments";

function LaundryDetails() {
  const [selectedPage, setSelectedPage] = useState(0);

  const pages = [
    {
      title: "ColoredBedShTowel",
      content: <ColoredBedShTowel />,
    },
    {
      title: "ColoredGarTowel ",
      content: <ColoredGarments />,
    },
    {
      title: "WhiteBedShTowel",
      content: <WhiteBedShTowel />,
    },
    {
      title: "WhiteGarTowel",
      content: <WhiteGarments />,
    },
  ];
  const handleSelect = (event) => {
    setSelectedPage(Number(event.target.value));
  };

  return (
    <div>
      <main class="payment-main">
        <section class="customize-section">
          <h1>ORDER DETAILS</h1>
          <p>Select categories:</p>

          <select
            onChange={handleSelect}
            className="col-md-4 btn btn-secondary dropdown-toggle">
            {pages.map((page, index) => (
              <option key={index} value={index}>
                {page.title}
              </option>
            ))}
          </select>
          {pages[selectedPage].content}
        </section>
      </main>
    </div>
  );
}

export default LaundryDetails;
