import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";

import { floodFillAt, generateRandomGrid } from "./utils";
import { updateExpression } from "@babel/types";

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
    const grid = generateRandomGrid(8, 8);
    this.setState({ grid });
  }

  handleSelectColor = event => {
    debugger;
    this.setState({ selectedColor: event.target.value });
  };

  handleColorChange = (x, y) => {
    const { grid, selectedColor } = this.state;
    console.log(x, y, grid[x][y], selectedColor);
    const updatedGrid = grid;
    updatedGrid[x][y] = selectedColor;
    console.log(updatedGrid);
    this.setState({ grid: updatedGrid });
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
        <select value={selectedColor} onChange={e => this.handleSelectColor(e)}>
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
