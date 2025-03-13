// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';


console.log('Heet je echt zo??')
// Doe een fetch naar de data die je nodig hebt
// const apiResponse = await fetch('...')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
// const apiResponseJSON = await apiResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(apiResponseJSON)

// Doe een fetch naar de data die je nodig hebt
const stekjesResponse = await fetch('https://fdnd-agency.directus.app/items/bib_stekjes')
const stekjesResponseJSON = await stekjesResponse.json()

const plaatjesResponse = await fetch('https://fdnd-agency.directus.app/items/bib_afbeeldingen?filter={%20%22type%22:%20{%20%22_eq%22:%20%22stekjes%22%20}}')
const plaatjesResponseJSON = await plaatjesResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(apiResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
 response.render('index.liquid', {
  stekjes: stekjesResponseJSON.data,
  plaatjes: plaatjesResponseJSON.data
 })
})

app.get('/stekjes', async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
response.render('stekjes.liquid', {
 stekjes: stekjesResponseJSON.data,
 plaatjes: plaatjesResponseJSON.data
})
})

app.get('/stekjes/:id', async function (request, response) {
const stekjeId = request.params.id;
const stekjeResponse = await fetch(`https://fdnd-agency.directus.app/items/bib_stekjes/${stekjeId}`);
const stekjeData = await stekjeResponse.json();

response.render('stekjes.liquid', { stekje: stekjeData.data });
});

app.get('/agenda', async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
response.render('agenda.liquid', {
})})

app.get('/', async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
response.render('partners.liquid', {
})})

app.get('/', async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
response.render('over.liquid', {
})})

app.get('/', async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
response.render('contact.liquid', {
})})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

app.get('/404', async function (request, response) {
  response.render('404.liquid')
})

app.use((req, res, next) => {
  res.status(404).render('404.liquid')
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
