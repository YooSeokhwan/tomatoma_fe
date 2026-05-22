import { useEffect, useRef, useState } from 'react'

/**
 * Intersection Observer를 사용하여 스크롤 진입 시 애니메이션을 트리거하는 커스텀 훅
 * @param {Object} options - IntersectionObserver 옵션
 * @returns {Object} { ref, isVisible }
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options,
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        // 한 번 보여진 후에는 관찰 중지
        observer.unobserve(entry.target)
      }
    }, defaultOptions)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return { ref, isVisible }
}

export default useIntersectionObserver
