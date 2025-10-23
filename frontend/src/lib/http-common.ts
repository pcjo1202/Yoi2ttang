import axios from "axios"
import { apiMonitor } from "./api-monitor"
import { getCookie } from "./utils"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 8 * 1000, // 8초
  withCredentials: true,
})

// 요청 인터셉터
// - 개발(http) 환경에서는 브라우저에 저장된 쿠키로부터 accessToken을 가져와 헤더에 추가
// - API 모니터링 (개발 환경에서만)
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    // API 모니터링: 요청 시작 시간 기록
    if (process.env.NODE_ENV === "development") {
      // @ts-ignore - 메타데이터 추가
      config.metadata = { startTime: performance.now() }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터
// - 401 응답 시 리이슈 시도 후 로그인 페이지로 리다이렉트
// - API 모니터링 (개발 환경에서만)
apiClient.interceptors.response.use(
  (response) => {
    // API 모니터링: 응답 시간 기록
    if (
      process.env.NODE_ENV === "development" &&
      // @ts-ignore
      response.config.metadata
    ) {
      // @ts-ignore
      const duration = performance.now() - response.config.metadata.startTime
      const url = response.config.url || ""

      // 캐시 히트 여부는 false (실제 API 호출)
      apiMonitor.recordCall(duration, false, url)

      // 로딩 표시 기록
      apiMonitor.recordLoading()
    }
    return response
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      error.config._retry = true

      try {
        const response = await fetch("/auth/reissue", {
          method: "POST",
          credentials: "include",
        })
        // 원래 요청을 재시도하되, 실패할 경우 로그인 페이지로 이동
        if (response.ok) {
          // 갱신된 쿠키에서 accessToken을 가져와 헤더에 추가
          const accessToken = getCookie("accessToken")
          if (accessToken) {
            error.config.headers.Authorization = `Bearer ${accessToken}`
          }

          return await apiClient(error.config)
        } else {
          window.location.href = "/login"
        }
      } catch (reissueError) {
        window.location.href = "/login"
        return Promise.reject(reissueError)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
