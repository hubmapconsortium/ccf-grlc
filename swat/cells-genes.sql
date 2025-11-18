load https;

CREATE MACRO google_sheet_csv(public_url VARCHAR) AS
  CONCAT('https://docs.google.com/spreadsheets/d/', split(public_url, '/')[6], 
    '/export?format=csv&gid=', regexp_extract(public_url, '.*[\&\#\?]gid\=([0-9]+)', 1));

CREATE MACRO google_sheet(public_url VARCHAR) AS TABLE
  SELECT * FROM read_csv(google_sheet_csv(public_url), header := true);


CREATE TABLE rows AS
  SELECT * FROM (
    SELECT DISTINCT CONCAT('https://purl.humanatlas.io/asct-b/', lower("Organ")) AS table, "Organ" as organ, replace("CT ID", '+', '') as cl_id, "Cell type Harmonized" as cl_sme_label
      FROM google_sheet('https://docs.google.com/spreadsheets/d/1uaZB7PjT8FVIKMtt3Xz39SrqgH3qm5VDQW1m5Tyjim4/edit?gid=50753676#gid=50753676')
      WHERE "CT ID" LIKE 'CL:%'

    UNION ALL

    SELECT DISTINCT 'https://purl.humanatlas.io/asct-b/placenta' as table, 'Placenta' as organ, celltype_id as cl_id, column0 as cl_sme_label
      FROM google_sheet('https://docs.google.com/spreadsheets/d/1uaZB7PjT8FVIKMtt3Xz39SrqgH3qm5VDQW1m5Tyjim4/edit?pli=1&gid=245868077#gid=245868077')
      WHERE celltype_id LIKE 'CL:%'
  )
  ORDER BY organ, cl_id;

COPY (SELECT * FROM rows) TO 'cells-genes-raw.csv';
COPY (SELECT CONCAT('    (<', "table", '> "', organ ,'" ', cl_id, ' "', cl_sme_label, '")') FROM rows) TO 'cells-genes-input.csv' (HEADER false, QUOTE '$');
