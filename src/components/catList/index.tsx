import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import NotesIcon from "@material-ui/icons/Notes";
import { Avatar, Grid, Paper, Button, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { orderBy } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: "100%",
  },
  large: {
    width: "auto",
    height: "200px",
  },
  iPad: {
    padding: 10,
  },
}));

export interface Props {
  mState: any;
}

const CatList: React.FC<Props> = (props) => {
  const { mState } = props;
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);

  const loadListUI = () => {
    const lstItems: any[] = [];
    if (mState.browser.cats) {
      let dd: any = orderBy(mState.browser.cats, ["breeds.name"], ["asc"]);
      dd.map((value: any) => {
        lstItems.push(
          <Grid key={value.id} item xs={3}>
            <Paper className={classes.paper}>
              <Avatar
                variant="square"
                src={value.url}
                className={classes.large}
              />
              <div className={classes.iPad}>
                <Link to={`/${value.id}`}>
                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    startIcon={<NotesIcon />}
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </Paper>
          </Grid>
        );
      });
    }
    return lstItems;
  };

  const skeletonLoader = () => {
    const lstItems: any[] = [];
    [1, 2, 3, 4].map((i: any) => {
      lstItems.push(
        <Grid key={i} item xs={3}>
          <Paper variant="outlined" square className={classes.paper}>
            <Skeleton variant="rect" width="100%" height={200} />
            <Box pt={0}>
              <Skeleton width="93%" height={50} style={{ marginLeft: 10 }} />
            </Box>
          </Paper>
        </Grid>
      );
    });
    return lstItems;
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  useEffect(() => {
    setLoader(mState.browser.loadingCats);
  }, [mState]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container spacing={5}>
          {isLoading ? skeletonLoader() : loadListUI()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect((state) => ({
  mState: state,
}))(CatList);
