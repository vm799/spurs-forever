import { useEffect, useRef } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
  enabled?: boolean;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  enabled = true,
}: UsePullToRefreshOptions) {
  const startY = useRef(0);
  const currentY = useRef(0);
  const isRefreshing = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    let pullDistance = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isRefreshing.current || window.scrollY > 0) return;

      currentY.current = e.touches[0].clientY;
      pullDistance = currentY.current - startY.current;

      if (pullDistance > 0 && pullDistance < threshold * 2) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = async () => {
      if (isRefreshing.current) return;

      pullDistance = currentY.current - startY.current;

      if (pullDistance > threshold && window.scrollY === 0) {
        isRefreshing.current = true;
        try {
          await onRefresh();
        } finally {
          isRefreshing.current = false;
        }
      }

      startY.current = 0;
      currentY.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, threshold, enabled]);
}
