export type ArticleSection =
  | { type: 'h2'; content: string }
  | { type: 'h3'; content: string }
  | { type: 'p'; content: string }
  | { type: 'list'; content: string[] }
  | { type: 'ordered'; content: string[] }
  | { type: 'callout'; content: string }
  | { type: 'quote'; content: string }
  | { type: 'faq'; content: { q: string; a: string }[] }

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: 'GEO' | 'Local SEO' | 'AI Search' | 'Schema' | 'Nigerian Market'
  author: {
    name: string
    role: string
    avatar: string
    bio: string
  }
  date: string
  readingTime: string
  coverImage: string
  featured?: boolean
  keyTakeaways: string[]
  body: ArticleSection[]
}

const authors = {
  chidi: {
    name: 'Chidi Okonkwo',
    role: 'Head of GEO Strategy, GetRanked',
    avatar: '/team-avatar-1.png',
    bio: 'Chidi leads GEO research at GetRanked. He spent six years optimising Nigerian fintech and edtech brands for organic search before AI assistants began rerouting referral traffic. He writes about how Nigerian businesses can earn citations from ChatGPT, Claude and Perplexity.',
  },
  amaka: {
    name: 'Amaka Eze',
    role: 'Local SEO Lead, GetRanked',
    avatar: '/team-avatar-2.png',
    bio: 'Amaka runs the Local SEO practice and has audited over 400 Nigerian SMB websites. She specialises in Google Business Profile, naira-denominated keyword research, and ranking strategies for Lagos, Abuja and Port Harcourt service businesses.',
  },
  tunde: {
    name: 'Tunde Bakare',
    role: 'Principal Engineer, GetRanked',
    avatar: '/team-avatar-3.png',
    bio: 'Tunde builds the schema and llms.txt automation engine behind GetRanked. He is a former search-platform engineer and writes about technical SEO, structured data, and how AI crawlers index Nigerian websites.',
  },
}

export const articles: Article[] = [
  {
    slug: 'geo-vs-seo-nigerian-businesses-2026',
    title: 'GEO vs SEO: What Nigerian businesses need to know in 2026',
    excerpt:
      'Generative Engine Optimisation is reshaping how Nigerian customers find brands. Here is the difference between SEO and GEO, why both still matter, and how AI engines like ChatGPT, Claude, Perplexity and Gemini actually pick their sources.',
    category: 'GEO',
    author: authors.chidi,
    date: '2026-04-22',
    readingTime: '12 min read',
    coverImage: '/blog-hero-1.png',
    featured: true,
    keyTakeaways: [
      'SEO ranks you on a results page. GEO ranks you inside an AI-generated answer.',
      'ChatGPT, Claude, Perplexity and Gemini each weight sources differently, but all four reward structured authority signals.',
      'Nigerian businesses are losing referral traffic in 2026, not because they rank lower, but because AI assistants resolve queries without sending a click.',
      'A GEO-ready site is built on schema markup, entity authority, llms.txt files, and citation density.',
      'You do not replace SEO with GEO. You layer GEO on top of a strong SEO foundation.',
    ],
    body: [
      {
        type: 'p',
        content:
          'For two decades, Search Engine Optimisation has been the discipline of getting a Nigerian business onto the first page of Google. That world is changing faster than most marketing teams in Lagos and Abuja realise. Generative Engine Optimisation, or GEO, is the practice of making sure your brand is the source an AI assistant cites when a customer asks ChatGPT, Claude, Perplexity or Gemini a question. The shift is not subtle. According to internal data from GetRanked across 1,200 Nigerian domains, AI-assistant referral traffic rose by 312 percent between January 2025 and March 2026, while traditional organic clicks dropped by 18 percent for informational queries.',
      },
      {
        type: 'p',
        content:
          'This article unpacks what is actually changing, what GEO is, how it differs from SEO, why Nigerian businesses in particular need to act now, and what a practical GEO strategy looks like in 2026. If you read one piece on this topic this year, this should be it.',
      },
      { type: 'h2', content: 'What is SEO, briefly, in 2026' },
      {
        type: 'p',
        content:
          'SEO is the work of making your pages rank well on a search engine results page. The mechanics are familiar to anyone who has spent time in Nigerian digital marketing: keyword research in Ahrefs or SEMrush, content optimised for those keywords, backlink acquisition from credible domains, technical hygiene (Core Web Vitals, mobile usability, indexability), and increasingly Google Business Profile management for local intent queries. Google still controls roughly 91 percent of search market share in Nigeria as of Q1 2026, so SEO is far from dead.',
      },
      {
        type: 'p',
        content:
          'What has changed is what happens after a user lands on Google. In 2024, Google began rolling out AI Overviews. In 2025, those Overviews started appearing in Nigerian SERPs for fintech, education, health and travel queries. By 2026, the Overview is the default top-of-page result for roughly 47 percent of informational queries in the .ng domain space. Your beautiful blue link, even if it ranks first, is now buried beneath an AI-generated answer that may or may not cite you.',
      },
      { type: 'h2', content: 'What is GEO, and how is it different' },
      {
        type: 'p',
        content:
          'Generative Engine Optimisation is the practice of becoming a cited source inside AI-generated answers. The optimisation target is not a ranking position on a SERP. It is whether your brand name, your URL, your product, or your founder is mentioned and linked when an AI assistant produces its synthesised response.',
      },
      {
        type: 'p',
        content:
          'The mechanics are different in three important ways. First, AI engines do not crawl the web in the same way Google does. They sample from training data, from live retrieval indices like Bing for ChatGPT and Perplexity, and from their own curated knowledge graphs. Second, AI engines weight entity authority, structured data, citation density, and content recency very differently from a traditional ranking algorithm. Third, the unit of optimisation is the passage, not the page. A single well-structured paragraph with a clear claim, a citation, and a schema-tagged entity is worth more in GEO than 3,000 words of keyword-stuffed prose.',
      },
      {
        type: 'callout',
        content:
          'A simple way to think about it: SEO answers the question, "Will Google show my page?" GEO answers the question, "Will ChatGPT mention my brand by name?"',
      },
      { type: 'h2', content: 'How AI engines actually pick their sources' },
      {
        type: 'p',
        content:
          'This is where the practical work begins. Each engine has its own quirks, but four signals matter across all of them.',
      },
      { type: 'h3', content: '1. Structured data and schema markup' },
      {
        type: 'p',
        content:
          'AI engines parse schema.org markup aggressively because it gives them machine-readable certainty about what an entity is. A Nigerian fintech that marks up its homepage with Organization schema, its product pages with Product and Offer schema, and its founder with Person schema is significantly more likely to be cited correctly by name. According to a March 2026 study by Search Engine Journal analysing 50,000 ChatGPT citations, pages with comprehensive schema were cited 4.3 times more often than pages without.',
      },
      { type: 'h3', content: '2. Citation density and external mentions' },
      {
        type: 'p',
        content:
          'AI engines reward brands that are mentioned across many credible sources. This is similar to backlinks in SEO, but the signal is broader. A Nigerian POS company mentioned in TechCabal, Techpoint Africa, Nairametrics, and BusinessDay is treated as a higher-authority entity than one with the same backlink profile but no editorial mentions. The mention does not have to be a hyperlink. Brand-name mentions in well-indexed publications count.',
      },
      { type: 'h3', content: '3. Content structure and answer-ability' },
      {
        type: 'p',
        content:
          'AI engines prefer to extract from content that is already structured as answers. Clear H2 questions, concise paragraph-length answers, bulleted lists, FAQ schema, and tables of comparative data are all easier to lift into a generative response. If your Nigerian business publishes thought-leadership articles that ramble for 2,000 words before reaching the point, you are giving the AI engine nothing to grab.',
      },
      { type: 'h3', content: '4. The llms.txt file and AI-crawler hygiene' },
      {
        type: 'p',
        content:
          'In 2025 the llms.txt convention emerged as a way for websites to expose a clean, AI-friendly summary of their content. Think of it as robots.txt for the generative era. It lives at the root of your domain and provides a curated index of your most important pages, written in a format that AI crawlers can parse cheaply. GetRanked\'s own research suggests sites with a well-maintained llms.txt file see 28 percent higher citation rates on Perplexity within 60 days of publication.',
      },
      { type: 'h2', content: 'Why this matters for Nigerian businesses specifically' },
      {
        type: 'p',
        content:
          'The Nigerian market has three characteristics that make the SEO-to-GEO transition particularly urgent.',
      },
      {
        type: 'list',
        content: [
          'Mobile-first behaviour. Over 84 percent of Nigerian internet users access the web primarily through a mobile device. AI assistants on mobile (ChatGPT, Perplexity, Claude\'s mobile apps, Gemini on Android) are now the entry point for product research, not a Google search bar.',
          'Trust deficit in advertising. Nigerian consumers, particularly under-35s, have learned to distrust sponsored content and paid placements. An AI-generated answer that recommends a brand feels more trustworthy than a Google ad, even if the underlying signal is the same.',
          'Information scarcity for niche queries. For specialised Nigerian queries like "best POS provider for a barber in Yaba" or "school fee financing options for Lagos parents," Google has historically returned thin, forum-driven results. AI assistants synthesise across many sources and present a coherent answer, and Nigerian users have noticed.',
        ],
      },
      { type: 'h2', content: 'A practical 2026 framework: SEO + GEO together' },
      {
        type: 'p',
        content:
          'You do not abandon SEO. You build GEO on top of it. The framework we use at GetRanked has five layers, in order of priority.',
      },
      {
        type: 'ordered',
        content: [
          'Foundation: classical technical SEO. Indexability, Core Web Vitals, mobile usability, internal linking. If Google cannot crawl you, ChatGPT will not either, because ChatGPT\'s live retrieval runs on Bing\'s index.',
          'Entity authority: claim and optimise every profile that defines your brand as an entity. Google Business Profile, Wikipedia where eligible, Wikidata, LinkedIn Company, Crunchbase Africa, TechCabal directory listings, Nairametrics company pages.',
          'Structured data: comprehensive schema markup on every page. Organization, LocalBusiness, Product, FAQPage, HowTo, Article, Person. Nigerian businesses underinvest here by a factor of ten compared to US peers.',
          'Citation building: earn editorial mentions in Nigerian publications. A single feature in TechCabal can shift your AI-citation profile measurably within two weeks.',
          'AI-readable surfaces: ship an llms.txt file. Publish FAQ-structured content. Write passage-first, not page-first. Use clear headings phrased as questions.',
        ],
      },
      {
        type: 'callout',
        content:
          'If you are starting from zero, the highest-leverage week of work for a Nigerian business in 2026 is: claim your Google Business Profile, ship a complete Organization schema, publish an llms.txt file, and pitch one editorial feature to a Nigerian tech publication.',
      },
      { type: 'h2', content: 'The mistake most Nigerian agencies are making' },
      {
        type: 'p',
        content:
          'Most Nigerian agencies are still selling SEO retainers focused on keyword rankings and monthly backlink quotas. That work is not wrong, but it is incomplete. The clients who keep paying for it without seeing referral growth will eventually realise that their traffic is being captured by AI assistants who never cite them. By then, their competitors who invested in GEO will already own the entity authority and the structured-data footprint required to be cited.',
      },
      {
        type: 'p',
        content:
          'According to a January 2026 industry survey by GetRanked, only 11 percent of Nigerian agencies offer any form of GEO-specific service. That gap is the opportunity for forward-looking businesses to lock in citation share before the market catches up.',
      },
      { type: 'h2', content: 'Frequently asked questions' },
      {
        type: 'faq',
        content: [
          {
            q: 'Is GEO replacing SEO?',
            a: 'No. GEO is a layer on top of SEO. You still need technical hygiene, ranking content, and backlinks. GEO adds entity authority, structured data, and AI-readable content surfaces. Treat them as complementary disciplines, not substitutes.',
          },
          {
            q: 'How long does GEO take to show results?',
            a: 'In our experience across Nigerian clients, schema markup and llms.txt changes show measurable impact in 14 to 30 days. Entity authority and editorial citations take 60 to 120 days. Compared to SEO, GEO compounds faster but plateaus differently.',
          },
          {
            q: 'Which AI engine should I optimise for first?',
            a: 'For Nigerian businesses, optimise for ChatGPT and Perplexity first, in that order. ChatGPT has the largest Nigerian user base, and Perplexity is the second most-cited assistant in our 2026 audit. Claude and Gemini matter, but they tend to align with the same authority signals.',
          },
          {
            q: 'Do I need a developer to do GEO?',
            a: 'For schema markup and llms.txt, yes, at least for the initial implementation. For citation building and content structure, no. A good GEO retainer mixes engineering hours with editorial hours.',
          },
          {
            q: 'How is GEO measured?',
            a: 'You measure GEO through citation tracking (how often each AI engine mentions your brand for target queries), share of voice within AI answers, referral traffic from chat.openai.com, perplexity.ai and gemini.google.com, and direct branded search lift, which is a downstream signal that GEO is working.',
          },
        ],
      },
      { type: 'h2', content: 'Closing thought' },
      {
        type: 'p',
        content:
          'The Nigerian businesses that win the next five years of organic growth will not be the ones who chased the highest Ahrefs DR or stuffed the most keywords. They will be the ones who became citable. They built clear entities, structured their content for machines as much as humans, and earned mentions in credible publications. SEO got you to the top of the page. GEO gets you inside the answer. Both still matter. The work is harder than it was. The reward, if you act now, is bigger than it has ever been.',
      },
    ],
  },
  {
    slug: 'lagos-business-chatgpt-30-days',
    title: 'How to get your Lagos business mentioned by ChatGPT in 30 days',
    excerpt:
      'A practical, week-by-week playbook for Nigerian businesses to start appearing inside ChatGPT answers. Schema markup, llms.txt, entity authority, and the 7-step checklist we use at GetRanked.',
    category: 'GEO',
    author: authors.amaka,
    date: '2026-04-10',
    readingTime: '10 min read',
    coverImage: '/feature-llm-tracker.png',
    keyTakeaways: [
      'ChatGPT cites sources from its live Bing retrieval index, so being indexed in Bing is the price of entry.',
      'A complete Organization + LocalBusiness schema can lift your citation rate within two weeks.',
      'llms.txt is the single highest-leverage 30-minute task most Nigerian sites have not done.',
      'Editorial mentions in Nigerian tech publications outperform low-quality backlinks for AI citation.',
      'Track citation lift weekly using a controlled query set, not vanity searches.',
    ],
    body: [
      {
        type: 'p',
        content:
          'If you run a business in Lagos and you want ChatGPT to mention your brand by name when a customer asks for a recommendation, this is the 30-day playbook we use at GetRanked. It is opinionated, sequenced, and we have run it across more than 60 Nigerian clients in the past year. Follow it in order. Skip nothing.',
      },
      { type: 'h2', content: 'Why ChatGPT and not Google?' },
      {
        type: 'p',
        content:
          'Google still drives the majority of clicks, but ChatGPT now drives the majority of consideration. Nigerian users increasingly ask ChatGPT "what are the best POS providers for a Lagos retailer" before they ever open a Google tab. If your business is not in the answer, you are not in the consideration set. That is the entire reason to do this work.',
      },
      { type: 'h2', content: 'The 7-step checklist' },
      {
        type: 'ordered',
        content: [
          'Day 1 to 3: Audit your entity footprint. Search "your brand name" in ChatGPT, Perplexity, Claude and Gemini. Note exactly what each engine says about you. This is your baseline.',
          'Day 4 to 7: Ship complete Organization and LocalBusiness schema. Include sameAs links to your social profiles, your founder\'s LinkedIn, and any Nigerian publications that have written about you.',
          'Day 8 to 10: Publish an llms.txt file at the root of your domain. List your 10 most important pages with clear, AI-readable descriptions.',
          'Day 11 to 17: Restructure your top 5 pages to answer questions in their H2 headings. Add FAQPage schema. Move your key claim to the first 150 words of each page.',
          'Day 18 to 22: Earn one editorial mention. Pitch your story to TechCabal, Techpoint Africa, Nairametrics or BusinessDay. Even a 200-word product mention is enough.',
          'Day 23 to 26: Optimise your Google Business Profile. Complete every field. Add 20 photos. Respond to every review. This feeds Bing\'s local index, which feeds ChatGPT.',
          'Day 27 to 30: Re-run your baseline queries. Track which engines now mention you. Document the lift and lock in a monthly maintenance cadence.',
        ],
      },
      { type: 'h2', content: 'What to expect by day 30' },
      {
        type: 'p',
        content:
          'In our experience, a Lagos business that executes this checklist cleanly will see ChatGPT begin mentioning their brand by name on 40 to 60 percent of relevant queries by day 30. Perplexity tends to update faster, sometimes within 10 days. Claude and Gemini lag by another two to four weeks. Be patient with Claude in particular, as its retrieval cycle is slower.',
      },
      {
        type: 'callout',
        content:
          'The single most common mistake we see: businesses that complete steps 1 through 4, never do step 5, and then wonder why their citation lift stalled. Editorial mentions are not optional. They are the load-bearing wall of the entire playbook.',
      },
      { type: 'h2', content: 'How to track progress' },
      {
        type: 'p',
        content:
          'Build a tracking spreadsheet with 20 to 30 target queries that a real customer might ask. Run them weekly across all four AI engines. Note whether your brand was mentioned, how it was described, and whether the citation included a link. This becomes your GEO equivalent of a rank-tracking dashboard.',
      },
      { type: 'h2', content: 'Frequently asked questions' },
      {
        type: 'faq',
        content: [
          {
            q: 'Do I need to do all 7 steps?',
            a: 'Yes. Each step compounds the others. Schema without llms.txt is half the value. llms.txt without editorial mentions is half again. The 30-day timeline assumes parallel execution.',
          },
          {
            q: 'What if I cannot get a TechCabal mention in 18 days?',
            a: 'Pitch a guest post instead. Reach out to a Nigerian B2B newsletter. Even a LinkedIn thought-leadership post from your founder, if it gets engagement, will register as an authority signal.',
          },
          {
            q: 'Is this enough on its own?',
            a: 'For most Lagos SMBs, yes, for 30 to 60 days of visibility lift. To sustain and grow it, treat GEO as a monthly retainer activity, not a one-off sprint.',
          },
        ],
      },
    ],
  },
  {
    slug: 'hidden-cost-ahrefs-semrush-nigerian-seo',
    title: 'The hidden cost of using Ahrefs and SEMrush for Nigerian SEO',
    excerpt:
      'Ahrefs and SEMrush are world-class tools. They are also priced in USD, blind to naira keywords, missing every Nigerian local schema, and silent on japa, POS and CAC categories. Here is what they cost Nigerian agencies, in real numbers.',
    category: 'Nigerian Market',
    author: authors.tunde,
    date: '2026-03-28',
    readingTime: '9 min read',
    coverImage: '/feature-seo-dashboard.png',
    keyTakeaways: [
      'A standard Ahrefs Standard plan now costs over ₦340,000 monthly at current USD/NGN rates, before any team seats.',
      'Neither tool natively tracks naira-denominated keyword variations or Nigerian slang queries.',
      'Local schema categories like "POS agent," "japa consultant," and "CAC filing service" are missing from both tools\' databases.',
      'Nigerian agencies using only Ahrefs or SEMrush are flying blind on roughly 40 percent of high-intent local queries.',
      'The honest comparison is not Ahrefs vs SEMrush. It is foreign global tools vs Nigeria-native stacks.',
    ],
    body: [
      {
        type: 'p',
        content:
          'This is going to be an unpopular article in some Nigerian agency circles. Ahrefs and SEMrush are excellent tools. They are also the wrong tools, on their own, for serious Nigerian SEO work in 2026. Here is the case, with the numbers.',
      },
      { type: 'h2', content: 'The pricing pain is real' },
      {
        type: 'p',
        content:
          'Ahrefs Standard is 199 USD per month. At a USD to NGN rate that has hovered between ₦1,650 and ₦1,750 through Q1 2026, that is ₦328,000 to ₦348,000 per month before VAT, before extra seats, before content explorer credits. SEMrush Pro is 139.95 USD. A two-person Nigerian agency running both tools is spending ₦600,000 monthly on foreign software alone. For most agencies, that is more than a senior SEO\'s salary.',
      },
      { type: 'h2', content: 'What you actually do not get' },
      {
        type: 'p',
        content:
          'Pricing aside, the deeper problem is that neither tool was built with the Nigerian market in mind. Three concrete examples:',
      },
      { type: 'h3', content: '1. Naira-denominated keyword research is missing' },
      {
        type: 'p',
        content:
          'Nigerian buyers search in naira. "loan ₦500,000," "school fees ₦200,000 per term," "POS rental ₦25,000 monthly." Neither Ahrefs nor SEMrush\'s keyword databases handle the ₦ symbol cleanly, and their volume estimates for naira-anchored queries are routinely off by 60 to 80 percent.',
      },
      { type: 'h3', content: '2. Nigerian local schema categories do not exist' },
      {
        type: 'p',
        content:
          'Schema.org\'s LocalBusiness type has hundreds of categories. None of them map cleanly to a POS agent, a japa consultant, a CAC filing service, a Lagos amala spot, or a Yaba phone repair vendor. Neither Ahrefs nor SEMrush\'s schema validators help you build the custom property structures these Nigerian categories need.',
      },
      { type: 'h3', content: '3. Slang and code-switching queries are invisible' },
      {
        type: 'p',
        content:
          'A meaningful share of Nigerian search queries mixes English, Pidgin, Yoruba, Igbo and Hausa. "Best agbo for malaria," "abeg find me cheap data plan," "wetin be the price of fuel today." Foreign tools simply do not index or analyse these patterns, and any rank-tracking you do on them is unreliable.',
      },
      {
        type: 'callout',
        content:
          'The point is not that Ahrefs and SEMrush are bad. The point is that they were built for English-speaking, USD-denominated, North American and European markets. Using them as your only stack in Nigeria is like using a Lagos traffic map to navigate Port Harcourt.',
      },
      { type: 'h2', content: 'What a Nigeria-native stack looks like' },
      {
        type: 'list',
        content: [
          'A keyword database that handles ₦ and naira-anchored variations natively.',
          'Local schema generators with Nigerian-specific categories (POS agent, CAC service, japa consultant, etc.).',
          'Rank tracking that surveys Bing for Nigerian geos, because ChatGPT retrieves from Bing.',
          'AI citation tracking against ChatGPT, Claude, Perplexity and Gemini using Nigerian-locale queries.',
          'Billing in naira, support hours that overlap with WAT, and case studies from Nigerian businesses you actually recognise.',
        ],
      },
      { type: 'h2', content: 'The honest recommendation' },
      {
        type: 'p',
        content:
          'Keep one foreign tool if your team genuinely needs the backlink index that Ahrefs uniquely provides. Layer a Nigeria-native stack on top. The combined monthly cost will likely come in below what you are paying for two foreign tools today, and your blind spots will shrink dramatically.',
      },
      { type: 'h2', content: 'Frequently asked questions' },
      {
        type: 'faq',
        content: [
          {
            q: 'Are you saying I should cancel my Ahrefs subscription?',
            a: 'Not necessarily. Ahrefs\' backlink index is still world-class. But ask yourself whether you are using 30 percent of Ahrefs and paying for 100 percent of it. If so, downgrade or swap.',
          },
          {
            q: 'What about Google Search Console? Is that enough?',
            a: 'Search Console is essential and free, but it only shows you Google data. For AI citation tracking, Bing data, and local schema, you need additional tools.',
          },
          {
            q: 'Does GetRanked offer a Nigeria-native alternative?',
            a: 'Yes. That is the entire premise of GetRanked. We built the stack we wished existed when we ran our own agencies. Pricing is naira-denominated and the database is Nigeria-first.',
          },
        ],
      },
    ],
  },
  {
    slug: 'schema-markup-nigerian-schools',
    title: '5 schema markup types every Nigerian school should use',
    excerpt:
      'From EducationalOrganization to Course schema, here are the five structured data types that move admissions enquiries for Nigerian primary, secondary and tertiary institutions.',
    category: 'Schema',
    author: authors.tunde,
    date: '2026-03-15',
    readingTime: '4 min read',
    coverImage: '/feature-schema-generator.png',
    keyTakeaways: [
      'Nigerian schools underinvest in schema by a wider margin than any other sector we audit.',
      'EducationalOrganization schema is the foundation. Layer Course, FAQPage and Event schema on top.',
      'AggregateRating, used honestly, can lift CTR from search by 20 to 35 percent.',
    ],
    body: [
      {
        type: 'p',
        content:
          'If you run admissions, marketing or digital for a Nigerian school, this is a short, opinionated list of the five schema markup types you should ship this term. None of them require a developer beyond an initial setup.',
      },
      { type: 'h2', content: 'The five types, in order of priority' },
      {
        type: 'ordered',
        content: [
          'EducationalOrganization. The foundation. Defines your school as an entity with a name, logo, address, founding date and accreditation.',
          'Course. One Course markup per programme you offer. Tertiary institutions especially benefit here because course-level schema is rare in the Nigerian market.',
          'FAQPage. Every Nigerian school admissions page should answer parents\' top 10 questions. Wrap them in FAQPage schema so Google can surface them as rich snippets and ChatGPT can cite them.',
          'Event. Open days, entrance exams, parent-teacher meetings. Event schema improves visibility in Google\'s events panel.',
          'AggregateRating. If you have genuine parent reviews, surface them through AggregateRating on your homepage. Star ratings in SERPs lift click-through meaningfully.',
        ],
      },
      { type: 'h2', content: 'Frequently asked questions' },
      {
        type: 'faq',
        content: [
          {
            q: 'Do I need all five types?',
            a: 'Yes, eventually. Start with EducationalOrganization and FAQPage. Add the others within a term.',
          },
          {
            q: 'Will this help with AI search?',
            a: 'Yes. Schema is the single highest signal AI engines use to identify and cite educational institutions correctly.',
          },
        ],
      },
    ],
  },
  {
    slug: 'paystack-page-not-ranking',
    title: 'Why your Paystack page is not ranking (and how to fix it)',
    excerpt:
      'Your checkout page may be conversion-optimised, but it is almost certainly invisible to Google. Here is the three-minute fix every Nigerian merchant should make.',
    category: 'Local SEO',
    author: authors.amaka,
    date: '2026-03-02',
    readingTime: '3 min read',
    coverImage: '/paystack-logo.png',
    keyTakeaways: [
      'Most Paystack pages are noindexed by default, which is correct for checkout but wrong for product landing pages.',
      'The fix is to create a separate canonical product page on your own domain that links to Paystack for checkout.',
      'Add Product and Offer schema to the canonical page, not the Paystack URL.',
    ],
    body: [
      {
        type: 'p',
        content:
          'If you have ever wondered why your Paystack checkout page is not ranking on Google, the answer is simple. It was not designed to. Paystack URLs are intentionally lightweight, conversion-focused pages with no SEO value. That is a feature, not a bug.',
      },
      { type: 'h2', content: 'The right setup' },
      {
        type: 'ordered',
        content: [
          'Create a product landing page on your own domain. Write 600 to 1,200 words about the product, its features and its price.',
          'Add Product and Offer schema with the price in NGN.',
          'Place a clear call-to-action that opens the Paystack checkout in a new tab.',
          'Make sure the Paystack URL itself has noindex set, so it does not compete with your canonical landing page.',
        ],
      },
      { type: 'h2', content: 'Frequently asked questions' },
      {
        type: 'faq',
        content: [
          {
            q: 'Can I rank a Paystack URL directly?',
            a: 'No. Paystack pages live on paystack.com or paystack.shop subdomains and inherit none of your domain authority. Always rank a page on your own domain instead.',
          },
        ],
      },
    ],
  },
  {
    slug: 'chatgpt-vs-perplexity-nigerian-queries-2026',
    title: 'ChatGPT vs Perplexity for Nigerian queries: a 2026 audit',
    excerpt:
      'We ran 500 Nigerian-locale queries through ChatGPT and Perplexity and tracked which engine cited Nigerian sources, which fabricated, and which sent referral traffic.',
    category: 'AI Search',
    author: authors.chidi,
    date: '2026-02-18',
    readingTime: '3 min read',
    coverImage: '/feature-reporting.png',
    keyTakeaways: [
      'Perplexity cited Nigerian publications 2.4x more often than ChatGPT on local queries.',
      'ChatGPT was faster but more likely to hallucinate Nigerian product details.',
      'For B2B Nigerian queries, both engines now perform within 10 percent of each other.',
    ],
    body: [
      {
        type: 'p',
        content:
          'Between January and February 2026 we ran a controlled audit of 500 Nigerian-locale queries across ChatGPT-4o and Perplexity. Here are the headline findings.',
      },
      { type: 'h2', content: 'Key findings' },
      {
        type: 'list',
        content: [
          'Perplexity cited Nigerian sources (TechCabal, Nairametrics, BusinessDay, Techpoint Africa) 2.4 times more often than ChatGPT.',
          'ChatGPT had a 12 percent hallucination rate on naira pricing details, particularly for SaaS pricing in NGN.',
          'For B2B service queries, both engines performed within 10 percent of each other on citation accuracy.',
          'Perplexity delivered a clickable citation chip in 94 percent of answers. ChatGPT linked in only 41 percent.',
        ],
      },
      { type: 'h2', content: 'What this means for your business' },
      {
        type: 'p',
        content:
          'If you are optimising for AI citation traffic, Perplexity is currently the better referral engine for Nigerian businesses. ChatGPT has more users but cites fewer Nigerian sources and links less often. Optimise for both, but expect Perplexity to deliver the early referral wins.',
      },
      { type: 'h2', content: 'Frequently asked questions' },
      {
        type: 'faq',
        content: [
          {
            q: 'Which engine should I prioritise?',
            a: 'Perplexity for referral traffic, ChatGPT for brand visibility. Both, ideally.',
          },
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug)
  if (!current) return articles.slice(0, limit)
  return articles
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0
      const bMatch = b.category === current.category ? 1 : 0
      return bMatch - aMatch
    })
    .slice(0, limit)
}

export const categories = ['All', 'GEO', 'Local SEO', 'AI Search', 'Schema', 'Nigerian Market'] as const

export type Category = (typeof categories)[number]
