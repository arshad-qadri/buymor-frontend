import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { notFound } from "next/navigation";

// Simulate a database or API call
const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 499,
    image:
      "https://images.bewakoof.com/t1080/men-s-blue-trust-your-ability-typography-t-shirt-295625-1720094608-1.jpg",
    description: "A stylish T-Shirt perfect for any occasion.",
  },
  {
    id: 2,
    name: "Hoodie",
    price: 999,
    image:
      "https://images.bewakoof.com/t1080/women-s-beige-orange-all-over-printed-oversized-hoodies-641009-1731056137-1.jpg",
    description: "Stay cozy and chic with this oversized hoodie.",
  },
];

// Generate static paths for products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

const ProductDetail = ({ params }) => {
  // Find the product by ID from the simulated database
  const product = products.find((p) => p.id.toString() === params.id);

  // If product not found, trigger 404 page
  if (!product) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full lg:w-1/2 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-700 mt-2">₹{product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <button className="bg-indigo-600 text-white px-4 py-2 mt-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
