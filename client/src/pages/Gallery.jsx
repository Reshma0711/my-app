import useQueryHook from "@/customhooks/useQuery";
import { api } from "@/utils/axios";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

// const fetchData = async () => {
//   try {
//     const response = await api.get("/gallery");

//     const data = response.data;

//     console.log(data.Files[0].path);

//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return error;
//   }
// };

const uploadImage = async (formData) => {
  

  try {
     
     const response = await api.post("/upload", formData);

     const data = response.data;
 
     console.log("Backend Response",data);
 
     return data;
   } catch (error) {
     console.error("Error fetching data:", error);
     return error;
   }
};

const Gallery = () => {
//   const { data, isLoading, error } = useQuery();


const { data, isLoading, error } = useQueryHook({
    endpoint: "gallery",
    querykey: ["files"]
  });

  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const mutation = useMutation(uploadImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Files"]); // Refresh the gallery after upload
    },
  });

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    mutation.mutate(formData);
    setSelectedFiles([]);
  };

  if (isLoading) {
    return (
      <div className="text-center text-lg font-semibold p-6">
        Loading Images...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold p-6">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center">Gallery</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="flex justify-center mt-4 gap-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {data?.Files?.map((file, index) => (
          <div key={index} className="border p-2 rounded shadow">
            <img
              src={`http://localhost:5000/${file.path}`}
              alt={file.originalName}
              className="w-full h-40 object-cover rounded"
            />
            <p className="text-center mt-2 text-sm">{file.originalName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
