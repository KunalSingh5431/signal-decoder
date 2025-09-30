type Props = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export default function ThemeToggle({ theme, toggleTheme }: Props) {
  return (
    <button
      className={`theme-toggle ${theme === "dark" ? "is-dark" : "is-light"}`}
      onClick={toggleTheme}
      aria-label="Toggle light / dark theme"
      aria-pressed={theme === "dark"}
      title="Toggle theme"
    >
      <span className="toggle-track" />
    </button>
  );
}
