/**
 * API configuration - uses Next.js API routes in production, localhost in development
 */

export const getApiUrl = () => {
  // Always use Next.js API routes (they handle both client and server)
  return typeof window !== "undefined" ? window.location.origin : "";
};

/**
 * Fetch categories from API
 */
export const fetchCategories = async () => {
  try {
    const res = await fetch("/api/categories", {
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    
    const data = await res.json();
    return {
      success: data.success !== false,
      categories: data.categories || data.data || [],
    };
  } catch (error) {
    console.error("❌ Fetch categories error:", error);
    return { success: false, categories: [] };
  }
};

/**
 * Fetch products from API
 */
export const fetchProducts = async () => {
  try {
    const res = await fetch("/api/products", {
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    
    const data = await res.json();
    return {
      success: data.success !== false,
      products: data.products || data.data || [],
    };
  } catch (error) {
    console.error("❌ Fetch products error:", error);
    return { success: false, products: [] };
  }
};

/**
 * Fetch single product from API
 */
export const fetchProduct = async (id: string) => {
  try {
    const apiUrl = getApiUrl();
    const endpoint = process.env.NEXT_PUBLIC_USE_NEXTJS_API === "true" 
      ? `/api/add-product?id=${id}` 
      : `${apiUrl}/api/products/${id}`;

    const res = await fetch(endpoint, {
      headres = await fetch(`/api/products/${id}`
    return data;
  } catch (error) {
    console.error("❌ Fetch product error:", error);
    return { success: false };
  }
};
