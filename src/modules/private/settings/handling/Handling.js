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
import Http from "../../../../services/Http";
import AddHandling from "./components/AddHandling";
import EditHandling from "./components/EditHandling";
import DeleteHandling from "./components/DeleteHandling";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShowHandling from "./components/ShowHandling";


const Handling = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [handlingData, setHandlingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Http.get("/handlings")
      .then((res) => {
        setHandlingData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);

  const handleUpdate = (values) => {
    Http.get(`update/handlings/${values}`).then(
    );
  };
  const handleDelete = (id) => {
    Http.delete(`delete/handlings/${id}`)
      .then(

      );
  };
  const handleShow = (id) => {
    Http.get(`view/handlings/${id}`)
      .then((res) => {
        setSelectedItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  return (
    <>
    <AddHandling  forceUpdate={() => forceUpdate()} />
    <TableContainer component={Paper}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead sx={{
                        "& th": {
                            color: "white",
                            backgroundColor: "#0E4C91",
                        },
                    }}>
            <TableRow>
              <TableCell size="small">Actions</TableCell>
              <TableCell size="small">Handling Price</TableCell>
              <TableCell size="small">Handling Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {handlingData.map((handling) => (
              <TableRow key={handling.id}>
                 <TableCell size="small" sx={{display:"flex", alignItems:"center"}}>
                
                <VisibilityIcon 
                   onClick={() => handleShow(handling.id)}
                   style={{ cursor: "pointer", color:"gray" }}
                />
                <EditHandling
                    selectedItem={handling}
                    onEdit={handleUpdate}
                    forceUpdate={() => forceUpdate()}
                  />
                <DeleteHandling 
                selectedItem={handling}
                onDelete={handleDelete} 
                  forceUpdate={() => forceUpdate()} />

              </TableCell>
                <TableCell size="small">{handling.handling_name}</TableCell>
                <TableCell size="small">{handling.handling_price}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
    {selectedItem && (
        <ShowHandling sx={{maxWidth:"500px"}} selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};

export default Handling;
