import { useEffect, useState } from "react";

const locations = [
  {
    description: "Erawan Waterfall, Kanchanaburi",
    lat: 14.3772,
    lng: 99.1425,
  },
  {
    description: "Phu Chi Fa Viewpoint, Chiang Rai",
    lat: 19.8506,
    lng: 100.4543,
  },
  {
    description: "Khao Sok National Park Entrance, Surat Thani",
    lat: 8.9206,
    lng: 98.5194,
  },
  {
    description: "Sam Phan Bok (Grand Canyon of Thailand), Ubon Ratchathani",
    lat: 15.9123,
    lng: 105.3897,
  },
  {
    description: "Khao Laem Ya - Mu Ko Samet National Park, Rayong",
    lat: 12.5628,
    lng: 101.4703,
  },
  {
    description: "Pha Taem National Park, Ubon Ratchathani",
    lat: 15.3776,
    lng: 105.5116,
  },
  {
    description: "Doi Inthanon National Park (Summit), Chiang Mai",
    lat: 18.5883,
    lng: 98.4876,
  },
  {
    description: "Phu Kradueng National Park Entrance, Loei",
    lat: 16.8846,
    lng: 101.8577,
  },
  {
    description: "Khao Yai National Park Visitor Center, Nakhon Nayok",
    lat: 14.4387,
    lng: 101.3721,
  },
  {
    description: "Sai Yok Noi Waterfall, Kanchanaburi",
    lat: 14.3231,
    lng: 98.9425,
  },
];


export default function StreetViewChecker() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!window.google) return;

    const svService = new window.google.maps.StreetViewService();

    const fetchStatuses = async () => {
      const promises = locations.map((loc) => {
        return new Promise((resolve) => {
          svService.getPanorama(
            { location: { lat: loc.lat, lng: loc.lng }, radius: 150 },
            (data, status) => {
              if (status === window.google.maps.StreetViewStatus.OK) {
                resolve({
                  ...loc,
                  available: true,
                  moveable: data.links.length > 0,
                });
              } else {
                resolve({
                  ...loc,
                  available: false,
                  moveable: false,
                });
              }
            }
          );
        });
      });

      const results = await Promise.all(promises);
      setResults(results);
    };

    fetchStatuses();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Street View Availability in Thailand</h1>
      <ul>
        {results.map((loc, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <strong>{loc.description}</strong> ({loc.lat}, {loc.lng})<br />
            Street View: {loc.available ? "✅ Yes" : "❌ No"}
            <br />
            Moveable:{" "}
            {loc.available ? (loc.moveable ? "🟢 Yes" : "🟡 Static") : "—"}
          </li>
        ))}
      </ul>
    </div>
  );
}
