import HeaderComponent from "./HeaderComponent";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

describe("Header component", () => {
  test("should render header correctly", () => {
    const wrapper = shallow(<HeaderComponent />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
