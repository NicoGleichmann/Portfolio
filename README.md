# nicogleichmann.de

Persönliche Website von Nico Gleichmann – Hauptseite der Domain `nicogleichmann.de`.
Die Business-Seite **Lumio** läuft getrennt unter `automatisierung.nicogleichmann.de` (Repo `Business_Website`) und ist von hier aus verlinkt.

- **Technik:** reines HTML, CSS und JavaScript – kein Build-Schritt, keine Abhängigkeiten
- **Datenschutzfreundlich:** keine Cookies, kein Tracking, keine externen Dienste, Schriften lokal
- **Geprüft:** axe-core ohne Befund (WCAG 2.2 AA), funktioniert auch ohne JavaScript

## Dateien

| Datei / Ordner          | Inhalt                                                             |
| ----------------------- | ------------------------------------------------------------------ |
| `index.html`            | Startseite mit allen Texten                                        |
| `impressum.html`        | Impressum (gleiche Angaben wie bei Lumio)                          |
| `datenschutz.html`      | Datenschutzerklärung                                               |
| `404.html`              | Fehlerseite (Cloudflare zeigt sie automatisch an)                  |
| `styles.css`            | Gestaltung; Farben und Schriften als Variablen ganz oben           |
| `script.js`             | Handy-Menü, aktiver Menüpunkt, „Adresse kopieren“, Jahreszahl      |
| `assets/fonts/`         | Schriften Inter und Cormorant Garamond (SIL Open Font License)     |
| `assets/img/`           | Porträtfoto (`.jpg` + `.webp`)                                     |
| `og-image.jpg`          | Vorschaubild für WhatsApp, LinkedIn & Co. (1200 × 630 px)          |
| `favicon.*`, `apple-touch-icon.png` | Icons im Browser-Tab und auf dem Handy-Startbildschirm |
| `_headers`              | Sicherheits- und Cache-Regeln für Cloudflare                       |
| `robots.txt`, `sitemap.xml` | Hinweise für Suchmaschinen                                     |

## Lokal ansehen

`index.html` per Doppelklick im Browser öffnen. Oder mit Node.js:

```bash
npx serve .
```

## Veröffentlichen mit Cloudflare Pages

Einmalig, wenn die Nameserver von `nicogleichmann.de` bei INWX schon auf Cloudflare zeigen
(das gilt dann auch für `automatisierung.nicogleichmann.de`).

1. Cloudflare-Dashboard → **Workers & Pages** → **Erstellen** → Reiter **Pages** → **Mit Git verbinden**
2. Repository `NicoGleichmann/Portfolio` wählen, Produktions-Branch `main`
3. Build-Einstellungen:
   - Framework: **None**
   - Build-Befehl: leer lassen (falls ein Befehl verlangt wird: `exit 0`)
   - Ausgabeverzeichnis: `/`
4. **Speichern und bereitstellen**
5. Im Projekt → **Benutzerdefinierte Domains** → `nicogleichmann.de` hinzufügen.
   Optional zusätzlich `www.nicogleichmann.de` und unter **Regeln → Weiterleitungsregeln** die Vorlage
   „Redirect from WWW to root“ aktivieren.

Ab dann geht jede Änderung auf `main` automatisch nach ein bis zwei Minuten online.

Für Lumio legst du im selben Konto ein **zweites** Pages-Projekt mit dem Repo `Business_Website` an
(Domain `automatisierung.nicogleichmann.de`, Einstellungen siehe README dort).

### Wichtig für den Datenschutz

Die Datenschutzerklärung beschreibt genau diesen Aufbau. Wenn du in Cloudflare **Web Analytics**,
**Zaraz** oder **Bot Fight Mode** einschaltest, ein Kontaktformular einbaust oder Inhalte von anderen
Diensten einbindest (Videos, Karten, Schriften von Google), muss `datenschutz.html` angepasst werden.
Web Analytics würde außerdem von der Sicherheitsregel in `_headers` blockiert.

## Pflege

| Was                        | Wo                                                                          |
| -------------------------- | --------------------------------------------------------------------------- |
| Alter                      | `index.html`, Abschnitt „Start“ (Kommentar „Alter einmal im Jahr anpassen“) |
| Abschnitt „Jetzt“          | Karten anpassen und das Datum „Stand: …“ darüber aktualisieren              |
| Zeitleiste „Weg“           | `is-current` zum aktuellen Schritt verschieben, erledigte bekommen `is-done` |
| Foto                       | `assets/img/nico-gleichmann.jpg` und `.webp` ersetzen (quadratisch, mind. 800 × 800 px) |
| Kontaktdaten / Anschrift   | `index.html`, `impressum.html`, `datenschutz.html`                          |
| Nach größeren Änderungen   | `lastmod` in `sitemap.xml` auf das heutige Datum setzen                     |
