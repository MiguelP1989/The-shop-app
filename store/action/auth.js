import { AsyncStorage } from "react-native";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOG_OUT";

export const authenticate = (token, userId) => {
  return { type: AUTHENTICATE, token: token, userId: userId };
};

export const logOut = () => {
  return { type: LOGOUT };
};

export const signUp = (email, password) => {
  console.log(email, password);

  const key = "AIzaSyCOTnXfcKGt_RRoCsbbCjcI9JFZUCJa50U";
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      // throw new Error("Something went wrong");
      const errorId = errorResponse.error.message;
      let message = "Something went wrong";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log("resData", resData);

    // dispatch({
    //   type: SIGNUP,
    //   token: resData.idToken,
    //   userId: resData.localId,
    // });
    dispatch(authenticate(resData.idToken, resData.localId));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logIn = (email, password) => {
  const key = "AIzaSyCOTnXfcKGt_RRoCsbbCjcI9JFZUCJa50U";
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      // console.log(errorResponse);
      const errorId = errorResponse.error.message;
      let message = "Something went wrong";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log("resData", resData);

    // dispatch({
    //   type: LOGIN,
    //   token: resData.idToken,
    //   userId: resData.localId,
    // });
    dispatch(authenticate(resData.idToken, resData.localId));
    //current time + the expired time
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
