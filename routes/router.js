const router = require("express").Router();
const callNLUnderstanding = require("../utils/watsonNL");
const proDataNL = require("../utils/proDataNL");
const main = require("../utils/Discovery");
const params = require("../params");
const fs = require("fs");

// Watson NLU Route for analize text
router.post("/upload-text", async function (req, res) {
  const inputText = req.body.text;
  console.log(inputText);
  try {
    if (!inputText) {
      res.send({
        status: false,
        message: "No text uploaded",
      });
    } else {
      let finalJson = [];
      
      await main(params, inputText).then((ans) => {
        for (const item of ans) {
          callNLUnderstanding(params, item).then((data) => 
            proDataNL(data).then((finalRes) => {
              finalJson.push(finalRes)
             
            })
          )
        }
      });
      var delayInMilliseconds = 3000; 
      setTimeout(function() {
        res.send(finalJson)
      }, delayInMilliseconds);
  
    }
  } catch (err) {
    res.status(500).json({ message: "No se pudo analizar el texto ingresado" });
  }
});

module.exports = router;
