const SPARQL_ENDPOINT = 'https://ubergraph.apps.renci.org/sparql';

const query = `
PREFIX part_of: <http://purl.obolibrary.org/obo/BFO_0000050>
PREFIX UBERON: <http://purl.obolibrary.org/obo/UBERON_>

SELECT DISTINCT ?organ_id ?as_id
FROM <http://reasoner.renci.org/redundant>
WHERE {
  VALUES (?organ_id) {
    (UBERON:0000029) (UBERON:0000059) (UBERON:0000178) (UBERON:0000948) (UBERON:0000955) (UBERON:0000970) (UBERON:0000995) (UBERON:0001004) (UBERON:0001223) (UBERON:0001255) (UBERON:0001264) (UBERON:0001270) (UBERON:0001302) (UBERON:0001303) (UBERON:0001911) (UBERON:0001987) (UBERON:0002048) (UBERON:0002097) (UBERON:0002106) (UBERON:0002107) (UBERON:0002108) (UBERON:0002367) (UBERON:0002370) (UBERON:0002371) (UBERON:0002509) (UBERON:0003126) (UBERON:0004537) (UBERON:0004538) (UBERON:0004539) (UBERON:0004548) (UBERON:0004549)
  }
  VALUES (?as_id) {
    (UBERON:0002078) (UBERON:0002079) (UBERON:0002080) (UBERON:0002084) (UBERON:0002094) (UBERON:0002098)
  }
  ?as_id part_of: ?organ_id .

  BIND(STRREPLACE(STR(?as_id), 'http://purl.obolibrary.org/obo/UBERON_', 'UBERON:') as ?as_id)
  BIND(STRREPLACE(STR(?organ_id), 'http://purl.obolibrary.org/obo/UBERON_', 'UBERON:') as ?organ_id)
}
`;

function post() {
  const body = new URLSearchParams();
  body.set('query', query);

  fetch(SPARQL_ENDPOINT, {
    method: 'POST',
    body,
    headers: {
      Accept: 'text/csv',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': body.toString().length.toString(),
    },
  })
    .then((r) => r.text())
    .then(console.log);
}

function get() {
  fetch(`${SPARQL_ENDPOINT}?query=${encodeURIComponent(query)}`, {
    headers: {
      Accept: 'text/csv',
    },
  })
    .then((r) => r.text())
    .then(console.log);
}
get();
