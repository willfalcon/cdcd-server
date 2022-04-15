import fetch from 'node-fetch';
import client from '../client.js';

const sites = async (parent, args, context, info) => {
  const res = await client.fetch(
    `*[_type == "site"] | order(savedUpdate desc) {
      title,
      _id,
      url,
      frontendUrl,
      trackedBlock,
      flagTime,
      savedUpdate,
      forceRest,
      postTypes
    }`
  );

  console.log(res);
  const sites = res.map(site => ({
    id: site._id,
    title: site.title,
    url: site.url,
    frontendUrl: site.frontendUrl,
    flagTime: site.flagTime,
    postTypes: site.postTypes.map(type => ({ type })),
  }));

  const siteTests = await Promise.all(
    sites.map(site => {
      return fetch(`${site.url}/wp-json`)
        .then(res => res.json())
        .catch(err => console.error(err));
    })
  );

  const siteFetches = await Promise.all(
    sites.map((site, i) => {
      return siteTests[i].namespaces.includes('cdcd/v2')
        ? fetch(`${site.url}/wp-json/cdcd/v2/updates`).then(res => res.json())
        : { error: 'v2 plugin missing' };
    })
  );
  const sitesWithData = sites.map((site, i) => {
    return {
      ...site,
      latestPost: siteFetches[i].latestPost || null,
      latestUpdate: siteFetches[i].latestUpdate || null,
      error: siteFetches[i].error || null,
    };
  });
  return sitesWithData;
};

export { sites };
