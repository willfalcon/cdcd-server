import fetch from 'node-fetch';
import client from '../client.js';

const postTypeOptions = async (parent, args, context, info) => {
  const site = await client.getDocument(args.id);

  const options = await fetch(`${site.url}/wp-json/cdcd/v2/latest-post`).then(res => res.json());
  console.log(options.customTypes);
  return options.customTypes.map(type => ({ type }));
};

export { postTypeOptions };
