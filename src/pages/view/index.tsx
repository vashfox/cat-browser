import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Grid, Paper, Button, Box } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Skeleton from "@material-ui/lab/Skeleton";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getBreedDetails } from "../../services/base";

interface BreedWeight {
  imperial: string;
  metric: string;
}

interface Breeds {
  weight: BreedWeight;
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
}

interface Info {
  breeds: Breeds[];
  height: number;
  id: string;
  url: string;
  width: number;
}

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
  mState: any;
  dispatch: Dispatch;
}

const ViewBreed: React.FC<Props> = (props) => {
  let { dispatch, mState } = props;
  let history = useHistory();
  let location = useLocation();
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);
  const [info, setInfo] = useState<Info>();

  const onGoBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const init = () => {
      if (location.pathname) {
        dispatch({
          type: "SET_LOADING_INFO",
          payload: true,
        });
        getBreedDetails(location.pathname.replace("/", "")).then((res: any) => {
          dispatch({
            type: "GET_DETAIL",
            payload: res.data,
          });
          setTimeout(() => {
            dispatch({
              type: "SET_LOADING_INFO",
              payload: false,
            });
          }, 1000);
        });
      }
    };

    init();
  }, []);

  useEffect(() => {
    console.log(mState.browser);
    setLoader(mState.browser.loadingInfo);
    if (mState.browser.info) {
      setInfo(mState.browser.info);
    }
  }, [mState]);

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
    if (info) {
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
            <Avatar variant="square" src={info.url} className={classes.large} />
            <div className={classes.detailsUI}>
              <h3 className={classes.headerStl}>{info.breeds[0].name}</h3>
              <h4 className={classes.headerStl}>
                Origin: {info.breeds[0].origin}
              </h4>
              <p>{info.breeds[0].temperament}</p>
              <p>{info.breeds[0].description}</p>
            </div>
          </div>
        </Paper>
      );
    }
  };

  return (
    <Grid item xs={12} md={8} lg={8} className={classes.centeredContent}>
      {isLoading ? skeletonLoader() : detailsUI()}
    </Grid>
  );
};

export default connect((state) => ({
  mState: state,
}))(ViewBreed);
