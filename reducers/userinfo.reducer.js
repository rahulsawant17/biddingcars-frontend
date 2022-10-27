import { userinfoConstants } from '../actions/constants';

const initState = {
  firstName: null,
  lastName: null,
  email: null,
  address: null,
  city:null,
  state:null,
  zipCode:null,
  country:null,
  message:null,
  mobile:null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case userinfoConstants.GET_USERINFO_REQUEST:
      state = {
        ...state,
        waiting: true,
      };

      break;
    case userinfoConstants.GET_USERINFO_SUCCESS:
      state = {
        ...state,
        waiting: false,
        firstName: action.payload.firstname,
        lastName: action.payload.lastname,
        email: action.payload.email,
        address: action.payload.address,
        city: action.payload.city,
        state: action.payload.state,
        zipCode: action.payload.zipCode,
        country: action.payload.country,
        mobile:action.payload.mobileNumber
      };

      break;
    case userinfoConstants.GET_USERINFO_FAILURE:
      state = {
        ...state,
        waiting: false,
        message: action.payload,
      };

      break;
      case userinfoConstants.UPDATE_USERINFO:
        state = {
          ...state,
          waiting: false,
          ...action.state
        };
        break;

        case userinfoConstants.POST_USERINFO_REQUEST:
          state = {
            ...state,
            waiting: true,

          };

          break;
        case userinfoConstants.POST_USERINFO_SUCCESS:
          state = {
            ...state,
            waiting: false,
            message: action.payload,
          };

          break;
        case userinfoConstants.POST_USERINFO_FAILURE:
          state = {
            ...state,
            waiting: false,
            message: action.payload,
          };

          break;
          case userinfoConstants.USERINFO_NULL:
            state = {
              ...initState
            };

            break;
  }
  return state;
};
