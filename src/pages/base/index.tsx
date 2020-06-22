import React, { useState, useEffect } from "react";
import { Dispatch } from "redux";

import CatList from "../../components/catList";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerStl: {
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 200,
  },
  h1Stl: {
    margin: "0 0 20px",
  },
  spacingStl: {
    padding: 20,
  },
}));

export interface Props {
  mapStateToProps: any;
  dispatch: Dispatch;
}

const App: React.FC<Props> = (props) => {
  const { dispatch } = props;
  const classes = useStyles();
  const [breeds, setBreedList] = useState();
  const [isLoading, setLoader] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState();

  const handleChange = (e: any) => {
    setSelectedBreed(e.target.value);
  };

  const onLoadMore = () => {
    setLoader(true);
  };

  const getBreedSelected = (id: any) => {
    dispatch({
      type: "GET_SELECTED_BREED",
      payload: {
        page: 1,
        id,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: "GET_BREEDS",
    });
    getBreedSelected("sava");
  }, []);

  useEffect(() => {
    if (props.mapStateToProps) {
      setBreedList(props.mapStateToProps);
    }
  }, [props.mapStateToProps]);

  return (
    <div className="App">
      <Grid className={classes.containerStl} container direction="column">
        <Grid item xs={12} md={8} lg={8} style={{ margin: "0 auto" }}>
          <Grid item xs={12} className={classes.spacingStl}>
            <h1 className={classes.h1Stl}>Cat Browser</h1>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Breed
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedBreed}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.spacingStl}>
            <CatList />
          </Grid>
          <Grid item xs={12} className={classes.spacingStl}>
            <Button
              disabled={isLoading}
              onClick={() => onLoadMore()}
              variant="contained"
              size="large"
              color="primary"
            >
              {isLoading ? (
                <span>
                  <CircularProgress
                    size={20}
                    style={{ verticalAlign: "middle" }}
                  />{" "}
                  Loading...
                </span>
              ) : (
                "Load More"
              )}
            </Button>
            <p>BREEDS: {JSON.stringify(breeds)}</p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  browse: state,
});

export default connect(mapStateToProps)(App);
