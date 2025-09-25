
export default function TourTips() {
  const tips = [
    {
      title: "Pack Light, Travel Smart",
      description: "Bring only essentials to stay comfortable and avoid extra baggage fees.",
      icon: "🎒",
    },
    {
      title: "Stay Hydrated",
      description: "Always carry a reusable water bottle to keep yourself refreshed during tours.",
      icon: "💧",
    },
    {
      title: "Learn Local Phrases",
      description: "Knowing basic greetings and phrases helps connect with locals.",
      icon: "🗣️",
    },
    {
      title: "Keep Digital Copies",
      description: "Save scanned copies of your passport, tickets, and ID on your phone.",
      icon: "📱",
    },
    {
      title: "Respect Local Culture",
      description: "Be mindful of traditions, dress codes, and customs when visiting new places.",
      icon: "🙏",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          ✨ Travel Tips for a Better Journey
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
