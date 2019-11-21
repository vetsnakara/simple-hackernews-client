import React from "react";

const faces = ["😃", "🙁", "😡"];

class Loading extends React.Component {
  state = {
    content: [],
    counter: 0
  };

  componentDidMount() {
    const interval = setInterval(() => {
      this.setState(({ content, counter }) => {
        if (counter === 3)
          return {
            counter: 0,
            content: []
          };

        return { content: [...content, faces[counter]], counter: counter + 1 };
      });
    }, 300);

    this.clearInterval = () => clearInterval(interval);
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  render() {
    return <div style={{ fontSize: "25px" }}>{this.state.content}</div>;
  }
}

export default Loading;
