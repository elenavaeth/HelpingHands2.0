"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
* Geschäftslogik zur Verwaltung von Benutzern. Diese Klasse implementiert die
* eigentliche Anwendungslogik losgelöst vom technischen Übertragungsweg.
* Die Benutzer werden der Einfachheit halber in einer MongoDB abgelegt.
*/

export default class BenutzerService {

  /**
  * Konstruktor.
  */

  constructor() {
    this._benutzer = DatabaseFactory.database.collection("benutzer");
  }

  /**
  * Benutzer suchen.
  * Unterstützt wird lediglich eine ganz einfache Suche, bei der einzelne
  * Felder auf exakte Übereinstimmung geprüft werden. Zwar unterstützt
  * MongoDB prinzipiell beliebig komplexe Suchanfragen.
  * Um das Beispiel klein zu halten, wird dies hier aber nicht unterstützt.
  *
  * @param {Object} query Optionale Suchparameter
  * @return {Promise} Liste der gefundenen Benutzer
  */

  async search(query) {
    let cursor = this._benutzer.find(query, {
      sort: {
        nachname: 1,
      }
    });
    return cursor.toArray();
  }

  /**
  * Speichern eines neuen Benutzers.
  *
  * @param {Object} benutzer Zu speichernde Benutzeredaten
  * @return {Promise} Gespeicherte Benutzerdaten
  */

  async create(benutzer) {
    benutzer = benutzer || {};

    let newBenutzer = {
      vorname:                          benutzer.vorname              || "",
      nachname:                         benutzer.nachname             || "",
      straße:                           benutzer.straße               || "",
      hausnummer:                       benutzer.hausnummer           || "",
      postleitzahl:                     benutzer.postleitzahl         || "",
      stadt:                            benutzer.stadt                || "",
      email:                            benutzer.email                || "",
      telefon:                          benutzer.telefon              || "",
      nutzername:                       benutzer.nutzername           || "",
      passwort:                         benutzer.passwort             || "",
    };

    let result = await this._benutzer.insertOne(newBenutzer);
    return await this._benutzer.findOne({_id: result.insertedId});
  }

  /**
  * Auslesen eines vorhandenen Benutzers anhand seiner ID.
  *
  * @param {String} id ID des gesuchten Benutzers
  * @return {Promise} Gefundenen Benutzerdaten
  */

  async read(id) {
    let result = await this._benutzer.findOne({_id: new ObjectId(id)});
    return result;
  }

  /**
  * Aktualisierung eines Benutzers, durch Überschreiben einzelner Felder
  * oder des gesamten Benutzer-Objektes (ohne die ID).
  *
  * @param {String} id ID des gesuchten Benutzers
  * @param {[type]} benutzer Zu speichernde Benutzerdaten
  * @return {Promise} Gespeicherte Benutzerdaten oder undefined
  */

  async update(id, benutzer) {
    let oldBenutzer = await this._benutzer.findOne({_id: new ObjectId(id)});
    if (!oldBenutzer) return;

    let updateDoc = {
      $set: {},
    }

    if (benutzer.vorname)           updateDoc.$set.vorname               = benutzer.vorname;
    if (benutzer.nachname)          updateDoc.$set.nachname              = benutzer.nachname;
    if (benutzer.straße)            updateDoc.$set.straße                = benutzer.straße;
    if (benutzer.hausnummer)        updateDoc.$set.hausnummer            = benutzer.hausnummer;
    if (benutzer.postleitzahl)      updateDoc.$set.postleitzahl          = benutzer.postleitzahl;
    if (benutzer.stadt)             updateDoc.$set.stadt                 = benutzer.stadt;
    if (benutzer.email)             updateDoc.$set.email                 = benutzer.email;
    if (benutzer.telefon)           updateDoc.$set.telefon               = benutzer.telefon;
    if (benutzer.nutzername)        updateDoc.$set.nutzername            = benutzer.nutzername;
    if (benutzer.passwort)          updateDoc.$set.passwort              = benutzer.passwort;

    await this._benutzer.updateOne({_id: new ObjectId(id)}, updateDoc);
    return this._benutzer.findOne({_id: new ObjectId(id)});
  }

  /**
  * Löschen eines Benutzers anhand seiner ID.
  *
  * @param {String} id ID des gesuchten Benutzers
  * @return {Promise} Anzahl der gelöschten Datensätze
  */

  async delete(id) {
    let result = await this._benutzer.deleteOne({_id: new ObjectId(id)});
    return result.deletedCount;
  }

}