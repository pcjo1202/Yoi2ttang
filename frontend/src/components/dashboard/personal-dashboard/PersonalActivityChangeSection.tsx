import Section from "@/components/common/Section"

import { getTileChangeRate } from "@/services/dashboard/api"
import ActivityChangeItem from "./ActivityChangeItem"
import ActivityLineChart from "./ActivityLineChart"

interface PersonalActivityChangeSectionProps {}

const PersonalActivityChangeSection =
  async ({}: PersonalActivityChangeSectionProps) => {
    const { data: weeklyData } = await getTileChangeRate({
      period: "WEEKLY",
    })

    const { data: dailyData } = await getTileChangeRate({
      period: "DAILY",
    })

    const metadata = [
      { ...dailyData, title: "전일 대비 오늘 활동량" },
      { ...weeklyData, title: "지난 주 대비 오늘 활동량" },
    ]

    return (
      <Section title="📈 활동 변화" supplement={"최근 7일"}>
        <div className="flex flex-col gap-4 rounded-xl">
          <ActivityLineChart />
          <div className="flex h-full w-full flex-col items-center gap-3">
            {metadata.map(({ title, changeDirection, changeRate }) => (
              <ActivityChangeItem
                key={title}
                title={title}
                rateOfChange={changeRate}
                changeDirection={changeDirection}
              />
            ))}
          </div>
        </div>
      </Section>
    )
  }
export default PersonalActivityChangeSection
