import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Grid, Paper, Button, Box } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import { Dispatch } from "redux";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "auto",
    height: "500px",
  },
  headerStl: {
    margin: 0,
  },
  viewInterfaceHeaderCLS: {
    padding: 10,
  },
  detailsUI: {
    padding: 10,
  },
  centeredContent: {
    margin: "20px auto 0",
  },
}));

export interface Props {
  dispatch: Dispatch;
}

const ViewBreed: React.FC<Props> = (props) => {
  let { dispatch } = props;
  let history = useHistory();
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);

  const onGoBack = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch({
      type: "GET_DETAIL",
      id: "SAaCmtjAn",
    });
    setLoader(false);
  }, []);

  const skeletonLoader = () => {
    return (
      <Paper variant="outlined" square style={{ width: "100%" }}>
        <div className={classes.viewInterfaceHeaderCLS}>
          <Skeleton width="10%" height={50} />
        </div>
        <div>
          <Skeleton variant="rect" className={classes.large} />
          <div className={classes.detailsUI}>
            <Skeleton width="70%" height={50} />
            <Skeleton width="25%" height={50} />
            <Skeleton width="50%" height={30} />
            <Box pt={0}>
              <Skeleton width="100%" height={30} />
              <Skeleton width="100%" height={30} />
              <Skeleton width="70%" height={30} />
              <Skeleton width="50%" height={30} />
            </Box>
          </div>
        </div>
      </Paper>
    );
  };

  const detailsUI = () => {
    return (
      <Paper variant="outlined" square>
        <div className={classes.viewInterfaceHeaderCLS}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onGoBack()}
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
        </div>
        <div>
          <Avatar variant="square" className={classes.large} />
          <div className={classes.detailsUI}>
            <h3 className={classes.headerStl}>Aegean</h3>
            <h4 className={classes.headerStl}>Origin: Greece</h4>
            <p>Affectionate, Social, Intelligent, Playful, Active</p>
            <p>
              Native to the Greek islands known as the Cyclades in the Aegean
              Sea, these are natural cats, meaning they developed without humans
              getting involved in their breeding. As a breed, Aegean Cats are
              rare, although they are numerous on their home islands. They are
              generally friendly toward people and can be excellent cats for
              families with children.
            </p>
          </div>
        </div>
      </Paper>
    );
  };

  return (
    <Grid item xs={12} md={8} lg={8} className={classes.centeredContent}>
      {isLoading ? skeletonLoader() : detailsUI()}
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  browse: state,
});

export default connect(mapStateToProps)(ViewBreed);
