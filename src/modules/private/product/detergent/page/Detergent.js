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
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShowDetergent from "../components/ShowDetergent";
import DeleteDetergent from "../components/DeleteDetergent";
import EditDetergent from "../components/EditDetergent";
import AddDetergent from "../components/AddDetergent";


const Detergent = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [detergentData, setDetergentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] =useState(null);
  const [imageUrls, setImageUrls] = useState({});


  useEffect(() => {
    setIsLoading(true);
    Http.get("/detergents",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then((res) => {
        setDetergentData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);
  
  const handleUpdate = (values) => {
    Http.get(`update/detergents/${values}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}).then(
    );
  };
  const handleDelete = (id) => {
    Http.delete(`delete/detergents/${id}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(

      );
  };
  const handleShow = (id) => {
    Http.get(`view/detergents/${id}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then((res) => {
        setSelectedItem(res.data);
        setImageUrls((prevImageUrls) => ({
          ...prevImageUrls,
          [id]: res.data.image_url
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <>
    <AddDetergent  forceUpdate={() => forceUpdate()} />
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
              <TableCell size="small">Detergent Name</TableCell>
              <TableCell size="small">Price </TableCell>
              <TableCell size="small">Scoop</TableCell>
              <TableCell size="small">Image</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {detergentData.map((detergent) => (
              <TableRow key={detergent.id}>
                 <TableCell size="small" sx={{display:"flex", alignItems:"center"}}>
                  <VisibilityIcon 
                    onClick={() => handleShow(detergent.id)}
                    style={{cursor:"pointer", color:"gray"}}
                  />
                  <EditDetergent
                      selectedItem={detergent}
                      onEdit={handleUpdate}
                      forceUpdate={() => forceUpdate()}
                    />
                  <DeleteDetergent
                  selectedItem={detergent}
                  onDelete={handleDelete} 
                    forceUpdate={() => forceUpdate()} />

                </TableCell>
                <TableCell size="small">{detergent.detergent_name}</TableCell>
                <TableCell size="small" sx={{width:"40%"}}>{detergent.detergent_price}</TableCell>
                <TableCell size="small">{detergent.detergent_scoop}</TableCell>
                <TableCell size="small">
                  {detergent && detergent.image && (
                    <img src={imageUrls[detergent.id]} alt="Fabcon Image" style={{ width: '100px' }} />
                  )}
                </TableCell>         
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
           {selectedItem && (
              <ShowDetergent sx={{maxWidth:"500px"}} selectedItem={selectedItem} onClose={() => setSelectedItem(null) } />
           )}   
    </>
  );
};

export default Detergent;
