import { Masonry } from 'antd'

export function EditorialSplitSection({ section, reverse = false }) {
  const imageItem = {
    key: `${section.title}-image`,
    children: (
      <figure className="overflow-hidden rounded-[1.55rem] bg-[#f6f1e5] shadow-[0_18px_38px_-32px_rgba(22,28,20,0.6)]">
        <img data-ani-image src={section.image} alt={section.title} className="h-[21rem] w-full object-cover md:h-[28rem]" />
      </figure>
    ),
  }

  const contentItem = {
    key: `${section.title}-copy`,
    children: (
      <article
        data-float
        className="flex min-h-[21rem] flex-col justify-center rounded-[1.55rem] bg-[#f9f4ea] p-5 shadow-[0_20px_42px_-34px_rgba(23,28,20,0.56)] sm:p-7"
      >
        <p data-ani-copy className="text-[0.7rem] uppercase tracking-[0.16em] text-[#5f584d]">
          {section.eyebrow}
        </p>
        <h3 data-ani-heading className="mt-2 text-[1.85rem] leading-[1.04] text-[#171c16] sm:text-[2.2rem]">
          {section.title}
        </h3>
        <p data-ani-copy className="mt-4 max-w-[34rem] text-[0.9rem] leading-[1.65] text-[#4f4a41]">
          {section.body}
        </p>
      </article>
    ),
  }

  const masonryItems = reverse ? [contentItem, imageItem] : [imageItem, contentItem]

  return (
    <section data-ani-section className="rounded-[1.6rem] bg-[#f4eee2] p-3 shadow-[0_20px_44px_-38px_rgba(17,23,16,0.58)] sm:p-4">
      <Masonry fresh columns={{ xs: 1, md: 2 }} gutter={{ xs: 12, sm: 14, md: 16 }} items={masonryItems} />
    </section>
  )
}
