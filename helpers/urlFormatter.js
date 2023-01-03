const getObjectToQuery = (obj) => {
  const keys = Object.keys(obj);
  return keys
    .map((key) => {
      if (obj[key]?.length > 0) {
        return `${key}=${obj[key]}`;
      }
    })
    .join("&");
};

export default getObjectToQuery;
