const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "fighter":
        return "bg-amber-700";
      case "tank":
        return "bg-green-700";
      case "marksman":
        return "bg-yellow-500";
      case "assassin":
        return "bg-red-500";
      case "mage":
        return "bg-blue-700";
      case "support":
        return "bg-teal-400";
      default:
        return "bg-gray-500";
    }
  };
  
  export default getTagColor;
  