import Champion from "../ChampionTypes";

const ChampionsFilterDropdown = ({ setFilterTag }: { setFilterTag: (tag: string) => void }) => (
  <div class="flex items-center">
    <span class="mr-4">Filter Classes:</span>
    <select
      class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      onChange={(e) => setFilterTag(e.target.value)}
    >
      <option value="">All</option>
      <option value="Fighter">Fighter</option>
      <option value="Tank">Tank</option>
      <option value="Marksman">Marksman</option>
      <option value="Assassin">Assassin</option>
      <option value="Mage">Mage</option>
      <option value="Support">Support</option>
    </select>
  </div>
);

const filterChampions = (champions: Champion[], filterTag: string | null, searchQuery: string) => {
  let filtered = champions;
  if (filterTag) {
    filtered = filtered.filter((champion) => champion.tags.includes(filterTag));
  }
  const query = searchQuery.toLowerCase().trim();
  if (query !== "") {
    filtered = filtered.filter(
      (champion) =>
        champion.name.toLowerCase().includes(query) ||
        champion.blurb.toLowerCase().includes(query) ||
        champion.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }
  return filtered;
};

export { filterChampions, ChampionsFilterDropdown };
