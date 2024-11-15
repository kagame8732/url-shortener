import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import { useError } from "../context/ErrorContext";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const UserInputMask = () => {
  const { addError } = useError();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [urlInput, setUrlInput] = useState<string>("");
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const { data, message } = useSelector(
    (state: RootState) => state.newShortenURL
  );

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

  const copyToClipboard = () => {
    // const text = "Text to be copied";
    navigator.clipboard
      .writeText(outputUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 5000);
        // alert('Text copied to clipboard!');
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleGoClick = () => {
    if (isValidUrl(urlInput)) {
      setError("");
      // setOutputUrl(urlInput);
      dispatch(apis.newShortenURL(urlInput) as unknown as UnknownAction);
    } else {
      setError("Please enter a valid URL");
      // addError('Please enter a valid URL');
    }
  };

  console.log("data", JSON.stringify(data, null, 2));
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
            label="Input URL"
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
            variant="outlined"
            color="primary"
            className="w-[200px]"
            onClick={handleGoClick}
            disabled={!urlInput}
          >
            Go
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
              label="output"
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
              variant="outlined"
              style={{ marginRight: "10px", borderRadius: "5px" }}
              onClick={() => {
                window.open(outputUrl, "_blank");
              }}
            >
              Test
            </Button>
            <Button
              className="w-[200px]"
              variant="outlined"
              style={{ borderRadius: "5px" }}
              onClick={copyToClipboard}
            >
              {copied ? "Url copied" : "Copy"}
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};

export default UserInputMask;
