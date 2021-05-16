import React from 'react'; 
import {useDispatch} from "react-redux";
import { useTranslation } from 'react-i18next';
import {Modal, Button} from 'react-bootstrap';

import {rowsActions} from '../../store/index';
import {modalActions} from '../../store/index';

import "./ModalComponent.css";

const ModalComponent = (props) => {
  const [row, setRow] = React.useState({});
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submitForm = () => {
    dispatch(rowsActions.addRow(row));
    dispatch(modalActions.closeModal());
  }

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  }
  
  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let newRow = { ...row, [name]: value };
    setRow(newRow);
  }

  const validateForm = () => {
    if (row['inflow'] && row['outflow'] && row['value']) {
      return false;
    }
    return true;
  }

  return (
    <Modal show={true} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Modal_header_Title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form className="new-flow-form-container">
            <div className="form-group">
              <label className="required">{t('Inflow_Text')}</label>
              <input type="text" className="form-control" name="inflow" onChange={onChange} />
            </div>
            <div className="form-group">
              <label className="required">{t('Outflow_Text')}</label>
              <input type="text" className="form-control" name="outflow" onChange={onChange} />
            </div>
            <div className="form-group">
              <label className="required">{t('Value_Text')}</label>
              <input type="number" className="form-control" name="value" onChange={onChange} />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal} >
          {t('Close_ButtonText')}
        </Button>
        <Button variant="primary" onClick={submitForm} disabled={validateForm()}>
          {t('Save_Changes')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalComponent;