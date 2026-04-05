import { FadeIn } from '../site/FadeIn'

function isHeading(block) {
  if (!block || block.length > 76 || block.includes('.') || block.includes(':')) {
    return false
  }

  const words = block.split(/\s+/).filter(Boolean)
  return words.length > 0 && words.length <= 9
}

function renderBulletList(lines, key) {
  return (
    <ul key={key} className="grid gap-2">
      {lines.map((line, index) => (
        <li
          key={index}
          className="text-[1.8rem] leading-[2.6rem] text-muted before:mr-4 before:text-secondary before:content-['•']"
        >
          {line.replace(/^•\s*/, '')}
        </li>
      ))}
    </ul>
  )
}

function renderBlock(block, index) {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const isBulletList = lines.every((line) => line.startsWith('•'))

  if (isBulletList) {
    return renderBulletList(lines, index)
  }

  if (lines.length === 1 && isHeading(lines[0])) {
    return (
      <h3 key={index} className="font-display text-[clamp(2.6rem,3.2vw,4rem)] leading-[1] text-text">
        {lines[0]}
      </h3>
    )
  }

  return (
    <p key={index} className="whitespace-pre-line text-[1.8rem] leading-[2.6rem] text-muted">
      {lines.join('\n')}
    </p>
  )
}

export function BrochureTextBlock({ title, content }) {
  const blocks = content
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean)

  return (
    <FadeIn as="section" className="border border-border text-white bg-surface p-6 md:p-10" duration={0.5}>
      <h2 className="font-display text-[clamp(3.2rem,4.5vw,5.6rem)] leading-[0.95] text-text">{title}</h2>
      <div className="mt-6 grid gap-4">
        {blocks.map((block, index) => (
          <FadeIn key={index} as="div" delay={0.05 + index * 0.05} duration={0.35}>
            {renderBlock(block, index)}
          </FadeIn>
        ))}
      </div>
    </FadeIn>
  )
}
