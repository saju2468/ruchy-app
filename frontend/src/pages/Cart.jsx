import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Clock,
  Tag,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Info,
  Check,
  UtensilsCrossed,
} from "lucide-react";
import { addItem, removeItem, clearCart } from "../utilities/cartSlice";
import { RestaurantCardImage } from "../utilities/constants";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  // Local interactive UI states
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [cookingInstructions, setCookingInstructions] = useState("");
  const [isNoContactDelivery, setIsNoContactDelivery] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Available promo codes
  const availableCoupons = [
    {
      code: "RUCHY50",
      discount: 50,
      minOrder: 199,
      description: "Flat ₹50 OFF on orders above ₹199",
    },
    {
      code: "TASTY100",
      discount: 100,
      minOrder: 499,
      description: "Save ₹100 on orders above ₹499",
    },
  ];

  // Helper to extract clean data whether item comes from Swiggy menu (item.card.info) or restaurant card
  const normalizeItem = (item, index) => {
    const info = item?.card?.info || item;
    const id = info.id || `cart-item-${index}`;
    const name = info.name || "Special Ruchy Delicacy";
    const imageId = info.imageId || info.cloudinaryImageId || null;
    const isVeg =
      info.isVeg === 1 ||
      info.itemAttribute?.vegClassifier === "VEG" ||
      false;

    // Prices in Swiggy are often in paise
    const rawPrice =
      info.price ??
      info.defaultPrice ??
      (typeof info.costForTwo === "string"
        ? parseInt(info.costForTwo.replace(/\D/g, ""), 10) * 100
        : 24900);

    const unitPrice =
      rawPrice > 1000 ? Math.round(rawPrice / 100) : rawPrice || 199;

    const subtitle =
      info.description ||
      (Array.isArray(info.cuisines) ? info.cuisines.join(", ") : info.areaName || "");

    return {
      id,
      name,
      imageId,
      isVeg,
      unitPrice,
      subtitle,
      rawItem: item,
    };
  };

  // Group items by unique id to display quantity counter
  const groupedCartItems = useMemo(() => {
    const map = new Map();
    cartItems.forEach((raw, index) => {
      const normalized = normalizeItem(raw, index);
      if (map.has(normalized.id)) {
        const existing = map.get(normalized.id);
        existing.quantity += 1;
        existing.totalPrice += normalized.unitPrice;
      } else {
        map.set(normalized.id, {
          ...normalized,
          quantity: 1,
          totalPrice: normalized.unitPrice,
        });
      }
    });
    return Array.from(map.values());
  }, [cartItems]);

  // Calculations
  const itemTotal = groupedCartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const isFreeDeliveryEligible = itemTotal >= 299;
  const deliveryFee = itemTotal === 0 ? 0 : isFreeDeliveryEligible ? 0 : 39;
  const platformFee = itemTotal === 0 ? 0 : 5;
  const gstCharges = Math.round(itemTotal * 0.05);

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(
    0,
    itemTotal + deliveryFee + platformFee + gstCharges - discountAmount
  );
  const totalSavings = discountAmount + (isFreeDeliveryEligible && itemTotal > 0 ? 39 : 0);

  // Coupon handling
  const handleApplyCoupon = (couponToApply) => {
    const coupon =
      couponToApply ||
      availableCoupons.find(
        (c) => c.code.toLowerCase() === couponInput.trim().toLowerCase()
      );

    if (!coupon) {
      setCouponError("Invalid coupon code. Try RUCHY50 or TASTY100");
      return;
    }

    if (itemTotal < coupon.minOrder) {
      setCouponError(
        `Add items worth ₹${coupon.minOrder - itemTotal} more to apply ${coupon.code}`
      );
      return;
    }

    setAppliedCoupon(coupon);
    setCouponInput(coupon.code);
    setCouponError("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setAppliedCoupon(null);
  };

  const handleCheckout = () => {
    setIsOrderPlaced(true);
    // Auto-scroll to top for confirmation view
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetOrder = () => {
    dispatch(clearCart());
    setIsOrderPlaced(false);
  };

  // SUCCESS ORDER SCREEN VIEW
  if (isOrderPlaced) {
    return (
      <div className="cart_page min-h-[80vh] bg-[#f8f9fa] py-12 md:py-16">
        <div className="container max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-100 text-center relative overflow-hidden">
            {/* Ambient background decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

            {/* Success icon */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-inner">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Order Confirmed
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Delicious Food is on the Way!
            </h1>

            <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base mb-8 leading-relaxed">
              Your order has been received by the kitchen. Our delivery partner
              will pick up your hot and fresh meal shortly.
            </p>

            {/* Estimated delivery banner */}
            <div className="bg-[#fcf2e8] border border-orange-200/80 rounded-2xl p-5 mb-8 max-w-md mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-orange-800 font-semibold">
                    Estimated Arrival
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    25 - 30 minutes
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Paid via</p>
                <p className="text-sm font-semibold text-gray-800">
                  ₹{grandTotal} (Online)
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                onClick={handleResetOrder}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4" />
                Order More Food
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART VIEW
  if (cartItems.length === 0) {
    return (
      <div className="cart_page min-h-[80vh] bg-[#f8f9fa] py-12 md:py-20 flex items-center">
        <div className="container max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-sm border border-gray-100 text-center">
            {/* Visual Icon Illustration */}
            <div className="relative w-28 h-28 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-orange-100 animate-ping opacity-40"></div>
              <div className="relative w-full h-full rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-orange-600 shadow-inner">
                <ShoppingBag className="w-12 h-12 stroke-[1.8]" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
              Good food is always cooking! Explore our top-rated restaurants and
              treat yourself to something delicious.
            </p>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-600/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              See Restaurants Near You
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Popular cuisines suggestion pills */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4">
                Popular Categories to Explore
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "🍕 Pizza",
                  "🍔 Burgers",
                  "🍗 Biryani",
                  "🌯 Rolls",
                  "🥗 North Indian",
                  "🍰 Desserts",
                ].map((category) => (
                  <Link
                    key={category}
                    to="/"
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-gray-50 hover:bg-orange-50 hover:text-orange-700 border border-gray-200 hover:border-orange-200 text-gray-700 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE CART VIEW WITH ITEMS
  return (
    <div className="cart_page min-h-[90vh] bg-[#f8f9fa] py-8 sm:py-10">
      <div className="container">
        {/* Top Navigation & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5 font-medium">
              <Link to="/" className="hover:text-orange-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-800">Cart</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Review Your Order
              </h1>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-700">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Add More Items
            </Link>
            <button
              type="button"
              onClick={handleClearCart}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Cart
            </button>
          </div>
        </div>

        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Delivery Details & Items List */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Delivery Location & Time SLA Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                        Home
                      </span>
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Verified Address
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm mt-1">
                      100ft Road, Indiranagar, Bangalore
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Opposite Metro Pillar 42, 2nd Stage
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium leading-none">
                      DELIVERY TIME
                    </p>
                    <p className="text-xs font-bold text-gray-800 mt-0.5">
                      25 - 30 Mins
                    </p>
                  </div>
                </div>
              </div>

              {/* Free delivery progress meter */}
              <div className="pt-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  {isFreeDeliveryEligible ? (
                    <span className="text-emerald-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Free Delivery Unlocked on this order!
                    </span>
                  ) : (
                    <span className="text-gray-600">
                      Add ₹{299 - itemTotal} more to unlock{" "}
                      <span className="text-orange-600 font-bold">
                        FREE Delivery
                      </span>
                    </span>
                  )}
                  <span className="text-gray-500 text-[11px]">
                    ₹{itemTotal} / ₹299
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isFreeDeliveryEligible
                        ? "bg-emerald-500"
                        : "bg-orange-500"
                    }`}
                    style={{
                      width: `${Math.min(100, (itemTotal / 299) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg text-gray-900">
                    Order Items
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Freshly prepared as per your taste
                  </p>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  {groupedCartItems.length} unique{" "}
                  {groupedCartItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="divide-y divide-gray-100 px-5 sm:px-6">
                {groupedCartItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                  >
                    {/* Item Details */}
                    <div className="flex items-start gap-3.5 flex-1">
                      {/* Veg / Non-Veg badge */}
                      <div
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center p-0.5 mt-1 shrink-0 ${
                          item.isVeg ? "border-green-600" : "border-red-600"
                        }`}
                        title={item.isVeg ? "Pure Veg" : "Non-Veg"}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.isVeg ? "bg-green-600" : "bg-red-600"
                          }`}
                        ></span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-1">
                          {item.name}
                        </h3>
                        {item.subtitle && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {item.subtitle}
                          </p>
                        )}
                        <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
                          ₹{item.unitPrice}
                        </p>
                      </div>
                    </div>

                    {/* Quantity controls & Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 self-stretch sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                      {/* Item Thumbnail (if available) */}
                      {item.imageId && (
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 hidden sm:block">
                          <img
                            src={`${RestaurantCardImage}${item.imageId}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}

                      {/* Quantity pill */}
                      <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/80 shadow-2xs overflow-hidden">
                        <button
                          type="button"
                          onClick={() => dispatch(removeItem())}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                          title="Remove one"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => dispatch(addItem(item.rawItem))}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                          title="Add one more"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="w-20 text-right">
                        <span className="font-bold text-sm sm:text-base text-gray-900">
                          ₹{item.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Instructions Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100">
              <label
                htmlFor="instructions"
                className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2"
              >
                <MessageSquare className="w-4 h-4 text-orange-600" />
                Cooking or Delivery Instructions
              </label>
              <div className="relative">
                <input
                  id="instructions"
                  type="text"
                  value={cookingInstructions}
                  onChange={(e) => setCookingInstructions(e.target.value)}
                  placeholder="e.g. Please avoid onions, make it extra spicy, don't ring the bell..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-xs sm:text-sm text-gray-700 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* No-contact Delivery Checkbox Card */}
            <div
              onClick={() => setIsNoContactDelivery(!isNoContactDelivery)}
              className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex items-start gap-3.5 cursor-pointer hover:border-gray-200 transition-all select-none"
            >
              <div className="mt-0.5">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isNoContactDelivery
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isNoContactDelivery && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <p className="text-sm font-bold text-gray-900">
                    Opt-in for No-Contact Delivery
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Our delivery partner will leave your order at the doorstep or
                  gate and call you when placed. Safe and sanitized.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Coupons, Bill Summary & Checkout */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Promo Code & Coupons Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-orange-600" />
                <h3 className="font-bold text-gray-900 text-sm">
                  Apply Coupon Code
                </h3>
              </div>

              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                        {appliedCoupon.code} Applied
                      </p>
                      <p className="text-[11px] text-emerald-700">
                        Saved ₹{appliedCoupon.discount} on this order
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      placeholder="ENTER PROMO CODE"
                      className="flex-1 uppercase tracking-wider px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-xs font-semibold text-gray-800 placeholder-gray-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      {couponError}
                    </p>
                  )}

                  {/* Quick Click Available Coupons */}
                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                      Available Offers
                    </p>
                    {availableCoupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        onClick={() => handleApplyCoupon(coupon)}
                        className="group p-2.5 rounded-xl border border-dashed border-orange-200 hover:border-orange-400 bg-orange-50/40 hover:bg-orange-50 flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div>
                          <span className="text-xs font-extrabold text-orange-700 tracking-wider">
                            {coupon.code}
                          </span>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            {coupon.description}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-orange-600 group-hover:text-orange-700 uppercase">
                          Apply
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Bill Details Summary Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100">
              <h3 className="font-bold text-gray-900 text-base mb-4 pb-3 border-b border-gray-100">
                Bill Details
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                {/* Item Total */}
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span className="font-semibold text-gray-900">
                    ₹{itemTotal}
                  </span>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between text-gray-600 items-center">
                  <div className="flex items-center gap-1.5">
                    <span>Delivery Fee</span>
                    {isFreeDeliveryEligible && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Free
                      </span>
                    )}
                  </div>
                  <span>
                    {isFreeDeliveryEligible ? (
                      <span className="flex items-center gap-1.5">
                        <span className="line-through text-gray-400">₹39</span>
                        <span className="text-emerald-600 font-bold">FREE</span>
                      </span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {/* Platform Fee */}
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    Platform Fee
                    <span title="Helps maintain our platform and delivery infrastructure">
                      <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                    </span>
                  </span>
                  <span className="font-semibold text-gray-900">
                    ₹{platformFee}
                  </span>
                </div>

                {/* GST & Restaurant Charges */}
                <div className="flex justify-between text-gray-600">
                  <span>GST & Restaurant Charges</span>
                  <span className="font-semibold text-gray-900">
                    ₹{gstCharges}
                  </span>
                </div>

                {/* Applied Discount */}
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.discount}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-baseline">
                    <span className="font-extrabold text-base text-gray-900 uppercase tracking-tight">
                      To Pay
                    </span>
                    <span className="font-extrabold text-xl text-gray-900">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total savings alert pill */}
              {totalSavings > 0 && (
                <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Yay! You are saving ₹{totalSavings} on this order
                </div>
              )}

              {/* Checkout CTA Button */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full mt-6 py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-600/30 flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 active:scale-98 cursor-pointer"
              >
                <span>Proceed to Pay</span>
                <span className="flex items-center gap-1.5 font-extrabold">
                  ₹{grandTotal}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure Checkout powered by Ruchy</span>
              </div>
            </div>

            {/* Cancellation Policy note */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 text-xs text-gray-500 leading-relaxed">
              <p className="font-bold text-gray-700 mb-1">
                Review your order details
              </p>
              Orders once prepared cannot be cancelled. In case of unexpected
              delays, our support team is available 24/7.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
