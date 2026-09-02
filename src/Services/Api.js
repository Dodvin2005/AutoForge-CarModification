import ApiService from "../Api/AxiosService";

// =====================================================
// PRODUCTS
// =====================================================

// Get all products
export const getAllProductsAPI = async () => {
  return await ApiService("GET", "/products");
};

// Get single product by ID
export const getProductByIdAPI = async (id) => {
  return await ApiService("GET", `/products/${id}`);
};

// Add new product
export const addProductAPI = async (reqBody) => {
  return await ApiService("POST", "/products", reqBody);
};

// Update product
export const updateProductAPI = async (id, reqBody) => {
  return await ApiService(
    "PUT",
    `/products/${id}`,
    reqBody
  );
};

// Delete product
export const deleteProductAPI = async (id) => {
  return await ApiService(
    "DELETE",
    `/products/${id}`
  );
};


// =====================================================
// CATEGORIES
// =====================================================

// Get all categories
export const getAllCategoriesAPI = async () => {
  return await ApiService("GET", "/categories");
};

// Get single category by ID
export const getCategoryByIdAPI = async (id) => {
  return await ApiService(
    "GET",
    `/categories/${id}`
  );
};

// Add category
export const addCategoryAPI = async (reqBody) => {
  return await ApiService(
    "POST",
    "/categories",
    reqBody
  );
};

// Update category
export const updateCategoryAPI = async (id, reqBody) => {
  return await ApiService(
    "PUT",
    `/categories/${id}`,
    reqBody
  );
};

// Delete category
export const deleteCategoryAPI = async (id) => {
  return await ApiService(
    "DELETE",
    `/categories/${id}`
  );
};


// =====================================================
// WISHLIST
// =====================================================

// Get all wishlist items
export const getAllWishlistAPI = async () => {
  return await ApiService("GET", "/wishlist");
};

// Get wishlist items for specific user
export const getWishlistByUserAPI = async (userId) => {
  return await ApiService(
    "GET",
    `/wishlist?userId=${userId}`
  );
};

// Get single wishlist item
export const getWishlistByIdAPI = async (id) => {
  return await ApiService(
    "GET",
    `/wishlist/${id}`
  );
};

// Add product to wishlist
export const addWishlistAPI = async (reqBody) => {
  return await ApiService(
    "POST",
    "/wishlist",
    reqBody
  );
};

// Update wishlist item
export const updateWishlistAPI = async (id, reqBody) => {
  return await ApiService(
    "PUT",
    `/wishlist/${id}`,
    reqBody
  );
};

// Delete product from wishlist
export const deleteWishlistAPI = async (id) => {
  return await ApiService(
    "DELETE",
    `/wishlist/${id}`
  );
};


// =====================================================
// CART
// =====================================================

// Get all cart items
export const getAllCartAPI = async () => {
  return await ApiService("GET", "/cart");
};

// Get cart items for specific user
export const getCartByUserAPI = async (userId) => {
  return await ApiService(
    "GET",
    `/cart?userId=${userId}`
  );
};

// Get single cart item
export const getCartByIdAPI = async (id) => {
  return await ApiService(
    "GET",
    `/cart/${id}`
  );
};

// Add product to cart
export const addCartAPI = async (reqBody) => {
  return await ApiService(
    "POST",
    "/cart",
    reqBody
  );
};

// Update cart item
export const updateCartAPI = async (id, reqBody) => {
  return await ApiService(
    "PUT",
    `/cart/${id}`,
    reqBody
  );
};

// Delete product from cart
export const deleteCartAPI = async (id) => {
  return await ApiService(
    "DELETE",
    `/cart/${id}`
  );
};


// =====================================================
// CLEAR ENTIRE CART
// =====================================================

export const clearCartAPI = async (cartItems) => {
  if (
    !Array.isArray(cartItems) ||
    cartItems.length === 0
  ) {
    return true;
  }

  try {
    await Promise.all(
      cartItems.map((item) => {
        if (item.id) {
          return deleteCartAPI(item.id);
        }

        return Promise.resolve();
      })
    );

    return true;

  } catch (error) {
    console.error(
      "Failed to clear cart:",
      error
    );

    throw error;
  }
};


// =====================================================
// ORDERS
// =====================================================

// Get all orders
export const getAllOrdersAPI = async () => {
  return await ApiService(
    "GET",
    "/orders"
  );
};

// Get orders for specific user
export const getOrdersByUserAPI = async (userId) => {
  return await ApiService(
    "GET",
    `/orders?userId=${userId}`
  );
};

// Get single order by ID
export const getOrderByIdAPI = async (id) => {
  return await ApiService(
    "GET",
    `/orders/${id}`
  );
};

// =====================================================
// ADD ORDER
// =====================================================

export const addOrderAPI = async (reqBody) => {
  return await ApiService(
    "POST",
    "/orders",
    reqBody
  );
};

// =====================================================
// UPDATE ORDER
// =====================================================

export const updateOrderAPI = async (id, reqBody) => {
  return await ApiService(
    "PUT",
    `/orders/${id}`,
    reqBody
  );
};

// =====================================================
// DELETE ORDER
// =====================================================

export const deleteOrderAPI = async (id) => {
  return await ApiService(
    "DELETE",
    `/orders/${id}`
  );
};