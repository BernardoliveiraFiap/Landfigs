import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function StrokeIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

export function IconCart(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </StrokeIcon>
  )
}

export function IconPlus(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2.5} {...props}>
      <path d="M12 5v14M5 12h14" />
    </StrokeIcon>
  )
}

export function IconMinus(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2.5} {...props}>
      <path d="M5 12h14" />
    </StrokeIcon>
  )
}

export function IconX(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </StrokeIcon>
  )
}

export function IconTrash(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v6M14 11v6" />
    </StrokeIcon>
  )
}

export function IconShield(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </StrokeIcon>
  )
}

export function IconTruck(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35a1 1 0 0 0-.78-.38H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </StrokeIcon>
  )
}

export function IconChat(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </StrokeIcon>
  )
}

export function IconTag(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r="0.5" fill="currentColor" />
    </StrokeIcon>
  )
}

export function IconStar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2l2.9 6.26 6.6.57-5 4.36 1.5 6.45L12 16.9l-6 3.74 1.5-6.45-5-4.36 6.6-.57L12 2z" />
    </svg>
  )
}

export function IconSearch(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </StrokeIcon>
  )
}

export function IconArrowRight(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </StrokeIcon>
  )
}

export function IconChevronLeft(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2.5} {...props}>
      <path d="m15 18-6-6 6-6" />
    </StrokeIcon>
  )
}

export function IconChevronRight(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2.5} {...props}>
      <path d="m9 18 6-6-6-6" />
    </StrokeIcon>
  )
}

export function IconStadium(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 20h18" />
      <path d="M5 20v-6a7 7 0 0 1 14 0v6" />
      <path d="M9 20v-4a3 3 0 0 1 6 0v4" />
    </StrokeIcon>
  )
}

export function IconBadgeCheck(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5.5" />
    </StrokeIcon>
  )
}

export function IconTrophy(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M8 21h8M12 17v4" />
      <path d="M17 3H7v5a5 5 0 0 0 10 0V3Z" />
      <path d="M7 5H4a3 3 0 0 0 3 5M17 5h3a3 3 0 0 1-3 5" />
    </StrokeIcon>
  )
}
