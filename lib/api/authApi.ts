import { privateApi, publicApi } from ".";
import getOrCreateDeviceId from "../utils/api/getOrCreateDeviceId";

function getAccessTokenApi() {
  return publicApi.post(
    `v3/auth/get-token`,
    {},
    {
      withCredentials: true,
      headers: {
        "Device-ID": getOrCreateDeviceId(),
      },
    }
  );
}

function signoutApi() {
  return privateApi.post(
    `v3/auth/signout`,
    {},
    {
      headers: {
        "Device-ID": getOrCreateDeviceId(),
      },
    }
  );
}

export { getAccessTokenApi, signoutApi };
