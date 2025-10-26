import { ComponentPropsWithoutRef } from 'react'

export type SectionHeadingProps = {
  title: string
  description?: string
  eyebrow?: string
  align?: 'left' | 'center'
} & ComponentPropsWithoutRef<'header'>

const alignmentMap: Record<'left' | 'center', string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
}

function SectionHeading({
  title,
  description,
  eyebrow,
  align = 'left',
  className = '',
  ...props
}: SectionHeadingProps): JSX.Element {
  return (
    <header
      className={`flex flex-col gap-3 ${alignmentMap[align]} ${className}`.trim()}
      {...props}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {description ? (
        <p className="max-w-xl text-base text-slate-600 md:text-lg">{description}</p>
      ) : null}
    </header>
  )
}

export default SectionHeading
