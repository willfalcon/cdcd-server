import client from '../client.js';

const updateSite = async (parent, args, context, info) => {
  console.log(args);
  const site = await client
    .patch(args.id)
    .set({ ...args.data })
    .commit();
  console.log('Site updated: ', site);
  return {
    ...site,
    id: site._id,
  };
};

export { updateSite };
