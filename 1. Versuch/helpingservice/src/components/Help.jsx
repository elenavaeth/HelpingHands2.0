import React, { useState, useEffect } from 'react';
import db from './firebase.config';
import "./Help.css";

const Help = () => {
    const [helps, setHelps] = useState([])

    const fetchHelps=async()=>{
        const response=db.collection('helps');
        const data=await response.get();
        let helpArray = []
        data.docs.forEach((help) => {
            helpArray.push(help.data())
        })
        setHelps(helpArray)
    }

    useEffect(() => {
        fetchHelps();
    }, [])

    return (
        <div className="Help">
            <h1>Hilfeinträge</h1>
            {
                helps && helps.map((help, index)=> {
                    console.log(help.title)
                    return (
                            <section key={help.id}>
                                <h2><strong>{help.city}:</strong> {help.title} </h2>
                                <p>{help.description} </p>
                                <ul>
                                    <li><div>Standort:</div> {help.city} </li>
                                    <li><div>Zeitpunkt:</div> {help.date} </li>
                                    <li><div>Kategorie:</div> {help.category} </li>
                                </ul>

                            </section>
                    )
                })

            }
        </div>
    )
}

export default Help;
