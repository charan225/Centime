import { render, screen } from "@testing-library/react";
import ReactShallowRenderer from "react-test-renderer/shallow";
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";

import { Provider } from "react-redux";
import store from "../../store/index";

import TableComponent from "./TableComponent.js";
import { convertToReqFormat } from "./TableComponent.js";

describe("Table component", () => {
  test("Test table header", () => {
    render(
      <Provider store={store}>
        <TableComponent />
      </Provider>
    );
    const linkElement = screen.getByText("Table_Header_title", {
      exact: false,
    });
    expect(linkElement).toBeInTheDocument();
  });

  test("Initial render", () => {
    render(
      <Provider store={store}>
        <TableComponent />
      </Provider>
    );
    const tableElement = screen.getAllByRole("row");
    expect(tableElement).not.toHaveLength(0);
  });

  test("Render headers", async () => {
    render(
      <Provider store={store}>
        <TableComponent />
      </Provider>
    );
    const tableElement = await screen.findAllByRole("columnheader");
    expect(tableElement).not.toHaveLength(0);
  });

  test("Render initial data", async () => {
    render(
      <Provider store={store}>
        <TableComponent />
      </Provider>
    );
    const tableElement = await screen.findAllByRole("cell");
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
    const wrapper = mount(
      <Provider store={store}>
        <TableComponent />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
