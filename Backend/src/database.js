"use strict"

import { MongoClient } from "mongodb";

/**
 * Singleton-Klasse zum Zugriff auf das MongoDB-Datenbankobjekt, ohne dieses
 * ständig als Methodenparameter durchreichen zu müssen. Stattdessen kann
 * einfach das Singleton-Objekt dieser Klasse importiert und das Attribut
 * `mongodb` oder `database` ausgelesen werden.
 */

class DatabaseFactory {

    /**
     * Ersatz für den Konstruktor, damit aus dem Hauptprogramm heraus die
     * Verbindungs-URL der MongoDB übergeben werden kann. Hier wird dann
     * auch gleich die Verbindung hergestellt.
     *
     * @param {String} connectionUrl URL-String mit den Verbindungsdaten
     */

    async init(connectionUrl) {

        // Datenbankverbindung herstellen
        this.client = new MongoClient(connectionUrl);
        await this.client.connect();
        this.database = this.client.db("helpinghands");

        await this._createDemoData();
    }

    /**
     * Hilfsmethode zum Anlegen von Demodaten. Würde man so in einer
     * Produktivanwendung natürlich nicht machen, aber so sehen wir
     * wenigstens gleich ein paar Daten.
     */

    async _createDemoData() {

        //Demodaten von Hilfsanzeigen
        let hilfsanzeige = this.database.collection("hilfsanzeige");
        if (await hilfsanzeige.estimatedDocumentCount() === 0) {
            hilfsanzeige.insertMany([
                {
                    titel: "Rasenmähen",
                    beschreibung: "Mein Rasen muss gemäht werden. Bitte um Hilfe!",
                    kategorie: "Garten",
                    zeitraum: "31.05.2023",
                    standort:"Karlsruhe",
                    nutzername: "peter.k"
                },
                {
                    titel: "Regal aufbauen",
                    beschreibung: "Ich brauche einen Handwerker. Bitte um Hilfe!",
                    kategorie: "Möbel",
                    zeitraum: "29.05.2023",
                    standort:"Landau",
                    nutzername: "hans.m"
                },
            ]);
        }

        //Demodaten von Benutzer
        let benutzer = this.database.collection("benutzer");
        if (await benutzer.estimatedDocumentCount() === 0) {
            benutzer.insertMany([
                {
                    vorname: "Hans",
                    nachname: "Müller",
                    straße: "Landwehrstraße",
                    hausnummer: "7",
                    postleitzahl: "76829",
                    stadt: "Landau",
                    email: "hans.mueller@gmail.com",
                    telefon: "00001717",
                    nutzername:"hans.m",
                    passwort: "hansm"
                },
                {
                    vorname: "Peter",
                    nachname: "Klaus",
                    straße: "Karlsruherstraße",
                    hausnummer: "99",
                    postleitzahl: "76133",
                    stadt: "Karlsruhe",
                    email: "klaus.peter@gmail.com",
                    telefon: "00009999",
                    nutzername:"peter.k",
                    passwort: "peterk"
                },
            ]);
        }

    }

}

export default new DatabaseFactory();
