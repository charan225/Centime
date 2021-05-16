import {createSlice, configureStore} from '@reduxjs/toolkit';

const mainData = [
    { inflow: "Salary", outflow: "Bills and Finance", value: 1300 },
    { inflow: "Rental", outflow: "Savings", value: 800 },  
    { inflow: "Income from shares", outflow: "Investments", value: 600 },
    { inflow: "Bills and Finance", outflow: "Electricity Bill", value: 500 },
    { inflow: "Bills and Finance", outflow: "Mobile Bill", value: 300 },
    { inflow: "Investments", outflow: "Shares", value: 600 },    
    { inflow: "Bills and Finance", outflow: "Home loan", value: 500 },
  ];

const headers = ["Inflow","Outflow","Value"];
const initialRowState = {headers: headers, rows: mainData, length: mainData.length};

const rowsSlice = createSlice({
    name: 'rows',
    initialState: initialRowState,
    reducers:{
        addRow(state, row){
            state.rows.push(row.payload);
            state.length++;
        },
        upDateRow(state, rows){
            state.rows = rows.payload; 
            state.length = rows.payload.length;
        },
        deleteRow(state, id){
            state.rows.splice(id.payload, 1);
            state.length--;
        }
    }
});

const initialModalState = { showModal: false };

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers:{
        displayModal(state, row){
            state.showModal = true;
        },
        closeModal(state, rows){
            state.showModal = false;
        }        
    }
});

const store = configureStore({reducer: {rows: rowsSlice.reducer, modal: modalSlice.reducer}});

export const rowsActions = rowsSlice.actions;
export const modalActions = modalSlice.actions;
export default store;