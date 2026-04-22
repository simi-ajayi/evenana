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
          className="text-xl leading-[2.6rem] text-muted before:mr-4 before:text-secondary before:content-['•']"
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
      <h3 key={index} className="font-display underline-offset-2 underline text-3xl leading-[1] text-text">
        {lines[0]}
      </h3>
    )
  }

  return (
    <p key={index} className="whitespace-pre-line text-xl leading-[2.6rem] text-muted">
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
    <FadeIn as="section" className="  p-6 md:p-28" duration={0.5}>
      <div className='bg-surface p-20'>
        <h2 className="font-display text-6xl w-full leading-[0.95] text-text">
          {title}
        </h2>
   <div className="mt-6 grid gap-3">
  {blocks.map((block, index) => (
    <FadeIn key={index} as="div" delay={0.05 + index * 0.05} duration={0.35}>
      <div className="group relative overflow-hidden  bg-surface px-6  transition-all duration-200 hover:translate-x-0.5 hover:border-secondary hover:bg-surface-strong">
  
        <span className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-secondary transition-transform duration-200 group-hover:scale-y-100" />

        {/* Index badge */}
        {/* <span className="absolute right-5 top-5 font-mono text-[10px] tracking-wide text-muted">
          {String(index + 1).padStart(2, '0')}
        </span> */}

        {renderBlock(block, index)}
      </div>
    </FadeIn>
  ))}
</div>
      </div>
    </FadeIn>
  );
}
