import Section from "@/components/common/Section"
import ActivityChangeItem from "../personal-dashboard/ActivityChangeItem"
import ActivityLineChart from "../personal-dashboard/ActivityLineChart"

interface TeamActivityChangeSectionProps {}

const TeamActivityChangeSection = ({}: TeamActivityChangeSectionProps) => {
  const metadata = [
    {
      title: "오늘 활동량",
      rateOfChange: 100,
      isIncrease: true,
    },
    {
      title: "주간 활동량",
      rateOfChange: 10,
      isIncrease: false,
    },
  ]
  return (
    <Section title="📈 활동 변화" supplement={"최근 7일"}>
      <div className="flex flex-col gap-4 rounded-xl">
        <ActivityLineChart />
        <div className="flex h-full w-full flex-col items-center gap-3">
          {metadata.map(({ title, rateOfChange, isIncrease }) => (
            <ActivityChangeItem
              key={title}
              title={title}
              rateOfChange={rateOfChange}
              isIncrease={isIncrease}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
export default TeamActivityChangeSection
