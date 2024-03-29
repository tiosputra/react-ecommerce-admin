import React, { useState } from "react";
import { Modal, Button } from "@material-ui/core";
import useStyles from "./styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

function TransactionDetailResiModal({ open, handleClose, handleResi, resi }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Ubah Status Menjadi Dikirim ?</h2>
        <p>Dengan nomor resi {resi}</p>
        <div>
          <Button variant="contained" onClick={handleClose}>
            Batal
          </Button>

          <Button variant="contained" color="secondary" onClick={handleResi}>
            KIRIM
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default TransactionDetailResiModal;
