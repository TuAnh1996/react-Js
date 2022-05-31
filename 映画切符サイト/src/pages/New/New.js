import React, { Component } from "react";

export default class New extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/car/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ books: data });
      });
  }

  render() {
    const { books } = this.state;
    console.log(books);
    return (
      <div>
        {books?.map((item, index) => {
          return <div>{item.name}</div>;
        })}
        <h1>new</h1>
      </div>
    );
  }
}
