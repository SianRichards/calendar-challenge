import * as React from "react";
import styles from "./calendar.module.scss";
import Event from "../components/event";
import { IStore } from "../reducers";
import { connect } from "react-redux";
import {
  fetchCalendar,
  ICalendarEvents,
  getCalendarEvents
} from "../reducers/calendarReducer";

export interface IReactProps {}

export interface IReduxProps {
  calendarEvents: ICalendarEvents[];
  fetchCalendar: () => void;
}

export interface IState {
  oneClicked: boolean;
  filterDate: string;
}

class CalendarContainer extends React.Component<
  IReactProps & IReduxProps,
  IState
> {
  public state = { oneClicked: false, filterDate: "" };

  public componentDidMount = () => {
    this.props.fetchCalendar();
  };

  public render() {
    return (
      <React.Fragment>
        <button type="button">06-07/05/2019</button>
        <button type="button">07-08/05/2019</button>
        <button type="button">22-23/05/2019</button>
        <div className={styles.calendar}>
          <p className={styles.day}>Monday</p>
          <p className={styles.day}>Tuesday</p>
          <p className={styles.day}>Wednesday</p>
          <p className={styles.day}>Thursday</p>
          <p className={styles.day}>Friday</p>
          <p className={styles.day}>Saturday</p>
          <p className={styles.day}>Sunday</p>
          {this.props.calendarEvents.map((calendarEvent, index) => (
            <Event key={index} calendarEvent={calendarEvent} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IStore, props: IReactProps) => {
  return { calendarEvents: state.calendar.calendarEvents, ...props };
};

const mapDispatchToProps = { fetchCalendar };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarContainer);
