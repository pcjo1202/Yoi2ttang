// 고급 API 모니터: 다양한 성능 지표 측정
interface APICallRecord {
  timestamp: number
  responseTime: number
  cached: boolean
  url: string
}

class AdvancedAPIMonitor {
  private startTime = 0 // 측정 시작 시간
  private calls: APICallRecord[] = [] // API 호출 기록
  private loadingCount = 0 // 로딩 표시 횟수
  private interactionDelays: number[] = [] // 인터랙션 지연 기

  start() {
    this.calls = [] // 호출 기록 초기화
    this.loadingCount = 0 // 로딩 표시 횟수 초기화
    this.interactionDelays = [] // 인터랙션 지연 기록 초기화
    this.startTime = performance.now() // 측정 시작 시간 기록
    performance.mark("api-monitor-start") // 측정 시작 마커 설정
    console.log("🎬 API 모니터링 시작!") // 측정 시작 메시지 출력
  }

  // API 호출 기록
  recordCall(responseTime: number, cached: boolean = false, url: string = "") {
    this.calls.push({
      timestamp: performance.now(),
      responseTime,
      cached,
      url,
    })

    const totalCalls = this.calls.length
    const cacheHits = this.calls.filter((c) => c.cached).length
    console.log(
      `📞 호출: ${totalCalls}회 (API: ${totalCalls - cacheHits}, 캐시: ${cacheHits}) | ${cached ? "✅ Cache HIT" : "🌐 API"} ${responseTime.toFixed(0)}ms`,
    )
  }

  // 로딩 표시 기록
  recordLoading() {
    this.loadingCount++
  }

  // 인터랙션 지연 기록
  recordInteraction(delay: number) {
    this.interactionDelays.push(delay)
  }

  // 중복 호출 분석 (1초 내 같은 URL)
  private analyzeDuplicateCalls() {
    let duplicates = 0
    for (let i = 1; i < this.calls.length; i++) {
      const current = this.calls[i]
      const previous = this.calls[i - 1]

      if (
        current.url === previous.url &&
        current.timestamp - previous.timestamp < 1000 &&
        !current.cached
      ) {
        duplicates++
      }
    }
    return duplicates
  }

  // P95/P99 계산
  private calculatePercentile(values: number[], percentile: number): number {
    if (values.length === 0) return 0
    const sorted = [...values].sort((a, b) => a - b)
    const index = Math.floor(sorted.length * percentile)
    return sorted[index] || 0
  }

  getReport() {
    const duration = performance.now() - this.startTime
    performance.mark("api-monitor-end")
    performance.measure(
      "api-monitor-duration",
      "api-monitor-start",
      "api-monitor-end",
    )

    const totalCalls = this.calls.length
    const cacheHits = this.calls.filter((c) => c.cached).length
    const apiCalls = totalCalls - cacheHits
    const duplicates = this.analyzeDuplicateCalls()

    // 응답 시간 분석 (캐시 제외)
    const apiResponseTimes = this.calls
      .filter((c) => !c.cached)
      .map((c) => c.responseTime)

    const avgResponse =
      apiResponseTimes.length > 0
        ? apiResponseTimes.reduce((a, b) => a + b, 0) / apiResponseTimes.length
        : 0

    const p95Response = this.calculatePercentile(apiResponseTimes, 0.95)
    const p99Response = this.calculatePercentile(apiResponseTimes, 0.99)

    // 인터랙션 지연 분석
    const avgInteraction =
      this.interactionDelays.length > 0
        ? this.interactionDelays.reduce((a, b) => a + b, 0) /
          this.interactionDelays.length
        : 0

    // 캐시 효율
    const cacheHitRate = totalCalls > 0 ? (cacheHits / totalCalls) * 100 : 0
    const cacheMissRate = totalCalls > 0 ? (apiCalls / totalCalls) * 100 : 0

    return {
      // 📞 호출 빈도 KPI
      "총 API 호출": totalCalls,
      "실제 API 호출": apiCalls,
      "캐시에서 응답": cacheHits,
      "분당 호출": `${((totalCalls / duration) * 60000).toFixed(1)}회`,
      "중복 호출": duplicates,

      // ⏱️ 응답 시간 KPI
      "평균 응답시간": `${avgResponse.toFixed(0)}ms`,
      "P95 응답시간": `${p95Response.toFixed(0)}ms`,
      "P99 응답시간": `${p99Response.toFixed(0)}ms`,

      // 💾 캐싱 효율 KPI
      "캐시 적중률": `${cacheHitRate.toFixed(1)}%`,
      "캐시 미스율": `${cacheMissRate.toFixed(1)}%`,

      // 🎯 사용자 경험 KPI
      "로딩 표시 횟수": this.loadingCount,
      "평균 인터랙션 지연": `${avgInteraction.toFixed(0)}ms`,

      // 📊 기타
      "측정 시간": `${(duration / 1000).toFixed(1)}초`,
    }
  }

  // 상세 리포트 출력
  print() {
    const report = this.getReport()

    console.log("\n" + "=".repeat(60))
    console.log("📊 API 성능 측정 결과")
    console.log("=".repeat(60) + "\n")

    console.log("📞 호출 빈도 KPI")
    console.log("─".repeat(60))
    console.log(`   총 API 호출 횟수: ${report["총 API 호출"]}회`)
    console.log(`   실제 API 호출: ${report["실제 API 호출"]}회`)
    console.log(`   캐시에서 응답: ${report["캐시에서 응답"]}회`)
    console.log(`   분당 호출 횟수: ${report["분당 호출"]}`)
    console.log(`   중복 호출 횟수: ${report["중복 호출"]}회`)

    console.log("\n⏱️  응답 시간 KPI")
    console.log("─".repeat(60))
    console.log(`   평균 응답 시간: ${report["평균 응답시간"]}`)
    console.log(`   P95 응답 시간: ${report["P95 응답시간"]}`)
    console.log(`   P99 응답 시간: ${report["P99 응답시간"]}`)

    console.log("\n💾 캐싱 효율 KPI")
    console.log("─".repeat(60))
    console.log(
      `   캐시 적중률: ${report["캐시 적중률"]} ${parseFloat(report["캐시 적중률"]) >= 70 ? "✅" : "⚠️ (목표: 70%)"}`,
    )
    console.log(`   캐시 미스율: ${report["캐시 미스율"]}`)

    console.log("\n🎯 사용자 경험 KPI")
    console.log("─".repeat(60))
    console.log(`   로딩 표시 횟수: ${report["로딩 표시 횟수"]}회`)
    console.log(
      `   평균 인터랙션 지연: ${report["평균 인터랙션 지연"]} ${parseFloat(report["평균 인터랙션 지연"]) <= 100 ? "✅" : "⚠️ (목표: <100ms)"}`,
    )

    console.log("\n📊 측정 정보")
    console.log("─".repeat(60))
    console.log(`   측정 시간: ${report["측정 시간"]}`)
    console.log("\n" + "=".repeat(60) + "\n")

    // 테이블로도 출력
    console.table([report])
  }

  // JSON 내보내기
  exportJSON() {
    const report = this.getReport()
    const data = {
      timestamp: new Date().toISOString(),
      summary: report,
      details: {
        totalCalls: this.calls.length,
        calls: this.calls.map((c) => ({
          timestamp: c.timestamp,
          responseTime: c.responseTime,
          cached: c.cached,
          url: c.url.split("?")[0], // 쿼리 파라미터 제외
        })),
        loadingCount: this.loadingCount,
        interactionDelays: this.interactionDelays,
      },
    }

    const dataStr = JSON.stringify(data, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `api-performance-${Date.now()}.json`
    link.click()

    console.log("💾 성능 데이터를 JSON 파일로 내보냈습니다.")
  }

  reset() {
    this.calls = []
    this.loadingCount = 0
    this.interactionDelays = []
    this.startTime = performance.now()
    performance.clearMarks()
    performance.clearMeasures()
  }

  getCalls() {
    return this.calls.length
  }

  getCacheHitRate() {
    const totalCalls = this.calls.length
    if (totalCalls === 0) return 0
    const cacheHits = this.calls.filter((c) => c.cached).length
    return (cacheHits / totalCalls) * 100
  }
}

export const apiMonitor = new AdvancedAPIMonitor()
