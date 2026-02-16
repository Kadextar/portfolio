"use client";

const size = 20;
const baseClass = "flex-shrink-0";

/** Brand-colored SVG icons — official colors */
export function IconReact() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={baseClass}>
      <ellipse cx="12" cy="12" rx="3" ry="10" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="10" ry="3" stroke="#61DAFB" strokeWidth="1.2" />
      <path d="M5.6 5.6a10 10 0 0112.8 12.8M5.6 18.4a10 10 0 0012.8-12.8" stroke="#61DAFB" strokeWidth="1.2" />
    </svg>
  );
}

export function IconTypeScript() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#3178C6" className={baseClass}>
      <path d="M3 3h18v18H3V3zm10.5 10.5v3H12v-3h1.5zm3-1.5v4.5H15V12h1.5zM6 9v1.5h4.5V12H6v1.5h4.5V15H6v1.5h6V9H6z" />
    </svg>
  );
}

export function IconNext() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" className={baseClass}>
      <path d="M18.972 9.703a.75.75 0 00-1.063-.014l-6.5 6.5a.75.75 0 000 1.06l6.5 6.5a.75.75 0 101.062-1.06l-5.97-5.97 5.97-5.97a.75.75 0 00.014-1.062zm-13.944 0a.75.75 0 011.062-.014l6.5 6.5a.75.75 0 010 1.06l-6.5 6.5a.75.75 0 11-1.062-1.06l5.97-5.97-5.97-5.97a.75.75 0 00-.014-1.062z" />
    </svg>
  );
}

export function IconTailwind() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#06B6D4" className={baseClass}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

export function IconNode() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#339933" className={baseClass}>
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 00.272 0l8.795-5.076a.277.277 0 00.136-.239V6.921a.283.283 0 00-.137-.242l-8.791-5.072a.278.278 0 00-.271 0L3.075 6.68a.284.284 0 00-.139.241v10.15c0 .104.054.199.139.256l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.255-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a2.822 2.822 0 01-1.385-2.44V6.921c0-1.012.539-1.945 1.389-2.442l8.795-5.082a2.824 2.824 0 012.774 0l8.794 5.082c.853.497 1.387 1.43 1.387 2.442v9.315c0 1.012-.534 1.945-1.386 2.441l-8.795 5.078a2.825 2.825 0 01-1.852.661z" />
    </svg>
  );
}

export function IconGit() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#F05032" className={baseClass}>
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.924-.309 1.988-.092 2.706.626.721.72.94 1.785.627 2.717l2.659 2.658c.603-.604.603-1.582 0-2.187zM8.295 7.516c-.235-.235-.371-.544-.371-.874 0-.328.136-.638.371-.874.234-.235.545-.371.874-.371.328 0 .639.136.874.371.235.236.371.545.371.874 0 .33-.136.639-.371.874a1.238 1.238 0 01-.874.371 1.238 1.238 0 01-.874-.371z" />
    </svg>
  );
}

export function IconExcel() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#217346" className={baseClass}>
      <path d="M21.17 2.06A13.1 13.1 0 0019 1.87H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-.83-2.94zM15 15H9v-2h6v2zm0-4H9V9h6v2zm0-4H9V5h6v2z" />
    </svg>
  );
}

export function IconChart() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#E34F26" className={baseClass}>
      <path d="M4 18v-6h4v6H4zm6 0V8h4v10h-4zm6 0V4h4v14h-4z" />
    </svg>
  );
}

export function IconPython() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={baseClass}>
      <path fill="#3776AB" d="M12 2c-2 0-3.5.8-4.5 2.2C6.5 5.5 6 7.2 6 9.2v1.6h6V9c0-.6.5-1 1-1s1 .4 1 1v1.4c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6H6.2c-.5 0-1 .2-1.4.6-.4.4-.6.9-.6 1.4v2.8c0 .5.2 1 .6 1.4.4.4.9.6 1.4.6h1.4v-1.2c0-1 .8-1.8 1.8-1.8h4.4c.8 0 1.5.3 2 .8.5.5.8 1.2.8 2v2c0 .8-.3 1.5-.8 2-.5.5-1.2.8-2 .8H9.4c-.4 0-.8.3-.8.8v1.6c0 .4.3.8.8.8h2.2c1 0 2-.4 2.7-1 .7-.7 1.1-1.6 1.1-2.7v-2c0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6h2.2c1 0 2-.4 2.7-1 .7-.7 1.1-1.6 1.1-2.7V6.2c0-1.1-.4-2-1.1-2.7C14 2.8 13.1 2.4 12 2.4 12 2 12 2 12 2z" />
      <path fill="#FFD43B" d="M8.2 7.4c0 .4.3.7.7.7s.7-.3.7-.7-.3-.7-.7-.7-.7.3-.7.7zm7.2 9.2c0 .4.3.7.7.7s.7-.3.7-.7-.3-.7-.7-.7-.7.3-.7.7z" />
    </svg>
  );
}

export function IconFastAPI() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={baseClass}>
      <path d="M12 4L4 20h4l4-8 4 8h4L12 4z" fill="#009688" />
    </svg>
  );
}

export function IconVercel() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" className={baseClass}>
      <path d="M24 22H0L12 2l12 20zm-12-4.5L19.5 20h-15L12 17.5z" />
    </svg>
  );
}

export function IconFigma() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={baseClass}>
      <path fill="#F24E1E" d="M8 3H6v5H4V3H2v8h6V3zm0 6H2v5h6V9zm0 6H2v4h4v-4H8z" />
      <path fill="#A259FF" d="M14 3h-2v5h2V3zm0 6h-2v5h2V9zm0 6h-2v4h2v-4z" />
      <path fill="#1ABCFE" d="M20 3h-2v5h2V3zm0 6h-2v5h2V9zm0 6h-2v4h2v-4z" />
      <path fill="#0ACF83" d="M14 9h2v6h-2V9z" />
    </svg>
  );
}

export function IconGitHub() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#e6edf3" className={baseClass}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

export function IconSlack() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={baseClass}>
      <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 01-2.528 2.527 2.528 2.528 0 010-5.055h2.528v2.528zM6.313 15.165a2.527 2.527 0 015.055 0v6.313A2.527 2.527 0 116.313 21.478v-6.313zM8.835 5.042a2.528 2.528 0 012.528-2.528 2.528 2.528 0 010 5.055H8.835V5.042zM8.835 6.313a2.528 2.528 0 010 5.055H2.528a2.528 2.528 0 010-5.055h6.307zM18.956 8.835a2.528 2.528 0 012.528-2.528 2.528 2.528 0 010 5.055h-2.528V8.835zM17.685 8.835a2.527 2.527 0 01-5.055 0V2.528a2.527 2.527 0 115.055 0v6.307zM15.163 18.956a2.528 2.528 0 01-2.528 2.528 2.528 2.528 0 010-5.055h2.528v2.527zM15.163 17.685a2.527 2.527 0 010-5.055h6.307a2.527 2.527 0 110 5.055h-6.307z" />
    </svg>
  );
}

export function IconOffice() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D83B01" className={baseClass}>
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
    </svg>
  );
}

export function IconHotel() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.6" className={baseClass}>
      <path d="M4 20V8l8-4 8 4v12M4 12h16M9 20v-6h6v6" />
    </svg>
  );
}

export function IconFramer() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0055FF" className={baseClass}>
      <path d="M4 4h16v6H10l6 6H4V4zm10 10h6v6h-6v-6z" />
    </svg>
  );
}

export function IconNotion() {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" className={baseClass}>
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.56-1.967-.466L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.934-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.7c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.934-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.094-.187 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM2.215 2.25v13.68c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V1.387c0-.606-.233-.934-.748-.887L2.962 1.447c-.56.047-.747.327-.747.934z" />
    </svg>
  );
}

const stackIcons: Record<string, () => JSX.Element> = {
  stack1: IconReact,
  stack2: IconTypeScript,
  stack3: IconNext,
  stack4: IconTailwind,
  stack5: IconNode,
  stack6: IconGit,
  stack7: IconExcel,
  stack8: IconChart,
  stack9: IconPython,
  stack10: IconFastAPI,
};

const toolIcons: Record<string, () => JSX.Element> = {
  tools1: IconVercel,
  tools2: IconFigma,
  tools3: IconGitHub,
  tools4: IconSlack,
  tools5: IconOffice,
  tools6: IconHotel,
  tools7: IconFramer,
  tools8: IconNotion,
};

export function StackIcon({ id }: { id: string }) {
  const Icon = stackIcons[id];
  return Icon ? <Icon /> : null;
}

export function ToolIcon({ id }: { id: string }) {
  const Icon = toolIcons[id];
  return Icon ? <Icon /> : null;
}
