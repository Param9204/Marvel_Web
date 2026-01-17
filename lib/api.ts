/**
 * API configuration - uses Next.js API routes in production, localhost in development
 */

export const getApiUrl = () => {
  if (typeof window === "undefined") {
    // Server-side
    return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  }

  // Client-side: use /api/* for Next.js routes, or fallback to NEXT_PUBLIC_BACKEND_URL
  if (process.env.NEXT_PUBLIC_USE_NEXTJS_API === "true") {
    return typeof window !== "undefined" ? window.location.origin : "";
  }

  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
};

/**
 * Fetch categories from API
 */
export const fetchCategories = async () => {
  try {
    const apiUrl = getApiUrl();
    const endpoint = process.env.NEXT_PUBLIC_USE_NEXTJS_API === "true" 
      ? "/api/add-category" 
      : `${apiUrl}/api/categories`;

    const res = await fetch(endpoint, {
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    
    const data = await res.json();
    // Support both formats: { categories: [...] } and { data: [...] }
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
    const apiUrl = getApiUrl();
    const endpoint = process.env.NEXT_PUBLIC_USE_NEXTJS_API === "true" 
      ? "/api/add-product" 
      : `${apiUrl}/api/products`;

    const res = await fetch(endpoint, {
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    
    const data = await res.json();
    // Support both formats: { products: [...] } and { data: [...] }
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
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Fetch product error:", error);
    return { success: false };
  }
};
