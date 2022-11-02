import Video from "./Video";
import { useGetVideosQuery } from "../../features/apiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";

export default function Videos() {
  const { data: videos, isError, isLoading, err } = useGetVideosQuery();
  let content = null;
  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    content = <Error message="There was an Error" />;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video video={video} key={video.id} />);
  }
  if (!isLoading && !isError && videos.length === 0) content = <Error message="No video Found" />;

  return content;
}
