# MovieZone

## Description
A web application which allows movie enthusiasts to search for movie titles and create a schedule to watch movies.

## Table of Contents

* [Description](#Description)
* [Deployed Page](#Deployed-Page)
* [User story](#User-Story)
* [Acceptance Criteria](#Acceptance-Criteria)
* [Usage](#Usage)
* [Credits](#Credits)
* [Technologies Used](#Technologies-Used)
* [License](#License)


## Deployed page
The web application is deplayed using GitHub Pages at: https://aywink.github.io/MovieZone/

## User story
```markdown
As a movie enthusiast,
I want to search for movies to watch and create a schedule,
so that I can better organise my time to watch as many movies as possible!
```

## Acceptance criteria
```markdown
GIVEN a movie dashboard web application

WHEN the page loads

THEN I am presented with the following details about the movies I have decided to watch later with a polished and responsive UI:
* Movie Title
* Movie Poster background
* Runtime
* Plot
* Viewing Date
* Location where I will watch the movie, e.g. the cinema or an online  streaming site link
* Who I will watch the movies with, e.g. friends, family, .etc.
* Any other additional information, such as when I will watch the movie

WHEN I search for a movie title

THEN I am presented with the movie trailer and information about the movie i.e.:
* Release Year
* Actors
* Directors
* Genre
* Plot
* Omdb Rating

WHEN I have decided to watch a movie later

THEN I am presented with a form that will allow me to add information to organise a movie viewing event

WHEN I add the movie viewing events to the watch list

THEN the events are persistently saved and can be viewed later after reopening/reloading the web application
```

## Usage 
The webpage allows you to search the OMDB database, click in the search bar and type in the movie you want to know more about. Click search, and watch as the page loads. Here you see info about the movie, and the trailer for the movie.

When the clock symbols is clicked in the top right corner of the information section, a modal appears and lets you save the movie to your schedule.
The movie saved to the schedule then appears in a carousel in the bottom of the page.

![computer app demo](assets/gif/chrome_STbkM3AxFm.gif)

When you access the site from a mobile, the sections realign themselves as columns.

![mobile response demo](assets/gif/chrome_ihcn4sLnBc.gif)

## Credits
Collaborators:
- Aywin: https://github.com/AywinK
- Inna:  https://github.com/innonka
- Sofie: https://github.com/sofie-ventzel

APIs and External Library Resources: 
- OMDb API- http://www.omdbapi.com/ 
- Youtube API v3 - https://developers.google.com/youtube/v3
- Font Awesome Docs - https://fontawesome.com/docs/web
- jQuery UI autocomplete Documentation - https://jqueryui.com/datepicker/
- jQuery Documentation - https://api.jquery.com/
- Moment.js Documentation - https://momentjs.com/docs/
- Bootstrap Documentation - https://getbootstrap.com/docs/5.2/getting-started/introduction/

Tutorials:
- W3Schools - https://www.w3schools.com/js/default.asp
- MDN Documentation - https://developer.mozilla.org/en-US/
- Stack Overflow threads - https://stackoverflow.com/
- JavaScript: The Definitive Guide, 7th Edition by David Flanagan - ISBN: 9781491952023
- jQuery Cheat Sheet - https://htmlcheatsheet.com/jquery/
- YouTube tooltips tutorial - https://www.youtube.com/watch?v=WTrW-1JsDYE
- YouTube modal tutorial - https://www.youtube.com/watch?v=tt5uUMQgzl0
- YouTube carousel tutorial - https://www.youtube.com/watch?v=xReQ_nQbdmA
/

## Technologies Used
- Bootstrap
- Font Awesome
- jQuery
- jQuery UI DatePicker
- Moment.js
- OMDb API
- YouTube API v3

## Future Development
The functionality, responsiveness and user interface is constantly being developed to enhance the user experience and application usability. The issues tab (https://github.com/AywinK/MovieZone/issues) documents improvements to the application. 

## License
MIT License
