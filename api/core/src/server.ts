
import express from 'express';
import {routes} from "./routes";


const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/',routes)

app.get('/', function(req:any, res:any){
  res.send('Hello!');
});


if (!module.parent) {
  app.listen(port);
  console.log('Express started on port 3000');
}

export default app;