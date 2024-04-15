import { createSignal, onMount } from "solid-js";
import Champion from "./ChampionTypes";

const useChampions = () => {
  const [champions, setChampions] = createSignal<Champion[]>([]);

  onMount(async () => {
    try {
      const response = await fetch("https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/champion.json");
      const data = await response.json();
      const championsArray: Champion[] = Object.values(data.data).map((champion: any) => {
        return {
          id: champion.id,
          name: champion.name,
          title: champion.title,
          blurb: champion.blurb,
          tags: champion.tags,
        };
      });
      setChampions(championsArray);
    } catch (error) {
      console.error("Error fetching champion data:", error);
    }
  });

  return champions;
};

export default useChampions;
