import React from 'react'
import cx from 'classnames'
import { RingLoader } from 'react-spinners'
import { MdKeyboardTab } from 'react-icons/md'
import scrollToComponent from 'react-scroll-to-component'
import noviceImg from './resources/novice.jpg'
import sorceressImg from './resources/sorceress.jpg'
import knightImg from './resources/knight.jpg'
import archerImg from './resources/archer.jpg'
import bladeMasterImg from './resources/blademaster.jpg'
import destroyerImg from './resources/destroyer.jpg'
import summonerImg from './resources/summoner.jpg'
import shapeshifterImg from './resources/shapeshifter.jpg'
import banditImg from './resources/bandit.jpg'
import phantomImg from './resources/phantom.jpg'
import styles from './styles.module.css'
import { Header, Subheader, Content, CharacterBox } from './components'

const characterSelections = [
  { type: 'Sorceress', src: sorceressImg },
  { type: 'Knight', src: knightImg },
  { type: 'Shapeshifter', src: shapeshifterImg },
  { type: 'Bandit', src: banditImg },
  { type: 'Archer', src: archerImg },
  { type: 'Blade Master', src: bladeMasterImg },
  { type: 'Destroyer', src: destroyerImg },
  { type: 'Summoner', src: summonerImg },
  { type: 'Phantom', src: phantomImg },
]

const mappedCharSelections = characterSelections.reduce(
  (acc, { type, src }) => ({
    ...acc,
    [type]: src,
  }),
  {},
)

const useLevelUpScreen = ({ morphRef, morphedRef }) => {
  const [selected, setSelected] = React.useState(null)
  const [morphing, setMorphing] = React.useState(false)
  const [morphed, setMorphed] = React.useState(false)
  const [ready, setReady] = React.useState(false)
  const [shutdown, setShutdown] = React.useState(false)

  const onSelect = (type) => (e) => {
    setSelected(type)
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
      setTimeout(() => {
        setReady(true)
      }, 2000)
    }
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

  return (
    <div
      className={cx(styles.root, {
        [styles.shutdown]: shutdown,
        [styles.rootTransition]: morphed,
      })}
    >
      <Header>
        You are a <em>Novice</em>
      </Header>
      <Content>
        <CharacterBox
          style={{ width: 200, height: 150 }}
          imgProps={{ src: noviceImg }}
          disableFlashing
        />
      </Content>
      <Subheader>Congratulations on reaching level 10!</Subheader>
      <div style={{ margin: '25px auto' }}>
        <Header>Choose your destiny</Header>
        <Subheader>Choose one. Or all, if you know what I mean.</Subheader>
        <Content display='grid'>
          {characterSelections.map((props, index) => (
            <CharacterBox
              key={`char_selection_${index}`}
              onClick={onSelect(props.type)}
              isSelected={selected === props.type}
              {...props}
            />
          ))}
        </Content>
      </div>
      <div
        ref={morphRef}
        className={cx(styles.morph, {
          [styles.hidden]: !selected,
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
        <Content>
          <CharacterBox
            ref={morphedRef}
            type={selected}
            headerProps={{ className: styles.unique }}
            imgProps={{ src: mappedCharSelections[selected] }}
          />
        </Content>
        <Subheader>
          You have morphed into a <em>{selected}</em>
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
