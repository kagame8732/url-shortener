import {
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 10, align: "center" },
  { id: "url", label: "URL", minWidth: 100, align: "left" },
  {
    id: "ttlInSeconds",
    label: "TTL",
    minWidth: 100,
    align: "center",
  },
  {
    id: "createdDate",
    label: "Creation Date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "modifiedDate",
    label: "Last Changed Date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
  },
];

const AdminOverView = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { urls } = useSelector((state: RootState) => state.getAllURLS);
  const { message } = useSelector((state: RootState) => state.deleteShortened);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(apis.getAllURLS() as unknown as UnknownAction);
  }, [dispatch]);

  useEffect(() => {
    if(message){
      dispatch(apis.reset())
      toast.success(message)
      setTimeout(() => {
        dispatch(apis.getAllURLS() as unknown as UnknownAction);
      }, 3000)
    }
  }, [dispatch, message])

  return (
    <div className="px-5 pt-10">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Toolbar>
          <Button
            variant="outlined"
            color="primary"
            className="w-[200px]"
          >
            Add
          </Button>
        </Toolbar>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {urls
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: ShortenedUrl) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value =
                          column.id === "createdDate" ||
                          column.id === "modifiedDate"
                            ? `${row[column.id]?.split("T")[0]} ${row[column.id]
                                ?.split("T")[1]
                                .substring(0, 5)}`
                            : row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "actions" ? (
                              <>
                                <ButtonGroup
                                  disableElevation
                                  variant="contained"
                                  aria-label="Disabled button group"
                                >
                                  <IconButton
                                    aria-label="edit"
                                    color="primary"
                                  >
                                    <EditOutlined/>
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => dispatch(apis.deleteShortened(row?.id) as unknown as UnknownAction)}
                                  >
                                    <DeleteOutline />
                                  </IconButton>
                                </ButtonGroup>
                              </>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={urls?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default AdminOverView;
