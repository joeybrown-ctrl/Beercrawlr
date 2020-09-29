# BeerCrawlr

**version 1.0.0**

[For deployed version, click me](https://joeybrown-ctrl.github.io/Beercrawlr/)

<br>

## User Story

```
AS a beer-loving tourist, 
WHEN I enter a city, or my current location into BeerCrawlr, 
THEN I am given the information of local breweries or restaurants.
```

## Acceptance Criteria

```
GIVEN an app that locates local breweries and restaurants through a search input
WHEN I enter a city
THEN I am presented with three buttons: 'Thirsty?', 'Hungry?', or 'Near Me'
WHEN I choose 'Thirsty?'
THEN I am given the information of local breweries
WHEN I view a particular brewery
THEN I am presented with the brewery type, and a link to their website
WHEN I choose 'Hungry?'
THEN I am presented with local restaurants and a link to their page on Zomato
WHEN I choose 'Near Me?'
THEN I am presented with local restaurants based on my current location
```

## How It Works

BeerCrawlr is an app for beer-lovers and foodies who want to check out the local offerings from wherever they are or want to go. Four APIs are used to retrieve data for the user: OpenBreweryDB, Zomato, Algolia and the Geolocation API. Upon landing on the page, the user is able to easily navigate between three button options: 'Thirsty?', 'Hungry?' and 'Near Me' -- each of which uses a different API to populate the information of breweries and restaurants on the page. When entering a location into the search input, a location auto-fill 
appears to further assist the user with their search. 

![Image]()


## Built With

* [Zomato API](https://developers.zomato.com/api)
* [Open Brewery DB](https://www.openbrewerydb.org/)
* [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
* [Algolia API](https://community.algolia.com/places/api-clients.html)
* [Insomnia](https://insomnia.rest/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Bulma](https://bulma.io/)
* [jQuery](https://jquery.com/)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [HTML 5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
* [Markdown](https://guides.github.com/features/mastering-markdown/) 


## Team Steel Contributors

* [Chris Falk](https://github.com/chrisfalk88)
* [Jake Ehmann](https://github.com/jakeehmann42)
* [Musomi McDowell](https://github.com/musomijr)
* [Joey Brown](https://github.com/joeybrown-ctrl)



&copy; 2020 Team Steel. All rights reserved.