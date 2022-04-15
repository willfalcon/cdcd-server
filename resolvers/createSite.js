import client from '../client.js';

const createSite = async (parent, args, context, info) => {
  console.log(args);
  const site = await client.create({
    _type: 'site',
    ...args,
    postTypes: ['page'],
  });
  console.log(site);
  return {
    ...site,
    id: site._id,
  };
};

export { createSite };
