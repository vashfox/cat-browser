import axios from "axios";

const ROOTURL = "https://api.thecatapi.com/v1";

export const getBreedDetails = (id: string): Promise<any> =>
  axios.get(`${ROOTURL}/images/${id}`);

export const getBreeds = (): Promise<any> => axios.get(ROOTURL + "/breeds");

export const searchBreedImage = (payload: any): Promise<any> =>
  axios.get(
    ROOTURL +
      `/images/search?page=${payload.page}&limit=10&breed_id=${payload.id}`
  );
