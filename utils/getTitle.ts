export const getTitle = ({
  q,
  jobType,
  location,
  remote,
}: {
  q: string;
  jobType: string;
  location: string;
  remote: string;
}) => {
  const titlePrefix = q
    ? `${q} jobs`
    : jobType
      ? `${jobType} developer`
      : remote
        ? `Remote dev jobs`
        : "";

  const titleSuffix = location ? `in ${location} ` : "";

  return titlePrefix + " " + titleSuffix;
};
