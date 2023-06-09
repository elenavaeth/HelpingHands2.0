import React, { useEffect, useState} from 'react'
import Navigation from "./Navigation";
import logo from "./static/HelpingHands.png";
import {NavLink} from "react-router-dom";

const AnzeigeErstellen = () => {

    const [titel, setTitel] = useState('')
    const [beschreibung, setBeschreibung] = useState('')
    const [kategorie, setKategorie] = useState('')
    const [standort, setStandort] = useState('')
    const [zeitraum, setZeitraum] = useState('')
    const [nutzername, setNutzername] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/hilfsanzeige', {
            method: 'POST',
            body:
                JSON.stringify({
                    "titel": titel,
                    "beschreibung": beschreibung,
                    "kategorie": kategorie,
                    "standort": standort,
                    "zeitraum": zeitraum,
                    "nutzername": nutzername,

                }),

            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res));

    }

    return (
        <div>
            <Navigation />
            <div className="logo-container">
                <div className="logo-picture">
                    <img className="logo" src={logo}/>
                </div>
                <p className="logo-description double">
                    <div className="logo-description-title">Du brauchst Hilfe?</div>
                    <div className="logo-description-title"> Erstelle deinen Antrag und finde Hilfe in deiner Stadt! </div>
                </p>
            </div>
            <form className="helping-form">
                <div className="heling-form-inputs">
                    <div>
                        <input
                            placeholder="Ich brauche Hilfe bei..."
                            value={titel}
                            className="title-input"
                            onChange={(e) => setTitel(e.target.value)}
                        />
                    </div>
                    <div>
                        <select className="form-select category" aria-label="Default select example" value={kategorie} onChange={(e) => setKategorie(e.target.value)}>
                            <option selected>Kategorie</option>
                            <option value="Garten">Garten</option>
                            <option value="Betreuung">Betreuung</option>
                            <option value="Tierpflege">Tierpflege</option>
                            <option value="Technik">Technik</option>
                            <option value="Handwerk">Handwerk</option>
                            <option value="Nachhilfe">Nachhilfe</option>
                            <option value="Transport">Transport</option>
                            <option value="Sonstiges">Sonstiges</option>
                        </select>
                    </div>
                    <div>
                        <input
                            placeholder="Standort"
                            value={standort}
                            className="place-input"
                            onChange={(e) => setStandort(e.target.value)}
                        />
                        <input
                            placeholder="Zeitraum"
                            value={zeitraum}
                            className="time-input"
                            onChange={(e) => setZeitraum(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Beschreibung"
                            value={beschreibung}
                            className="description-input"
                            onChange={(e) => setBeschreibung(e.target.value)}
                        />
                    </div>
                    <div className="submit-button">
                        <button onClick={handleSubmit} type="submit">
                            <NavLink to="/hilfsanzeigen">Hilfsantrag veröffentlichen</NavLink>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AnzeigeErstellen;