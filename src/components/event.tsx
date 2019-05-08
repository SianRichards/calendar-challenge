import * as React from "react";
import styles from "./event.module.scss";
import { ICalendarEvents } from "../reducers/calendarReducer";

export interface IProps {
  calendarEvent: ICalendarEvents;
}

export interface IState {}

class Event extends React.Component<IProps, IState> {
  // state = { :  }
  public render() {
    return (
      <article className={styles.event}>
        <header className={styles.title}>
          {this.props.calendarEvent.summary}
        </header>
        <p className={styles.start}>
          Start Date: {this.props.calendarEvent.start.date}
        </p>
        <p className={styles.end}>
          End Date: {this.props.calendarEvent.end.date}
        </p>
      </article>
    );
  }
}

export default Event;
