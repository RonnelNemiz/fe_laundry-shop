import {
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from '../../../../../components/ConfirmationDialog';
import EditUsers from './EditUsers';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewUser from "./ViewUser";

function DataTable(props) {
  const {
    data = [],
    columns = [],
    onChangePage,
    onRowsChangePage,
    withPagination = false,
    withNumber,
    onDelete,
    onEdit,
    loading,
    deleteLoading,
    editLoading,
    forceUpdate,
    onRowClick,
    ...rest
  } = props;

  

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);

    const getCellValue = (item, col) => {
        const keys = (col.name && col.name.split(".")) || [];
        if (keys.length === 0) {
            return "";
        }
        let value = item;
        keys.forEach((key) => {
            value = value[key] !== undefined && value[key] !== null ? value[key] : "";
        });
       // Generate image preview URL if column is an image
    if (col.type === "image" && value) {
        return <img src={item.image} alt="Preview" style={{ width: "100px" }} />;
      }
  
        return value;
    };

  const handleChangePage = (event, newPage) => {
    onChangePage && onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsChangePage && onRowsChangePage(event.target.value);
  };

    const paginationProps = {
        rowsPerPageOptions: [10, 25, 50, 100, 150, 250],
        components: "div",
        count: 1,
        rowsPerPage: 10,
        page: 1,
        ...rest,
    };
    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };
    const handleConfirmEdit = () => {
        onEdit && onEdit(selectedItem.id, selectedItem, hideDeleteModal);
        setShowEditModal(false);
    };
    const handleDelete = (item) => {
        console.log(item)
        setSelectedItem(item);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = () => {
        onDelete && onDelete(selectedItem.id, selectedItem, hideDeleteModal);
        setShowDeleteModal(false);
    };

  const hideDeleteModal = (hide) => {
    if (hide) {
      setShowDeleteModal(false);
    }
  };
  const handleView = (item) => { 
    setViewUser(item);
}

    return (
        <Paper>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead
                        sx={{
                            "& th": {
                                color: "white",
                                backgroundColor: "#0E4C91",
                            },
                        }}>
                        <TableRow>
                            {(onDelete || onEdit || withNumber) && (
                                <TableCell size="small">Actions</TableCell>
                            )}
                            {columns.map((column, index) => (
                                <TableCell size="small" key={index}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading &&
                            data.map((item, itemIndex) => (
                                <TableRow key={itemIndex} >
                                    {(onDelete || onEdit || withNumber) && (
                                        <TableCell size="small" sx={{ display: "flex" }}>
                                            {withNumber && itemIndex + 1}
                                            {onRowClick && (
                                                <IconButton size="small" color="gray" onClick={() => handleView(item)}>
                                                    <VisibilityIcon   />
                                                </IconButton>
                                        
                                             )}
                                            {onEdit && (
                                                <IconButton size="small" color="primary" onClick={() => handleEdit(item)}>
                                                    <EditIcon />
                                                </IconButton>
                                            )}
                                            {onDelete && (
                                                <IconButton size="small" color="error" onClick={() => handleDelete(item)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    )}
                                    {columns.map((col, colIndex) => (
                                        <TableCell size="small" key={colIndex}>
                                            {col.customBodyRender
                                                ?  col.customBodyRender(
                                                    getCellValue(item, col),
                                                    item,
                                                    colIndex,
                                                    itemIndex
                                                )
                                                : getCellValue(item, col)}
                                        </TableCell>
                                      
                                    ))} 
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {!loading && data.length === 0 && (
                    <Typography align="center">No item(s) at the moment</Typography>
                )}
            </TableContainer>
            {withPagination && (
                <TablePagination
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    {...paginationProps}
                />
            )}
            {loading && (
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
            )}
            <ConfirmationDialog
                title="Deletion"
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                message="Are you sure you want to delete this item?"
                onConfirm={() => handleConfirmDelete(selectedItem)}
                loading={deleteLoading}
            />
            <EditUsers
                forceUpdate={forceUpdate}
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
                onConfirm={handleConfirmEdit}
                selectedItem={selectedItem}
                loading={editLoading}
            />
             <ViewUser 
              sx={{width:"200%"}} 
              viewUser={viewUser} 
              onClose={() => setViewUser(null) }
              profileImage={viewUser && viewUser.profileImage} // Pass the profile image as a prop
            />
        </Paper>
    )
}

export default memo(DataTable);
