import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";



// Log In Function which dispatch action to validate user and if authenticate then setting user in redux
export const loginUser = userData => dispatch => {

  if (userData.email === "testAssignment@gmail.com" && userData.password === "Work4Fun") {
    const user = {
      user_id: "user-1",
      name: "test",
      email: userData.email,
    }
    localStorage.setItem("user", JSON.stringify(user));   //setting localstore to set user after page reload

    // Set current user
    dispatch(setCurrentUser(user));
  }

  else {
    alert("User not found")
    dispatch({
      type: GET_ERRORS,
      payload: { email: "Credentials Not Match" }
    })
  }


};

// If User is Authenticated then setting it in redux
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("user");

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

