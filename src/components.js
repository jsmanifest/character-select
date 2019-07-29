import React from 'react'
import cx from 'classnames'
import styles from './styles.module.css'

export const Header = ({ children, ...rest }) => (
  // eslint-disable-next-line
  <h1 className={styles.header} {...rest}>
    {children}
  </h1>
)

export const Subheader = ({ children, ...rest }) => (
  <small className={styles.subheader} {...rest}>
    {children}
  </small>
)

export const Content = ({ children, ...rest }) => (
  <div className={styles.container} {...rest}>
    {children}
  </div>
)

export const CharacterBox = ({ isSelected, type, imgProps, ...rest }) => (
  <div
    className={cx(styles.characterBox, {
      [styles.selectedBox]: isSelected,
    })}
    {...rest}
  >
    {type && <h2>{type}</h2>}
    <img alt='' {...imgProps} />
  </div>
)
