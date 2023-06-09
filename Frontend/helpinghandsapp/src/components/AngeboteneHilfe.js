import React, { useEffect, useState} from 'react'
import Navigation from "./Navigation";
import logo from "./static/HelpingHands.png";

const AngeboteneHilfe = () => {

    const [nutzername, setNutzername] = useState([]);
    const [angebote, setAngebote] = useState([]);
    const [benutzer, setBenutzer] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

    useEffect(() => {
        fetch('http://localhost:3000/angebot')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAngebote(data);

            }).catch((err) => {
            console.log(err.message);
        });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/benutzer')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBenutzer(data);

            }).catch((err) => {
            console.log(err.message);
        });
    }, []);

    return (
            <div>
                <Navigation />
                <div className="logo-container">
                    <div className="logo-picture">
                        <img className="logo" src={logo}/>
                    </div>
                    <p className="logo-description">
                        Überblick über deine angebotene Hilfe
                    </p>
                </div>
                <ol className="hilfsanzeigen">
                    {
                        angebote && angebote.map ((angebot, index)=> {
                            if (angebot.nutzername === nutzername) {
                                return (
                                    <div className="hilfen">
                                        <div className="card">
                                            <li className="list-entry" data-id={angebot._id}>
                                                <div className="stadt titel">
                                                    {angebot.standort}: {angebot.titel}
                                                </div>
                                                <div className="beschreibung">
                                                    Kontaktdaten des Hilfesuchenden:
                                                </div>
                                                <ul>
                                                    {
                                                        benutzer && benutzer.map ((benutzer, index)=> {
                                                            if (benutzer.nutzername === angebot.ersteller) {
                                                                return (
                                                                    <div>
                                                                        <li>
                                                                            <div className="standort">Name:</div>
                                                                            {benutzer.vorname} {benutzer.nachname}
                                                                        </li>
                                                                        <li>
                                                                            <div className="zeitpunkt">Adresse:</div>
                                                                            {benutzer.straße} {benutzer.hausnummer}, {benutzer.postleitzahl} {benutzer.stadt}
                                                                        </li>
                                                                        <li>
                                                                            <div className="kategorie">Email:</div>
                                                                            {benutzer.email}
                                                                        </li>
                                                                        <li>
                                                                            <div className="kategorie">Telefon:</div>
                                                                            {benutzer.telefon}
                                                                        </li>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        </div>
                                    </div>

                                )
                            }
                        })
                    }
                </ol>
            </div>
    )
}

export default AngeboteneHilfe;