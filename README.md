# Lektion-11-26

## BOM

Står för ***Browser Object Model*** och det refererar till object och funktioner som webbläsaren tillhandahåller för att interegera med webbsiddans miljö `utanför själva HTML-dokumentet`. HTML-dokumenter hanteras av DOM:en. BOM är en del av webbläsaren och omfattar massa olika funktionaliteter som vi kan använda oss utav.


För att komma åt BOM så använder vi en global variable som heter `window`

```js
// Här ser vi window i consolen som ett "objekt"
console.log(window)
```

Man kan använda `window` både implicit och explicit. Alltså:

```js
window.alert("An alert.") // Explicit användning
alert("An Alert.") // Implicit användning
```

### Nyckelaspekter för BOM

1. **Window-objecktet**, det globala objektet i webbläsarmiljön. Allt som finns på BOM:en är tillgängligt via detta objekt.

2. **Navigering och Historik**, BOM ger tillgång till webbläsarens historik och navigation.
    - **window.location**: ger information om och tillgång till manipulering av sidans URL.
    ```js
    console.log(window.location);
    ```

    - **window.history**: hanterar sidhistoriken.
    ```js
    console.log(window.history);
    window.history.back(); // Går tillbaks en sida
    window.history.forward(); // Går frammåt en sida
    ```

3. **Skärm och fönster**, BOM gör det möjligt att hantera och få information om skärmen och webbläsar-fönstret.
    - **window.screen**: info om skärmens upplösning.
    ```js
    console.log(window.screen);
    ```

    - **window.innerWidth** och **window.innerHeight**: ger webbläsarens bredd och höjd.

4. **Dialog-rutor**
    - alert() : visar ett meddelande i en dialog ruta
    - confirm() : visar en dialog ruta med bekräftelse-val
    - prompt() : visar en inmatningsruta där user kan ge text.

5. **Timers**: I BOM:en finns det metoder för att funktionalitet att köra kod efter en viss tid eller under ett regelbunder tidsintervall.

    - **setTimeout**: Kör en funktion efter en viss tid i millisekunder.
    
    Första argumentet är en callback-function, Andra argumentet är tiden som måste passera innan callback-funktionen anropas.
    
    ```js
    setTimeout(() => {
        console.log("3000 ms has passed");
    }, 3000);
    ```

    - **setInterval**: kör en funktion upprepande gånger med ett givet tidsintervall i millisekunder.

    ```js
    setInterval(() => {
        console.log("1000 ms has passed")
    }, 1000);
    ```

6. **Event Handling**: Hantera händelser som påverkar webbläsarfönstret.
    - **resize-event**: körs varje gång som användaren ändrar storlek på fönstret.

    ```js
    window.addEventListener("resize", () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        console.log({height, width});
    });
    ```

### BOM vs DOM

- **BOM** Handlar om interaktionen med webbläsarens miljö _(fönstret, naviggering, historik, skärm, local storage osv...)_

- **DOM** Handlar om att manipulera HTML och CSS i själva webbsidan, alltså HTML Dokumentet som läses in utav browsern.

## Local Storage

`localStorage` är en del av BOM och används för att lagra data i användarens webbläsare. 

### Vad är `localStorage`?

- **localStorage** är en nyckel-värdebaserad lagring som tillhandahålls av webbläsaren. 
    - Beständing och raderas inte när webbläsaren stängs ner eller tappar nätverksuppkoppling.

    - Endast tillgänglig från samma domän och protokoll _(same-origin-policy)_

### **Grundläggande metoder**

`localStorage` har enkla metoder för att sätta, läsa, uppdatera och ta bort data.

#### 1. **Spara data: `setItem(key, value)`**

```js
const username = "Oliver";
const userAge = 24;
const isDeveloper = true;

localStorage.setItem("username", username);
window.localStorage.setItem("userAge", userAge); // Explicit :) 
localStorage.setItem("isDeveloper", isDeveloper); // Implicit :) Same Same
```

#### 2. **Hämta data: `getItem(key)`**
```js
const username = localStorage.getItem("username");

const usernameHTML = `<p>${username}</p>`;
const content = document.querySelector(".content");
content.insertAdjacentHTML("afterbegin", usernameHTML);
```

Även om vi stänger ner webbläsaren och sätter ifrån den igen så kommer vårt "username" att dyka upp i DOM:en eftersom den är sparad i Local Storage.

#### 3. **Remove Item: `removeItem(key)`**

```js
localStorage.removeItem("isDeveloper");
```

Finns det ett värde som kan hämtas via den nyckeln så kommer den tas bort förevigt. Finns det inget värde som motsvarar nyckeln händer inget.

#### 4. **Rensa all data: `clear()`**

```js
localStorage.clear()
```

Används för att ta bort allt i Local Storage.

### **Spara komplexa objekt med JSON**

Eftersom localStorage endast stödjer strängar måste objekt serialiseras innan de sparas. För att göra det så finns det två metoder som vi kan använda oss utav.

`JSON.stringify()` - Konverterar objektet till en sträng.

`JSON.parse()` - Konverterar tillbaks strängen till det ursprungliga objektet.

```js
const user = {
    name: "Oliver",
    age: 24,
    isDeveloper: true,
};

localStorage.setItem("user", user);
```

Detta kommer inte funka som det ska för att browsern lyckas inte spara objektet som det är i Local Storage. Vi kan sen inte hämta det heller.

Vi måste serialisera det innan vi sparar det.

```js
localStorage.setItem("user", JSON.stringify(user));
```

Nu kan vi även hämta det genom att konvertera tillbaka det tills JS med hjälp av JSON.parse()

```js
const userFromLS = localStorage.getItem("user");
console.log(JSON.parse(userFromLS));
```


### Användningsområden

1. **Spara Användarinställningar**
    - Temafärg (ljus / mörkt tema)
    - Språkval (svenska / engelska)
    - Visningspreferenser (listvy eller rutnätsvy)

2. **Session- och användardata**
    - Användarnamn eller annan okänslig info. (ej lösenord)

3. **Formulärvärden**
    - Om en användare stänger och öppnar sidan igen kan deras ifyllda formulärfält finnas kvar.

4. **Enkel Caching**
    - Spara resultat från ett API-anrop som inte behöver anropas så ofta.


### **Säkerhet**

localStorage är inte säkert för känslig data. Starka skäl att undvika lagring av känslig information som lösenord och tokens.

- localStorage kan läsas av JavaScript från vilken som helst av sidans scripts, innehbär att det kan vara sårbart för XSS-attacker.

- Ska man spara känslig data så kan det vara bra att kryptera eller hasha den på något sätt eller helt enkelt använda säkrare alternativ.

### **Begränsingar**

- Begränsningar i storlek, tillåter mellan 5-10 MB per domän

- Endast strängar kan sparas. Alltså bör vi alltid spara det i JSON-format. För att konvertera till det används `JSON.stringify()` och `JSON-parse()` för att konvertera det tillbaka.

## Web API

Web APIs är en samlig funktioner och objekt som webbläsaren tillhandahåller för att utvecklare ska kunna interagera med webbsidan, webbläsaren och användarens enhet.

Det är ett gränssnitt mellan din kod (JavaScript) och webbläsarens inbyggda funktioner.

### Vad är relationen till BOM?

Kort sagt, Web APIs är verktygslådan som låter dig styra webbläsaren och dess resurer.


