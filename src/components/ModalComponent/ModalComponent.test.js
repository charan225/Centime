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
    const wrapper = shallow(<ModalComponent />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("close modal on clicking cancel", () => {
    render(renderComponent);
    const saveButtonElement = screen.getByText("Close_ButtonText");
    userEvent.click(saveButtonElement);
    expect(modalActions.closeModal).toHaveBeenCalled();
  });
});
