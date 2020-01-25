import { format } from "util";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const error = console.error;
console.error = (...args) => {
  error(...args);
  throw new Error(format(...args));
};
