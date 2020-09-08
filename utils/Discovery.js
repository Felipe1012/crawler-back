/**
  *
  * @param {object} params
  * @param {string} params.iam_apikey
  * @param {string} params.url
  * @param {string} params.username
  * @param {string} params.password
  * @param {string} params.environment_id
  * @param {string} params.collection_id
  * @param {string} params.configuration_id
  * @param {string} params.input
  *
  * @return {object}
  *
  */
const assert = require('assert');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */

/**
* Processing Json result of Watson Natural Language Understanding process
* @param {JSON} resultNL - respuesta del watson NL en JSON
*/

function main(params, text) {
  return new Promise(function (resolve, reject) {
    let discovery;
    if (params.iam_apikey) {
      discovery = new DiscoveryV1({
        'iam_apikey': params.iam_apikey,
        'url': params.url,
        'version': '2019-03-25'
      });
    }
    else {
      discovery = new DiscoveryV1({
        'username': params.username,
        'password': params.password,
        'url': params.url,
        'version': '2019-03-25'
      });
    }

    discovery.query({
      'environment_id': params.environment_id,
      'collection_id': params.collection_id,
      'natural_language_query': text,
      'passages': true,
      'count': 4,
      'passages_count': 5
    }, function (err, data) {


      var texto = JSON.stringify(data);
      var final = texto.replace(/\\[a-zA-Z ]/gm, " ");
      data = JSON.parse(final)
      // res.send(final)

      data = data.passages

      for (let i in data) {
        delete data[i].document_id
        delete data[i].passage_score
        delete data[i].start_offset
        delete data[i].end_offset
        delete data[i].field

      }
      respuesta = []
      data = JSON.stringify(data)
      data = data.replace(/\"passage_text":/g, " ");
      data = data.replace(/\[{ \"/g, " ");
      data = data.replace(/\\"}]"/g, " ");
      data = data.replace(/\\"},{ \\/g, " ");

      console.log("yeah")
      var frases = data.split('$')
      var res = []

      console.log(data)


      for (let i in frases) {
        res[i] = "$ " + frases[i]


      }
      for (let j in res) {
        if (res[j].length <= 20) {
          res.splice(j, 1)
        }
      }

      console.log(res)

      return resolve(res)

    });
  });
}

module.exports = main;


