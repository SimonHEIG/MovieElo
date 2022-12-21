import * as dotenv from 'dotenv'
dotenv.config()
import express, { response } from "express"
import axios from 'axios'
import cors from 'cors'
import bp from 'body-parser'

const app = express()

const database_id = process.env.NOTION_DB_ID
const secret_key = process.env.NOTION_TOKEN

const errorHandler = (error, request, response, next) => {
    // Error handling middleware functionality
    console.log(`error ${error.message}`) // log the error
    const status = error.status || 400
    // send back an easily understandable error message to the caller
    response.status(status).send(error.message)
}

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CORS_DOMAIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({
    origin: [process.env.CORS_DOMAIN]
}));
app.use(express.json())
app.use(errorHandler)

// Get all watched movies 
app.get('/', async (req, res, next) => {
    const data = {
        page_size: 100,
        filter: {
            property: "Watch Status",
            select: {
                equals: "Watched"
            }
        }
    }

    if (req.query.cursor) {
        data.start_cursor = req.query.cursor;
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret_key}`,
        'Notion-Version': '2022-02-22',
    }

    const options = {
        accept: 'application/json',
        'content-type': 'application/json',
        method: 'POST',
        url: 'https://api.notion.com/v1/databases/' + database_id + "/query",
        headers,
        data
    }

    axios.request(options)
        .then(function (response) {
            return res.json(response.data)
        })
        .catch(function (error) {
            next(error)
        });
})

app.patch('/', async (req, res, next) => {
    const options = {
        method: 'PATCH',
        url: `https://api.notion.com/v1/pages/${req.body.id}`,
        headers: {
            accept: 'application/json',
            'Notion-Version': '2022-06-28',
            Authorization: `Bearer ${secret_key}`,
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            'properties': {
                'Elo': {
                    'number': req.body.elo
                }
            }
        })
    }
    axios.request(options)
        .then(function (response) {
            return res.json({ 'newElo': response.data.properties.Elo.number });
        })
        .catch(function (error) {
            next(error)
        });

})

export default app;