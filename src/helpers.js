export const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

export const filterHitsWithNull = items =>
  items.filter(item => {
    const hasNull =
      !item.title ||
      !item.url ||
      !item.author ||
      !item.num_comments ||
      !item.points;

    return !hasNull;
  });
