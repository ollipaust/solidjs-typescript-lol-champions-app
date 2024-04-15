import { createSignal, Suspense, createEffect } from "solid-js";
import useChampions from "./ChampionServer";
import getTagColor from "./utils/tagColor";
import sortChampions from "./utils/sortChampions";
import { filterChampions, ChampionsFilterDropdown } from "./utils/filterChampions";

const Champions = () => {
  const [sortOrder, setSortOrder] = createSignal<"asc" | "desc">("asc");
  const [filterTag, setFilterTag] = createSignal<string | null>(null);
  const [searchQuery, setSearchQuery] = createSignal<string>("");
  const [loading, setLoading] = createSignal(true);
  const champions = useChampions();

  createEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <div class="flex justify-between mb-10">
        <div class="flex items-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSortOrder(sortOrder() === "asc" ? "desc" : "asc")}
          >
            {sortOrder() === "asc" ? "Sort Descending" : "Sort Ascending"}
          </button>
        </div>
        <div class="flex items-center">
          <input
            type="text"
            class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline w-full"
            placeholder="Search Champions..."
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ChampionsFilterDropdown setFilterTag={setFilterTag} />
      </div>
      {loading() ? (
        <div class="flex justify-center items-center flex-col mt-[200px]">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900 mb-4"></div>
          <span class="block">Loading Champion data...</span>
        </div>
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense fallback={<div class="text-red-500">Loading...</div>}>
            {sortChampions(filterChampions(champions(), filterTag(), searchQuery()), sortOrder()).map((champion) => (
              <div class="p-4 border rounded-md flex flex-col">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                  alt={champion.name}
                  class="w-full mb-4"
                />
                <div class="flex-grow">
                  <h2 class="text-lg mb-2">
                    <strong>{champion.name}</strong>
                  </h2>
                  <p class="text-sm mb-2">{champion.title}</p>
                  <p class="text-gray-600 mb-6">{champion.blurb}</p>
                </div>
                <div class="flex justify-center">
                  {champion.tags.map((tag) => (
                    <div class={`mr-2 mb-2 px-3 py-1 rounded-full ${getTagColor(tag)} text-white text-sm drop-shadow-md`}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Champions;
