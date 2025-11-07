import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import redFort from "@/assets/redfort.jpeg";
import qutubMinar from "@/assets/qutub-minar.jpeg";
import lotusTemple from "@/assets/lotustemple.jpeg";
import humayunTomb from "@/assets/humayutomb.jpeg";
import { Search,MapPin } from "lucide-react";

const popularPlaces = [
  {
    name: "Red Fort",
    image: redFort,
    description:
      "A historic fort in Old Delhi that served as the main residence of the Mughal emperors.",
    location: "Netaji Subhash Marg, Chandni Chowk",
  },
  {
    name: "Qutub Minar",
    image: qutubMinar,
    description:
      "A UNESCO World Heritage Site, this 73-meter tall minaret is a masterpiece of Indo-Islamic architecture.",
    location: "Mehrauli",
  },
  {
    name: "Lotus Temple",
    image: lotusTemple,
    description:
      "A Bahá'í House of Worship noted for its flower-like shape and stunning modern architecture.",
    location: "Bahapur, Kalkaji",
  },
  {
    name: "Humayun's Tomb",
    image: humayunTomb,
    description:
      "The tomb of the Mughal Emperor Humayun, a UNESCO World Heritage Site and inspiration for the Taj Mahal.",
    location: "Nizamuddin East",
  },
];

export const Places = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered places based on search
  const filteredPlaces = popularPlaces.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-24 pb-16 bg-linear-to-b from-white to-amber-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-600 font-serif">
            Popular Tourist Places
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Discover the most iconic destinations in Delhi
          </p>

          {/* ✅ Fixed Input with onChange */}
          <div className="max-w-md mx-auto flex">
            <Input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="text-white px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 flex justify-center items-center">Search
                <Search className="text-white" />
            </button>
          </div>
        </div>

        {/* ✅ Render filtered places */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place, index) => (
            <Card key={index} className="overflow-hidden shadow-lg">
              <img
                src={place.image}
                alt={place.name}
                className="h-48 w-full object-cover transform transition-transform duration-500 hover:scale-110"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                <p className="text-muted-foreground mb-2">{place.description}</p>
                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{place.location}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};
