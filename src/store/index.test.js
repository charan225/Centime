import { render, screen } from "@testing-library/react";
import { rowsSlice, modalSlice } from "./index.js";

describe("Modal Slice", () => {
  test("Display Modal", () => {
    const initialModalState = { showModal: false };
    const result = modalSlice.reducer(
      initialModalState,
      modalSlice.actions.displayModal()
    );

    expect(result.showModal).toEqual(true);
  });

  test("Close Modal", () => {
    const initialModalState = { showModal: false };
    const result = modalSlice.reducer(
      initialModalState,
      modalSlice.actions.closeModal()
    );

    expect(result.showModal).toEqual(false);
  });
});

describe("Row Slice", () => {
  const mainData = [
    { inflow: "Salary", outflow: "Bills and Finance", value: 1300 },
    { inflow: "Rental", outflow: "Savings", value: 800 },
  ];
  const headers = ["Inflow", "Outflow", "Value"];
  const initialRowState = {
    headers: headers,
    rows: mainData,
    length: mainData.length,
  };

  test("Add new row using row slice", () => {
    const result = rowsSlice.reducer(
      initialRowState,
      rowsSlice.actions.addRow({
        inflow: "Investments",
        outflow: "Shares",
        value: 600,
      })
    );

    expect(result.rows).toEqual([
      { inflow: "Salary", outflow: "Bills and Finance", value: 1300 },
      { inflow: "Rental", outflow: "Savings", value: 800 },
      {
        inflow: "Investments",
        outflow: "Shares",
        value: 600,
      },
    ]);
  });

  test("Update rows using row slice", () => {
    const result = rowsSlice.reducer(
      initialRowState,
      rowsSlice.actions.upDateRow([
        {
          inflow: "Rental",
          outflow: "Savings",
          value: 800,
        },
      ])
    );

    expect(result.rows).toEqual([
      {
        inflow: "Rental",
        outflow: "Savings",
        value: 800,
      },
    ]);
  });

  test("Delete new row using row slice", () => {
    const result = rowsSlice.reducer(
      initialRowState,
      rowsSlice.actions.deleteRow(1)
    );

    expect(result.rows).toEqual([
      { inflow: "Salary", outflow: "Bills and Finance", value: 1300 },
    ]);
  });
});
