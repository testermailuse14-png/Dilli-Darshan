import { useEffect, useState } from 'react';
import HiddenGemCard from "@/components/HiddenGemCard";
import HiddenGemsSubmit from "@/components/HiddenGemsSubmit";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import { getPhotoForPlace, geocodeAddress } from '@/lib/placeService';

const initialHiddenGems = [
  {
    name: "Agrasen ki Baoli",
    description: "A 60-meter long and 15-meter wide historical stepwell hidden in the heart of Delhi",
    submittedBy: "Priya S.",
    address: "7B/25, Hailey Rd, Connaught Place, New Delhi, Delhi 110001",
    lat: 28.6304,
    lng: 77.1991,
  },
  {
    name: "Lodhi Art District",
    description: "India's first public art district featuring stunning street art and murals",
    submittedBy: "Rahul M.",
    address: "Lodhi Rd, Lodhi Colony, New Delhi, Delhi 110003",
    lat: 28.5933,
    lng: 77.2197,
  },
  {
    name: "Sunder Nursery",
    description: "A 90-acre heritage park with Mughal-era monuments and beautiful gardens",
    submittedBy: "Ananya K.",
    address: "Sunder Nagar, Nizamuddin West, New Delhi, Delhi 110013",
    lat: 28.5942,
    lng: 77.2470,
  }
];

export const HiddenGems = () => {
  const [gems, setGems] = useState(
    initialHiddenGems.map((g) => ({ ...g, image: null }))
  );

  const [form, setForm] = useState({ name: '', description: '', address: '', lat: '', lng: '' });

  useEffect(() => {
    // Fetch photos for each gem and update state
    gems.forEach((gem, idx) => {
      if (gem.image) return; // already loaded
      getPhotoForPlace(gem.name, gem.lat, gem.lng, (url, err) => {
        if (url) {
          setGems((prev) => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], image: url };
            return copy;
          });
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addGemToState = (newGem) => {
    setGems((prev) => [newGem, ...prev]);

    // fetch photo
    getPhotoForPlace(newGem.name, newGem.lat, newGem.lng, (url) => {
      if (url) {
        setGems((prev) => {
          const copy = [...prev];
          copy[0] = { ...copy[0], image: url };
          return copy;
        });
      }
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { name, description, address, lat, lng } = form;
    if (!name) return;

    if (lat && lng) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      const newGem = {
        name,
        description,
        submittedBy: 'Anonymous',
        address: address || '',
        lat: Number.isFinite(parsedLat) ? parsedLat : null,
        lng: Number.isFinite(parsedLng) ? parsedLng : null,
        image: null,
      };
      addGemToState(newGem);
      setForm({ name: '', description: '', address: '', lat: '', lng: '' });
      return;
    }

    if (address) {
      // geocode address
      geocodeAddress(address, (res, err) => {
        const newGem = {
          name,
          description,
          submittedBy: 'Anonymous',
          address: res?.formatted_address || address,
          lat: res?.lat ?? null,
          lng: res?.lng ?? null,
          image: null,
        };
        addGemToState(newGem);
        setForm({ name: '', description: '', address: '', lat: '', lng: '' });
      });
      return;
    }

    // fallback: add without coords/address
    const newGem = {
      name,
      description,
      submittedBy: 'Anonymous',
      address: '',
      lat: null,
      lng: null,
      image: null,
    };
    addGemToState(newGem);
    setForm({ name: '', description: '', address: '', lat: '', lng: '' });
  };

  const mapMarkers = gems
    .filter((g) => typeof g.lat === 'number' && typeof g.lng === 'number')
    .map((gem) => ({
      title: gem.name,
      lat: gem.lat,
      lng: gem.lng,
      description: gem.description,
      location: gem.address || '',
    }));

  return (
    <main className="min-h-screen pt-24 pb-16 bg-linear-to-b from-white to-amber-600 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-amber-600">
            Hidden Gems of Delhi
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover and share Delhi's best-kept secrets
          </p>
        </div>


        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Gems Location Map</h2>
          <GoogleMapComponent
            markers={mapMarkers}
            zoom={12}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {gems.map((gem, index) => (
            <HiddenGemCard key={index} {...gem} />
          ))}
        </div>

        <HiddenGemsSubmit onAdd={(payload) => {
          // parent will handle geocoding and adding
          const { name, description, submittedBy, address, lat, lng } = payload;

          const doAdd = (coords, formattedAddress) => {
            const newGem = {
              name,
              description,
              submittedBy: submittedBy || 'Anonymous',
              address: formattedAddress || address || '',
              lat: coords?.lat ?? (typeof lat === 'number' ? lat : (lat ? parseFloat(lat) : null)),
              lng: coords?.lng ?? (typeof lng === 'number' ? lng : (lng ? parseFloat(lng) : null)),
              image: null,
            };
            addGemToState(newGem);
          };

          if ((lat && lng) || (typeof lat === 'number' && typeof lng === 'number')) {
            doAdd({ lat: parseFloat(lat), lng: parseFloat(lng) }, address);
          } else if (address) {
            geocodeAddress(address, (res, err) => {
              if (res) doAdd({ lat: res.lat, lng: res.lng }, res.formatted_address);
              else doAdd(null, address);
            });
          } else {
            doAdd(null, '');
          }
        }} />
      </div>
    </main>
  );
};

export default HiddenGems;
