import { z } from 'zod'

export const FEEDBACK_RATINGS = [
  'very-helpful',
  'helpful',
  'not-helpful',
  'confusing'
] as const

export type FeedbackRating = typeof FEEDBACK_RATINGS[number]

export interface FeedbackOption {
  emoji: string
  label: string
  value: FeedbackRating
  score: number
}

export const FEEDBACK_OPTIONS: FeedbackOption[] = [
  { emoji: '🤩', label: 'Очень полезно', value: 'very-helpful', score: 4 },
  { emoji: '🙂', label: 'Полезно', value: 'helpful', score: 3 },
  { emoji: '☹️', label: 'Не полезно', value: 'not-helpful', score: 2 },
  { emoji: '😰', label: 'Непонятно', value: 'confusing', score: 1 }
]

export interface FeedbackSubmission {
  rating: FeedbackRating
  feedback?: string
  path: string
  title: string
  stem: string
}

export type FeedbackItem = FeedbackSubmission & {
  id: number
  updatedAt: Date
  createdAt: Date
  country?: string
}

export type PageAnalytic = {
  path: string
  total: number
  positive: number
  negative: number
  averageScore: number
  positivePercentage: number
  feedback: FeedbackItem[]
  lastFeedback: FeedbackItem
  createdAt: Date
  updatedAt: Date
}

export const feedbackSchema = z.object({
  rating: z.enum(FEEDBACK_RATINGS),
  feedback: z.string().optional(),
  path: z.string(),
  title: z.string(),
  stem: z.string()
})

export const feedbackFormSchema = z.object({
  rating: z.enum(FEEDBACK_RATINGS).nullable(),
  feedback: z.string().refine((val) => {
    const trimmed = val.trim()
    return trimmed === '' || trimmed.length >= 10
  }, {
    message: 'Укажите не менее 10 символов или оставьте поле пустым'
  })
})

export type FeedbackInput = z.infer<typeof feedbackSchema>
