import React from "react"
import Spinner from "../Spinner"
import styles from "./OverlaySpinner.less"

const OverlaySpinner = () => (
  <div className={styles["spinner-overlay"]}>
    <Spinner/>
  </div>
)

export default OverlaySpinner