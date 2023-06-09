"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
* Geschäftslogik zur Verwaltung von Hilfsanzeigen. Diese Klasse implementiert die
* eigentliche Anwendungslogik losgelöst vom technischen Übertragungsweg.
* Die Hilfsanzeigen werden der Einfachheit halber in einer MongoDB abgelegt.
*/

export default class HilfsanzeigeService {

  /**
  * Konstruktor.
  */

  constructor() {
    this._hilfsanzeige = DatabaseFactory.database.collection("hilfsanzeige");
  }

  /**
  * Hilfsanzeige suchen.
  * Unterstützt wird lediglich eine ganz einfache Suche, bei der einzelne
  * Felder auf exakte Übereinstimmung geprüft werden. Zwar unterstützt
  * MongoDB prinzipiell beliebig komplexe Suchanfragen.
  * Um das Beispiel klein zu halten, wird dies hier aber nicht unterstützt.
  *
  * @param {Object} query Optionale Suchparameter
  * @return {Promise} Liste der gefundenen Hilfsanzeigen
  */

  async search(query) {
    let cursor = this._hilfsanzeige.find(query, {
      sort: {
        titel: 1,
      }
    });
    return cursor.toArray();
  }

  /**
  * Speichern einer neuen Hilfsanzeige.
  *
  * @param {Object} hilfsanzeige Zu speichernde Hilfsanzeigedaten
  * @return {Promise} Gespeicherte Hilfsanzeigedaten
  */

  async create(hilfsanzeige) {
    hilfsanzeige = hilfsanzeige || {};

    let newHilfsanzeige = {
      titel:                            hilfsanzeige.titel                    || "",
      beschreibung:                     hilfsanzeige.beschreibung             || "",
      kategorie:                        hilfsanzeige.kategorie                || "",
      zeitraum:                         hilfsanzeige.zeitraum                 || "",
      standort:                         hilfsanzeige.standort                 || "",
      nutzername:                       hilfsanzeige.nutzername               || ""
    };

    let result = await this._hilfsanzeige.insertOne(newHilfsanzeige);
    return await this._hilfsanzeige.findOne({_id: result.insertedId});
  }

  /**
  * Auslesen einer vorhandenen Hilfsanzeige anhand seiner ID.
  *
  * @param {String} id ID der gesuchten Hilfsanzeige
  * @return {Promise} Gefundenen Hilfsanzeigedaten
  */

  async read(id) {
    let result = await this._hilfsanzeige.findOne({_id: new ObjectId(id)});
    return result;
  }

  /**
  * Aktualisierung einer Hilfsanzeige, durch Überschreiben einzelner Felder
  * oder des gesamten Hilfsanzeige-Objektes (ohne die ID).
  *
  * @param {String} id ID der gesuchten Hilfsanzeige
  * @param {[type]} rezept Zu speichernde Hilfsanzeigedaten
  * @return {Promise} Gespeicherte Hilfsanzeigedaten oder undefined
  */

  async update(id, hilfsanzeige) {
    let oldHilfsanzeige = await this._hilfsanzeige.findOne({_id: new ObjectId(id)});
    if (!oldHilfsanzeige) return;

    let updateDoc = {
      $set: {},
    }

    if (hilfsanzeige.titel)           updateDoc.$set.titel               = hilfsanzeige.titel;
    if (hilfsanzeige.beschreibung)    updateDoc.$set.beschreibung        = hilfsanzeige.beschreibung;
    if (hilfsanzeige.kategorie)       updateDoc.$set.kategorie           = hilfsanzeige.kategorie;
    if (hilfsanzeige.zeitraum)        updateDoc.$set.zeitraum            = hilfsanzeige.zeitraum;
    if (hilfsanzeige.standort)        updateDoc.$set.standort            = hilfsanzeige.standort;
    if (hilfsanzeige.nutzername)      updateDoc.$set.nutzername          = hilfsanzeige.nutzername;


    await this._hilfsanzeige.updateOne({_id: new ObjectId(id)}, updateDoc);
    return this._hilfsanzeige.findOne({_id: new ObjectId(id)});
  }

  /**
  * Löschen einer Hilfsanzeige anhand seiner ID.
  *
  * @param {String} id ID der gesuchten Hilfsanzeige
  * @return {Promise} Anzahl der gelöschten Datensätze
  */

  async delete(id) {
    let result = await this._hilfsanzeige.deleteOne({_id: new ObjectId(id)});
    return result.deletedCount;
  }

}
