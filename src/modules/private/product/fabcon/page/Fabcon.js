import React, { useState, useEffect, useReducer } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import Http from "../../../../../services/Http";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShowFabcon from "../compponents/ShowFabcon";
import DeleteFabcon from "../compponents/DeleteFabcon";
import EditFabcon from "../compponents/EditFabcon";
import AddFabcon from "../compponents/AddFabcon";

const Fabcon = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [fabconData, setFabconData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    setIsLoading(true);
    Http.get("/fabcons"
    // ,{headers:{
    //   Authorization: `Bearer ${localStorage.getItem("access_token")}`
    // }}
    )
      .then((res) => {
        setFabconData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);

  const handleUpdate = (values) => {
    Http.get(`update/fabcons/${values}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}).then();
  };

  const handleDelete = (id) => {
    Http.delete(`delete/fabcons/${id}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}).then();
  };
  const handleShow = (id) => {
    Http.get(`view/fabcons/${id}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then((res) => {
        setSelectedItem(res.data);
        setImageUrls((prevImageUrls) => ({
          ...prevImageUrls,
          [id]: res.data.image_url,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AddFabcon forceUpdate={() => forceUpdate()} />
      <TableContainer component={Paper}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead
              sx={{
                "& th": {
                  color: "white",
                  backgroundColor: "#0E4C91",
                },
              }}
            >
              <TableRow>
                <TableCell size="small">Actions</TableCell>
                <TableCell size="small">Fabcon Name</TableCell>
                <TableCell size="small">Price </TableCell>
                <TableCell size="small">Cups</TableCell>
                <TableCell size="small">Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fabconData.map((fabcon) => (
                <TableRow key={fabcon.id}>
                  <TableCell
                    size="small"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <VisibilityIcon
                      onClick={() => handleShow(fabcon.id)}
                      style={{ cursor: "pointer", color: "gray" }}
                    />
                    <EditFabcon
                      selectedItem={fabcon}
                      onEdit={handleUpdate}
                      forceUpdate={() => forceUpdate()}
                    />
                    <DeleteFabcon
                      selectedItem={fabcon}
                      onDelete={handleDelete}
                      forceUpdate={() => forceUpdate()}
                    />
                  </TableCell>
                  <TableCell size="small">{fabcon.fabcon_name}</TableCell>
                  <TableCell size="small" sx={{ width: "40%" }}>
                    {fabcon.fabcon_price}
                  </TableCell>
                  <TableCell size="small">{fabcon.fabcon_scoop}</TableCell>
                  {/* <TableCell size="small">
                  {fabcon && fabcon.image && (
                    <img src={imageUrls[fabcon.id]} alt="Fabcon Image" style={{ width: '100px' }} />
                  )}
                </TableCell>          */}

                  <TableCell size="small">
                    {fabcon && fabcon.image && (
                      <img
                        src={fabcon.image_url}
                        alt="Fabcon Image"
                        style={{ width: "100px" }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {selectedItem && (
        <ShowFabcon
          sx={{ maxWidth: "500px" }}
          selectedItem={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default Fabcon;
