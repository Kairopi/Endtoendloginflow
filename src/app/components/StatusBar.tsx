// Real PWA uses the device status bar; render a zero-height safe-area spacer.
export function StatusBar(_props: { light?: boolean }) {
  return <div style={{ height: 'max(env(safe-area-inset-top, 0px), 0px)', width: '100%', flexShrink: 0 }} />;
}
