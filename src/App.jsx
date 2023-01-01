import { useState } from 'react'
import Die from "./components/dice"
import {nanoid} from 'nanoid'
import { useEffect } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use-window-size'
//


function App() {

  const { width, height } = useWindowSize()
  const [dice, setDice] = useState(allNewDice())
  const [tenzies,setTenzies] = useState(false)
  let [buttonText,setButton] = useState("Roll")

  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].Value
    const allSameValue = dice.every(die => die.Value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        setButton("New Game")
        }
  },[dice])

  function generateNewDie() {
    return {
        Value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }


  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  
  function holdDice(id){
    setDice(prev=>{return prev.map((dice)=>{
      if(dice.id === id){
        return {...dice,isHeld:!dice.isHeld}
      }
      else return dice})
    })
  }
  function rollDice(){
    if(tenzies)
    {
      setTenzies(false)
      setDice(allNewDice())
    }
    else{
    setDice(prev => prev.map((d)=>{
      return d.isHeld ? d : generateNewDie()
    }))}
  }
  const diceElements = dice.map(num => <Die value={num.Value} id={num.id} isHeld={num.isHeld} hold={holdDice}/>)

  return (
    <main className='app'>
      <div className='cont'>
        <div><h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p></div>
        <div className="dice-container">
            {diceElements}
        </div>
        <button onClick={rollDice} className="roll-dice">{buttonText}</button>
        {tenzies &&  <Confetti width={width} height={height}/>}
      </div>
    </main>
  )
}

export default App
