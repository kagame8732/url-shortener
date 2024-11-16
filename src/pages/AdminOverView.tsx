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
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

type UrlDataType = {
  id: string,
  url: string,
  ttlInSeconds: string,
  createdDate: string,
  modifiedDate: string,
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 10, align: "center" },
  { id: "url", label: "URL", minWidth: 100, align: "left" },
  { id: "ttlInSeconds", label: "TTL", minWidth: 100, align: "center" },
  { id: "createdDate", label: "Creation Date", minWidth: 100, align: "center" },
  { id: "modifiedDate", label: "Last Changed Date", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const AdminOverView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<"add" | "edit">("add");
  const [urlError, setUrlError] = React.useState<string>("");
  const [urlData, setUrlData] = React.useState({
    id: '',
    url: '',
    ttlInSeconds: ''
  })

  const { urls } = useSelector((state: RootState) => state.getAllURLS);
  const { message } = useSelector((state: RootState) => state.deleteShortened);
  const { successMessage } = useSelector((state: RootState) => state.editShortened);
  const { savedSuccefulMessage } = useSelector((state: RootState) => state.addShortenerUrl);

  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*" +
        "(\\?[;&a-zA-Z0-9@:%_\\+.~#?&//=]*)?" +
        "(\\#[-a-zA-Z0-9_]*)?$",
      "i"
    );
    return urlPattern.test(url);
  };

  const handleSave = () => {
    const formattedUrl = urlData.url.startsWith("https://")
      ? urlData.url
      : `https://${urlData.url}`;
  
    if (!isValidUrl(formattedUrl)) {
      setUrlError("Please enter a valid URL");
      return;
    }
  
    const updatedUrlData = { ...urlData, url: formattedUrl };
  
    if (dialogMode === "edit") {
      dispatch(apis.editShortened(updatedUrlData) as unknown as UnknownAction);
    } else if (dialogMode === "add") {
      dispatch(apis.addShortenerUrl(updatedUrlData) as unknown as UnknownAction);
    }
  
    setOpenDialog(false);
  };  


  const handleOpenDialog = (mode: "add" | "edit", id?: string) => {
    setDialogMode(mode);

    if (mode === "edit" && id) {
      const currentUrl = urls?.find((url: { id: string; }) => url?.id === id) as unknown as UrlDataType;
      if (currentUrl) {
        setUrlData({
          id: currentUrl.id,
          url: currentUrl.url,
          ttlInSeconds: currentUrl.ttlInSeconds,
        });
      }
    } else {
      setUrlData({
        id: "",
        url: "",
        ttlInSeconds: "",
      });
    }

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


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
    if (message || successMessage || savedSuccefulMessage) {
      dispatch(apis.reset());
      toast.success(message || successMessage || savedSuccefulMessage);
      setTimeout(() => {
        dispatch(apis.getAllURLS() as unknown as UnknownAction);
      }, 3000);
    }
  }, [dispatch, message, successMessage, savedSuccefulMessage]);

  return (
    <div className="px-5 pt-10">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Toolbar>
          <Button
            variant="contained"
            color="primary"
            className="w-[150px]"
            onClick={() => handleOpenDialog("add")}
          >
            {t(`Add`)}
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
                    {t(column.label)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {urls
                ?.slice()
                .sort((a: { modifiedDate: string, createdDate: string }, b: { modifiedDate: string, createdDate: string }) => {
                  const dateA = new Date(a.modifiedDate || a.createdDate).getTime();
                  const dateB = new Date(b.modifiedDate || b.createdDate).getTime();
                  return dateB - dateA;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                    onClick={() => handleOpenDialog("edit", row.id)}
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        PaperProps={{
          component: 'form',
        }}
      >
        <DialogTitle>
          {t(dialogMode === "edit" ? "Edit URL" : "Add URL")}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gridTemplateColumns: { sm: "1fr 1fr" },
            gap: 2,
            marginTop: 4
          }}
        >
          {dialogMode === "add" && (
            <TextField
              id="outlined-basic"
              label={t("ID")}
              variant="outlined"
              value={urlData?.id}
              onChange={(e) => {
                setUrlData({
                  id: e.target.value,
                  url: urlData?.url,
                  ttlInSeconds: urlData?.ttlInSeconds
                });
              }}
              sx={{ width: "500px" }}
            />
          )}
          <TextField
            error={!!urlError}
            helperText={urlError}
            id="outlined-basic"
            label={t("URL")}
            variant="outlined"
            value={urlData?.url}
            onChange={(e) => {
              setUrlData({
                id: urlData?.id,
                url: e.target.value,
                ttlInSeconds: urlData?.ttlInSeconds
              });
              setUrlError("");
            }}
            sx={{ width: "500px" }}
          />
          <TextField
            id="outlined-basic"
            label={t("TTL")}
            variant="outlined"
            value={urlData?.ttlInSeconds || ''}
            onChange={(e) => {
              setUrlData({
                id: urlData?.id,
                url: urlData?.url,
                ttlInSeconds: e.target.value
              });
            }}
            sx={{ width: "500px" }}
          />
        </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog}>
            {t(`Cancel`)}
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {t(`Save Changes`)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminOverView;