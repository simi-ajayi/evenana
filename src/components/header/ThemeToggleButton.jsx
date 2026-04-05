import { useTheme } from '../../hooks/useTheme'

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M12 4.5V3m0 18v-1.5M6.697 6.697 5.636 5.636m12.728 12.728-1.061-1.061M4.5 12H3m18 0h-1.5M6.697 17.303l-1.061 1.061m12.728-12.728 1.061-1.061M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M20.742 13.045a8.25 8.25 0 1 1-9.787-9.787 7.5 7.5 0 1 0 9.787 9.787Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center border border-current/55 p-2 text-current transition-colors hover:border-current"
      aria-label="Toggle light and dark mode"
      title="Toggle theme"
    >
      <ThemeIcon theme={theme} />
    </button>
  )
}
