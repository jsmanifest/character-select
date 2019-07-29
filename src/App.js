import React from 'react'
import cx from 'classnames'
import { RingLoader } from 'react-spinners'
import { MdKeyboardTab } from 'react-icons/md'
import scrollToComponent from 'react-scroll-to-component'
import noviceImg from './resources/novice.jpg'
import sorceressImg from './resources/sorceress.jpg'
import knightImg from './resources/knight.jpg'
import sageImg from './resources/sage.jpg'
import styles from './styles.module.css'
import { Header, Subheader, Content } from './components'

const useLevelUpScreen = ({ morphRef, morphedRef }) => {
  const [selected, setSelected] = React.useState([])
  const [morphing, setMorphing] = React.useState(false)
  const [morphed, setMorphed] = React.useState(false)
  const [ready, setReady] = React.useState(false)
  const [shutdown, setShutdown] = React.useState(false)

  const onSelect = (type) => (e) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(type)) {
        return prevSelected.filter((t) => t !== type)
      }
      return [...prevSelected, type]
    })
    scrollToComponent(morphRef.current, {
      offset: 300,
      align: 'bottom',
      duration: 1000,
    })
  }

  const onMorph = () => {
    setMorphing(true)
    setTimeout(() => {
      setMorphing(false)
      setMorphed(true)
    }, 1500)
  }

  React.useEffect(() => {
    if (morphed && !ready) {
      scrollToComponent(morphedRef.current, {
        offset: 100,
        align: 'middle',
        duration: 1000,
      })
    }
    setTimeout(() => {
      setReady(true)
    }, 5000)
  }, [morphed, morphedRef, ready])

  React.useEffect(() => {
    if (ready && !shutdown) {
      setTimeout(() => {
        setShutdown(true)
      }, 2000)
    }
  }, [ready, shutdown])

  return {
    selected,
    onSelect,
    morphed,
    morphing,
    onMorph,
    ready,
    shutdown,
  }
}

const App = () => {
  const morphRef = React.createRef()
  const morphedRef = React.createRef()
  const {
    selected,
    onSelect,
    morphing,
    morphed,
    onMorph,
    ready,
    shutdown,
  } = useLevelUpScreen({
    morphRef,
    morphedRef,
  })

  const onClick = (e) => {
    console.log("Don't mind me. I'm useless until I become useful")
  }

  return (
    <div
      className={cx(styles.root, {
        [styles.shutdown]: shutdown,
      })}
    >
      <Header>
        You are a <em>Novice</em>
      </Header>
      <Content>
        <div
          className={styles.characterBox}
          style={{ width: 200, height: 150 }}
        >
          <img alt='' src={noviceImg} />
        </div>
      </Content>
      <Subheader>Congratulations on reaching level 10!</Subheader>
      <div style={{ margin: '25px auto' }}>
        <Header>Choose your destiny</Header>
        <Subheader>Choose one. Or all, if you know what I mean.</Subheader>
        <Content>
          <div
            onClick={onSelect('Sorceress')}
            className={cx(styles.characterBox, {
              [styles.selectedBox]: selected.includes('Sorceress'),
            })}
          >
            <h2>Sorceress</h2>
            <img
              alt=''
              src={sorceressImg}
              className={cx(styles.tier2, {
                [styles.selected]: selected.includes('Sorceress'),
              })}
            />
          </div>
          <div
            onClick={onSelect('Knight')}
            className={cx(styles.characterBox, {
              [styles.selectedBox]: selected.includes('Knight'),
            })}
          >
            <h2>Knight</h2>
            <img
              alt=''
              src={knightImg}
              className={cx(styles.tier2, {
                [styles.selected]: selected.includes('Knight'),
              })}
            />
          </div>
        </Content>
      </div>
      <div
        ref={morphRef}
        className={cx(styles.morph, {
          [styles.hidden]: !selected.length,
        })}
      >
        <MdKeyboardTab className={styles.morphArrow} />
        <button
          ref={morphRef}
          name='morph'
          type='button'
          className={styles.morph}
          style={{ opacity: morphed ? '0.4' : 1 }}
          onClick={onMorph}
          disabled={morphed}
        >
          {morphing ? 'Morphing...' : morphed ? 'Morphed' : 'Morph'}
        </button>
        <MdKeyboardTab className={styles.morphArrowFlipped} />
      </div>
      <div
        className={cx({
          [styles.morphed]: morphed,
          [styles.hidden]: !morphed,
        })}
      >
        <Header>Congratulations!</Header>
        <div className={styles.container}>
          <div ref={morphedRef} className={styles.characterBox}>
            <img src={sageImg} />
          </div>
        </div>
        <Subheader>
          You have morphed into a <em>Sage</em>
        </Subheader>
      </div>
      <div
        className={cx(styles.next, {
          [styles.hidden]: !ready,
        })}
      >
        <div>
          <RingLoader size={60} color='rgb(213, 202, 255)' loading />
          <p>Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default App
