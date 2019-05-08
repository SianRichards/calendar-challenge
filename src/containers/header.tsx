import * as React from "react";
import styles from "../containers/header.module.scss";

export interface IProps {}

export interface IState {}

class Header extends React.Component<IProps, IState> {
  // state = { :  }
  render() {
    return (
      <header className={styles.header}>
        <h1>Bristol's Interpretive Dance Institute Calendar</h1>
      </header>
    );
  }
}

export default Header;
