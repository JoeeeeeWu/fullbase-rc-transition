/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import './index.less';

export const UNMOUNTED = 'unmounted';
export const EXITED = 'exited';
export const ENTERING = 'entering';
export const ENTERED = 'entered';
export const EXITING = 'exiting';

type TransitionProps = {
  in: boolean;
  timeout: number;
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  children: ((status: string, childProps: {[key: string]: any}) => React.ReactElement) | React.ReactElement;
}

type TransitionState = {
  status: string;
}

class Transition extends Component<TransitionProps, TransitionState> {

  constructor(props: TransitionProps) {
    super(props);
    let initialStatus = UNMOUNTED;
    if (props.in) {
      initialStatus = ENTERED;
    }
    this.state = {
      status: initialStatus,
    };
  }

  // 如果是通过classname的方式需要先把status设置成EXITED，这样才能拿到dom并设置classname
  static getDerivedStateFromProps(nextProps: TransitionProps, prevState: TransitionState) {
    // console.log('getDerivedStateFromProps', prevState.status);
    // console.log('--------------');
    if (nextProps.in && prevState.status === UNMOUNTED) {
      return { status: EXITED };
    }
    return null;
  }

  componentDidUpdate(prevProps: TransitionProps) {
    let nextStatus: any = null;
    if (prevProps !== this.props) {
      const { status } = this.state;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else if (status === ENTERING || status === ENTERED) {
        nextStatus = EXITING;
      }
    }
    this.updateStatus(false, nextStatus);
  }

  updateStatus = (mounting = false, nextStatus: string) => {
    if (nextStatus !== null) {
      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.state.status === EXITED) {
      this.setState({ status: UNMOUNTED });
    }
  }

  performEnter = (mounting: boolean) => {
    const { timeout } = this.props;
    if (this.props.onEnter) {
      this.props.onEnter();
    }
    this.setState({ status: ENTERING }, () => {
      if (this.props.onEntering) {
        this.props.onEntering();
      }
      setTimeout(() => {
        this.setState({ status: ENTERED }, () => {
          if (this.props.onEntered) {
            this.props.onEntered();
          }
        });
      }, timeout);
    });
  }

  performExit = () => {

  }

  render() {
    const { status } = this.state;
    const {
      children,
      ...childProps
    } = this.props;
    if (status === UNMOUNTED) {
      return null;
    }
    // console.log(status);
    return (
      <Fragment>
        {typeof children === 'function'
          ? children(status, childProps)
          : React.cloneElement(React.Children.only(children as React.ReactElement), childProps)}
      </Fragment>
    )
  }
}

export default Transition;
