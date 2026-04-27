import { Masonry } from 'antd'

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
          data-ani-copy
          className="text-[0.9rem] leading-[1.62] text-[#4f4a41] before:mr-3 before:text-[#9a80b0] before:content-['•']"
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
      <h3
        key={index}
        data-ani-heading
        className="text-[1.35rem] leading-[1.08] text-[#171c16] underline underline-offset-2 sm:text-[1.55rem]"
      >
        {lines[0]}
      </h3>
    )
  }

  return (
    <p key={index} data-ani-copy className="whitespace-pre-line text-[0.9rem] leading-[1.65] text-[#4f4a41]">
      {lines.join('\n')}
    </p>
  )
}

export function BrochureTextBlock({ title, content }) {
  const blocks = content
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean)
  const blockItems = blocks.map((block, index) => ({
    key: `${title}-${index}`,
    children: (
      <article
        data-float={index % 3 === 0 ? 'true' : undefined}
        className="group relative overflow-hidden rounded-[1.15rem] bg-[#faf5ff] px-4 py-4 shadow-[0_14px_30px_-28px_rgba(31,34,26,0.56)]"
      >
        {renderBlock(block, index)}
      </article>
    ),
  }))

  return (
    <section data-ani-section className="mx-auto w-full max-w-[1220px] space-y-5 px-3 sm:px-5 lg:px-0">
      <div className="rounded-[1.6rem] bg-[#f1e8f8] p-5 shadow-[0_22px_42px_-34px_rgba(22,26,19,0.56)] sm:p-7">
        <h2 data-ani-heading className="text-[1.85rem] leading-[1.04] text-[#171c16] sm:text-[2.2rem]">
          {title}
        </h2>
        <div className="mt-5">
          <Masonry
            fresh
            columns={{ xs: 1, sm: 2, lg: 3 }}
            gutter={{ xs: 12, sm: 14, md: 16, lg: 18 }}
            items={blockItems}
          />
        </div>
      </div>
    </section>
  )
}
