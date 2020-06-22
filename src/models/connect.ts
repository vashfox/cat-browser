import { createStore, combineReducers } from "redux";
import { getBreedDetails, getBreeds, searchBreedImage } from "../services/base";

export interface BreedWeight {
  imperial: string;
  metric: string;
}

export interface Breeds {
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

const mathReducer = async (
  state = {
    list: [],
    info: null,
    cats: [],
  },
  action: any
) => {
  console.log(action);
  switch (action.type) {
    case "GET_BREEDS":
      let resBreeds: any = await getBreeds();
      if (resBreeds) return { ...state, list: [] };
      else return { ...state, list: resBreeds };
    case "GET_DETAIL":
      let resDetails: any = await getBreedDetails(action.id);
      if (resDetails) return { ...state, info: null };
      else return { ...state, info: resDetails };
    case "GET_SELECTED_BREED":
      let resSearchData: any = await searchBreedImage(action.payload);
      if (resSearchData) return { ...state, cats: null };
      else return { ...state, cats: resSearchData };
  }
  return state;
};

const rootReducer = combineReducers({
  browser: mathReducer,
});

const store = createStore(rootReducer);

export default store;
