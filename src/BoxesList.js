import React, { Component } from 'react';
import './BoxesList.css';
import Box from './Box';
import Finished from './Finished';

class BoxesList extends Component {
  constructor(props) {
    super(props);

    this.getRandomColors = this.getRandomColors;
    this.colorCheck = this.colorCheck.bind(this);
    this.closeBoxes = this.closeBoxes.bind(this);
    this.reset = this.reset.bind(this);

    const allColors = this.getRandomColors();

    this.state = {
      colors: allColors,
      openedColor: '',
      matchedColors: [],
      openedIds: [],
      finished: false
    };
  }

  reset() {
    const colorList = this.getRandomColors();

    this.setState({
      colors: colorList,
      openedColor: '',
      matchedColors: [],
      openedIds: [],
      finished: false
    });
  }

  getRandomColors() {
    let arr, returnArr = [];

    arr = [...colorList, ...colorList];

    while (arr.length > 0) {
      let randIndex;
      randIndex = Math.floor(Math.random() * arr.length);
      returnArr.push(arr[randIndex]);
      arr.splice(randIndex, 1);
    }

    return returnArr;
  }

  // check clicked color
  colorCheck(color, id) {

    // check if id is not already opened
    if (!this.state.openedIds.includes(id)) {
      // flip boxes
      this.flipBox(id);
    } else {
      return false;
    }

    // checks if color matches
    if (this.state.openedColor.length > 0) {

      // check if color matches
      if (color === this.state.openedColor) {

        // clear the opened color array and push the matched color to matchedColors array
        this.setState((prevState) => {
          return {
            openedColor: '',
            matchedColors: [...prevState.matchedColors, color]
          };
        }, () => {

          // check if the game is finished and
          this.state.matchedColors.length === this.state.colors.length / 2 ? this.setState({finished: true}) : null;
        });

      } else {

        // clear the opened color array
        this.setState({openedColor: ''});

        // close boxes after 1 second delay
        setTimeout(this.closeBoxes, 300);
      }

    } else {

      // add color to opened color list
      this.setState({openedColor: color});
    }

  };

  // flip boxes
  flipBox(id) {
    // check if there are 2 ids opened already
    if (this.state.openedIds.length === 2) {
      // add clicked id to the openedIds array
      this.setState({openedIds: [id]});
    } else {
      // push the clicked id to the openedIds array
      this.setState((prevState) => {
        return {openedIds: [...prevState.openedIds, id]}
      });
    }
  }

  // close all boxes
  closeBoxes() {
    this.setState({openedIds: []});
  }

  render() {
    const boxList = this.state.colors.map((color, index) => (
      <Box
        key={index}
        id={index}
        color={color}
        colorCheck={this.colorCheck}
        opened={this.state.openedIds.includes(index) || this.state.matchedColors.includes(color) ? true : false} />
    ));

    return (
      <div>
        <ul className="boxes-list">
          {boxList}
        </ul>
        {this.state.finished ? <Finished reset={this.reset} /> : null}
      </div>
    );
  }
}

const colorList = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Tomato', 'BlueViolet', 'Brown', 'Gold'];

export default BoxesList;
