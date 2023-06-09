
import {useNavigate, NavLink} from "react-router-dom";
import React, { useEffect,useState } from "react";
import logo from "./static/HelpingHands.png"
import Modal from 'react-modal';


const Registrierung = () => {

  const CloseButton = ({ onClick }) => (
      <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "bold",
            color: "red",
          }}
          onClick={onClick}
      >
        &times;
      </button>
  );

    const [vorname, setVorname] = useState('');
    const [nachname, setNachname] = useState('');
    const [straße, setStraße] = useState('');
    const [hausnummer, setHausnummer] = useState('');
    const [postleitzahl, setPostleitzahl] = useState('');
    const [stadt, setStadt] = useState('');
    const [email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');
    const [nutzername, setNutzername] = useState('');
    const [passwort, setPasswort] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
     if (
         vorname === '' ||
         nachname === '' ||
         straße === '' ||
         hausnummer === '' ||
         postleitzahl === '' ||
         stadt === '' ||
         email === '' ||
         telefon === '' ||
         nutzername === '' ||
         passwort === ''
     ) {
       setShowPopup(true);
     } else {
       setShowPopup(false);
       const response = await fetch('http://localhost:3000/benutzer', {
         method: 'POST',
         body:
             JSON.stringify({
               "vorname": vorname,
               "nachname": nachname,
               "straße": straße,
               "hausnummer": hausnummer,
               "postleitzahl": postleitzahl,
               "stadt": stadt,
               "email": email,
               "telefon": telefon,
               "nutzername": nutzername,
               "passwort": passwort,
             }),

         headers: {
           'Content-Type': 'application/json'
         }
       }).then(res => console.log(res));
       navigate("/");
     }
   }


    return (
      <div className="registrieren-page">
      <div className="logo-picture">
        <img className="logo" src={logo} />
      </div>
      <h2>Registrieren</h2>
      <form className="register-form">
        <div className="name_container">
          <label htmlFor="name">Vorname</label>
          <br />
          <input
            placeholder="Vorname"
            className="name"
            value={vorname}
            onChange={(e) => setVorname(e.target.value)}
          />
          <br />
          <label htmlFor="name">Nachname</label>
          <br />
          <input
            placeholder="Nachname"
            className="name"
            value={nachname}
            onChange={(e) => setNachname(e.target.value)}
          />
        </div>
        <div className="adress_container">
          <label htmlFor="name">Straße</label>
          <br />
          <input
            placeholder="Mustermannstraße"
            className="otherField"
            value={straße}
            onChange={(e) => setStraße(e.target.value)}
          />
          <br />
          <label htmlFor="name">Hausnummer</label>
          <br />
          <input
            placeholder="1"
            className="otherField"
            value={hausnummer}
            onChange={(e) => setHausnummer(e.target.value)}
          />
          <br />
          <label htmlFor="name">Plz</label>
          <br />
          <input
            placeholder="78048"
            className="otherField"
            value={postleitzahl}
            onChange={(e) => setPostleitzahl(e.target.value)}
          />
          <br />
          <label htmlFor="name">Stadt</label>
          <br />
          <input
            placeholder="Musterstadt"
            className="otherField"
            value={stadt}
            onChange={(e) => setStadt(e.target.value)}
          />
        </div>
        <div className="mail_container">
          <label htmlFor="email">E-Mail</label>
          <br />
          <input
            placeholder="E-mail"
            className="otherField"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Telefonnummer</label>
          <br />
          <input
            placeholder="015637383"
            className="otherField"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
        </div>
        <div className="username_container">
          <label htmlFor="username">Username</label>
          <br />
          <input
            placeholder="max.mustermann"
            className="otherField"
            value={nutzername}
            onChange={(e) => setNutzername(e.target.value)}
          />
        </div>
        <div className="pw_container">
          <label htmlFor="password">Passwort</label>
          <br />
          <input
            placeholder="Password"
            className="otherField"
            type="password"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
        
          />
        </div>
        <button onClick={handleSubmit} type="submit">
          Registrieren
        </button>
      </form>
        {showPopup && (
            <Modal
                isOpen={true}
                onRequestClose={() => setShowPopup(false)}
                shouldCloseOnOverlayClick={false}
                style={{
                  content: {
                    width: "300px",
                    height: "400px",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "red",
                    border: "2px solid red",
                  },
                  overlay: {
                    background: "rgba(0, 0, 0, 0.5)",
                  },
                }}
            >
              <CloseButton onClick={() => setShowPopup(false)} />
              <h2>Für die Registrierung müssen alle Datenfelder ausgefüllt werden.</h2>
            </Modal>
        )}
      {console.log(
        vorname,
        nachname,
        straße,
        hausnummer,
        postleitzahl,
        stadt,
        email,
        telefon,
        nutzername,
        passwort
      )}
    </div>

    )
  }
    
   

export default Registrierung;