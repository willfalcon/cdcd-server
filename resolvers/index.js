import { sites } from './sites.js';
import { createSite } from './createSite.js';
import { updateSite } from './updateSite.js';
import { deleteSite } from './deleteSite.js';
import { postTypeOptions } from './postTypeOptions.js';

const resolvers = {
  Query: {
    sites,
    postTypeOptions,
  },
  Mutation: {
    createSite,
    updateSite,
    deleteSite,
  },
};

export default resolvers;
