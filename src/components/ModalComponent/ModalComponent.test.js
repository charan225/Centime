import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModalComponent } from "./ModalComponent";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

let modalActions = {
  closeModal: jest.fn(),
  displayModal: jest.fn(),
};

let rowsActions = {
  addRow: jest.fn(),
  upDateRow: jest.fn(),
  deleteRow: jest.fn(),
};

let wrapper, renderComponent;

beforeAll(() => {
  let showModal = false;
  wrapper = shallow(
    <ModalComponent
      rowsActions={rowsActions}
      modalActions={modalActions}
      isModalOpen={showModal}
    />
  );
  renderComponent = (
    <ModalComponent
      rowsActions={rowsActions}
      modalActions={modalActions}
      isModalOpen={showModal}
    />
  );
});

describe("Modal component", () => {
  test("should render Modal content properly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("close modal on clicking cancel", () => {
    render(renderComponent);
    const closeButtonElement = screen.getByText("Close_ButtonText");
    userEvent.click(closeButtonElement);
    expect(modalActions.closeModal).toHaveBeenCalled();
  });

  test("disable save button for invalid form", () => {
    render(renderComponent);
    const saveButtonElement = screen.getByText("Save_Changes");
    expect(saveButtonElement).toBeDisabled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("Row value updates on change in inflow input", () => {
    render(renderComponent);
    const inflowInputElement = screen.getByLabelText("Inflow_Text");
    userEvent.type(inflowInputElement, "salary");
    expect(inflowInputElement.value).toBe("salary");
  });

  test("Row value updates on change in outflow input", () => {
    render(renderComponent);
    const outflowInputElement = screen.getByLabelText("Outflow_Text");
    userEvent.type(outflowInputElement, "investment");
    expect(outflowInputElement.value).toBe("investment");
  });

  test("value input should take only numbers as value", () => {
    render(renderComponent);
    const valueInputElement = screen.getByLabelText("Value_Text");
    userEvent.type(valueInputElement, "abcd");
    expect(valueInputElement.value).toBe("");
    userEvent.type(valueInputElement, "1234");
    expect(valueInputElement.value).toBe("1234");
  });

  test("enable save button, close modal and add new row for valid form details", () => {
    render(renderComponent);
    userEvent.type(screen.getByLabelText("Inflow_Text"), "salary");
    userEvent.type(screen.getByLabelText("Outflow_Text"), "investment");
    userEvent.type(screen.getByLabelText("Value_Text"), "1234");
    const saveButtonElement = screen.getByText("Save_Changes");
    expect(saveButtonElement).toBeEnabled();
    userEvent.click(saveButtonElement);
    expect(modalActions.closeModal).toHaveBeenCalled();
    expect(rowsActions.addRow).toHaveBeenCalledWith({
      inflow: "salary",
      outflow: "investment",
      value: "1234",
    });
  });
});
