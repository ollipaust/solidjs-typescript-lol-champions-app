import Champion from "../ChampionTypes";

const sortChampions = (champions: Champion[], sortOrder: "asc" | "desc") => {
  return champions.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
};

export default sortChampions;
