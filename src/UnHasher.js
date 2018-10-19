import React from "react";
import { unhash } from "./hash.js";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function GuessNote(props) {
  if (props.guess) {
    return (
      <span style={{ fontSize: "smaller" }}>
        (guessing length of {props.length})
      </span>
    );
  } else {
    return null;
  }
}

class UnHasher extends React.Component {
  constructor(props) {
    super(props);
    this.handleHashChange = this.handleHashChange.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.state = { inHash: "", outLength: "" };
  }

  handleHashChange(e) {
    this.setState({ inHash: e.target.value });
  }

  handleLengthChange(e) {
    this.setState({ outLength: e.target.value });
  }

  render() {
    const inHash = this.state.inHash;
    const outLength = this.state.outLength;
    const unhashed = unhash(this.state.inHash, this.state.outLength);
    const guess = unhashed && outLength < 1;
    return (
      <div>
        <Typography variant="headline">UnHasher</Typography>
        <Grid container spacing={8}>
          <Grid item>
            <TextField
              label="Hash value"
              value={inHash}
              type="number"
              onChange={this.handleHashChange}
              style={{ width: "400px" }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Original length"
              value={outLength}
              type="number"
              onChange={this.handleLengthChange}
            />
          </Grid>
        </Grid>
        <Typography style={{ marginTop: "1em" }}>
          Original string: {unhashed}{" "}
          <GuessNote guess={guess} length={unhashed.length} />
        </Typography>
      </div>
    );
  }
}

export default UnHasher;
