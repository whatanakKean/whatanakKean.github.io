// app/nak/memorymap/page.tsx
'use client';

import { genPageMetadata } from 'app/seo';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression, Icon, DivIcon } from 'leaflet';
import type { MapContainerProps } from 'react-leaflet';

// Define a custom interface to include all necessary props
interface ExtendedMapContainerProps extends Omit<MapContainerProps, 'center' | 'zoom'> {
  center: LatLngExpression;
  zoom: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MapWithNoSSR = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false },
) as React.ComponentType<ExtendedMapContainerProps>;

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
  ssr: false,
});

interface Memory {
  title: string;
  lat: number;
  lng: number;
  date: string;
  images: string[];
  description: string;
}

const memories: Memory[] = [
  {
    title: 'Our First Date at Brown Coffee',
    lat: 11.5695,
    lng: 104.9289,
    date: 'March 15, 2022',
    images: [
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800',
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800',
    ],
    description:
      'I remember how nervous I was that evening. When you walked in, the whole world seemed to fade away...',
  },
  {
    title: 'Romantic Dinner at Malis',
    lat: 11.5632,
    lng: 104.9281,
    date: 'April 20, 2022',
    images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
    description: 'Our one-month anniversary! You surprised me with this beautiful restaurant...',
  },
  {
    title: 'Sunset at Wat Phnom',
    lat: 11.5765,
    lng: 104.923,
    date: 'May 3, 2022',
    images: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    ],
    description: 'The sky was painted in hues of orange and pink, but all I could see was you...',
  },
  {
    title: 'Biking Along the Riverside',
    lat: 11.5726,
    lng: 104.9293,
    date: 'June 10, 2022',
    images: ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'],
    description:
      'Remember how we kept bumping into each other because we were too busy laughing to steer straight?...',
  },
  {
    title: 'Royal Palace Visit',
    lat: 11.5622,
    lng: 104.9303,
    date: 'July 4, 2022',
    images: [
      'https://images.unsplash.com/photo-1533856493584-0c6ca8ca9ce3?w=800',
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800',
    ],
    description: 'You looked so adorable trying to take the perfect photo for me...',
  },
];

export default function MemoryMap() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heartMarkerIcon, setHeartMarkerIcon] = useState<Icon | DivIcon | null>(null);

  useEffect(() => {
    // Dynamically import Leaflet only on the client
    import('leaflet').then((L) => {
      setHeartMarkerIcon(
        L.divIcon({
          className:
            'flex h-9 w-9 animate-pulse cursor-pointer items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-pink-500 to-rose-600 text-lg text-white shadow-[0_0_15px_rgba(231,84,136,0.6)]',
          html: '<span>♥</span>',
          iconSize: [36, 36],
          iconAnchor: [18, 36], // Align bottom center of the marker
          popupAnchor: [0, -36],
        }),
      );
    });

    // Create floating hearts
    const heartsContainer = document.getElementById('heartsContainer');
    if (heartsContainer) {
      for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDelay = `${Math.random() * 15}s`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heartsContainer.appendChild(heart);
      }
    }

    // Close modal with ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showMemoryModal = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeModal();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 font-raleway text-purple-900">
      {/* Floating Hearts */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" id="heartsContainer" />

      {/* Map */}
      <div className="fixed inset-0 z-[1]">
        <MapWithNoSSR
          center={[11.5564, 104.9282] as LatLngExpression}
          zoom={14}
          style={{
            height: '100%',
            width: '100%',
            filter: 'sepia(0.2) saturate(1.1) brightness(0.95)',
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {heartMarkerIcon &&
            memories.map((memory, index) => (
              <Marker
                key={index}
                position={[memory.lat, memory.lng] as LatLngExpression}
                icon={heartMarkerIcon}
                eventHandlers={{ click: () => showMemoryModal(memory) }}
              />
            ))}
        </MapWithNoSSR>
      </div>

      {/* Map Title */}
      <div className="absolute top-5 left-1/2 z-10 max-w-[90%] -translate-x-1/2 transform rounded-full border border-white/50 bg-white/85 p-5 text-center shadow-[0_5px_25px_rgba(163,95,163,0.3)] backdrop-blur-sm">
        <h1 className="font-dancing-script mb-2 text-4xl text-rose-500">
          Our Journey in Phnom Penh
        </h1>
        <p className="font-playfair text-base text-purple-900 italic">
          Every heart holds a precious memory of our love story
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && selectedMemory && (
        <div
          className="animate-fadeIn fixed inset-0 z-[1000] flex items-center justify-center bg-black/70"
          onClick={closeModal}
          onKeyDown={handleModalKeyDown}
          role="dialog"
          aria-labelledby="modal-title"
          tabIndex={0}
        >
          <div
            className="max-h-[90vh] w-[90%] max-w-2xl overflow-hidden rounded-2xl border border-pink-200/50 bg-gradient-to-b from-white to-pink-50 shadow-[0_10px_40px_rgba(163,95,163,0.4)]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleModalKeyDown}
            role="document"
            tabIndex={-1}
          >
            <div className="flex items-center justify-between border-b-2 border-white/30 bg-gradient-to-r from-rose-500 to-purple-500 p-5 text-white">
              <h2 className="text-xl" id="modal-title">
                <span className="mr-2">❤</span> {selectedMemory.title}
              </h2>
              <button
                className="cursor-pointer border-none bg-transparent text-2xl text-white transition-transform hover:scale-125"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-6">
              <p className="mb-5 flex items-center gap-2 text-base text-purple-600 italic">
                <span>📅</span> Visited on {selectedMemory.date}
              </p>
              <div className="font-playfair mb-5 rounded-lg border-l-4 border-rose-500 bg-pink-50/60 p-4 text-base leading-relaxed text-purple-900">
                {selectedMemory.description}
              </div>
              <div className="flex flex-col gap-5">
                {selectedMemory.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={selectedMemory.title}
                    width={800}
                    height={600}
                    className="w-full rounded-lg border border-rose-300/20 shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-transform duration-400 hover:scale-102 hover:shadow-[0_8px_25px_rgba(163,95,163,0.3)]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Counter */}
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-rose-500 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <span className="animate-heartbeat text-lg">❤</span>
        <span>12 Shared Memories</span>
      </div>

      {/* Footer */}
      <div className="font-raleway absolute bottom-5 left-0 right-0 z-10 text-center text-sm text-white drop-shadow">
        Made with <span className="text-rose-500">❤</span> in Phnom Penh
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Raleway:ital,wght@0,300;0,400;1,300&display=swap');

        html,
        body,
        #__next {
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        .font-raleway {
          font-family: 'Raleway', sans-serif;
        }
        .font-dancing-script {
          font-family: 'Dancing Script', cursive;
        }
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }

        .heart {
          position: absolute;
          color: rgba(231, 84, 136, 0.15);
          animation: float 15s infinite linear;
          opacity: 0;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(231, 84, 136, 0.6);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(231, 84, 136, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(231, 84, 136, 0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.3);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.3);
          }
          70% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}