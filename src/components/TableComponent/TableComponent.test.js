import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import { TableComponent } from "./TableComponent.js";
import { convertToReqFormat } from "./TableComponent.js";
import { headers, mainData, altMainData } from "../../fixtures/mainData.js";

let wrapper, renderComponent;
let modalActions = {
  closeModal: jest.fn(),
  displayModal: jest.fn(),
};
let rowsActions = {
  addRow: jest.fn(),
  upDateRow: jest.fn(),
  deleteRow: jest.fn(),
};
beforeEach(() => {
  let showModal = false;

  wrapper = shallow(
    <TableComponent
      headers={headers}
      rowsActions={rowsActions}
      modalActions={modalActions}
      isModalOpen={showModal}
      rowsLength={mainData.length}
      rowsData={mainData}
    />
  );
  renderComponent = (
    <TableComponent
      headers={headers}
      rowsActions={rowsActions}
      modalActions={modalActions}
      isModalOpen={showModal}
      rowsLength={mainData.length}
      rowsData={mainData}
    />
  );
});

describe("Table component", () => {
  test("convert data into required format", () => {
    const action = convertToReqFormat(1, "salary", "bills", 21);
    expect(action).toEqual({
      id: 1,
      inflow: "salary",
      outflow: "bills",
      value: 21,
      isEditMode: false,
    });
  });

  test("Initial render", () => {
    render(renderComponent);
    const tableElement = screen.getAllByRole("row");
    expect(tableElement).not.toHaveLength(0);
  });

  test("Render headers", () => {
    render(renderComponent);
    const tableElement = screen.getAllByRole("columnheader");
    expect(tableElement).not.toHaveLength(0);
  });

  test("Render initial data", () => {
    render(renderComponent);
    const tableElement = screen.getAllByRole("cell");
    expect(tableElement).not.toHaveLength(0);
  });

  test("should render table component correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("should render table component correctly with alt data", () => {
    wrapper.setProps({ rowsData: altMainData });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("delete modal when add new button clicked", () => {
    wrapper.find(".open-modal").simulate("click");
    expect(modalActions.displayModal).toHaveBeenCalled();
  });

  test("Display edit mode on clicking edit", () => {
    render(renderComponent);
    const editButtonElement = screen.getAllByTestId("editInput");
    expect(editButtonElement).not.toHaveLength(0);
    expect(screen.queryAllByTestId("inflow")).toHaveLength(0);
    expect(screen.queryAllByTestId("outflow")).toHaveLength(0);
    expect(screen.queryAllByTestId("value")).toHaveLength(0);
    expect(screen.queryAllByTestId("revertIcon")).toHaveLength(0);
    expect(screen.queryAllByTestId("doneIcon")).toHaveLength(0);
    userEvent.click(editButtonElement[0]);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(screen.queryAllByTestId("inflow")).toHaveLength(1);
    expect(screen.queryAllByTestId("outflow")).toHaveLength(1);
    expect(screen.queryAllByTestId("value")).toHaveLength(1);
    expect(screen.queryAllByTestId("revertIcon")).toHaveLength(1);
    expect(screen.queryAllByTestId("doneIcon")).toHaveLength(1);
  });

  test("Delete row on clicking delete icon", () => {
    render(renderComponent);
    const deleteButtonElement = screen.getAllByTestId("deleteIcon");
    expect(deleteButtonElement).not.toHaveLength(0);
    userEvent.click(deleteButtonElement[0]);
    expect(rowsActions.deleteRow).toHaveBeenCalled();
  });

  test("update row on changing inflow input", () => {
    render(renderComponent);
    const editButtonElement = screen.getAllByTestId("editInput");
    expect(editButtonElement).not.toHaveLength(0);
    expect(screen.queryAllByTestId("inflow")).toHaveLength(0);
    userEvent.click(editButtonElement[0]);
    expect(screen.queryAllByTestId("inflow")).not.toHaveLength(0);
    userEvent.clear(screen.queryAllByTestId("inflow")[0]);
    userEvent.type(screen.queryAllByTestId("inflow")[0], "salary");
    expect(screen.queryAllByTestId("inflow")[0]).toHaveValue("salary");
    expect(rowsActions.upDateRow).toHaveBeenCalled();
  });

  test("update row on changing outflow input", () => {
    render(renderComponent);
    const editButtonElement = screen.getAllByTestId("editInput");
    expect(editButtonElement).not.toHaveLength(0);
    expect(screen.queryAllByTestId("outflow")).toHaveLength(0);
    userEvent.click(editButtonElement[0]);
    expect(screen.queryAllByTestId("outflow")).not.toHaveLength(0);
    userEvent.clear(screen.queryAllByTestId("outflow")[0]);
    userEvent.type(screen.queryAllByTestId("outflow")[0], "investment");
    expect(screen.queryAllByTestId("outflow")[0]).toHaveValue("investment");
    expect(rowsActions.upDateRow).toHaveBeenCalled();
  });

  test("value input takes only number as input", () => {
    render(renderComponent);
    const editButtonElement = screen.getAllByTestId("editInput");
    expect(editButtonElement).not.toHaveLength(0);
    expect(screen.queryAllByTestId("value")).toHaveLength(0);
    userEvent.click(editButtonElement[0]);
    expect(screen.queryAllByTestId("value")).not.toHaveLength(0);
    userEvent.clear(screen.queryAllByTestId("value")[0]);
    userEvent.type(screen.queryAllByTestId("value")[0], "123");
    expect(screen.queryAllByTestId("value")[0]).toHaveValue(123);
    expect(rowsActions.upDateRow).toHaveBeenCalled();
    userEvent.type(screen.queryAllByTestId("value")[0], "abc");
    expect(screen.queryAllByTestId("value")[0]).toHaveValue(null);
  });

  test("update row on changing value input", () => {
    render(renderComponent);
    const editButtonElement = screen.getAllByTestId("editInput");
    expect(editButtonElement).not.toHaveLength(0);
    expect(screen.queryAllByTestId("value")).toHaveLength(0);
    userEvent.click(editButtonElement[0]);
    expect(screen.queryAllByTestId("value")).not.toHaveLength(0);
    userEvent.clear(screen.queryAllByTestId("value")[0]);
    userEvent.type(screen.queryAllByTestId("value")[0], "123");
    expect(screen.queryAllByTestId("value")[0]).toHaveValue(123);
    expect(rowsActions.upDateRow).toHaveBeenCalled();
  });

  test("Disable done icon for empty inflow input value", () => {
    render(renderComponent);
    const editButtonElement = screen.getAllByTestId("editInput");
    expect(editButtonElement).not.toHaveLength(0);
    expect(screen.queryAllByTestId("doneIcon")).toHaveLength(0);
    userEvent.click(editButtonElement[0]);
    expect(screen.queryAllByTestId("doneIcon")).toHaveLength(1);
    userEvent.clear(screen.queryAllByTestId("inflow")[0]);
    expect(screen.queryAllByTestId("doneIcon")[0]).toBeDisabled();
  });

  test("Disable done icon for empty outflow input value", () => {
    render(renderComponent);
    const editButtonElement = screen.getAllByTestId("editInput");
    expect(editButtonElement).not.toHaveLength(0);
    expect(screen.queryAllByTestId("doneIcon")).toHaveLength(0);
    userEvent.click(editButtonElement[0]);
    expect(screen.queryAllByTestId("doneIcon")).toHaveLength(1);
    userEvent.clear(screen.queryAllByTestId("outflow")[0]);
    expect(screen.queryAllByTestId("doneIcon")[0]).toBeDisabled();
  });

  test("Disable done icon for empty input value", () => {
    render(renderComponent);
    const editButtonElement = screen.getAllByTestId("editInput");
    expect(editButtonElement).not.toHaveLength(0);
    expect(screen.queryAllByTestId("doneIcon")).toHaveLength(0);
    userEvent.click(editButtonElement[0]);
    expect(screen.queryAllByTestId("doneIcon")).toHaveLength(1);
    userEvent.clear(screen.queryAllByTestId("value")[0]);
    expect(screen.queryAllByTestId("doneIcon")[0]).toBeDisabled();
  });
});
