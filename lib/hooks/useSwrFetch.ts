import useSWR from "swr";

import { getSearchSuggestionsApi } from "../api/searchApi";
import { getAccessTokenApi } from "../api/authApi";

function useSwrFetch() {
  return {
    GetSearchSuggestions: (query: string) => {
      const cacheKey = `search-suggesiton-${query}`;
      const swrOptions = {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        keepPreviousData: true,
      };
      return useSWR(cacheKey, () => getSearchSuggestionsApi(query), swrOptions);
    },
    GetAccessToken: (isLogged: boolean) => {
      const cacheKey = isLogged ? "access-token" : null;
      const swrOptions = {
        revalidateIfStale: false,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        //  refreshInterval: 1000 * 15, // 15 seconds
      };
      return useSWR(cacheKey, () => getAccessTokenApi(), swrOptions);
    },
  };
}

export default useSwrFetch;
