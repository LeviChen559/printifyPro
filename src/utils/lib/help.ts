export const autoWidth = (text: string | number,type?:string) => {
  if (typeof text !== "string") {
    return text.toString().length + 1 + "ch"; // Fallback for non-string input
  }

  const textLength = text.length;

  const baseWidth = 2; // Base width for the input field

  const charWidth = 8; // Approximate width of each character in pixels

  if(text.includes("/")&&type==="storage"){
  return `${(baseWidth + textLength * charWidth)-18}px`;

  }
  return `${baseWidth + textLength * charWidth}px`;
};

export const autoHeight = (fontSize: number) => {
  const lineHeight = 1.4; // Line height multiplier
  return `${fontSize * lineHeight}px`;
};
