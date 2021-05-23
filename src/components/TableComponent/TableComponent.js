import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import ModalComponent from "../ModalComponent/ModalComponent";
import { rowsActions } from "../../store/index";
import { modalActions } from "../../store/index";
import "./TableComponent.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

export const convertToReqFormat = (index, inflow, outflow, value) => ({
  id: index,
  inflow,
  outflow,
  value,
  isEditMode: false,
});

export const convertToStoreRowFormat = (index, inflow, outflow, value) => ({
  inflow,
  outflow,
  value,
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
          inputProps={{
            "data-testid": name,
            type: name === "value" ? "number" : "text",
          }}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

export const TableComponent = (props) => {
  const { t } = useTranslation();

  const [tableRows, setTableRows] = React.useState([]);
  const [previous, setPrevious] = React.useState({});

  const classes = useStyles();

  useEffect(() => {
    const mapTableRows = [];
    props.rowsData?.map((item, index) => {
      mapTableRows.push(convertToReqFormat(index, ...Object.values(item)));
    });
    setTableRows(mapTableRows);
  }, [props.rowsLength]);

  const onToggleEditMode = (id) => {
    setTableRows((state) => {
      return tableRows?.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = tableRows?.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    let mainRows = [];
    newRows.map((item, index) => {
      mainRows.push(convertToStoreRowFormat(...Object.values(item)));
    });
    props.rowsActions.upDateRow(mainRows);
    setTableRows(newRows);
  };

  const onRevert = (id) => {
    const newRows = tableRows?.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    let mainRows = [];
    newRows.map((item, index) => {
      mainRows.push(convertToStoreRowFormat(...Object.values(item)));
    });
    props.rowsActions.upDateRow(mainRows);
    setTableRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const onDelete = (id) => {
    props.rowsActions.deleteRow(id);
    tableRows.splice(id, 1);
    setTableRows(tableRows);
  };

  const openModal = () => {
    props.modalActions.displayModal();
  };

  return (
    <div className="container">
      <div className="table-container">
        <div>
          <h2>{t("Table_Header_Title")}</h2>
        </div>
        <div className="add-new-button">
          <button
            type="button"
            className="btn btn-primary float-left open-modal"
            onClick={openModal}
          >
            {t("AddNewRow_ButtonText")}
          </button>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="left" />
                <TableCell align="left" />
                {props.headers?.map((header) => (
                  <TableCell align="left">{t(header)}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.selectTableCell}>
                    {row.isEditMode ? (
                      <>
                        <IconButton
                          aria-label="done"
                          name="done"
                          role="button"
                          data-testid="doneIcon"
                          disabled={
                            !row["inflow"] || !row["outflow"] || !row["value"]
                          }
                          onClick={() => onToggleEditMode(row.id)}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          aria-label="revert"
                          className="revert-button"
                          data-testid="revertIcon"
                          onClick={() => onRevert(row.id)}
                        >
                          <RevertIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        onClick={() => onToggleEditMode(row.id)}
                        data-testid="editInput"
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell className={classes.selectTableCell}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(row.id)}
                      data-testid="deleteIcon"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <CustomTableCell {...{ row, name: "inflow", onChange }} />
                  <CustomTableCell {...{ row, name: "outflow", onChange }} />
                  <CustomTableCell {...{ row, name: "value", onChange }} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {props.isModalOpen && <ModalComponent />}
      </div>
    </div>
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
    rowsData: state.rows.rows,
    headers: state.rows.headers,
    isModalOpen: state.modal.showModal,
    rowsLength: state.rows.length,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
