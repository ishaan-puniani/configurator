export const presetReelSets = ({
  gameModes,
  reelLinking,
  connectedReels,
  availableLinkableReels,
}: any): Array<string> => {
  let reelSets: Array<string>;
  if (reelLinking === "static") {
    const _reelSets = [`linked_${connectedReels?.join("_")}`];
    reelSets = [..._reelSets];
    gameModes.forEach((mode: string) => {
      if (mode !== "basic") {
        _reelSets.forEach((rs: string) => {
          reelSets.push(`${mode}_${rs}`);
        });
      }
    });
  } else if (reelLinking === "dynamic") {
    const _reelSets = availableLinkableReels.map((cr: Array<number>) => {
      return `linked_${cr?.join("_")}`;
    });
    reelSets = [..._reelSets];
    gameModes.forEach((mode: string) => {
      if (mode !== "basic") {
        _reelSets.forEach((rs: string) => {
          reelSets.push(`${mode}_${rs}`);
        });
      }
    });
  } else {
    reelSets = [...gameModes];
  }
  return reelSets;
};
