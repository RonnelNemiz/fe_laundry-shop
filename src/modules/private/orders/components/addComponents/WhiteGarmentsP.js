import React from "react";
import { Form } from "react-bootstrap";
import Shirt from "../../../../../assets/images/tshirt.png";
import Underwear from "../../../../../assets/images/underwear.png";
import Short from "../../../../../assets/images/shorts.png";
import Trousers from "../../../../../assets/images/trousers.png";
import Jacket from "../../../../../assets/images/hooded-jacket.png";
import Blouse from "../../../../../assets/images/blouse.png";
import Socks from "../../../../../assets/images/socks.png";
import Handkerchief from "../../../../../assets/images/handkerchief.png";

function WhiteGarmentsP(props) {
  const { garments, handleChange } = props;

  return (
    <div>
      <section className="order-details-options mt-4">
        <div className="d-flex flex-wrap gap-2">
          <article className="d-flex justify-content-between card flex-grow-1">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Shirt} alt="Shirt" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Shirt</label>
              </div>
              <Form.Control
                type="number"
                name="whitegart_tshirt"
                onChange={handleChange}
                value={garments.values.whitegart_tshirt}
                id="shirtInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card flex-grow-1">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Underwear} alt="Underwear" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Underwear</label>
              </div>
              <Form.Control
                type="number"
                name="whitegart_underwear"
                onChange={handleChange}
                value={garments.values.whitegart_underwear}
                id="underwearInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card flex-grow-1">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Short} alt="Short" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Short</label>
              </div>
              <Form.Control
                type="number"
                name="whitegart_shorts"
                onChange={handleChange}
                value={garments.values.whitegart_shorts}
                id="shortInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card flex-grow-1">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Trousers} alt="Trousers" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Trousers</label>
              </div>
              <Form.Control
                type="number"
                name="whitegart_trousers"
                onChange={handleChange}
                value={garments.values.whitegart_trousers}
                id="trousersInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card flex-grow-1">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Jacket} alt="Jacket" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Jacket</label>
              </div>
              <Form.Control
                type="number"
                name="whitegart_jacket"
                onChange={handleChange}
                value={garments.values.whitegart_jacket}
                id="hoodieInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card flex-grow-1">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Blouse} alt="Blouse" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Blouse</label>
              </div>
              <Form.Control
                type="number"
                name="whitegart_blouse"
                onChange={handleChange}
                value={garments.values.whitegart_blouse}
                id="blouseInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card flex-grow-1">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Socks} alt="Socks" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Socks</label>
              </div>
              <Form.Control
                type="number"
                name="whitegart_socks"
                onChange={handleChange}
                value={garments.values.whitegart_socks}
                id="socksInput"
                style={{lineHeight:"0", padding:"0", border:"0 solid transparent", borderBottom:"1px solid #ccc", borderRadius:"0", outline:"0", marginBottom:"5px", textAlign:"center"}}
                placeholder="How many?"
                required
              />
            </div>
          </article>
          <article className="d-flex justify-content-between card flex-grow-1">
            <div className="card-body">
              <div className="d-flex mb-2 align-items-center">
                <img src={Handkerchief} alt="Handkerchief" className="img-fluid" style={{ width:"30px", height:"30px", marginRight:"15px"}}/>
                <label htmlFor="shirtInput">Handkerchief</label>
              </div>
              <Form.Control
                type="number"
                name="whitegart_handkerchief"
                onChange={handleChange}
                value={garments.values.whitegart_handkerchief}
                id="handkerchiefInput"
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

export default WhiteGarmentsP;
