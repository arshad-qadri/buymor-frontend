import Link from 'next/link';

const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4 shadow-sm">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
    <h2 className="text-lg font-bold mt-2">{product.name}</h2>
    <p className="text-gray-700">₹{product.price}</p>
    <Link href={`/product/${product.id}`} className="text-indigo-600 mt-2 inline-block">
      View Details
    </Link>
  </div>
);

export default ProductCard;
