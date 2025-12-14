import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

/* =======================
   HELPER (ASYNC STORAGE)
======================= */
const saveCartToStorage = async (cart) => {
  try {
    await SecureStore.setItemAsync("cartItem", JSON.stringify(cart));
  } catch (e) {
    console.log("Save cart error", e);
  }
};

/* =======================
   INITIAL STATE
======================= */
const initialState = {
  cartItem: [], // RN không đọc sync được SecureStore
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

/* =======================
   SLICE
======================= */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartQuantity += 1;

        Toast.show({
          type: "info",
          text1: "Cập nhật giỏ hàng",
          text2: `Tăng số lượng ${state.cartItem[itemIndex].title}`,
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItem.push(tempProduct);

        Toast.show({
          type: "success",
          text1: "Đã thêm vào giỏ",
          text2: action.payload.title,
        });
      }

      saveCartToStorage(state.cartItem);
    },

    removeFromCart(state, action) {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      );

      Toast.show({
        type: "error",
        text1: "Đã xóa sản phẩm",
        text2: action.payload.title,
      });

      saveCartToStorage(state.cartItem);
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItem[itemIndex].cartQuantity > 1) {
        state.cartItem[itemIndex].cartQuantity -= 1;

        Toast.show({
          type: "info",
          text1: "Giảm số lượng",
          text2: action.payload.title,
        });
      } else {
        state.cartItem = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        );
      }

      saveCartToStorage(state.cartItem);
    },

    clearCart(state) {
      state.cartItem = [];

      Toast.show({
        type: "error",
        text1: "Giỏ hàng trống",
      });

      saveCartToStorage([]);
    },

    getTotals(state) {
      let { total, quantity } = state.cartItem.reduce(
        (cartTotal, cartItem) => {
          const itemTotal = cartItem.price * cartItem.cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartItem.cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },

    setCartFromStorage(state, action) {
      state.cartItem = action.payload || [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
  setCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;