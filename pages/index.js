
import { useState } from "react";
import Head from "next/head";

const settings = {
  Campfire: "/background_campfire.png",
  Boardroom: "/background_boardroom.png",
  Spaceship: "/background_spaceship.png",
};

const archetypes = {
  "The Wise Headmaster": "/characters/headmaster.png",
  "The Billionaire Investor": "/characters/investor.png",
  "The Shadow Self": "/characters/shadow_self.png",
  "The Joker": "/characters/joker.png",
  "The Serial Entrepreneur": "/characters/entrepreneur.png",
};

export default function Home() {
  const [setting, setSetting] = useState("Campfire");
  const [selected, setSelected] = useState(["The Wise Headmaster", "The Shadow Self"]);
  const [entry, setEntry] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${settings[setting]})` }}
    >
      <Head>
        <title>Echo Deep</title>
      </Head>
      <div className="bg-black bg-opacity-60 min-h-screen px-6 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">ECHO DEEP</h1>

        <div className="max-w-3xl mx-auto">
          <label className="block mb-2">Choose Setting:</label>
          <select
            className="w-full p-2 bg-gray-800 rounded mb-4"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
          >
            {Object.keys(settings).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <label className="block mb-2">Choose Your Archetypes:</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.keys(archetypes).map((name) => (
              <label key={name} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selected.includes(name)}
                  onChange={() =>
                    setSelected((prev) =>
                      prev.includes(name)
                        ? prev.filter((n) => n !== name)
                        : [...prev, name]
                    )
                  }
                />
                <span>{name}</span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {selected.map((name) => (
              <div key={name} className="text-center">
                <img
                  src={archetypes[name]}
                  alt={name}
                  className="w-full h-40 object-contain mx-auto"
                />
                <p className="mt-2 text-sm">{name}</p>
              </div>
            ))}
          </div>

          <textarea
            className="w-full p-4 rounded bg-gray-800 text-white mb-4"
            rows={5}
            placeholder="Start your journal entry here..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />

          <button
            onClick={() => setSubmitted(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Reflect with the Council
          </button>

          {submitted && (
            <div className="mt-8 bg-black bg-opacity-50 p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Council Responses</h2>
              {selected.map((name) => (
                <div key={name} className="mb-4">
                  <h3 className="text-lg font-bold">{name}</h3>
                  <p className="italic">(Placeholder GPT response to: "{entry}")</p>
                </div>
              ))}
              <div className="mt-4">
                <h3 className="text-lg font-bold">Council Challenge</h3>
                <p>Which voice irritated you the most — and why might that be the one you need to listen to?</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
