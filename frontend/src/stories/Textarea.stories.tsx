import Textarea from "@/components/common/Textarea"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"

const meta: Meta<typeof Textarea> = {
  title: "Common/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    maxLength: {
      control: { type: "number", min: 1, max: 1000 },
      description: "최대 문자 수",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 텍스트에어리어
export const Default: Story = {
  render: () => {
    const [content, setContent] = useState("")

    return (
      <div className="w-80">
        <Textarea
          content={content}
          onContentChange={setContent}
          placeholder="텍스트를 입력해 주세요"
        />
      </div>
    )
  },
}

// 커스텀 maxLength
export const CustomMaxLength: Story = {
  render: () => {
    const [content, setContent] = useState("")

    return (
      <div className="w-80">
        <Textarea
          content={content}
          onContentChange={setContent}
          maxLength={200}
          placeholder="최대 200자까지 입력 가능합니다"
        />
      </div>
    )
  },
}

// 짧은 maxLength
export const ShortMaxLength: Story = {
  render: () => {
    const [content, setContent] = useState("")

    return (
      <div className="w-80">
        <Textarea
          content={content}
          onContentChange={setContent}
          maxLength={50}
          placeholder="트위터 스타일 (50자 제한)"
        />
      </div>
    )
  },
}

// 미리 입력된 텍스트
export const WithInitialContent: Story = {
  render: () => {
    const [content, setContent] = useState(
      "이미 입력된 텍스트입니다. 수정해보세요!",
    )

    return (
      <div className="w-80">
        <Textarea
          content={content}
          onContentChange={setContent}
          placeholder="텍스트를 입력해 주세요"
        />
      </div>
    )
  },
}

// 비활성화 상태
export const Disabled: Story = {
  render: () => {
    const [content, setContent] = useState("이 텍스트는 수정할 수 없습니다.")

    return (
      <div className="w-80">
        <Textarea
          content={content}
          onContentChange={setContent}
          disabled={true}
          placeholder="비활성화된 텍스트에어리어"
        />
      </div>
    )
  },
}

// 댓글 작성 예제
export const CommentForm: Story = {
  render: () => {
    const [comment, setComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = () => {
      if (comment.trim()) {
        setIsSubmitting(true)
        // 실제로는 서버에 전송
        setTimeout(() => {
          alert(`댓글 등록: ${comment}`)
          setComment("")
          setIsSubmitting(false)
        }, 1000)
      }
    }

    return (
      <div className="w-96 space-y-4">
        <h3 className="text-lg font-semibold">댓글 작성</h3>
        <Textarea
          content={comment}
          onContentChange={setComment}
          maxLength={300}
          placeholder="댓글을 작성해주세요..."
          disabled={isSubmitting}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setComment("")}
            className="rounded border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
            disabled={isSubmitting}>
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!comment.trim() || isSubmitting}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting ? "등록 중..." : "등록"}
          </button>
        </div>
      </div>
    )
  },
}

// 피드백 폼 예제
export const FeedbackForm: Story = {
  render: () => {
    const [feedback, setFeedback] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      alert(`피드백: ${feedback}\n이메일: ${email}`)
    }

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-4">
        <h3 className="text-lg font-semibold">피드백 보내기</h3>

        <div>
          <label className="mb-2 block text-sm font-medium">
            이메일 (선택사항)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-xl border-2 border-gray-200 p-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">피드백 *</label>
          <Textarea
            content={feedback}
            onContentChange={setFeedback}
            maxLength={500}
            placeholder="개선사항이나 문제점을 자유롭게 작성해주세요..."
          />
        </div>

        <button
          type="submit"
          disabled={!feedback.trim()}
          className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50">
          피드백 보내기
        </button>
      </form>
    )
  },
}

// 글자 수 제한 경고 예제
export const WithLengthWarning: Story = {
  render: () => {
    const [content, setContent] = useState("")
    const maxLength = 100
    const warningThreshold = 80 // 80% 도달시 경고

    const isNearLimit = content.length >= warningThreshold
    const isAtLimit = content.length >= maxLength

    return (
      <div className="w-80 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">게시글 작성</label>
          <span
            className={`text-xs ${
              isAtLimit
                ? "text-red-500"
                : isNearLimit
                  ? "text-yellow-600"
                  : "text-gray-500"
            }`}>
            {content.length}/{maxLength}
          </span>
        </div>

        <Textarea
          content={content}
          onContentChange={setContent}
          maxLength={maxLength}
          placeholder="게시글 내용을 작성하세요..."
          className={isNearLimit ? "border-yellow-400" : ""}
        />

        {isNearLimit && (
          <p
            className={`text-sm ${
              isAtLimit ? "text-red-500" : "text-yellow-600"
            }`}>
            {isAtLimit
              ? "글자 수 제한에 도달했습니다!"
              : "글자 수 제한에 가까워지고 있습니다."}
          </p>
        )}
      </div>
    )
  },
}

// 다중 텍스트에어리어
export const MultipleTextareas: Story = {
  render: () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [notes, setNotes] = useState("")

    return (
      <div className="w-96 space-y-6">
        <h3 className="text-lg font-semibold">프로젝트 정보</h3>

        <div>
          <label className="mb-2 block text-sm font-medium">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="프로젝트 제목을 입력하세요"
            className="w-full rounded-xl border-2 border-gray-200 p-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">설명</label>
          <Textarea
            content={description}
            onContentChange={setDescription}
            maxLength={200}
            placeholder="프로젝트에 대한 간단한 설명을 작성하세요..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">추가 메모</label>
          <Textarea
            content={notes}
            onContentChange={setNotes}
            maxLength={500}
            placeholder="추가적인 메모나 특이사항을 작성하세요..."
          />
        </div>

        <button className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          저장하기
        </button>
      </div>
    )
  },
}
