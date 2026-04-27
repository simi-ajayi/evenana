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
        <li key={index} className="text-[0.9rem] leading-[1.62] text-[#4f4a41] before:mr-3 before:text-[#8f7658] before:content-['•']">
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
      <h3 key={index} className="text-[1.35rem] leading-[1.08] text-[#171c16] underline underline-offset-2 sm:text-[1.55rem]">
        {lines[0]}
      </h3>
    )
  }

  return (
    <p key={index} className="whitespace-pre-line text-[0.9rem] leading-[1.65] text-[#4f4a41]">
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
    <FadeIn as="section" className="mx-auto w-full max-w-[1220px] px-3 sm:px-5 lg:px-0" duration={0.45}>
      <div className="rounded-[1.6rem] border border-[#d9d0c3] bg-[#f8f5ef] p-5 sm:p-7">
        <h2 className="text-[1.85rem] leading-[1.04] text-[#171c16] sm:text-[2.2rem]">{title}</h2>
        <div className="mt-5 grid gap-3">
          {blocks.map((block, index) => (
            <FadeIn key={index} as="div" delay={0.04 + index * 0.04} duration={0.32}>
              <div className="group relative overflow-hidden rounded-xl border border-[#d7ccbc] bg-[#fdfaf4] px-4 py-3 transition-all duration-200 hover:border-[#b39570]">
                <span className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-[#8f7658] transition-transform duration-200 group-hover:scale-y-100" />
                {renderBlock(block, index)}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
