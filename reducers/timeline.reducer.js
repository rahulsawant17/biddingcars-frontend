import { timelineConstants } from '../actions/constants';

const initState = {
  waiting: false,
  timeline: [],
  currentHistory: [],
  myListing: [],
  myBid: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case timelineConstants.GET_TIMELINE_REQUEST:
      state = {
        ...state,
        waiting: true,
      };

      break;
    case timelineConstants.GET_TIMELINE_SUCCESS:
      state = {
        ...state,
        timeline: action.payload,
        waiting: false,
      };

      break;
    case timelineConstants.GET_TIMELINE_FAILURE:
      state = {
        ...state,
        waiting: false,
      };

      break;
    case timelineConstants.GET_HISTORY_SUCCESS:
      state = {
        ...state,
        currentHistory: action.payload,
      };

      break;
    case timelineConstants.GET_MYLISTING_SUCCESS:
      state = {
        ...state,
        myListing: action.payload,
      };

      break;
      case timelineConstants.GET_MYBID_SUCCESS:
        state = {
          ...state,
          myBid: action.payload,
        };

        break;
      case timelineConstants.TIMELINE_NULL:
        state = {
          ...initState
        };

        break;
  }
  return state;
};
