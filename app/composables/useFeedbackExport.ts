export function useFeedbackExport() {
  const toast = useToast()

  function formatDateForCSV(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  function convertToCSV(data: FeedbackItem[]): string {
    if (!data || data.length === 0) {
      return 'Нет данных для экспорта'
    }

    const headers = [
      'ID',
      'Rating',
      'Score',
      'Rating Label',
      'Feedback',
      'Page Path',
      'Page Title',
      'Page Stem',
      'Country',
      'Created At',
      'Updated At'
    ]

    const rows = data.map((item) => {
      const ratingOption = FEEDBACK_OPTIONS.find(opt => opt.value === item.rating)

      return [
        item.id,
        item.rating,
        ratingOption?.score || 0,
        ratingOption?.label || 'Unknown',
        `"${(item.feedback || '').replace(/"/g, '""')}"`, // Escape quotes
        item.path,
        `"${item.title.replace(/"/g, '""')}"`, // Escape quotes
        item.stem,
        item.country || '',
        formatDateForCSV(item.createdAt),
        formatDateForCSV(item.updatedAt)
      ]
    })

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n')

    return csvContent
  }

  function downloadCSV(csvContent: string, filename: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  async function exportFeedbackData(feedbackData: FeedbackItem[]) {
    try {
      const csvContent = convertToCSV(feedbackData)
      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `feedback-export-${timestamp}.csv`

      downloadCSV(csvContent, filename)

      toast.add({
        title: 'Экспорт выполнен',
        description: `${feedbackData.length} отзывов экспортировано в ${filename}`,
        color: 'success',
        icon: 'i-lucide-download'
      })
    } catch (error) {
      console.error('Export failed:', error)
      toast.add({
        title: 'Ошибка экспорта',
        description: 'Не удалось экспортировать данные. Попробуйте позже.',
        color: 'error',
        icon: 'i-lucide-circle-alert'
      })
    }
  }

  async function exportPageAnalytics(pageAnalytics: PageAnalytic[]) {
    try {
      if (!pageAnalytics || pageAnalytics.length === 0) {
        toast.add({
          title: 'Нет данных для экспорта',
          description: 'Нет данных аналитики страниц для экспорта.',
          color: 'warning',
          icon: 'i-lucide-info'
        })
        return
      }

      const headers = [
        'Page Path',
        'Page Title',
        'Total Feedback',
        'Positive Feedback',
        'Negative Feedback',
        'Average Score',
        'Positive Percentage',
        'Created At',
        'Updated At'
      ]

      const rows = pageAnalytics.map(page => [
        page.path,
        `"${page.lastFeedback.title.replace(/"/g, '""')}"`,
        page.total,
        page.positive,
        page.negative,
        page.averageScore,
        page.positivePercentage,
        formatDateForCSV(page.createdAt),
        formatDateForCSV(page.updatedAt)
      ])

      const csvContent = [headers, ...rows]
        .map(row => row.join(','))
        .join('\n')

      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `page-analytics-export-${timestamp}.csv`

      downloadCSV(csvContent, filename)

      toast.add({
        title: 'Экспорт выполнен',
        description: `${pageAnalytics.length} записей аналитики экспортировано в ${filename}`,
        color: 'success',
        icon: 'i-lucide-download'
      })
    } catch (error) {
      console.error('Export failed:', error)
      toast.add({
        title: 'Ошибка экспорта',
        description: 'Не удалось экспортировать аналитику. Попробуйте позже.',
        color: 'error',
        icon: 'i-lucide-circle-alert'
      })
    }
  }

  return {
    exportFeedbackData,
    exportPageAnalytics
  }
}
