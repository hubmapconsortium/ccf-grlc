import { writeFileSync } from 'fs';
import { globSync } from 'glob';

const BASE_URL = 'https://raw.githubusercontent.com/hubmapconsortium/ccf-grlc/main';
const DEFAULT_CONFIG = {
  title: 'HRA Queries',
  description: 'HRA Queries',
  contact: {
    name: 'Cyberinfrastructure for Network Science Center',
    url: 'https://github.com/hubmapconsortium/ccf-grlc/issues',
  },
  license: 'https://raw.githubusercontent.com/hubmapconsortium/ccf-grlc/main/LICENSE',
};

const results = {};
for (const sparqlFile of globSync('*/*.rq')) {
  const group = sparqlFile.split('/')[0];
  if (!results[group]) {
    results[group] = {
      ...DEFAULT_CONFIG,
      title: DEFAULT_CONFIG.title + ` (${group})`,
      description: DEFAULT_CONFIG.description + ` (${group})`,
      queries: [],
    };
  }
  const url = `${BASE_URL}/${sparqlFile}`;
  results[group].queries.push(url);
}

for (const [group, spec] of Object.entries(results)) {
  const specFile = `${group}/queries.json`;
  writeFileSync(specFile, JSON.stringify(spec, null, 2));
}
