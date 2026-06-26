import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [url, setUrl] = useState(`${BASEURL}/api/products/`);

    useEffect(() => {
        setLoading(true);
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            return response.json();
        })
        .then((data)=>{
            // Handle both paginated response object and fallback flat array
            if (data && typeof data === "object" && !Array.isArray(data)) {
                setProducts(data.results || []);
                setNextUrl(data.next);
                setPrevUrl(data.previous);
            } else {
                setProducts(data || []);
                setNextUrl(null);
                setPrevUrl(null);
            }
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
        });
    }, [url]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-10">
            <h1 className="text-3xl font-bold text-center py-5 bg-white shadow-md">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products available.</p>
                )}
            </div>

            {(prevUrl || nextUrl) && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button 
                        onClick={() => prevUrl && setUrl(prevUrl)} 
                        disabled={!prevUrl}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition font-medium"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => nextUrl && setUrl(nextUrl)} 
                        disabled={!nextUrl}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition font-medium"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProductList;