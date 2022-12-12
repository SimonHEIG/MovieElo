import * as dotenv from 'dotenv'
dotenv.config()
import express from "express"
import axios from 'axios'
import cors from 'cors'
import bp from 'body-parser'

const app = express()

const database_id = process.env.NOTION_DB_ID
const secret_key = process.env.NOTION_TOKEN

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CORS_DOMAIN); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// Route to fetch database data
app.get('/', async (req, res) => {
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

    const resp = await axios({
        accept: 'application/json',
        'content-type': 'application/json',
        method: 'POST',
        url: 'https://api.notion.com/v1/databases/' + database_id + "/query",
        headers,
        data
    });
    return res.json(resp.data);
})

app.patch('/', async (req, res) => {
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
    // { id: '_ro%7D', type: 'number', number: 1000 }
    axios.request(options)
        .then(function (response) {
            console.log(response.data.properties.Elo.number);
            return res.json({'newElo' : response.data.properties.Elo.number});
        })
        .catch(function (error) {
            console.error(error);
        });
})

app.use(cors({
    origin: [process.env.CORS_DOMAIN]
}));

app.use(express.json())


export default app;