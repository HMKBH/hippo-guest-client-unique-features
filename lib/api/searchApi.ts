import { publicApi } from "./index";

function getSearchSuggestionsApi(query: string) {
  return publicApi.get(`v3/public/get-destination-suggestions?query=${query}`);
}

export { getSearchSuggestionsApi };
