"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-login.html";

/**
* Klasse PageBewertung stellt die Listenübersicht der Bewertungen
* zur Verfügung
*/

export default class PageLogin extends Page {

  /**
  * Konstruktor.
  *
  * @param {App} app Instanz der App-Klasse
  */

  constructor(app) {
    super(app, HtmlTemplate);

    this._emptyMessageElement = null;
  }

  async init() {

    // HTML-Inhalt nachladen
    await super.init();
    this._title = "Page Login";

    // Platzhalter anzeigen, wenn noch keine Daten vorhanden sind
    let data = await this._app.backend.fetch("GET", "/login");
    this._emptyMessageElement = this._mainElement.querySelector(".empty-placeholder");

    if (data.length) {
      this._emptyMessageElement.classList.add("hidden");
    }
  }

}