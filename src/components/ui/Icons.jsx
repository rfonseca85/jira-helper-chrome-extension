/**
 * Collection of SVG icon components
 */

/**
 * Home icon
 * @returns {JSX.Element} Home icon SVG
 */
export const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

/**
 * Settings icon
 * @returns {JSX.Element} Settings icon SVG
 */
export const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
  </svg>
);

/**
 * Plus icon
 * @returns {JSX.Element} Plus icon SVG
 */
export const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

/**
 * Generate icon
 * @returns {JSX.Element} Generate icon SVG
 */
export const GenerateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20M2 12h20" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

/**
 * Jira logo
 * @returns {JSX.Element} Jira logo SVG
 */
export const JiraLogo = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.5 0H11.5C11.5 3 14 5.5 17 5.5H18.75V7.25C18.75 10.25 21.25 12.75 24.25 12.75V1.75C24.25 0.75 23.5 0 23.5 0Z"
      fill="#2684FF"
    />
    <path
      d="M17.5 6H5.5C5.5 9 8 11.5 11 11.5H12.75V13.25C12.75 16.25 15.25 18.75 18.25 18.75V7.75C18.25 6.75 17.5 6 17.5 6Z"
      fill="#2684FF"
    />
    <path
      d="M11.5 12H0C0 15 2.5 17.5 5.5 17.5H7.25V19.25C7.25 22.25 9.75 24.75 12.75 24.75V13.75C12.75 12.75 12 12 11.5 12Z"
      fill="#2684FF"
    />
  </svg>
);
