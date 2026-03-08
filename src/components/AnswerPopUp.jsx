import { useTheme } from "../context/ThemeContext"

export default function AnswerPopup({ isOpen, answer }) {
  const { isDarkMode } = useTheme()

  if (!isOpen) return null

  const colors = {
    card: isDarkMode ? "bg-black/90" : "bg-white",
    border: isDarkMode ? "border-[#7BFF6C]/30" : "border-slate-300",
    accent: isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]",
    backdrop: "bg-black/70"
  }

  return (
    <div className={`fixed inset-0 ${colors.backdrop} flex items-center justify-center z-50`}>
      <div
        className={`w-[90%] max-w-md rounded-2xl border-2 ${colors.border} ${colors.card} p-6 text-center shadow-2xl`}
      >
        <h2 className={`text-lg font-goldman mb-4 ${colors.accent}`}>
          ROUND OVER
        </h2>

        <p className={`text-sm mb-2 ${colors.accent}`}>
          The correct answer was:
        </p>

        <p className={`text-2xl font-bold font-mono ${colors.accent}`}>
          {answer}
        </p>
      </div>
    </div>
  )
}