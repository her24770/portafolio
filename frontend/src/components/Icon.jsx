export default function Icon({ name, width = 18, height = 18, ...props }) {
  const paths = {
    linkedin: <path d="M4.98 3.5A2 2 0 1 1 1 3.5a2 2 0 0 1 3.98 0zM.5 8h4V23h-4V8zM8 8h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23H8V8z" fill="currentColor" stroke="none" />,
    github:   <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.52.1.71-.23.71-.5l-.01-1.96c-2.92.63-3.54-1.25-3.54-1.25-.48-1.22-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.07 1.61 1.09 1.61 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.34.1-2.78 0 0 .88-.28 2.88 1.07a9.9 9.9 0 0 1 5.24 0c2-1.35 2.88-1.07 2.88-1.07.57 1.44.21 2.51.1 2.78.68.74 1.08 1.67 1.08 2.82 0 4.02-2.45 4.9-4.79 5.16.38.33.71.97.71 1.96l-.01 2.9c0 .28.19.61.72.5A10.5 10.5 0 0 0 12 1.5z" fill="currentColor" stroke="none" />,
    mail:     <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.5 6 8.5 6 8.5-6"/></g>,
    doc:      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2.5h7l5 5v14a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0z"/><path d="M13 2.5V8h5"/><path d="M9 13h6M9 17h6"/></g>,
    arrow:    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></g>,
    arrowup:  <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V4"/><path d="m6 11 6-6 6 6"/></g>,
    moon:     <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></g>,
    sun:      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></g>,
  }
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  )
}
