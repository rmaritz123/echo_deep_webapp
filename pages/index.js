
import Head from 'next/head'
import { useState } from 'react'

const archetypes = {
  "The Wise Headmaster": "/characters/headmaster.png",
  "The Billionaire Investor": "/characters/investor.png",
  "The Shadow Self": "/characters/shadow_self.png",
  "The Joker": "/characters/joker.png",
  "The Serial Entrepreneur": "/characters/entrepreneur.png"
};

const settings = {
  "Campfire": "/background_campfire.png",
  "Boardroom": "/background_boardroom.png",
  "Spaceship": "/background_spaceship.png"
};

export default function Home() {
  const [setting, setSetting] = useState("Campfire");
  const [selectedArchetypes, setSelectedArchetypes] = useState([]);
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-cover bg-center text-white" style={{ backgroundImage: `url(${settings[setting]})` }}>
      <Head>
        <title>Echo Deep</title>
      </Head>
      <div className="backdrop-blur-md bg-black/50 min-h-screen flex flex-col items-center justify-start p-6">
        <h1 className="text-5xl font-bold my-6">ECHO DEEP</h1>
        <div className="w-full max-w-3xl space-y-4">
          <label className="block text-xl">Choose Setting:</label>
          <select value={setting} onChange={(e) => setSetting(e.target.value)} className="w-full p-2 rounded text-black">
            {Object.keys(settings).map(key => <option key={key}>{key}</option>)}
          </select>

          <label className="block text-xl">Choose Your Archetypes:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.keys(archetypes).map(name => (
              <button key={name}
                onClick={() =>
                  setSelectedArchetypes(prev =>
                    prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
                  )
                }
                className={`p-2 rounded ${selectedArchetypes.includes(name) ? 'bg-yellow-500' : 'bg-white text-black'}`}>
                {name}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-4 overflow-x-auto">
            {selectedArchetypes.map(name => (
              <div key={name} className="flex-shrink-0 text-center">
                <img src={archetypes[name]} alt={name} className="h-32 object-contain mx-auto" />
                <p>{name}</p>
              </div>
            ))}
          </div>

          <textarea
            placeholder="Enter your message here..."
            className="w-full p-4 rounded text-black"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4">
            Reflect with the Council
          </button>
        </div>
      </div>
    </div>
  );
}
