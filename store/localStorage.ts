"use client";

export const setItemAsync = async (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getItemAsync = async (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const deleteItemAsync = async (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};