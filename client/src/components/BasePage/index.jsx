import React from "react"
import PropTypes from "prop-types"
import styles from "./BasePage.less"
import OverlaySpinner from "../OverlaySpinner"

const BasePage = ({ isLoading, className, children }) => {
  if (isLoading) {
    return (
      <div className={`${styles["base-page"]} ${className}`}>
        {children}
        <OverlaySpinner/>
      </div>
    )
  }

  return (
    <div className={`${styles["base-page"]} ${className}`}>
      {children}
    </div>
  )
}

BasePage.propTypes = {
  isLoading: PropTypes.bool,
}

export default BasePage
