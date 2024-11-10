import express from "express";
const app = express();
const port = process.env.PORT || 4000;

const games = [];
let gcount = 0;

app.use(express.json()); // to parse JSON request bodies

app.get("/", (req, res) => {
    res.status(200).send("server is working fine!");
});
app.get("/allgames", (req, res) => {
    res.status(200).json(games);
});

app.post("/addgame", (req, res) => {
    const { name, price } = req.body;
    let idx = gcount++;
    games.push({ id: idx + 1, name: name, price: price });
    res.status(200).json(games[idx]);
});

app.put("/updategame/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const game = games.find(g => g.id === parseInt(id));
    game.name = name;
    game.price = price;
    res.status(200).json(game);
});

app.delete("/deletegame/:id", (req, res) => {
    const { id } = req.params;
    const idx = games.findIndex(g => g.id === parseInt(id));
    const game = games.splice(idx, 1)
    res.status(200).json(game)
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});
