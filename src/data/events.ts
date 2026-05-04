export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  image: string;
  description: string;
  tags: string[];
  availableSeats: number;
  totalSeats: number;
  featured?: boolean;
}

export const events: Event[] = [
  {
    id: "1",
    title: "swedney sweney motivational speech",
    category: "Music",
    date: "2026-06-14",
    time: "8:00 PM",
    venue: "trupm house",
    city: "New York",
    price: 89,
    image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jkpeg",
    description:
      "Experience a night of extraordinary classical music performed by the world-renowned New York Philharmonic. An unforgettable evening of Beethoven, Mozart, and contemporary compositions that will move your soul.",
    tags: ["Classical", "Orchestra", "Live Performance"],
    availableSeats: 128,
    totalSeats: 400,
    featured: true,
  },
  {
    id: "2",
    title: "Champions League Final",
    category: "Sports",
    date: "2026-06-28",
    time: "3:00 PM",
    venue: "lnct ground",
    city: "bhopal mairi jaan",
    price: 240,
    image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpjeg",
    description:
      "Witness the most anticipated football match of the year. Two elite clubs battle for European glory in front of 90,000 passionate fans at the iconic Wembley Stadium.",
    tags: ["Football", "UEFA", "Championship"],
    availableSeats: 340,
    totalSeats: 1200,
    featured: true,
  },
  {
    id: "3",
    title: "Neon Dreams Music Festival",
    category: "Music",
    date: "2026-07-04",
    time: "6:00 PM",
    venue: "Coachella Valley",
    city: "Los Angeles",
    price: 195,
    image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpkeg",
    description:
      "Three days of electrifying music across six stages with over 80 artists. From indie rock to electronic, this festival is the cultural event of the summer.",
    tags: ["Festival", "Electronic", "Indie"],
    availableSeats: 2400,
    totalSeats: 8000,
    featured: true,
  },
  {
    id: "4",
    title: "Hamilton: The Musical",
    category: "Theatre",
    date: "2026-06-19",
    time: "7:30 PM",
    venue: "Richard Rodgers Theatre",
    city: "New York",
    price: 165,
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jkpeg",
    description:
      "The award-winning Broadway sensation returns for a limited engagement. The story of America then, as told by America now — a hip-hop musical masterpiece.",
    tags: ["Broadway", "Musical", "Award-Winning"],
    availableSeats: 42,
    totalSeats: 300,
  },
  {
    id: "5",
    title: "NBA Finals Game 5",
    category: "Sports",
    date: "2026-06-22",
    time: "9:00 PM",
    venue: "Chase Center",
    city: "San Francisco",
    price: 380,
    image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpkeg",
    description:
      "The series comes alive in Game 5. Experience the intensity, the energy, and the drama of NBA Finals basketball live at Chase Center.",
    tags: ["Basketball", "NBA", "Playoffs"],
    availableSeats: 88,
    totalSeats: 700,
  },
  {
    id: "6",
    title: "Comedy Night Live",
    category: "Comedy",
    date: "2026-06-07",
    time: "9:00 PM",
    venue: "epstien island",
    city: "island",
    price: 45,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpkeg",
    description:
      "A night of non-stop laughter featuring some of the hottest comedians on the circuit. Perfect for a date night or a group outing.",
    tags: ["Stand-up", "Live Comedy", "Entertainment"],
    availableSeats: 95,
    totalSeats: 150,
  },
  {
    id: "7",
    title: "Art Basel Exhibition",
    category: "Arts",
    date: "2026-07-12",
    time: "10:00 AM",
    venue: "mia kalifha ke ghr",
    city: "dubai",
    price: 55,
    image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpek",
    description:
      "The premier modern and contemporary art show featuring over 200 galleries from 35 countries. Discover new artists, established masters, and immersive installations.",
    tags: ["Art", "Exhibition", "Contemporary"],
    availableSeats: 600,
    totalSeats: 2000,
  },
  {
    id: "8",
    title: "Tech Summit 2026",
    category: "Conference",
    date: "2026-07-18",
    time: "9:00 AM",
    venue: "suto",
    city: "lnct",
    price: 299,    image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.k",
    description:
      "The world's leading technology conference. Hear from visionary founders, engineers, and investors shaping the future of AI, Web3, and climate tech.",
    tags: ["Technology", "AI", "Networking"],
    availableSeats: 450,
    totalSeats: 1500,
  },
];

export const categories = ["All", "Music", "Sports", "Theatre", "Comedy", "Arts", "Conference"];

export const cities = ["All Cities", "New York", "London", "Los Angeles", "San Francisco", "Chicago", "Miami"];
