// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Express denieren naar "app"
const app = express()

// de link naar de data definieren
const apiUrl = 'https://redpers.nl/wp-json/wp/v2'
const apiPosts = apiUrl + '/posts'
const apiUsers = apiUrl + '/users'
const apiCategories = apiUrl + '/categories'

