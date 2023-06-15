import React, { useEffect, useState } from "react";
import Http from "../services/Http";

function Fetchinfo() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    Http.get("/get-info").then((res) => setInfo(res.data));
  }, []);
  return info;
}

export default Fetchinfo;