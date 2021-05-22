import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";

import { rowsActions } from "../../store/index";
import { modalActions } from "../../store/index";

import "./ModalComponent.css";

export const ModalComponent = (props) => {
  const [row, setRow] = useState({});
  const { t } = useTranslation();

  const submitForm = () => {
    props.rowsActions.addRow(row);
    props.modalActions.closeModal();
  };

  const closeModal = () => {
    props.modalActions.closeModal();
  };

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let newRow = { ...row, [name]: value };
    setRow(newRow);
  };

  const validateForm = () => {
    if (row["inflow"] && row["outflow"] && row["value"]) {
      return false;
    }
    return true;
  };

  return (
    <Modal show={true} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t("Modal_header_Title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form className="new-flow-form-container">
            <div className="form-group">
              <label className="required" htmlFor="inflow-input">
                {t("Inflow_Text")}
              </label>
              <input
                id="inflow-input"
                type="text"
                className="form-control"
                name="inflow"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label className="required" htmlFor="outflow-input">
                {t("Outflow_Text")}
              </label>
              <input
                id="outflow-input"
                type="text"
                className="form-control"
                name="outflow"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label className="required" htmlFor="value-input">
                {t("Value_Text")}
              </label>
              <input
                type="number"
                className="form-control"
                name="value"
                onChange={onChange}
                id="value-input"
              />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          {t("Close_ButtonText")}
        </Button>
        <Button
          variant="primary"
          onClick={submitForm}
          disabled={validateForm()}
        >
          {t("Save_Changes")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    rowsActions: bindActionCreators(rowsActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.modal.showModal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
