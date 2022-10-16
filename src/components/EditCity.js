import React from "react";

class EditCity extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, coordinate } = props.location.state.contact;
    this.state = {
      id,
      name,
      coordinate,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.coordinate === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ name: "", coordinate: "" });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Edit city</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>coordinate</label>
            <input
              type="text"
              name="coordinate"
              placeholder="coordinate"
              value={this.state.coordinate}
              onChange={(e) => this.setState({ coordinate: e.target.value })}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
  }
}

export default EditCity;
