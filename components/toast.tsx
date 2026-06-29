export interface ToastProps {
  message: string
  visible: boolean
  onClose: () => void
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 bg-white rounded-3xl px-5 py-3 shadow-lg"
      style={{
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
      }}
      onAnimationEnd={onClose}
    >
      <p className="text-sm text-[#1B2D4F] font-medium">{message}</p>
    </div>
  )
}
