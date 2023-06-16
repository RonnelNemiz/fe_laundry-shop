import React from "react";
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
        <div className="d-flex flex-wrap gap-2">
          <article className="d-flex justify-content-between card">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Towel} alt="Towel" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Towel</label>
              </div>
              <Form.Control
                type="number"
                name="whitebdst_towel"
                onChange={handleChange}
                value={garments.values.whitebdst_towel}
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
                <img src={BedSheet} alt="BedSheet" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Bed Sheet</label>
              </div>
              <Form.Control
                type="number"
                name="whitebdst_bedsheet"
                onChange={handleChange}
                value={garments.values.whitebdst_bedsheet}
                id="bedsheetInput"
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
                name="whitebdst_blanket"
                onChange={handleChange}
                value={garments.values.whitebdst_blanket}
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
                name="whitebdst_pillowcase"
                onChange={handleChange}
                value={garments.values.whitebdst_pillowcase}
                id="pillowcaseInput"
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
                name="whitebdst_curtain"
                onChange={handleChange}
                value={garments.values.whitebdst_curtain}
                id="curtainInput"
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

export default WhiteBedShTowel;