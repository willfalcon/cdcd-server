import client from '../client.js';

export const deleteSite = async (parent, args, context, info) => {
  console.log(args);
  await client.delete(args.id);
  return true;
};
