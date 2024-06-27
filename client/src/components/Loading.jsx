import React from "react";
import {
  Dialog,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0, 0, 30, 0.4)",
  },
}));

export default function LoadingDialog() {
  const classes = useStyles();

  return (
    <Dialog open={true} BackdropProps={{ classes: { root: classes.backDrop } }}>
      <DialogContent style={{ textAlign: "center" }}>
        <Typography variant="body1">Loading...</Typography>
      </DialogContent>
    </Dialog>
  );
}
