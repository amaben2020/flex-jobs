import { IHomePage } from "@/app/page";
import { getTitle } from "@utils/getTitle";

const InfoTitle = ({
  mainText,
  subText,
  searchParams,
}: {
  subText: string;
  mainText?: string;
  searchParams?: IHomePage["searchParams"];
}) => {
  return (
    <section className="mx-auto my-10 space-y-4 text-center ">
      {mainText?.length ? (
        <h1 className="text-5xl font-bold text-gray-800">{mainText}</h1>
      ) : (
        <h1 className="text-5xl font-bold text-gray-800">
          {getTitle(searchParams!!)}
        </h1>
      )}

      <h2 className="text-xl text-gray-600">{subText}</h2>
    </section>
  );
};

export default InfoTitle;
