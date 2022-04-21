const PORTA = 8087
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const express = require('express')

const appl = express()
const url = 'https://www.corriere.it/'
const articoli = []

appl.listen(PORTA, () => {console.log(`Applicazione avviata su porta ${PORTA}`)})

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
       
        $('.media-content', html).each(function() {
            const titolo = $(this).text()
            const url = $(this).find('a').attr('href')
            articoli.push({
                titolo,
                url
            })
        })
        //console.log(articoli)
    }).catch( errore => { console.log(errore)})


appl.get('/notizie' , (req, res) => {
    res.json(articoli)
})