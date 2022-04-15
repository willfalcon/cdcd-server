import SanityClient from '@sanity/client';
import 'dotenv/config';

const client = SanityClient({
  projectId: process.env.SANITY_PROJECT,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2019-01-29', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
});

export default client;
