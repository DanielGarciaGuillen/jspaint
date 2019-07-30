import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";

import { floodFillAt, generateRandomGrid } from "./utils";

const Cell = styled.button(props => ({
  background: props.background,
  height: "50px",
  width: "50px"
}));

const Column = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends Component {
  state = { grid: [], selectedColor: "red" };

  componentDidMount() {
    const grid = generateRandomGrid(2, 10);
    this.setState({ grid });
  }

  handleColorChange = (x, y) => {
    const { grid, selectedColor } = this.state;

    grid.forEach((column, index) => {
      if (index >= x - 1 && index <= x + 1) {
        column.forEach((cell, indexCell) => {
          if (
            indexCell <= y + 1 &&
            indexCell >= y - 1 &&
            cell !== selectedColor
          ) {
            cell = selectedColor;

            return (column[indexCell] = selectedColor);
          }
        });
      }
      return column;
    });

    this.setState({ grid });
  };

  render() {
    const { grid, selectedColor } = this.state;

    const gridUi = grid.map((column, x) => {
      return (
        <Column key={x}>
          {column.map((cell, y) => (
            <Cell
              key={x + y}
              background={cell}
              onClick={() => this.handleColorChange(x, y)}
            />
          ))}
        </Column>
      );
    });

    return (
      <div className="App">
        <select
          value={selectedColor}
          onChange={e => this.setState({ selectedColor: e.target.value })}
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
        {gridUi}
      </div>
    );
  }
}

export default App;
