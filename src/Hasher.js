import React from "react";
import { hash } from "./hash";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class Hasher extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { inString: "" };
  }

  handleChange(e) {
    this.setState({ inString: e.target.value });
  }

  render() {
    const inString = this.state.inString;
    const hashed = hash(this.state.inString).toString();
    return (
      <div>
        <Typography variant="headline">Hasher</Typography>
        <TextField
          label="String to hash"
          value={inString}
          onChange={this.handleChange}
        />
        <Typography style={{ marginTop: "1em" }}>
          Hashed value: {hashed}
        </Typography>
      </div>
    );
  }
}

export default Hasher;
