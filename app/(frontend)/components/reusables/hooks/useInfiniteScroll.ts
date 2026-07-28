"use client";

import { useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import { UseInfiniteScrollProps } from "../types/types";

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  offset = 500,
}: UseInfiniteScrollProps) {
  const lockRef = useRef(false);

  useEffect(() => {
    if (!loading) {
      lockRef.current = false;
    }
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading || lockRef.current) return;

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollTop + viewportHeight >= pageHeight - offset) {
        lockRef.current = true;
        onLoadMore();
      }
    };

    const throttledScroll = throttle(handleScroll,500);

    window.addEventListener("scroll", throttledScroll, {
      passive: true,
    });
    

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      throttledScroll.cancel();
    };
  }, [loading, hasMore, onLoadMore, offset]);
}