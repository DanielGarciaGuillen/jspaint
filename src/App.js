import React, { Component } from "react";
import styled from "styled-components";
import { random, capitalize } from "lodash";

import { floodFillAt, generateRandomGrid, COLORS } from "./utils";

const Cell = styled.button(props => ({
  background: props.background,
  borderRadius: "1px",
  height: "25px",
  width: "25px",
  border: props.selected
}));

const OptionColor = styled.option(props => ({
  color: props.color,
  border: "1px solid white",
  borderRadius: "3px",
  height: "25px",
  width: "25px"
}));

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-template-rows: 150px 500px 50px;
  place-content: center;
  place-items: center;
`;

const Grid = styled.div`
  grid-column: 2;
  grid-row: 2;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
`;

const Menu = styled.div`
  grid-column: 3;
  grid-row: 2;
  place-self: start;
`;

const HeaderTitle = styled.div`
  grid-column: 2;
  grid-row: 1;
  font-size: 40px;
`;

class App extends Component {
  state = {
    grid: [],
    color: COLORS[random(0, 2)],
    columnIndex: "",
    rowIndex: ""
  };

  componentDidMount() {
    const grid = generateRandomGrid(20, 20);
    this.setState({ grid });
  }

  handleFillColor = () => {
    const { grid, columnIndex: x, rowIndex: y, color } = this.state;
    const updatedGrid = floodFillAt(grid, x, y, color);
    this.setState({ grid: updatedGrid });
  };

  render() {
    const { grid, color, columnIndex, rowIndex } = this.state;

    const gridUi = grid.map((column, x) => {
      return (
        <Column key={x}>
          {column.map((cell, y) => (
            <Cell
              key={x + y}
              selected={
                x === columnIndex && y === rowIndex
                  ? "2px solid white"
                  : "1px solid grey"
              }
              background={cell}
              onClick={() => this.setState({ columnIndex: x, rowIndex: y })}
            />
          ))}
        </Column>
      );
    });

    return (
      <Layout>
        <HeaderTitle>Js Paint</HeaderTitle>
        <Menu>
          <select
            value={color}
            onChange={e => this.setState({ color: e.target.value })}
          >
            {COLORS.map(color => (
              <OptionColor color={color} key={color} value={color}>
                {capitalize(color)}
              </OptionColor>
            ))}
          </select>
          <button onClick={() => this.handleFillColor()}> FloodFill </button>
        </Menu>

        <Grid>{gridUi}</Grid>
      </Layout>
    );
  }
}

export default App;
