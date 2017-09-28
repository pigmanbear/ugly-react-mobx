
const hasHtml = (prop, arr) => {
  return !!(arr.filter((item) => item.property === prop)[0].html);
};

const extractHtml = (prop, arr) => {
  return   arr.filter((item) => item.property === prop)[0].html;
};

export { extractHtml, hasHtml };
