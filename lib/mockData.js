export const mockGames = [
  {
    slug: "cyberpunk-2077",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    title: "Cyberpunk 2077",
    description:
      "An open-world action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    score: 87,
  },
  {
    slug: "god-of-war-ragnarok",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
    title: "God of War Ragnarök",
    description:
      "Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a battle that will end the world.",
    score: 94,
  },
  {
    slug: "elden-ring",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=top",
    title: "Elden Ring",
    description:
      "An action RPG set in a vast fantasy world where you must become the Elden Lord by defeating powerful enemies and uncovering the secrets of the Lands Between.",
    score: 96,
  },
  {
    slug: "spider-man-2",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=left",
    title: "Marvel's Spider-Man 2",
    description:
      "Peter Parker and Miles Morales face their greatest challenge yet as they battle against new threats in an expanded New York City.",
    score: 90,
  },
  {
    slug: "baldurs-gate-3",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=right",
    title: "Baldur's Gate 3",
    description:
      "A next-generation RPG set in the world of Dungeons & Dragons, featuring turn-based combat and a rich narrative with meaningful choices.",
    score: 96,
  },
];

// Function to simulate the getLatestGames API
export async function getMockLatestGames() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockGames;
}

// Function to simulate the getGameDetails API
export async function getMockGameDetails(slug) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const game = mockGames.find(g => g.slug === slug);
  if (!game) {
    throw new Error("Game not found");
  }

  return {
    img: game.image,
    title: game.title,
    slug: game.slug,
    description: game.description,
    score: game.score,
    reviews: [
      {
        quote:
          "An exceptional gaming experience that pushes the boundaries of what's possible.",
        score: game.score,
        date: "2024-01-15",
        publicationName: "Gaming Weekly",
        author: "John Smith",
      },
      {
        quote: "A masterpiece that will be remembered for years to come.",
        score: game.score - 2,
        date: "2024-01-10",
        publicationName: "Game Review Pro",
        author: "Jane Doe",
      },
      {
        quote: "Innovative gameplay mechanics combined with stunning visuals.",
        score: game.score + 1,
        date: "2024-01-08",
        publicationName: "Tech Gaming",
        author: "Mike Johnson",
      },
    ],
  };
}
