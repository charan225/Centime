import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactShallowRenderer from "react-test-renderer/shallow";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import { TableComponent } from "./TableComponent.js";
import { convertToReqFormat } from "./TableComponent.js";
import {
  initialRowState,
  headers,
  mainData,
  altMainData,
} from "../../fixtures/mainData.js";

let store, wrapper, renderComponent;
let modalActions = {
  closeModal: jest.fn(),
  displayModal: jest.fn(),
};
let rowsActions = {
  addRow: jest.fn(),
  upDateRow: jest.fn(),
  deleteRow: jest.fn(),
};
beforeAll(() => {
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
});
