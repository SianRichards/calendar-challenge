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
  public newStartDates = this.props.calendarEvents.filter(event =>
    Date.parse(event.start.date)
  );
  public newEndDates = this.props.calendarEvents.filter(event =>
    Date.parse(event.end.date)
  );

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
    // console.log(this.newStartDates);
    const newSearchText = event.target.value;
    this.setState({ filteredSearch: newSearchText });
    const filteredDates = this.props.calendarEvents.filter(event =>
      event.summary.toLowerCase().includes(newSearchText.toLowerCase())
    );
    this.setState({ filteredEvents: filteredDates });
  };

  public startDateCompare = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userStartSelect = event.target.value;
    const startDates = this.props.calendarEvents.filter(
      event => userStartSelect < event.start.date
    );
    console.log(startDates);
    this.setState({ filteredEvents: startDates });
  };

  public endDateCompare = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userEndSelect = event.target.value;
    const endDates = this.props.calendarEvents.filter(
      event => userEndSelect > event.end.date
    );
    console.log(endDates);
    this.setState({ filteredEvents: endDates });
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
          <input
            type="date"
            id="start"
            min="2019-05-01"
            max="2019-06-30"
            onChange={this.startDateCompare}
          />
          <input
            type="date"
            id="start"
            min="2019-05-01"
            max="2019-06-30"
            onChange={this.endDateCompare}
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
