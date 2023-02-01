import { Parser } from '@json2csv/plainjs';
import axios from 'axios';
import fs from 'fs';

let establishments = [];

const getAuthorityIds = async () => {
  const authorities = await axios.get('https://api.ratings.food.gov.uk/Authorities/basic', { headers: {
    "x-api-version": 2,
  }});
  return authorities.data.authorities.map(authority => authority.LocalAuthorityId);
}

const getEstablishments = async () => {
  const authorityIds = await getAuthorityIds();
  for (const authorityId of authorityIds) {
    const authorityEstabilshments = await axios.get(`https://api.ratings.food.gov.uk/Establishments/?localAuthorityId=${authorityId}`, { headers: {
      "x-api-version": 2,
    }});
    const transformedEstablishments = authorityEstabilshments.data.establishments.map(
      ({ BusinessName , BusinessType, BusinessTypeID, AddressLine1, AddressLine2, AddressLine3, AddressLine4, PostCode, Phone }) => {
        return { BusinessName , BusinessType, BusinessTypeID, AddressLine1, AddressLine2, AddressLine3, AddressLine4, PostCode, Phone };
      })
    establishments = establishments.concat(transformedEstablishments);
    console.log(`Finished authority ID: ${authorityId}`);
  }
}

const createCSV = async () => {
  await getEstablishments();
  try {
    const parser = new Parser();
    const csv = parser.parse(establishments);
    fs.writeFileSync('fsa-establishments.csv', csv);
  } catch (err) {
    console.log(err);
  }

}

createCSV();