import express from 'express';
import axios from 'axios';

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/submit', async (req, res) => {
  // console.log(req.body.word);
  const wordEntered = req.body.enteredWord;
  try{
    const response = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + wordEntered);
    // const responsestring = JSON.stringify(response.data);
    const W = response.data[0].word;
    const P = response.data[0].phonetic;
    const M = response.data[0].meanings;
    res.render("index", {
      mainWord: W.charAt(0).toUpperCase() + W.slice(1),
      Phonetic: P,
      meaningArr: M
    })
    // console.log(response.data[0].phonetic);
  }catch(error){
    console.error(error.message);
    res.render('index', {
      Error: "Oops! I don't have that word stored up there🧠! Check for any typos maybe?👉👈"
    })
  }
})

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
})