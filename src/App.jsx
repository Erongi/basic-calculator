import { useState, Fragment, useCallback } from "react";
import { Button, Monitor } from "./components";
import { OPERATIONS, BUTTON_DATA } from "./constants/constants";

import "./App.css";

function App() {
  // * screen will store number for showing monitor
  const [screen, setScreen] = useState("0");

  // * calculate will store history number and operation for calculate
  const [calculate, setCalculate] = useState([]);

  /**
   * handleNumberButton is function for handling number button
   * @param event is value form clicked button
   */
  const handleNumberButton = useCallback(
    (event) => {
      const number = event.target.value;

      const lastedOperation = calculate[calculate.length - 1];

      // * check if last clicked is "equal" will set states and return
      if (lastedOperation === "equal") {
        setScreen(number);
        setCalculate([]);
        return;
      }

      // * check clicking point 2 times will return
      if (number === "." && number === screen[screen.length - 1]) return;

      // * check moniter show "0" then if clicking point will set state and return
      if (screen === "0") {
        if (number === ".") {
          setScreen((prev) => prev + number);
          return;
        }

        setScreen(number);
        return;
      }

      // * check already clicked operation will set state and return
      if (OPERATIONS.includes(lastedOperation)) {
        setCalculate((prev) => [...prev, ""]);
        setScreen(number);
        return;
      }

      setScreen((prev) => prev + number);
    },

    [screen, calculate]
  );

  /**
   * handleOperationButton is function for handling operation button
   * @param event is value form clicked button
   */
  const handleOperationButton = useCallback(
    (event) => {
      const operation = event.target.value;

      const lastedOperation = calculate[calculate.length - 1];

      let haveOperation = false;

      // * check have operation in calculate or not
      for (const unit of calculate) {
        if (OPERATIONS.includes(unit)) {
          haveOperation = true;
          break;
        }
      }

      // * check clicking "equal" then no clicked operation or clicking "equal" 2 times will return
      if (operation === "equal") {
        if (!haveOperation || lastedOperation === "equal") return;

        const result = eval(`${calculate.join("")}${screen}`);

        setScreen(`${result}`);
        setCalculate(["equal"]);
        return;
      }

      // * check clicking clear will clear state and return
      if (operation === "clear") {
        setScreen("0");
        setCalculate([]);
        return;
      }

      // * check clicking swtich then no clicked operation will return
      if (operation === "swtich") {
        if (haveOperation) return;

        setScreen((prev) => (prev[0] === "-" ? prev.slice(1) : `-${prev}`));
        return;
      }

      // * check clicking operation and lasted click is not "equal" then lasted click is not number will return
      if (haveOperation && lastedOperation !== "equal") {
        if (lastedOperation !== "") return;

        setScreen(`${result}`);
        setCalculate([result, operation]);
        return;
      }

      setCalculate(() => [screen, operation]);
    },
    [screen, calculate]
  );

  return (
    <Fragment>
      <div className="App">
        <div className="container">
          <Monitor screen={screen} />

          <div className="container__keypads">
            {BUTTON_DATA.map((data) => {
              let onClick = handleNumberButton;
              let backgroundColor = "#FFFFFF";

              if (OPERATIONS.includes(data.value)) {
                onClick = handleOperationButton;
                backgroundColor = "#FEFF86";
              }

              return (
                <Button
                  key={data.id}
                  {...data}
                  onClick={onClick}
                  backgroundColor={backgroundColor}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
