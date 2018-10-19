import React from "react";
import ReactDOM from "react-dom";
import Hasher from "./Hasher";
import UnHasher from "./UnHasher";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const StyledPaper = withStyles({
  root: {
    padding: "1em"
  }
})(Paper);

function App() {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <StyledPaper>
          <Hasher />
        </StyledPaper>
      </Grid>
      <Grid item xs={12}>
        <StyledPaper>
          <UnHasher />
        </StyledPaper>
      </Grid>
    </Grid>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
