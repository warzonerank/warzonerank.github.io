
import React, { useEffect } from 'react';
import { useState } from "react";
import chart2 from "./chart2.PNG"
import "./Splash.css"
import COD_Specialist from "./COD_Specialist.png"
import Ruby from "./Ruby.png"
import Sapphire from "./Sapphire.png"
import Emerald from "./Emerald.png"
import Crystal from "./Crystal.png"

const Splash = () => {

    const [popOut, setPopOut] = useState(false)
    const [scoreVal, setScoreVal] = useState(1300)
    const [place, setPlace] = useState(false)
    const [killCount, setKillCount] = useState(0)
    const [ranking, setRanking] = useState(false)


    useEffect(() => {
        if (localStorage.score) {
            setScoreVal(Number(localStorage.score))
        } else { localStorage.score = scoreVal }

        if (Number(localStorage.score) < 1000) { setRanking("Emerald") }
        else if (Number(localStorage.score) < 2000 && Number(localStorage.score) >= 1000) { setRanking("Sapphire") }
        else if (Number(localStorage.score) < 3000 && Number(localStorage.score) >= 2000) { setRanking("Ruby") }
        else if (Number(localStorage.score) < 4000 && Number(localStorage.score) >= 3000) { setRanking("Crystal") }
        else { setRanking("COD Specialist") }

    }, [])

    const calculateScore = () => {
        let rank
        if (Number(localStorage.score) < 1000) { rank = 1 }
        else if (Number(localStorage.score) < 2000 && scoreVal >= 1000) { rank = 1 }
        else if (Number(localStorage.score) < 3000 && scoreVal >= 2000) { rank = 2 }
        else if (Number(localStorage.score) < 4000 && scoreVal >= 3000) { rank = 4 }
        else { rank = 4 }

        let finalScore
        let placement
        if (place === "<50") { placement = -50 * rank }
        if (place === "5th") { placement = 100 / rank }
        if (place === "4th") { placement = 120 / rank }
        if (place === "3rd") { placement = 150 / rank }
        if (place === "2nd") { placement = 175 / rank }
        if (place === "1st") { placement = 200 / rank }

        finalScore = placement + (Number(killCount) * (10 / rank))

        console.log(finalScore)
        console.log(rank)
        console.log(place)
        console.log(killCount)
        console.log(placement)

        setScoreVal(finalScore + Number(localStorage.score))
        localStorage.score = finalScore + Number(localStorage.score)

        if (Number(localStorage.score) < 1000) { setRanking("Emerald") }
        else if (Number(localStorage.score) < 2000 && Number(localStorage.score) >= 1000) { setRanking("Sapphire") }
        else if (Number(localStorage.score) < 3000 && Number(localStorage.score) >= 2000) { setRanking("Ruby") }
        else if (Number(localStorage.score) < 4000 && Number(localStorage.score) >= 3000) { setRanking("Crystal") }
        else { setRanking("COD Specialist") }

        // setScoreVal(0)
        // localStorage.score = 0
    }

    return (
        <div className='outer'>
            <h1 className='title'>WARZONE TEAM RANK</h1>
            <div className='outerPop'>
                <div
                    className='pop'
                    onClick={() => {
                        if (popOut === "about") {
                            setPopOut(false)
                        } else { setPopOut("about") }
                    }}>About</div>
                <div
                    className='pop'
                    onClick={() => {
                        if (popOut === "chart") {
                            setPopOut(false)
                        } else { setPopOut("chart") }
                    }}>Scoring Chart</div>
            </div>
            {popOut === "about" && <div className='popSubText'>
                This little web page was developed by Ben with inspiration from Jordan to
                provide him with a warzone ranking system so that he feels a sense of accomplishment when fighting for the dubski.
            </div>}
            {popOut === "chart" && <>
                <div className='popSubImage'>
                    <img className='chartImg' src={chart2}></img>
                </div>
            </>}
            <div className='form'>
                <div className='subTitle'>Input Game Results</div>
                <div className='buttonArray'>
                    <div className='loss pop' onClick={() => setPlace("<50")}>Loss {'<'}50 </div>
                    <div className='loss pop' onClick={() => setPlace("5th")}>5th</div>
                    <div className='loss pop' onClick={() => setPlace("4th")}>4th</div>
                    <div className='loss pop' onClick={() => setPlace("3rd")}>3rd</div>
                    <div className='loss pop' onClick={() => setPlace("2nd")}>2nd</div>
                    <div className='loss pop' onClick={() => setPlace("1st")}>1st</div>
                </div>
                <div className='kc'>
                    <div>Team Kills</div>
                    <input value={killCount} onChange={(e) => { setKillCount(e.target.value) }} type={'number'}></input>
                </div>
                {place && <div className='display'>You placed {place} with {killCount} kills</div>}
                <div className='finalButtons'>
                    <div className='clear pop' onClick={() => {
                        setPlace(false)
                        setKillCount(0)
                    }}>Clear</div>
                    <div className='submit pop'

                        onClick={calculateScore}

                    >Submit</div>
                </div>

            </div>

            <div className='output'>
                <div className='rankBig'>You are rank: {ranking} </div>
                <div className='big'>
                    {ranking === "Emerald" && <img className='rankImg' src={Emerald}></img>}
                    {ranking === "Sapphire" && <img className='rankImg' src={Sapphire}></img>}
                    {ranking === "Ruby" && <img className='rankImg' src={Ruby}></img>}
                    {ranking === "Crystal" && <img className='rankImg' src={Crystal}></img>}
                    {ranking === "COD Specialist" && <img className='rankImg' src={COD_Specialist}></img>}
                    <div className='score'>{scoreVal}</div>
                </div>
            </div>
        </div >
    )
}

export default Splash;
