/* monarch fact with the monarch data ID */
function prepareFact(monarchData, monarchFacts) {
  const formattedMonarch = createMonarchReference(monarchData);

  const mappedFacts = monarchFacts.map((facts) => {
    const { name, fact } = facts;
    return [name, fact, formattedMonarch[name]];
  });
  return mappedFacts;
}

function createMonarchReference(monarchData) {
  const addID = {};
  monarchData.forEach((monarch) => {
    addID[monarch.name] = monarch.monarch_id;
  });

  return addID;
}

module.exports = { prepareFact, createMonarchReference };
