export function isAuthenticatedUser() {
  const authUser = localStorage.getItem("user");
  return authUser ? true : false;
}

export const _getUser = () => {
  const stringifiedUser = localStorage.getItem("user");
  // console.log('stringified user=0= ', JSON?.parse(stringifiedUser));
  if (stringifiedUser && stringifiedUser !== "undefined") {
    const localUser: any = JSON.parse(stringifiedUser);
    // const user = _isAnEmptyObject(localUser) ? null : localUser;
    return localUser;
  }
  return null;
};
