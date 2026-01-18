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
    console.log('📡 Fetching products from /api/products...');
    const res = await fetch("/api/products", {
      headers: { "Content-Type": "application/json" },
    });
    
    console.log('📦 API Response status:', res.status);
    
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    
    const data = await res.json();
    console.log('✅ Products fetched:', data.products?.length || 0, 'items');
    
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
    const res = await fetch(`/api/products/${id}`, {
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
