import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, addToCart } from "../utilities/cartSlice";
import { item } from "../utilities/mockData";

const CartPage = () => {

  
  
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

    const handleIncrement = (menuItemId) => {
    dispatch(addToCart(menuItemId));
  };

  const handleDecrement = (menuItemId) => {
    dispatch(removeFromCart(menuItemId));
  };

  const dispatch = useDispatch();

  const handeClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart_page min-h-[90vh] bg-[#f8f9fa] py-8 sm:py-10">
        <div className="container">
          {/* Empty Cart Message */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-8 sm:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mb-6">
              Add delicious items to your cart and enjoy a delightful ordering
              experience
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart_page min-h-[90vh] bg-[#f8f9fa] py-8 sm:py-10">
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 font-medium">
              <Link to="/" className="hover:text-orange-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-800">Cart</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Shopping Cart
              </h1>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-700">
                2 Items
              </span>
            </div>
          </div>

          <button
            type="button"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
            onClick={handeClearCart}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Cart
          </button>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery & Cart Items UI */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Cart Items List Card */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg text-gray-900">
                    Cart Items
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Items selected from restaurant
                  </p>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  {cartItems.length} Items 
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100 px-5 sm:px-6">
                {/* Item 1 */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Veg indicator */}
                    <div className="w-4 h-4 rounded-xs border border-green-600 flex items-center justify-center p-0.5 mt-1 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                        {item?.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item?.description}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
                        ₹{item?.price / 100}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                    {/* Quantity Pill */}
                    <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/80 overflow-hidden">
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors"
                        onClick={() => handleDecrement(item?.menuItemId)}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-800">
                        {item?.quantity}
                      </span>
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors"
                        onClick={() => handleIncrement(item?.menuItemId)}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-20 text-right">
                      <span className="font-bold text-sm sm:text-base text-gray-900">
                        ₹{item?.price / 100 * item?.quantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Non-veg indicator */}
                    <div className="w-4 h-4 rounded-xs border border-red-600 flex items-center justify-center p-0.5 mt-1 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                        {item?.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item?.description}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
                        ₹{item?.price / 100}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                    {/* Quantity Pill */}
                    <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/80 overflow-hidden">
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors"
                        onClick={() => handleDecrement(item?.menuItemId)}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-800">
                        {item?.quantity}
                      </span>
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors"
                        onClick={() => handleIncrement(item?.menuItemId)}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-20 text-right">
                      <span className="font-bold text-sm sm:text-base text-gray-900">
                        ₹{item?.price / 100 * item?.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
