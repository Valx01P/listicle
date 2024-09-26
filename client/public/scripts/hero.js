const app = document.getElementById('hero')

const hero = document.createElement('div')
hero.classList.add('hero')

const titleContainer = document.createElement('div')
titleContainer.classList.add('title-container')

const heroTitle = document.createElement('h1')
heroTitle.textContent = 'Stonk Tracker'

const heroSubtitle = document.createElement('p')
heroSubtitle.textContent = 'Track the juiciest stonks...Information may or may not be severly out of date'

titleContainer.appendChild(heroTitle)
titleContainer.appendChild(heroSubtitle)

hero.appendChild(titleContainer)

app.appendChild(hero)