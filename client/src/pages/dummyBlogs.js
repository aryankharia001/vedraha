/**
 * dummyBlogs.js
 *
 * Local dummy blog data shaped to match the Blog model returned by
 * GET /api/blogs and GET /api/blogs/:id. Used as a fallback when the
 * backend returns nothing or is unreachable so the frontend UI can be
 * evaluated without seeding the database.
 *
 * Shape mirrors: models/blogModel.js
 *   _id, title, creator, categories[], tags[], mainPicture{secureUrl,publicId},
 *   thumbnail{...}, subheadings[{heading,content}], excerpt, isPublished,
 *   createdAt
 */

export const DUMMY_BLOGS = [
  {
    _id: "dummy-blog-001",
    title: "The Ancient Science of Nabhi Therapy: Healing from Your Core",
    creator: "Vedraha Wellness",
    categories: ["Nabhi Chikitsa", "Wellness"],
    tags: ["nabhi", "ayurveda", "healing", "belly-button"],
    mainPicture: {
      secureUrl:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200",
      publicId: "dummy/nabhi-main-1",
    },
    thumbnail: {
      secureUrl:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
      publicId: "dummy/nabhi-thumb-1",
    },
    excerpt:
      "Discover how the ancient practice of Nabhi Chikitsa — navel oiling — works through the body's central healing point to restore balance, digestion and vitality.",
    isPublished: true,
    createdAt: "2025-01-22T10:00:00.000Z",
    subheadings: [
      {
        _id: "sub-1-1",
        heading: "What is Nabhi Therapy?",
        content:
          "Nabhi Chikitsa, also known as Nabhi Basti or navel oiling, is a classical Ayurvedic practice that treats the navel (nabhi) as the body's central energy point. The navel is considered the origin of 72,000 nadis — subtle energy channels — and the seat of the manipura chakra. By applying carefully chosen herbal oils to this single point, the entire system is said to be nourished and rebalanced.\n\nFor thousands of years, Ayurvedic practitioners have used this therapy to address a wide range of concerns: poor digestion, skin issues, menstrual discomfort, fatigue, and emotional imbalance. Today, modern research is beginning to validate what ancient healers already knew — that the navel is indeed a powerful gateway into the body's self-healing intelligence.",
      },
      {
        _id: "sub-1-2",
        heading: "How It Works",
        content:
          "The skin around the navel is exceptionally thin and rich in blood vessels and lymphatics. When a herbal oil is applied here, its active ingredients are absorbed directly into the bloodstream and circulated throughout the body, bypassing the digestive system entirely.\n\nThis transdermal pathway is highly efficient. A 10–15 minute navel oil massage before bed is enough for most herbs to be absorbed and begin working while you sleep. The oils selected for nabhi therapy are typically warming, grounding, and chosen to balance your dominant dosha — sesame for vata, coconut for pitta, and mustard or a herbal blend for kapha.",
      },
      {
        _id: "sub-1-3",
        heading: "Benefits You Can Feel",
        content:
          "Regular nabhi therapy, practiced for at least 21 consecutive days, has been reported to:\n\n• Improve digestion and reduce bloating\n• Support regular menstrual cycles\n• Calm the nervous system and improve sleep\n• Bring a healthy glow to the skin\n• Boost energy and emotional stability\n• Support fertility and reproductive health\n\nThe key is consistency. Like any Ayurvedic practice, nabhi oiling works gently and cumulatively — small daily rituals that, over weeks, compound into noticeable shifts in your wellbeing.",
      },
    ],
  },
  {
    _id: "dummy-blog-002",
    title: "How Belly Button Oiling Revitalizes Your Skin and Digestion Daily",
    creator: "Vedraha Wellness",
    categories: ["Daily Rituals", "Skincare"],
    tags: ["belly-button", "skincare", "digestion", "oiling"],
    mainPicture: {
      secureUrl:
        "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=1200",
      publicId: "dummy/nabhi-main-2",
    },
    thumbnail: {
      secureUrl:
        "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600",
      publicId: "dummy/nabhi-thumb-2",
    },
    excerpt:
      "A simple 2-minute nightly ritual that Ayurvedic practitioners swear by — and modern dermatologists are now beginning to recommend.",
    isPublished: true,
    createdAt: "2025-01-21T10:00:00.000Z",
    subheadings: [
      {
        _id: "sub-2-1",
        heading: "The 2-Minute Nightly Ritual",
        content:
          "The beauty of nabhi oiling is in its simplicity. Here's the practice most Ayurvedic practitioners recommend:\n\n1. Warm 3–5 drops of a quality herbal nabhi oil in your palm for a few seconds.\n2. Lie down comfortably and place your fingers directly on your navel.\n3. Massage in slow, clockwise circles for 1–2 minutes.\n4. Allow the oil to absorb — do not wipe it off. Sleep on an old t-shirt if you're worried about staining.\n\nThat's it. Two minutes, every night before bed. The ritual itself is also a moment of mindfulness — a way to check in with your body and end the day grounded.",
      },
      {
        _id: "sub-2-2",
        heading: "Why It Works for Skin",
        content:
          "The skin on your face is closely connected to your digestive system through a network called the gut-skin axis. Imbalances in the gut often show up as dullness, breakouts, premature ageing, or dryness. By nourishing the digestive fire (agni) at the navel — the body's literal center — you're addressing skin concerns at their root rather than just treating them topically.\n\nMany regular practitioners report clearer, brighter, more even-toned skin within 4–6 weeks of consistent practice.",
      },
      {
        _id: "sub-2-3",
        heading: "Choosing the Right Oil",
        content:
          "Not all oils are equal. A pure, traditionally prepared nabhi oil will contain herbs specifically chosen to support this therapy. Look for oils that include:\n\n• Cold-pressed sesame or coconut as a base\n• Herbs like ashwagandha, brahmi, or shatavari\n• No mineral oil, no synthetic fragrance, no parabens\n\nQuality matters here — a poorly prepared oil will simply sit on the surface of the skin without delivering any of the deeper benefits.",
      },
    ],
  },
  {
    _id: "dummy-blog-003",
    title: "Balancing Your Doshas: Why Nabhi Oils Are the Missing Link",
    creator: "Vedraha Wellness",
    categories: ["Deep Wellness", "Ayurveda"],
    tags: ["doshas", "ayurveda", "balance", "vata", "pitta", "kapha"],
    mainPicture: {
      secureUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
      publicId: "dummy/nabhi-main-3",
    },
    thumbnail: {
      secureUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
      publicId: "dummy/nabhi-thumb-3",
    },
    excerpt:
      "Modern life pulls us out of balance. Here's how a daily navel practice can gently bring you back — no matter your dominant dosha.",
    isPublished: true,
    createdAt: "2025-01-20T10:00:00.000Z",
    subheadings: [
      {
        _id: "sub-3-1",
        heading: "The Three Doshas",
        content:
          "Ayurveda recognises three primary mind-body types or doshas: Vata (air and ether), Pitta (fire and water), and Kapha (earth and water). Most of us are a unique combination of all three, with one or two typically dominant.\n\nWhen your doshas are in balance, you feel vibrant, clear, and at ease. When they fall out of balance — usually due to diet, stress, sleep, or seasonal changes — you begin to experience symptoms: bloating, fatigue, anxiety, breakouts, stiffness, sleeplessness, the list goes on.",
      },
      {
        _id: "sub-3-2",
        heading: "Why the Navel?",
        content:
          "The navel sits at the manipura chakra, the body's energetic center. From an Ayurvedic perspective, this is where all three doshas converge. Treating the navel with the appropriate herbal oil allows you to address all three doshas simultaneously — a kind of central reset.\n\nUnlike oral herbs, which must be selected precisely for your current imbalance, a well-formulated nabhi oil works more gently and broadly. It's an ideal starting point for anyone new to Ayurvedic self-care.",
      },
      {
        _id: "sub-3-3",
        heading: "A Practice for Every Body",
        content:
          "Whether you're a busy professional, a new parent, a student, or simply someone who wants to feel more at home in their body — nabhi oiling fits easily into any routine. No equipment, no big time commitment, no special diet required.\n\nStart with 7 nights. Then 21. Then 40. The deeper the practice goes, the more it gives back.",
      },
    ],
  },
  {
    _id: "dummy-blog-004",
    title: "Nabhi Oil vs. Coconut Oil: What's the Difference?",
    creator: "Dr. Anjali Sharma",
    categories: ["Ingredients", "Education"],
    tags: ["nabhi-oil", "coconut-oil", "ingredients", "comparison"],
    mainPicture: {
      secureUrl:
        "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=1200",
      publicId: "dummy/nabhi-main-4",
    },
    thumbnail: {
      secureUrl:
        "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=600",
      publicId: "dummy/nabhi-thumb-4",
    },
    excerpt:
      "They may look similar in the bottle, but a traditional nabhi oil and a simple coconut oil work in very different ways. Here's how to choose.",
    isPublished: true,
    createdAt: "2025-01-18T10:00:00.000Z",
    subheadings: [
      {
        _id: "sub-4-1",
        heading: "The Carrier vs. The Compound",
        content:
          "Think of coconut oil as a carrier — a single, pure ingredient. Think of a traditional nabhi oil as a compound formula — a carrier base infused with multiple herbs specifically chosen to work together.\n\nCoconut oil is excellent for hydration, but on its own, it does not contain the bioactive compounds needed to support deeper therapeutic effects like balancing hormones, calming nerves, or supporting digestion. A nabhi oil does.",
      },
      {
        _id: "sub-4-2",
        heading: "When to Use Which",
        content:
          "Coconut oil is a great choice for hot weather, for pitta-dominant skin, or for anyone who needs a simple, neutral moisturizer. A traditional nabhi oil is better for daily long-term practice, especially if you're working on a specific concern like sleep, hormonal balance, or chronic bloating.\n\nYou can also rotate them — coconut oil in summer, nabhi oil in winter, for example — to work with the seasons.",
      },
    ],
  },
  {
    _id: "dummy-blog-005",
    title: "5 Signs Your Body is Asking for a Nabhi Reset",
    creator: "Vedraha Wellness",
    categories: ["Wellness", "Self-care"],
    tags: ["signs", "reset", "self-care", "ayurveda"],
    mainPicture: {
      secureUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1200",
      publicId: "dummy/nabhi-main-5",
    },
    thumbnail: {
      secureUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600",
      publicId: "dummy/nabhi-thumb-5",
    },
    excerpt:
      "Tired, bloated, breaking out, can't sleep? Your body may be quietly asking for a return to the basics. Here's what to look for.",
    isPublished: true,
    createdAt: "2025-01-15T10:00:00.000Z",
    subheadings: [
      {
        _id: "sub-5-1",
        heading: "Sign 1: Constant Fatigue",
        content:
          "If you're getting 7–8 hours of sleep and still waking up tired, your body may be working harder than it needs to. Nabhi oiling before bed helps calm the nervous system and signals to the body that it's safe to rest deeply.",
      },
      {
        _id: "sub-5-2",
        heading: "Sign 2: Persistent Bloating",
        content:
          "Bloating that doesn't respond to dietary changes often points to sluggish digestion at the root level. The navel, located directly above the small intestine, is a great place to bring warmth and movement back to the gut.",
      },
      {
        _id: "sub-5-3",
        heading: "Sign 3: Skin Acting Up",
        content:
          "Adult breakouts, dullness, or new sensitivities are often the skin's way of telling you something is happening deeper inside. The gut-skin axis is real, and supporting digestion at the navel often shows up on your face within weeks.",
      },
      {
        _id: "sub-5-4",
        heading: "Sign 4: Hormonal Shifts",
        content:
          "Irregular cycles, mood swings, or new PMS symptoms are common signals. A regular nabhi practice has been used for centuries as a gentle, supportive therapy for reproductive health.",
      },
      {
        _id: "sub-5-5",
        heading: "Sign 5: Restless Mind",
        content:
          "If your mind races at night, or you find yourself anxious without a clear reason, the navel ritual can be a powerful anchor. The slow, deliberate motion of oiling the navel is a form of moving meditation that helps bring the mind back to the body.",
      },
    ],
  },
  {
    _id: "dummy-blog-006",
    title: "A 21-Day Nabhi Challenge: What to Expect Week by Week",
    creator: "Vedraha Wellness",
    categories: ["Rituals", "Lifestyle"],
    tags: ["challenge", "21-days", "habit", "ritual"],
    mainPicture: {
      secureUrl:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1200",
      publicId: "dummy/nabhi-main-6",
    },
    thumbnail: {
      secureUrl:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
      publicId: "dummy/nabhi-thumb-6",
    },
    excerpt:
      "Ayurveda says it takes 21 days to form a habit and 40 days to master it. Here's a week-by-week guide to what to expect when you start a daily nabhi practice.",
    isPublished: true,
    createdAt: "2025-01-10T10:00:00.000Z",
    subheadings: [
      {
        _id: "sub-6-1",
        heading: "Week 1: Settling In",
        content:
          "The first week is all about establishing the ritual. Some people notice small shifts right away — a calmer mind at bedtime, slightly easier digestion. Others feel nothing yet, and that's completely normal. Stay consistent. The body is listening.",
      },
      {
        _id: "sub-6-2",
        heading: "Week 2: Subtle Shifts",
        content:
          "Around day 10–14, many practitioners report noticing changes they didn't expect: skin looks clearer, bloating is reduced, sleep is deeper, energy in the morning is stronger. These are signs the body has begun to respond.",
      },
      {
        _id: "sub-6-3",
        heading: "Week 3: The Habit Forms",
        content:
          "By day 21, the practice has usually become a natural part of the bedtime routine. Most people report that skipping it now feels slightly off — a sign that the body has fully accepted the ritual. Continue for another 19 days to reach the 40-day Ayurvedic milestone, and watch the practice deepen even further.",
      },
    ],
  },
];
