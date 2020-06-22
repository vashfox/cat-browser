import { createStore, combineReducers, applyMiddleware } from "redux";
import { getBreedDetails, getBreeds, searchBreedImage } from "../services/base";
import thunk from "redux-thunk";
import { unionBy } from "lodash";

const mathReducer = (
  state = {
    list: [],
    loadingList: false,
    loadingCats: false,
    loadingInfo: false,
    loadingMore: false,
    selectedBreed: null,
    info: null,
    cats: [],
  },
  action: any
) => {
  switch (action.type) {
    case "GET_BREEDS":
      return { ...state, list: action.payload };
    case "GET_DETAIL":
      return { ...state, info: action.payload };
    case "GET_SELECTED_BREED":
      return { ...state, cats: action.payload };
    case "SET_LOADING_BREEDS":
      return { ...state, loadingList: action.payload };
    case "SET_LOADING_CATS":
      return { ...state, loadingCats: action.payload };
    case "SET_LOADING_INFO":
      return { ...state, loadingInfo: action.payload };
    case "SET_LOADING_MORE":
      return { ...state, loadingMore: action.payload };
    case "SET_SELECTED_BREED":
      return { ...state, selectedBreed: action.payload };
    case "SET_LOAD_MORE":
      let currentListData: any[] = unionBy(state.list, action.payload, "id");
      return { ...state, list: currentListData };
  }
  return state;
};

const rootReducer = combineReducers({
  browser: mathReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
