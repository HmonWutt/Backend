import { useRef, useState, useEffect } from "react";
import { Visibility } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";

export default function Password({ labeltext, placeholdertext, idtext, next }) {
  const [passwordShow, setPasswordShow] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef();

  const handleClickShowPassword = () => {
    setPasswordShow(!passwordShow);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    next(value);
  }, [value]);
  return (
    <div
      className="input"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <label
        style={{
          color: "black",
          textShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        {labeltext}
      </label>
      <Input
        type={passwordShow ? "text" : "password"}
        id={idtext}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholdertext}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              style={{ boxShadow: "none" }}
            >
              {passwordShow ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />

      <div></div>
      <small id="usernameerror" className="text-danger form-text"></small>
    </div>
  );
}
