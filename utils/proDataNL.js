/**
 * Processing Json result of Watson Natural Language Understanding process
 * @param {JSON} resultNL - respuesta del watson NL en JSON
 */
function proDataNL(resultNL) {
  return new Promise(function (resolve, reject) {
    try {
      var relations = resultNL.relations;
      var entities = resultNL.entities;
      // For debugging purpose
      // console.log("RELATIONS: \n\n" + JSON.stringify(relations, null, 2));
      // console.log("ENTITIES: \n\n" + JSON.stringify(entities, null, 2));
      if (relations != undefined) {
        for (var item of relations) {
          //item.type = item.type[0] + item.type.slice(1).toLowerCase();
          //item.sentence = item.sentence[0].toUpperCase() + item.sentence.slice(1);    
          // Eliminar propiedades de un objeto
          delete item.disambiguation;
          delete item.count;
          delete item.confidence;
          delete item.score;
          delete item.text;

          
        }

        console.log(relations)

        // Delete duplicates
    
        resolve(relations);
      } else resolve({ text: "vacio" });

   
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = proDataNL;
