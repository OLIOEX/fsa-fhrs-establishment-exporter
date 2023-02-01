# FSA FHRS Establishment Exporter

This script fetches contact details of "establishments" in the FHRS database and writes them to a CSV file. We fetch the basic list of authorities, loop through those and fetch all the establishments for each authority, because it's not possible to fetch all establishments in one request with no filters. We then extract just the data we're interested in (easy to pick out other data if required) and write the concatenated results to a CSV file.

## Dependencies
Node.js (tested with version 18.8.0 but any recent version should work) & npm

The script depends on axios for network requests and @json2csv/plainjs to convert JSON from the API into CSV format.

## Install
Clone the repo and run `npm i`

## Run
`node index.js`

## Output
The script will log each authority as it fetches it, so you can see if it stops or slows down massively due to memory constraints (the data set is large and may be a problem if running this on a very resource constrained machine, we are processing the whole set in one, not streaming to file). When the script completes there will be a file `fsa-establishments.csv` in the root folder of the project.

