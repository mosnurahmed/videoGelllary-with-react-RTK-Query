import { useGetRelatedVideosQuery } from "../../../features/apiSlice";
import RelatedVideo from "./RelatedVideo";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import Error from "../../ui/Error";

export default function RelatedVideos({ title }) {
  console.log(title);
  const { data: relatedVideos, isLoading, isError } = useGetRelatedVideosQuery(title);

  let content = null;
  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    content = <Error message="There was an Error" />;
  }
  if (!isLoading && !isError && relatedVideos?.length > 0) {
    content = relatedVideos.map((video) => <RelatedVideo video={video} />);
  }
  if (!isLoading && !isError && relatedVideos?.length === 0) content = <Error message="No Related video Found" />;

  return <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">{content}</div>;
}
