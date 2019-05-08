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
  filteredSearch: string;
  filteredEvents: any[];
}

class CalendarContainer extends React.Component<
  IReactProps & IReduxProps,
  IState
> {
  public state = { filteredSearch: "", filteredEvents: [] };

  public componentDidMount = () => {
    this.props.fetchCalendar();
  };

  public componentDidUpdate(prevProps: IReduxProps) {
    if (prevProps.calendarEvents !== this.props.calendarEvents) {
      this.setState({ filteredEvents: this.props.calendarEvents });
    }
  }

  public updateFilteredSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchText = event.target.value;
    this.setState({ filteredSearch: newSearchText });
    console.log(this.state);
    const filteredDates = this.props.calendarEvents.filter(event =>
      event.summary.toLowerCase().includes(newSearchText.toLowerCase())
    );
    console.log(filteredDates);
    this.setState({ filteredEvents: filteredDates });
  };

  public render() {
    return (
      <React.Fragment>
        <div>
          <input
            type="text"
            placeholder="search..."
            onChange={this.updateFilteredSearch}
          />
          <div className={styles.calendar}>
            {this.state.filteredEvents.map((calendarEvent, index) => (
              <Event key={index} calendarEvent={calendarEvent} />
            ))}
          </div>
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
