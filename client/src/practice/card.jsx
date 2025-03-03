import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ProductCard = ({ title, imageUrl, description, price }) => {
  return (
    <Card className="bg-white shadow-md rounded-xl border border-gray-300 w-72 h-[400px] flex flex-col justify-between transition-transform transform hover:scale-105">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center ">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-40 h-40 rounded-lg object-cover mb-3"
          />
        )}
        <p className="text-gray-700 text-sm text-center line-clamp-3 px-2">{description}</p>
      </CardContent>
      <CardFooter className="border-t pt-3 text-gray-800 font-medium text-center">
        <p>Price: <span className="text-green-600 font-bold">₹{price}</span></p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
