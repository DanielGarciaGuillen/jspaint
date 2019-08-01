import React, { Component } from "react";
import styled from "styled-components";
import { random, capitalize } from "lodash";
import Paint from "./paint.png";

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
  width: "25px",
  fontSize: "18px"
}));

const Layout = styled.div`
  display: grid;
  position: absolute;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-template-rows: 150px 500px 50px;
  place-content: center;
  place-items: center;
  font-size: 18px;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%23ddddde' fill-opacity='0.4'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
  background: white;
  padding: 20px;
  border-radius: 3px;
  border: 1px solid #96bbf8;
`;

const HeaderTitle = styled.div`
  grid-column: 2;
  grid-row: 1;
  font-size: 40px;
  color: #96bbf8;
  font-weight: 900;
  background: white;
  padding: 20px;
  border-radius: 3px;
  border: 1px solid #96bbf8;
`;

const FloodFillDiv = styled.div`
  margin-top: 20px;
`;

const FloodFillImage = styled.img`
  width: 25px;
  vertical-align: middle;
`;

const FloodFillButton = styled.button`
  border: 2px solid #96bbf8;
  cursor: pointer;
  border-radius: 3px;
  width: 140px;
  height: 40px;
  text-transform: uppercase;
  background: white;
  color: #96bbf8;
  font-weight: 900;
  margin-top: 50px;
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

const SelectMenu = styled.select`
  border-radius: 3px;
  margin-left: 10px;
  font-size: 18px;
`;

class App extends Component {
  state = {
    grid: [],
    color: COLORS[random(0, 2)],
    columnIndex: "",
    rowIndex: ""
  };

  componentDidMount() {
    const grid = generateRandomGrid(15, 15);
    this.setState({ grid });
  }

  handleFillColor = () => {
    const { grid, columnIndex: x, rowIndex: y, color } = this.state;
    const coordinatesPresent = x || y;
    if (coordinatesPresent) {
      const updatedGrid = floodFillAt(grid, x, y, color);
      this.setState({ grid: updatedGrid });
    } else {
      alert("Choose a coordinate");
    }
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
          Choose a color
          <SelectMenu
            value={color}
            onChange={e => this.setState({ color: e.target.value })}
          >
            {COLORS.map(color => (
              <OptionColor color={color} key={color} value={color}>
                {capitalize(color)}
              </OptionColor>
            ))}
          </SelectMenu>
          <FloodFillDiv>
            <FloodFillButton onClick={() => this.handleFillColor()}>
              FloodFill <FloodFillImage src={Paint} alt="paint bucket" />
            </FloodFillButton>
          </FloodFillDiv>
        </Menu>

        <Grid>{gridUi}</Grid>
      </Layout>
    );
  }
}

export default App;
