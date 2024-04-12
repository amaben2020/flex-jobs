export const getTitle = ({
  q,
  type,
  location,
  remote,
}: {
  q: string;
  type: string;
  location: string;
  remote: string;
}) => {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer`
      : remote
        ? `Remote dev jobs`
        : "All developer jobs";

  const titleSuffix = location ? `in ${location} ` : "";

  return titlePrefix + " " + titleSuffix;
};
