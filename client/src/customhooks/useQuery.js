
import { useQuery } from "@tanstack/react-query";

import { api } from "@/utils/axios";

const fetchData = async (ep,qp) => {
  try {
    const queryString = new URLSearchParams(qp).toString();
    const url = queryString ? `/${ep}?${queryString}` : `/${ep}`;
    const response = await api.get(url);

    const data = response.data;

    console.log("responseeee",data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return error;
  }
};

const useQueryHook= ({endpoint,querykey,queryParam={}})=>{
  
    return useQuery(querykey, () => fetchData(endpoint,queryParam));

}

export default useQueryHook