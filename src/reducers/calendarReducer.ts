import { ThunkAction } from "redux-thunk";
import { StringLiteral } from "@babel/types";

// ICalendarEvents interface
export interface ICalendarEvents {
  summary: string;
  start: IStart;
  end: IEnd;
}

export interface IStart {
  date: string;
}

export interface IEnd {
  date: string;
}

// action types
export const FETCH_CALENDAR_EVENTS = "FETCH_CALENDAR_EVENTS";
export const FETCH_CALENDAR_EVENTS_SUCCESS = "FETCH_CALENDAR_EVENTS_SUCCESS";
export const FETCH_CALENDAR_EVENTS_FAILURE = "FETCH_CALENDAR_EVENTS_FAILURE";

// action creators
export const getCalendarEvents = (): IGetCalendarEventsAction => ({
  type: FETCH_CALENDAR_EVENTS
});
export const getCalendarEventsSuccess = (
  calendarEvents: ICalendarEvents[]
): IGetCalendarEventsSuccessAction => ({
  type: FETCH_CALENDAR_EVENTS_SUCCESS,
  calendarEvents
});
export const getCalendarEventsFailure = (
  error: Error
): IGetCalendarEventsFailureAction => ({
  type: FETCH_CALENDAR_EVENTS_FAILURE,
  error
});

type ThunkResult<R> = ThunkAction<
  R,
  ICalendarState,
  null,
  ICalendarEventsActions
>;

export const fetchCalendar = (): ThunkResult<void> => {
  const calendarId =
    "nology.io_5smheaincm2skd1tcmvv7m37d8@group.calendar.google.com";
  const apiKey = "AIzaSyCHZijg8vL_s_cSjdz3Pc-mOz4aswss9WU";
  return dispatch => {
    dispatch(getCalendarEvents());
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?maxResults=20&key=${apiKey}`
    )
      .then(res => res.json())
      .then(data => dispatch(getCalendarEventsSuccess(data.items)))
      .catch(error => dispatch(getCalendarEventsFailure(error)));
  };
};

// action interfaces
export interface IGetCalendarEventsAction {
  type: typeof FETCH_CALENDAR_EVENTS;
}
export interface IGetCalendarEventsSuccessAction {
  type: typeof FETCH_CALENDAR_EVENTS_SUCCESS;
  calendarEvents: ICalendarEvents[];
}
export interface IGetCalendarEventsFailureAction {
  type: typeof FETCH_CALENDAR_EVENTS_FAILURE;
  error: Error;
}

// combining action creators

type ICalendarEventsActions =
  | IGetCalendarEventsAction
  | IGetCalendarEventsSuccessAction
  | IGetCalendarEventsFailureAction;

export interface ICalendarState {
  calendarEvents: ICalendarEvents[];
  error: null | Error;
  loading: boolean;
}

// reducer with initial state
const initialState: ICalendarState = {
  calendarEvents: [],
  error: null,
  loading: false
};

const bookReducer = (state = initialState, action: ICalendarEventsActions) => {
  switch (action.type) {
    case FETCH_CALENDAR_EVENTS:
      return { ...state, loading: true, error: null };
    case FETCH_CALENDAR_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        calendarEvents: action.calendarEvents
      };
    case FETCH_CALENDAR_EVENTS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default bookReducer;
