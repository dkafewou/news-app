import React from "react"
import styles from "./ErrorBoundary.less"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles["error-boundary"]}>
          <h1>Aww, snap. You broke it.</h1>
          <p>Try hitting the refresh button, and if that doesn't work, <a href="#">contact support</a>.</p>
          <code className={styles["stack"]}>
            {this.state.error.stack.toString()}
          </code>
        </div>
      )
    }

    return this.props.children
  }
}
