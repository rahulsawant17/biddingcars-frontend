import { authConstants, userinfoConstants } from "./constants";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import axios from "../helpers/axios";
import { getUserinfo } from "./userinfo.action";
// console.log(firebase);
// Your app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
console.log(firebase.auth);

export default firebase;

export const checkSignin = () => async (dispatch) => {
  try {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        let role;

        const res = await axios.get(`/users/${user.email}`, {
          headers: {
            Authorization: "Bearer " + user.multiFactor?.user.accessToken,
          },
        });
        role = res.data?.role ? res.data.role : "user";
        dispatch({
          type: authConstants.SIGNIN_SUCCESS,
          userId: user.email,
          payload: JSON.stringify(user),
          accessToken: user.multiFactor?.user.accessToken,
          role: role,
        });
        console.log(window.localStorage)
        if(!window.localStorage.getItem('token'))
        window.localStorage.setItem('token', user.multiFactor?.user.accessToken);
        // dispatch(getUserinfo(user.email));
        dispatch(getUserinfo(user.email, user.multiFactor?.user.accessToken));
      } else {
        dispatch({
          type: authConstants.SIGNIN_ERROR,
          authenticate: false,
        });
      }
    });
  } catch (err) {
    dispatch({
      type: authConstants.SIGNIN_ERROR,
      payload: "Invalid login credentials",
    });
    toast("Invalid login credentials", { type: "error" });
  }
};

export const signup =
  ({ email, password, fname, lname, role }) =>
  async (dispatch) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((dataBeforeEmail) => {
          firebase.auth().onAuthStateChanged(function (user) {
            user.sendEmailVerification();
          });
        })
        .then((dataAfterEmail) => {
          firebase.auth().onAuthStateChanged(async function (user) {
            await axios.post(
              `users/add/`,
              {
                firstname: fname,
                lastname: lname,
                email: email,
                role: role,
              },
              {
                headers: {
                  Authorization: "Bearer " + user.multiFactor?.user.accessToken,
                },
              }
            );
            // if (user.emailVerified) {
            // console.log(user)
            // Emailconsole is verified
            dispatch({
              type: authConstants.SIGNUP_SUCCESS,
              userId: user.email,
              payload:
                "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox.",
            });
            // } else {
            //   // Email is not verified
            //   dispatch({
            //     type: authConstants.SIGNUP_ERROR,
            //     payload:
            //       "1Something went wrong, we couldn't create your account. Please try again.",
            //   });
            // }
          });
        })
        .catch(function (error) {
          // console.log(error);
          dispatch({
            type: authConstants.SIGNUP_ERROR,
            payload:
              "2Something went wrong, we couldn't create your account. Please try again.",
          });
        });
    } catch (err) {
      // console.log(err);
      dispatch({
        type: authConstants.SIGNUP_ERROR,
        payload:
          "3Something went wrong, we couldn't create your account. Please try again.",
      });
    }
  };

export const signin =
  ({ email, password, role }) =>
  async (dispatch) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((e) => {
          firebase.auth().onAuthStateChanged(function (user) {
            dispatch({
              type: authConstants.SIGNIN_SUCCESS,
              userId: user.email,
              payload: JSON.stringify(user),
              role: role,
            });
            dispatch(
              getUserinfo(user.email, user.multiFactor?.user.accessToken)
            );
            if(typeof window !== 'undefined')
            window.localStorage.setItem('token', user.multiFactor?.user.accessToken);
          });
        })
        .catch((err) => {
          dispatch({
            type: authConstants.SIGNIN_ERROR,
            payload: "Invalid login credentials",
          });
          toast("Invalid login credentials", { type: "error" });
        });
    } catch (err) {
      dispatch({
        type: authConstants.SIGNIN_ERROR,
        payload: "Error while logging in",
      });
      toast("Error while logging in", { type: "error" });
    }
  };

export const signout = () => async (dispatch) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: authConstants.SIGNOUT_SUCCESS });
        window.localStorage.clear();
        dispatch({ type: userinfoConstants.USERINFO_NULL });
      })
      .catch(() => {
        dispatch({
          type: authConstants.SIGNOUT_ERROR,
          payload: "...some error message for the user...",
        });
      });
  } catch (err) {
    dispatch({
      type: authConstants.SIGNOUT_ERROR,
      payload: "...some error message for the user...",
    });
  }
};

export const googleSignIn = () => async (dispatch) => {
  try {
    const provider = new GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(async function (idToken) {
            const user = result.user;
            dispatch({
              type: authConstants.SIGNIN_SUCCESS,
              userId: user.email,
              payload: JSON.stringify(user),
              accessToken: idToken,
            });
            window.localStorage.setItem('token', idToken);
            let data = {
              firstname: user.displayName.split(" ")[0],
              lastname: user.displayName.split(" ")[1]
                ? user.displayName.split(" ")[1]
                : " ",
              email: user.email,
              role: "user",
            };
            console.log("reached hereeeeeeeeee", data);
            await axios
              .post(`users/add/`, data, {
                headers: { Authorization: "Bearer " + idToken },
              })
              .catch((err) => {
                dispatch({
                  type: authConstants.SIGNIN_ERROR,
                  payload: err.message,
                });
              });
            console.log("======user", user);
            // dispatch(getUserinfo(user.email));
            dispatch(getUserinfo(user.email, idToken));
          });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message;
        dispatch({
          type: authConstants.SIGNIN_ERROR,
          payload: errorMessage,
        });
      });
  } catch (err) {
    dispatch({
      type: authConstants.SIGNIN_ERROR,
      payload: "Invalid login credentials",
    });
    toast("Invalid login credentials", { type: "error" });
  }
};

export const resetPassword =
  ({ email }) =>
  async (dispatch) => {
    try {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          dispatch({
            type: authConstants.RESET_PASSWORD_SUCCESS,
            payload: "Password reset link sent to your email",
          });
        })
        .catch(() => {
          dispatch({
            type: authConstants.RESET_PASSWORD_ERROR,
            payload: "Some error resetting password",
          });
        });
    } catch (err) {
      dispatch({
        type: authConstants.RESET_PASSWORD_ERROR,
        payload: "Some error resetting password",
      });
    }
  };

export const updateEmail =
  ({ currentpassword, currentemail, newemail, userinfo }) =>
  async (dispatch) => {
    try {

      firebase.auth().onAuthStateChanged(async (user) => {
        let res = await axios.get(`/users/${newemail}`, {
          headers: {
            Authorization: "Bearer " + user.multiFactor?.user.accessToken,
            user: JSON.stringify(userinfo),
          },
        });
        if (res != null) {
          var user = firebase.auth().currentUser;
          var cred = firebase.auth.EmailAuthProvider.credential(
            currentemail,
            currentpassword
          );
          console.log(cred)
          let use = await user.reauthenticateWithCredential(cred).then(use=>{
            firebase.auth().onAuthStateChanged(async (user) => {
              try {
                user.updateEmail(newemail);
                console.log(user);
                dispatch({
                  type: authConstants.UPDATE_EMAIL_SUCCESS,
                  payload: "Email Updated",
                });
                const res = await axios.post(
                  `users/update/`,
                  { email: currentemail, newemail: newemail },
                  {
                    headers: {
                      Authorization:
                        "Bearer " + user.multiFactor?.user.accessToken,
                      user: JSON.stringify(userinfo),
                    },
                  }
                );
                toast("Email updated Successfully", { type: "success" });
              } catch (err) {
                toast(err, { type: "error" });
              }
            });
          }).catch(error=>{
            dispatch({
              type: authConstants.UPDATE_EMAIL_ERROR,
              payload: error.code,
            });
            toast(error.code, { type: "error" });
          });
        } else {
          dispatch({
            type: authConstants.UPDATE_EMAIL_ERROR,
            payload: "User Already exists",
          });
          toast("User Already exists", { type: "error" });
        }
      });
    } catch (err) {
      dispatch({
        type: authConstants.UPDATE_EMAIL_ERROR,
        payload: "Some error updating email",
      });
      toast("Some error updating email", { type: "error" });
    }
  };
export const updatePassword =
  ({ currentpassword, password }) =>
  async (dispatch) => {
    try {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentpassword
      );
      await user
        .reauthenticateWithCredential(cred)
        .then(() => {
          firebase.auth().onAuthStateChanged(function (user) {
            user.updatePassword(password);
            dispatch({
              type: authConstants.UPDATE_PASSWORD_SUCCESS,
              payload: "Password updated Successfully",
            });
            toast("Password updated Successfully", { type: "success" });
          });
        })
        .catch(() => {
          dispatch({
            type: authConstants.UPDATE_PASSWORD_ERROR,
            payload: "Wrong Credential",
          });
          toast("Wrong Credential", { type: "error" });
        });
    } catch (err) {
      dispatch({
        type: authConstants.UPDATE_PASSWORD_ERROR,
        payload: "Some error updating password",
      });
      toast("Some error updating password", { type: "error" });
    }
  };
