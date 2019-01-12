import React from "react"
import styles from "./Spinner.less"

const Spinner = ({ Lg, Sm, hidden }) => {
  const sizeClass = (() => {
    if (Lg) {
      return styles["spinner-large"]
    } else if (Sm) {
      return styles["spinner-small"]
    } else {
      return ""
    }
  })()

  return (
    <div className={`spinner ${styles.spinner} ${sizeClass}`} hidden={hidden}/>
  )
}

export default Spinner
