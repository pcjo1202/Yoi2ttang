"use client"

import { apiMonitor } from "@/lib/api-monitor"
import { useEffect, useState } from "react"

export function SimpleMonitor() {
  const [started, setStarted] = useState(false)
  const [callCount, setCallCount] = useState(0)
  const [cacheHitRate, setCacheHitRate] = useState(0)
  const [showReport, setShowReport] = useState(false)
  const [report, setReport] = useState<Record<string, string | number> | null>(
    null,
  )

  // 실시간 업데이트
  useEffect(() => {
    if (!started) return

    const interval = setInterval(() => {
      setCallCount(apiMonitor.getCalls())
      setCacheHitRate(apiMonitor.getCacheHitRate())
    }, 500) // 0.5초마다 업데이트

    return () => clearInterval(interval)
  }, [started])

  if (process.env.NODE_ENV !== "development") return null

  return (
    <>
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        {started && (
          <div className="rounded-lg bg-gray-900 px-4 py-2 text-xs text-white shadow-lg">
            <div className="flex items-center gap-3">
              <span className="animate-pulse">🔴</span>
              <div className="flex gap-4">
                <span>호출: {callCount}회</span>
                <span>캐시: {cacheHitRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {!started ? (
            <button
              onClick={() => {
                apiMonitor.start()
                setStarted(true)
              }}
              className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-green-700">
              ▶️ 측정 시작
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  const reportData = apiMonitor.getReport()
                  setReport(reportData)
                  setShowReport(true)
                  apiMonitor.print() // 콘솔에도 출력
                }}
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-blue-700">
                📊 결과 보기
              </button>
              <button
                onClick={() => {
                  apiMonitor.exportJSON()
                }}
                className="rounded bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-purple-700">
                💾 내보내기
              </button>
              <button
                onClick={() => {
                  apiMonitor.reset()
                  apiMonitor.start()
                  setCallCount(0)
                  setCacheHitRate(0)
                  setShowReport(false)
                  setReport(null)
                  console.log("🔄 측정 초기화 및 재시작")
                }}
                className="rounded bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-700">
                🔄 초기화
              </button>
            </>
          )}
        </div>
      </div>

      {/* 결과 모달 */}
      {showReport && report && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50"
          onClick={() => setShowReport(false)}>
          <div
            className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                📊 API 성능 측정 결과
              </h2>
              <button
                onClick={() => setShowReport(false)}
                className="text-2xl text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* 호출 빈도 KPI */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  📞 호출 빈도 KPI
                </h3>
                <div className="space-y-1 rounded bg-gray-50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">총 API 호출</span>
                    <span className="font-medium">
                      {report["총 API 호출"]}회
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">실제 API 호출</span>
                    <span className="font-medium">
                      {report["실제 API 호출"]}회
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">캐시에서 응답</span>
                    <span className="font-medium text-green-600">
                      {report["캐시에서 응답"]}회
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">분당 호출</span>
                    <span className="font-medium">{report["분당 호출"]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">중복 호출</span>
                    <span className="font-medium text-red-600">
                      {report["중복 호출"]}회
                    </span>
                  </div>
                </div>
              </div>

              {/* 응답 시간 KPI */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  ⏱️ 응답 시간 KPI
                </h3>
                <div className="space-y-1 rounded bg-gray-50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">평균 응답시간</span>
                    <span className="font-medium">
                      {report["평균 응답시간"]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">P95 응답시간</span>
                    <span className="font-medium">
                      {report["P95 응답시간"]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">P99 응답시간</span>
                    <span className="font-medium">
                      {report["P99 응답시간"]}
                    </span>
                  </div>
                </div>
              </div>

              {/* 캐싱 효율 KPI */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  💾 캐싱 효율 KPI
                </h3>
                <div className="space-y-1 rounded bg-gray-50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">캐시 적중률</span>
                    <span
                      className={`font-medium ${
                        parseFloat(
                          report["캐시 적중률"]?.toString().replace("%", "") ||
                            "0",
                        ) >= 70
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}>
                      {report["캐시 적중률"]}{" "}
                      {parseFloat(
                        report["캐시 적중률"]?.toString().replace("%", "") ||
                          "0",
                      ) >= 70
                        ? "✅"
                        : "⚠️"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">캐시 미스율</span>
                    <span className="font-medium">{report["캐시 미스율"]}</span>
                  </div>
                </div>
              </div>

              {/* 사용자 경험 KPI */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  🎯 사용자 경험 KPI
                </h3>
                <div className="space-y-1 rounded bg-gray-50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">로딩 표시 횟수</span>
                    <span className="font-medium">
                      {report["로딩 표시 횟수"]}회
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">평균 인터랙션 지연</span>
                    <span className="font-medium">
                      {report["평균 인터랙션 지연"]}
                    </span>
                  </div>
                </div>
              </div>

              {/* 측정 정보 */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  📊 측정 정보
                </h3>
                <div className="rounded bg-gray-50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">측정 시간</span>
                    <span className="font-medium">{report["측정 시간"]}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowReport(false)}
                className="rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700">
                닫기
              </button>
              <p className="mt-2 text-xs text-gray-500">
                💡 자세한 로그는 콘솔(F12)을 확인하세요
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
