import { authConstants } from '../actions/constants';

const initState = {
  waiting: false,
  userId: null,
  number: null,
  userName: null,
  authenticate: false,
  message:null,
  accessToken:null,
  role:null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        waiting: true,
      };

      break;
    case authConstants.SIGNIN_SUCCESS:
      state = {
        ...state,
        waiting: false,
        userId: action.userId,
        message: action.payload,
        authenticate: true,
        accessToken:action.accessToken,
        role:action.role,
      };

      break;
    case authConstants.SIGNIN_ERROR:
      state = {
        ...state,
        message: action.payload,
      };

      break;
      case authConstants.SIGNUP_SUCCESS:
        state = {
          ...state,
          waiting: false,
          userId: action.userId,
          message: action.payload,
          authenticate: true,
        };

        break;
      case authConstants.SIGNUP_ERROR:
        state = {
          ...state,
          message: action.payload,
        };

      break;

      case authConstants.SIGNOUT_SUCCESS:
        state = {
          ...initState
        };

        break;

        case authConstants.UPDATE_PASSWORD_SUCCESS:
          state = {
            ...state,
            message: action.payload,
          };

        break;
        case authConstants.UPDATE_PASSWORD_ERROR:
          state = {
            ...state,
            message: action.payload,
          };

        break;
        case authConstants.UPDATE_EMAIL_SUCCESS:
          state = {
            ...state,
            message: action.payload,
          };

        break;
        case authConstants.UPDATE_EMAIL_ERROR:
          state = {
            ...state,
            message: action.payload,
          };

        break;
        case authConstants.RESET_PASSWORD_SUCCESS:
          state = {
            ...state,
            message: action.payload,
          };

        break;
        case authConstants.RESET_PASSWORD_ERROR:
          state = {
            ...state,
            message: action.payload,
          };

        break;
  }
  return state;
};
