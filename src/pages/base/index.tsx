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
import { getBreeds, searchBreedImage } from "../../services/base";
import { useHistory, useLocation } from "react-router-dom";

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
    display: "block",
    width: "100vw",
  },
}));

export interface Props {
  mState: any;
  dispatch: Dispatch;
}

const App: React.FC<Props> = (props) => {
  let history = useHistory();
  let location = useLocation();
  let { dispatch, mState } = props;
  const classes = useStyles();
  const [dData, setDData] = useState(mState);
  const [isLoading, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState("");

  const getBreedSelected = (id: any) => {
    dispatch({
      type: "SET_LOADING_CATS",
      payload: true,
    });
    searchBreedImage({
      page: currentPage,
      id,
    }).then((res: any) => {
      dispatch({
        type: "GET_SELECTED_BREED",
        payload: res.data,
      });
      dispatch({
        type: "SET_LOADING_CATS",
        payload: false,
      });
    });
  };

  const handleChange = (e: any) => {
    setCurrentPage(1);
    setSelectedBreed(e.target.value);
    dispatch({
      type: "SET_SELECTED_BREED",
      payload: e.target.value,
    });
    getBreedSelected(e.target.value);
    history.push({
      search: `?breed=${e.target.value}`,
    });
  };

  const onLoadMore = (id: any) => {
    dispatch({
      type: "SET_LOADING_MORE",
      payload: true,
    });
    let nPage = currentPage;
    setCurrentPage(nPage + 1);
    searchBreedImage({
      page: currentPage,
      id,
    }).then((res: any) => {
      dispatch({
        type: "SET_LOAD_MORE",
        payload: res.data,
      });
      dispatch({
        type: "SET_LOADING_MORE",
        payload: false,
      });
    });
  };

  const loadMenuItems = () => {
    let lstItems: any[] = [];
    if (dData.browser.list) {
      dData.browser.list.map((e: any) => {
        lstItems.push(
          <MenuItem key={e.id} value={e.id}>
            {e.name}
          </MenuItem>
        );
      });
    }
    return lstItems;
  };

  useEffect(() => {
    const init = () => {
      if (location.search) {
        let breedSel: any = location.search.replace("?breed=", "");
        setSelectedBreed(breedSel);
        dispatch({
          type: "SET_SELECTED_BREED",
          payload: breedSel,
        });
        getBreedSelected(breedSel);
      }

      dispatch({
        type: "SET_LOADING_BREEDS",
        payload: true,
      });
      getBreeds().then((res: any) => {
        dispatch({
          type: "GET_BREEDS",
          payload: res.data,
        });
        dispatch({
          type: "SET_LOADING_BREEDS",
          payload: false,
        });
      });
    };

    init();
  }, []);

  useEffect(() => {
    setDData(mState);
    setLoader(mState.browser.loadingList);
  }, [mState]);

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
                {loadMenuItems()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.spacingStl}>
            {selectedBreed ? (
              <CatList />
            ) : (
              <Grid>
                <Grid item xs={12}>
                  <Grid xs={12}>No cats available</Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} className={classes.spacingStl}>
            <Button
              disabled={
                isLoading ||
                dData.browser.loadingMore ||
                dData.browser.cats.length <= 0
              }
              onClick={() => onLoadMore(selectedBreed)}
              variant="contained"
              size="large"
              color="primary"
            >
              {isLoading || dData.browser.loadingMore ? (
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect((state) => ({
  mState: state,
}))(App);
