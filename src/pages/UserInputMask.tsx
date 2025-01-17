import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";

const UserInputMask = () => {
  const { t } = useTranslation(); // Translation function
  const dispatch = useDispatch(); // Redux dispatch function

   // State hooks for managing input, output, errors, and copy status
  const [urlInput, setUrlInput] = useState<string>("");
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

   // Access the relevant state from the Redux store
  const { data, loading } = useSelector(
    (state: RootState) => state.newShortenURL
  );

  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-zA-Z0-9@:%._+~#=]*)*(\?[;&a-zA-Z0-9@:%_+.~#?&//=]*)?(#[\w-]*)?$/,"i"
    );
    
    return urlPattern.test(url);
  };

// Function to copy the output URL to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(outputUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleGoClick = () => {
    const formattedUrl = urlInput.startsWith("https://")
      ? urlInput
      : `https://${urlInput}`;
  
    if (isValidUrl(formattedUrl)) {
      setError("");
      dispatch(apis.newShortenURL(formattedUrl) as unknown as UnknownAction);
    } else {
      setError("Please enter a valid URL");
    }
  };
  
  useEffect(() => {
    if (data && data.id?.length > 0) {
      setOutputUrl(`${import.meta.env.VITE_BASE_URL}/${data["id"]}`);
    }
  }, [data]); 

  return (
    <div className="w-full h-[88%] flex flex-col gap-6 justify-start items-center">
      <div className="flex justify-start items-center w-[70%] mt-[150px]">
        <Box
          component="form"
          noValidate
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <TextField
            error={!!error}
            helperText={error}
            id="outlined-basic"
            label={t("Input URL")}
            variant="outlined"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setError("");
              setOutputUrl("");
            }}
            sx={{ width: "300px" }}
          />
        </Box>

        <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            className="w-[200px]"
            onClick={handleGoClick}
            disabled={!urlInput}
          >{loading ? (
            <CircularProgress color="inherit" size="25px" />
          ) : (
            <>
              {t(`Go`)}
            </>
          )}
          </Button>
        </Stack>
      </div>

      {outputUrl && (
        <div className="flex justify-start items-center w-[70%]">
          <Box
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              id="outlined-basic"
              label={t("Output")}
              variant="outlined"
              disabled
              value={outputUrl}
              onChange={(e) => setOutputUrl(e.target.value)}
              sx={{ width: "300px" }}
            />
          </Box>

          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <Button
              className="w-[200px]"
              variant="contained"
              style={{ marginRight: "10px", borderRadius: "5px" }}
              onClick={() => {
                window.open(outputUrl, "_blank");
              }}
            >
              {t(`Test`)}
            </Button>
            <Button
              className="w-[200px]"
              variant="contained"
              style={{ borderRadius: "5px" }}
              onClick={copyToClipboard}
            >
              {t(copied ? "Url copied" : "Copy")}
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};

export default UserInputMask;