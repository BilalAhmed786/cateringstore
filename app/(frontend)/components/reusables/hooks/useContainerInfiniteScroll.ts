"use client";

import { RefObject, useEffect, useRef } from "react";
import throttle from "lodash/throttle";

interface UseContainerInfiniteScrollProps {
  containerRef: RefObject<HTMLElement | null>;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  offset?: number;
}

export function useContainerInfiniteScroll({
  containerRef,
  loading,
  hasMore,
  onLoadMore,
  offset = 300,
}: UseContainerInfiniteScrollProps) {
  const lockRef = useRef(false);

  useEffect(() => {
    if (!loading) {
      lockRef.current = false;
    }
  }, [loading]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      if (loading || !hasMore || lockRef.current) return;

      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;

      if (scrollTop + clientHeight >= scrollHeight - offset) {
        lockRef.current = true;
        onLoadMore();
      }
    };

    const throttled = throttle(handleScroll, 200);

    container.addEventListener("scroll", throttled, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", throttled);
      throttled.cancel();
    };
  }, [containerRef, loading, hasMore, onLoadMore, offset]);
}