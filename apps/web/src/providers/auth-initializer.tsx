"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { fetchMeThunk } from "../features/auth/authThunk";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMeThunk());
  }, [dispatch]);

  return null;
}