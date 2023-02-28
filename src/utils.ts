export const stringToHSL = (str: string, saturation = 70, lightness = 80) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let h = hash % 360;
  return `hsl(${h}, ${saturation}%, ${lightness}%)`;
};

export const getViewportSize = () => ({
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
});
