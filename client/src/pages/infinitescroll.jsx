import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fetchProducts = async ({ pageParam = 1 }) => {
  console.log("Fetching pageeeeeeeeeeee:", pageParam);
  const { data } = await axios.get(
    `http://localhost:5000/scroll?page=${pageParam}&limit=18`
  );

  return { ...data, pageParam };
};

const Infinitescroll = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["names"],
      queryFn: ({ pageParam }) => fetchProducts({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        console.log("last page", lastPage);
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  // console.log("dataaaaaaaaaaaaaaaaaaa", isLoading, data);
  console.log("pageParamssssssssssssssssssssssss:", data?.pageParams);

  return (
    <div className="container">
      {data?.pages?.map((page) =>
        page.names.map((name) => <div key={name._id}>{name.name}</div>)
      )}
      {/* {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )} */}
   {(!hasNextPage) && (
  <p style={{ backgroundColor: "gray-700", padding: "10px", borderRadius: "5px" }}>
    No more products...
  </p>
)}
      <div ref={ref}>{isFetchingNextPage && "Loading....."}</div>
    </div>
  );
};

export default Infinitescroll;
