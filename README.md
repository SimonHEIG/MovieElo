# MovieElo
## Description
MovieElo is an app that allows users to rate and rank movies from their **Notion watch list** using the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system).

An example of the app is avaliable here : [MovieElo](https://movie-elo.meia.dev/)

## Features
### Elo rating system
In the context of ranking movies, the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system) is used to calculate the new ratings for two movies after a match has taken place, where the match is a user rating one movie against another. 

**Example** : Let's say that there is a match confronting : *Forrest Gump - 1500 Elo* **vs** *The Man from Toronto - 500 Elo*
- If *Forrest Gump* wins : *Forrest Gump* will **lose** *0.1 points* & *The Man from Toronto* will **win** *0.1 points*
- If *The Man from Toronto* wins : *Forrest Gump* will **lose** *39.1 points* & *The Man from Toronto* will **win** *39.1 points*

### Ranking and movies infos
The app displays and updates the ranking. Clicking on a movie in the ranking will open a modal displaying infos about the movie.

### Notion API
MovieElo uses the [Notion API](https://developers.notion.com/) to fetch user's movies infos such as :
- Movie Name, cast, director, ...
- Differents rankings
- Movie poster and cover

## Setup
### Requirements
- Node v19.1.0 or higher
- An IDE like VSCode
- A working Notion environnement. See the [Notion section](#Notion)

### Dev environment
The project is divided in two distinct apps : 
1. The express.js backend to fetch data from Notion API
2. The Vue.js frontend to display the user interface. 
 
In order for the projet to work, you'll need to setup and launch both of the apps in two distinct terminals.

First, create `.env` files using the `.env.example` files present in each app folder and fill them with your own informations. To know more about the Notion Token, head to the [Notion section](#Notion).

**Backend**
```` bash
# Entrer backend app
cd MovieElo-Back

# Install dependencies
npm install

# Run the app
npm run dev
````
**Frontend**
```` bash
# Entrer front app
cd MovieElo-Front

# Install dependencies
npm install

# Run the app
npm run dev
````

## Notion
As said before, MovieElo relies on the Notion API to get its datas. In order for the application to work, you'll need certains things : 

### Notion database
You will need a database containing at least a certain amount of fields. 

I recommand to use [Notion Watchlist](https://nwatchlist.notion.site/nwatchlist/Hello-there-00e5ce7685794744af0b6198d2147ae3), an app who automatically fetches movie data into your notion database. A lot of the mandatory fields are imported form this app while the rest are custom fields I created in my database.

> All those fields need to be filled, except those marked with an `*` who are optionals.

**Notion Watchlist fields**
| Field Name   | type   | Value                |
| :----------- | :----- | :------------------- |
| Name         | Text   |                      |
| Cast         | Text   |                      |
| Director     | Text   |                      |
| Year         | Text   |                      |
| IMG          | File   |                      |
| Watch Status | Select | [Watched, Unwatched] |
| TMDB Rating  | Select |                      |


**Custom fields**
| Field Name               | type         | Value                        |
| :----------------------- | :----------- | :--------------------------- |
| Genre                    | Multi Select |                              |
| Acting                   | Number       |                              |
| Appréciation perso.      | Number       |                              |
| Feeling à la fin du film | Number       |                              |
| Histoire                 | Number       |                              |
| Musique                  | Number       |                              |
| Réalisation              | Number       |                              |
| Note                     | Formula      | Sum of the upper fields / 20 |
| Elo                      | Number       |                              |
| Nom français*            | Text         |                              |
| Commentaires*            | Text         |                              |

### Notion API
To use the app, you'll need to create a Notion integration. To see how it works, go to the [Notion Developers website](https://developers.notion.com/), create an integration and use you API Token in the `.env` file of the backend app.
