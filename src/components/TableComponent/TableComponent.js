import React, { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useTranslation } from 'react-i18next';

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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import ModalComponent from "../ModalComponent/ModalComponent";
import {rowsActions} from '../../store/index';
import {modalActions} from '../../store/index';
import "./TableComponent.css"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));

const createData = (index, inflow, outflow, value) => ({
    id: index,
    inflow,
    outflow,
    value,
    isEditMode: false
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
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

const TableComponent = (props) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const rowsData = useSelector((state) => state.rows.rows);
    const Headers = useSelector((state) => state.rows.headers);
    const isModalOpen = useSelector((state) => state.modal.showModal);
    const rowsLength = useSelector((state) => state.rows.length);

    const [tableRows, setTableRows] = React.useState([]);
    const [previous, setPrevious] = React.useState({});

    const classes = useStyles();

    useEffect(() => {
        const mapTableRows = [];
        rowsData.map((item, index) => {
            mapTableRows.push(createData(index, ...Object.values(item)));
        })
        setTableRows(mapTableRows);
    }, [rowsLength]);

    const onToggleEditMode = id => {
        setTableRows(state => {
            return tableRows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = tableRows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        dispatch(rowsActions.upDateRow(newRows));
        setTableRows(newRows);
    };

    const onRevert = id => {
        const newRows = tableRows.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        dispatch(rowsActions.upDateRow(newRows));
        setTableRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };

    const onDelete = id => {
        dispatch(rowsActions.deleteRow(id));
        tableRows.splice(id, 1);
        setTableRows(tableRows);
    }

    const openModal = () => {
        dispatch(modalActions.displayModal());
    }

    return (
        <div className="container">
            <div className="table-container">
                <div className="">
                    <h2>{t('Table_Header_Title')}</h2>
                </div>
                <div className="add-new-button">
                    <button type="button" className="btn btn-primary float-left" onClick={openModal}>{t('AddNewRow_ButtonText')}</button>
                </div>
                <Paper className={classes.root}>
                    <Table className={classes.table} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" />
                                <TableCell align="left" />
                                {Headers.map(header => (
                                    <TableCell align="left">{t(header)}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell className={classes.selectTableCell}>
                                        {row.isEditMode ? (
                                            <>
                                                <IconButton
                                                    aria-label="done"
                                                    onClick={() => onToggleEditMode(row.id)}
                                                >
                                                    <DoneIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="revert"
                                                    onClick={() => onRevert(row.id)}
                                                >
                                                    <RevertIcon />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() => onToggleEditMode(row.id)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                    <TableCell className={classes.selectTableCell}>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => onDelete(row.id)}
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
                {isModalOpen && <ModalComponent />}
            </div>
        </div>
    );
}

export default TableComponent;