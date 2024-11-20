import ProductCard from "@/Components/ProductCard";
import ProductSlider from "@/Components/ProductSlider";
import products from "@/data/products";

const Home = () => {
  const categories = [
    "Men's Wear",
    "Women's Wear",
    "kid's Wear",
    "Fashion",
    "Shoes",
    "General",
  ];
  return (
    <main className="max-w-6xl mx-auto px-6 py-8 overflow-x-hidden">
      {/* <h1 className="text-3xl text-center my-8 font-bold">Featured Products</h1> */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex justify-center items-center gap-x-7  w-[1100px!important]">
          {categories.map((cat, index) => (
            <div key={index} className="text-2xl bg-white px-7 py-2">
              {cat}
            </div>
          ))}
        </div>
      </div>
      <ProductSlider />
      <h1 className="text-2xl font-bold mb-6">Shop Latest Trends</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Home;
