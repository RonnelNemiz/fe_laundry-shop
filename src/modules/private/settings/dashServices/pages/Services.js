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
import AddServices from './../components/AddServices';
import EditServices from './../components/EditServices';
import DeleteServices from "../components/DeleteServices";
import Http from "../../../../../services/Http";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShowHandling from "../../handling/components/ShowHandling";


const Services = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] =useState(null);
  const [imageUrls, setImageUrls] = useState({});


  useEffect(() => {
    setIsLoading(true);
    Http.get("/services",{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then((res) => {
        setServiceData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ignored]);
  
  const handleUpdate = (values) => {
    Http.get(`update/services/${values}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }}).then(
    );
  };
  const handleDelete = (id) => {
    Http.delete(`delete/services/${id}`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }})
      .then(

      );
  };
  const handleShow = (id) => {
    Http.get(`view/services/${id}`,{headers:{
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
    <AddServices  forceUpdate={() => forceUpdate()} />
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
              <TableCell size="small">Service Name</TableCell>
              <TableCell size="small">Description </TableCell>
              <TableCell size="small">Price </TableCell>
              <TableCell size="small">Image</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceData.map((service) => (
              <TableRow key={service.id}>
                 <TableCell size="small" sx={{display:"flex", alignItems:"center"}}>
                  <VisibilityIcon 
                    onClick={() => handleShow(service.id)}
                    style={{cursor:"pointer", color:"gray"}}
                  />
                  <EditServices
                      selectedItem={service}
                      onEdit={handleUpdate}
                      forceUpdate={() => forceUpdate()}
                    />
                  <DeleteServices
                  selectedItem={service}
                  onDelete={handleDelete} 
                    forceUpdate={() => forceUpdate()} />

                </TableCell>
                <TableCell size="small">{service.service_name}</TableCell>
                <TableCell size="small" sx={{width:"40%"}}>{service.description}</TableCell>
                <TableCell size="small">{service.service_price}</TableCell>
                {/* <TableCell size="small">{service.image}</TableCell> */}
                <TableCell size="small">
                  {service.image && (
                    <img src={imageUrls[service.id]} alt="Service Image" style={{ width: '100px' }} />
                  )}
                </TableCell>


               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
           {selectedItem && (
              <ShowHandling sx={{maxWidth:"500px"}} selectedItem={selectedItem} onClose={() => setSelectedItem(null) } />
           )}   
    </>
  );
};

export default Services;
