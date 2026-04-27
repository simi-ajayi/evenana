import { Masonry } from 'antd'

export function ContentHighlights({ items = [] }) {
  const highlightItems = items.map((item, index) => ({
    key: `highlight-${index}-${item.slice(0, 12)}`,
    children: (
      <article
        data-float={index % 3 === 0 ? 'true' : undefined}
        className="rounded-[1.3rem] bg-[#f5edf9] px-4 py-4 shadow-[0_14px_36px_-30px_rgba(29,35,26,0.58)] sm:px-5"
      >
        <p
          data-ani-copy
          className="text-[0.88rem] leading-[1.62] text-[#2f332d] before:mr-3 before:text-[#9a80b0] before:content-['•']"
        >
          {item}
        </p>
      </article>
    ),
  }))

  return (
    <section
      data-ani-section
      className="rounded-[1.6rem] bg-[radial-gradient(circle_at_top,#f7f0fc_0%,#efe6f7_55%,#e8daf1_100%)] p-5 shadow-[0_24px_44px_-38px_rgba(17,23,16,0.62)] sm:p-7"
    >
      <p data-ani-copy className="text-[0.72rem] uppercase tracking-[0.16em] text-[#5f584d]">
        Highlights
      </p>
      <h2 data-ani-heading className="mt-2 text-[1.9rem] leading-[1.04] text-[#171c16] sm:text-[2.2rem]">
        Designed Around Your Wellness Rhythm
      </h2>
      <div className="mt-5">
        <Masonry
          fresh
          columns={{ xs: 1, sm: 2, lg: 3 }}
          gutter={{ xs: 12, sm: 14, md: 16, lg: 18 }}
          items={highlightItems}
        />
      </div>
    </section>
  )
}
