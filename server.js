const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


// Serve the frontend files
app.use(express.static(__dirname));


// API endpoint
app.get("/api/message", (req, res) => {

    const messages = [
        "Nice round! Ready for another one?",
        "Three in a row — clean win!",
        "The board is ready for a rematch.",
        "Good game! Think you can win the next one?",
        "Another round, another chance."
    ];

    const randomMessage =
        messages[
            Math.floor(
                Math.random() * messages.length
            )
        ];

    res.json({
        message: randomMessage
    });

});


// Start the server
app.listen(PORT, () => {
    console.log(
        `XO server is running on port ${PORT}`
    );
});