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

export const Content = ({ display = '', children, ...rest }) => (
  <div
    className={cx(styles.container, {
      [styles.gridDisplay]: display === 'grid',
    })}
    {...rest}
  >
    {children}
  </div>
)

export const CharacterBox = React.forwardRef(
  (
    {
      isSelected,
      type,
      headerProps = {},
      imgProps = {},
      src,
      disableFlashing,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cx(styles.characterBox, {
        [styles.selectedBox]: isSelected,
      })}
      {...rest}
    >
      {type && <h3 {...headerProps}>{type}</h3>}
      <img
        {...imgProps}
        src={src || imgProps.src}
        className={cx(styles.tier2, imgProps.className, {
          [styles.selected]: isSelected,
          [styles.noAnimation]: !!disableFlashing,
        })}
        alt=''
      />
    </div>
  ),
)
