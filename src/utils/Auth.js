import Cookies from "js-cookie";

export function getUserFromCookies() {
  const user = Cookies.get("user");
  if (user) {
    return JSON.parse(user);
  }
}

export function getToken() {
  const token = Cookies.get("token");
  return token ? token : "";
}

export function isAuthenticatedUser() {
  const authUser = Cookies.get("user");
  return authUser ? true : false;
}

export function getTeamFromCookies() {
  const team = Cookies.get("team");
  return team ? team : null;
}

export function getOutletFromCookies() {
  const outlet = Cookies.get("outlet");
  if (outlet) {
    return JSON.parse(outlet);
  }
}
export function getOutletTypeFromCookies() {
  const outlet_type = Cookies.get("outlet-type");
  return outlet_type;
}
