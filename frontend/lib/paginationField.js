import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // Tells Apollo we will handle everything
    read(existingItems = [], { args, cache }) {
      // When Apollo tries to query for allProducts
      // First -> Asks read function for those items
      // We can either do one of the two things:
      // 1. return the items because they're already in the cache
      // 2. return a false from here, which will make a network request

      //   console.log({ existingItems, args, cache });
      const { skip, first } = args;

      // Read the number of items on the page from the ache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existingItems.slice(skip, skip + first).filter((x) => x);

      // Checks for the last page,
      // If there are items and not enough items to satisfy how many were requested and we are on the last page then SEND IT!
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      // if no items exist
      if (items.length !== first) {
        // to promote a network request return False
        return false;
      }

      // if there are items, just return them from the cache ❌ -> NO network request

      if (items.length) {
        console.log(`There are ${items.length}`);
        return items;
      }

      // fail safe, network request
      return false;
    },
    merge(existingItems, incoming, { args }) {
      const { skip, first } = args;
      // This runs when Apollo Client comes back from a network request (with products).
      // This is Where, and What order

      console.log(`Merging items from the networks ${incoming.length}`);

      const merged = existingItems ? existingItems.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      console.log(merged);

      // After incoming items are merged we return them. Apollo WILL now go back to read and repeat that.
      return merged;
    },
  };
}
