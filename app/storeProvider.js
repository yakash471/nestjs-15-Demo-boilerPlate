// /app/StoreProvider.js

"use client";  // Marks this as a client-side component

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './lib/store';

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);

  // Create the store only once
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
