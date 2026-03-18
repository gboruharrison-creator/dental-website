import { useState } from "react";
import { useTranslation } from "react-i18next";
import { blogPosts } from "../../data/blogPosts";
import SEOHead from "../../components/SEOHead";

const categories = ["All", "Oral Health", "Orthodontics", "Cosmetic", "Emergency", "Implants", "Children"];

export default function Blog() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePost, setActivePost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (activePost) {
    return (
      <div>
        <SEOHead
          title={activePost.title}
          description={activePost.excerpt}
          canonical="/blog"
        />
        <section className="bg-gradient-to-br from-primary to-[#0d4f6b] text-white section-padding">
          <div className="container-max">
            <button
              onClick={() => setActivePost(null)}
              className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 text-sm"
            >
              {t("blog.back")}
            </button>
            <span className="inline-block bg-accent/20 border border-accent/40 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              {activePost.category}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 max-w-3xl leading-tight">{activePost.title}</h1>
            <div className="flex items-center gap-4 text-blue-200 text-sm">
              <span>{activePost.date}</span>
              <span>·</span>
              <span>{activePost.readTime}</span>
            </div>
          </div>
        </section>

        <section className="section-padding bg-light">
          <div className="container-max">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <img src={activePost.image} alt={activePost.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  <p className="text-gray-600 leading-relaxed text-base mb-6">{activePost.content}</p>
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
                    {activePost.tags.map((tag) => (
                      <span key={tag} className="bg-card text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">{t("blog.writtenBy")}</p>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face"
                      alt="Dr. Sarah Mitchell"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-dark text-sm">Dr. Sarah Mitchell</p>
                      <p className="text-gray-400 text-xs">Principal Dentist & Founder</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">{t("blog.relatedArticles")}</p>
                  <div className="space-y-4">
                    {blogPosts.filter((p) => p.id !== activePost.id).slice(0, 3).map((post) => (
                      <button
                        key={post.id}
                        onClick={() => { setActivePost(post); window.scrollTo(0, 0); }}
                        className="flex gap-3 text-left w-full group"
                      >
                        <img src={post.image} alt={post.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-dark group-hover:text-primary transition-colors leading-snug">{post.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{post.readTime}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-primary rounded-2xl p-6 text-white text-center">
                  <p className="text-2xl mb-2">🦷</p>
                  <h3 className="font-bold mb-2">{t("blog.readyToBook")}</h3>
                  <p className="text-blue-100 text-sm mb-4">{t("blog.freeConsultations")}</p>
                  <a href="/contact" className="block bg-accent hover:opacity-90 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all">
                    {t("blog.bookNow")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <SEOHead
        title="Dental Tips & Advice Blog"
        description="Expert dental advice, treatment guides and oral health tips from the BrightSmile specialist team."
        canonical="/blog"
      />

      <section className="bg-gradient-to-br from-primary to-[#0d4f6b] text-white section-padding">
        <div className="container-max text-center">
          <span className="inline-block bg-accent/20 border border-accent/40 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            {t("blog.heroBadge")}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("blog.heroTitle")}</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">{t("blog.heroSubtitle")}</p>
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder={t("blog.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 rounded-xl px-5 py-3 pr-12 focus:outline-none focus:border-accent transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-200">🔍</span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container-max">

          {activeCategory === "All" && !searchQuery && (
            <div
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 mb-10 cursor-pointer group"
              onClick={() => setActivePost(blogPosts[0])}
            >
              <div className="grid md:grid-cols-2">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ minHeight: "280px" }}
                />
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">{blogPosts[0].category}</span>
                    <span className="text-xs text-gray-400">{t("blog.featured")}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors leading-snug">{blogPosts[0].title}</h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{blogPosts[0].date}</span>
                    <span className="text-primary font-medium group-hover:underline">{t("blog.readMore")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border " +
                  (activeCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary")
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-dark mb-2">{t("blog.noResults")}</h3>
              <p className="text-gray-500">{t("blog.noResultsSub")}</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                {t("blog.clearFilters")}
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col"
                >
                  <div className="overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-accent text-xs font-semibold uppercase tracking-wider">{post.category}</span>
                    <h3 className="font-bold text-dark mt-2 mb-2 leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="bg-gradient-to-br from-primary to-[#0d4f6b] rounded-3xl p-10 md:p-14 text-center text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">{t("blog.newsletter")}</h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">{t("blog.newsletterSub")}</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("blog.emailPlaceholder")}
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="bg-accent hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap">
                {t("blog.subscribe")}
              </button>
            </div>
            <p className="text-blue-200 text-xs mt-4">{t("blog.subscriberCount")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}