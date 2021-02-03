export const SIGNUP = "SIGNUP";

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
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    console.log("resData", resData);

    dispatch({
      type: SIGNUP,
    });
  };
};
