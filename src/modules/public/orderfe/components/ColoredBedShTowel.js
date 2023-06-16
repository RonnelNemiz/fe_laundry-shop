import React from "react";
import BedSheet from "../../../../assets/images/bed-sheets.png";
import Towel from "../../../../assets/images/towel.png";
import Curtain from "../../../../assets/images/curtains.png";
import Blanket from "../../../../assets/images/blanket.png";
import Pillowcase from "../../../../assets/images/pillows.png";
import { Form } from "react-bootstrap";

function ColoredBedShTowel(props) {
  const { garments, handleChange } = props;

  return (
    <div>
      <section className="order-details-options mt-4">
        <div className="d-flex flex-wrap gap-2">
          <article className="d-flex justify-content-between card">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={BedSheet} alt="Bed Sheet" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Bed Sheet</label>
              </div>
              <Form.Control
                type="number"
                name="colorbdst_bedsheet"
                onChange={handleChange}
                value={garments.values.colorbdst_bedsheet}
                id="bedSheetInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Towel} alt="Towel" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Towel</label>
              </div>
              <Form.Control
                type="number"
                name="colorbdst_towel"
                onChange={handleChange}
                value={garments.values.colorbdst_towel}
                id="towelInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Curtain} alt="Curtain" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Curtain</label>
              </div>
              <Form.Control
                type="number"
                name="colorbdst_curtain"
                onChange={handleChange}
                value={garments.values.colorbdst_curtain}
                id="curtainInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Blanket} alt="Blanket" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Blanket</label>
              </div>
              <Form.Control
                type="number"
                name="colorbdst_blanket"
                onChange={handleChange}
                value={garments.values.colorbdst_blanket}
                id="blanketInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Pillowcase} alt="Pillowcase" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Pillowcase</label>
              </div>
              <Form.Control
                type="number"
                name="colorbdst_pillowcase"
                onChange={handleChange}
                value={garments.values.colorbdst_pillowcase}
                id="pillowcaseInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default ColoredBedShTowel;