'use client'

import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

// Dynamically import Leaflet to avoid SSR issues
const LazyLeaflet = dynamic(() => import('leaflet'), { ssr: false })

type Memory = {
  title: string
  lat: number
  lng: number
  date: string
  images: string[]
  description: string
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
      'I remember how nervous I was that evening. When you walked in, the whole world seemed to fade away. We talked for hours about everything and nothing, and I knew right then that this was something special. The way your eyes lit up when you talked about your dreams made me fall for you even more.',
  },
  {
    title: 'Romantic Dinner at Malis',
    lat: 11.5632,
    lng: 104.9281,
    date: 'April 20, 2022',
    images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
    description:
      "Our one-month anniversary! You surprised me with this beautiful restaurant. I'll never forget how the candlelight reflected in your eyes as you reached across the table to hold my hand. The way you tried to feed me that dessert even though we were both so full - that's when I realized how thoughtful you really are.",
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
    description:
      'The sky was painted in hues of orange and pink, but all I could see was you. When you put your arm around me as we watched the sunset, I felt like the luckiest person in the world. That moment, with the temple bells ringing softly in the distance, will forever be etched in my heart.',
  },
  {
    title: 'Biking Along the Riverside',
    lat: 11.5726,
    lng: 104.9293,
    date: 'June 10, 2022',
    images: ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'],
    description:
      'Remember how we kept bumping into each other because we were too busy laughing to steer straight? That day was pure joy. I loved how you raced ahead only to circle back to ride beside me. The wind in our hair, the river beside us, and your laughter - it was absolute perfection.',
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
    description:
      "You looked so adorable trying to take the perfect photo for me. I was mesmerized by the palace, but even more by the way your face lit up explaining its history to me. When we got caught in that sudden downpour and ran laughing to take shelter, I knew these were the moments I'd cherish forever.",
  },
]

export default function MemoryMapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const heartsContainerRef = useRef<HTMLDivElement | null>(null)
  const [currentMemory, setCurrentMemory] = useState<Memory | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Initialize map
    if (mapRef.current && typeof window !== 'undefined') {
      const L = require('leaflet')
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      })

      const map = L.map(mapRef.current).setView([11.5564, 104.9282], 14)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Add markers
      memories.forEach((memory) => {
        const marker = L.marker([memory.lat, memory.lng], {
          icon: L.divIcon({
            className: 'heart-marker',
            html: '♥',
            iconSize: [36, 36],
          }),
        }).addTo(map)

        marker.on('click', () => {
          setCurrentMemory(memory)
          setIsModalOpen(true)
        })
      })

      return () => {
        map.remove()
      }
    }

    // Create floating hearts
    const heartsContainer = heartsContainerRef.current
    if (heartsContainer) {
      for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div')
        heart.className = 'heart'
        heart.innerHTML = '❤'
        heart.style.left = Math.random() * 100 + 'vw'
        heart.style.animationDelay = Math.random() * 15 + 's'
        heart.style.fontSize = Math.random() * 20 + 15 + 'px'
        heartsContainer.appendChild(heart)
      }
    }
  }, [isClient])

  // Close modal with ESC key
  useEffect(() => {
    if (!isClient) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isClient])

  if (!isClient) {
    return (
      <div className="loading-screen">
        <div className="loading-heart">❤</div>
        <div className="loading-text">Loading our love story...</div>

        <style jsx>{`
          .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #fff0f6;
            color: #e75488;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: 'Raleway', sans-serif;
            user-select: none;
            z-index: 20000;
          }
          .loading-heart {
            font-size: 5rem;
            animation: pulse 1.5s infinite ease-in-out;
            text-shadow:
              0 0 10px #e75488,
              0 0 20px #e75488;
          }
          .loading-text {
            margin-top: 1rem;
            font-size: 1.25rem;
            font-weight: 600;
            font-style: italic;
          }
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.7;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Our Romantic Phnom Penh Love Story</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Raleway:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <div className="memory-map-container">
        <div className="hearts-container" ref={heartsContainerRef} />

        <div id="map" ref={mapRef} />

        <div className="map-title">
          <h1>Our Journey in Phnom Penh</h1>
          <p>Every heart holds a precious memory of our love story</p>
        </div>

        {isModalOpen && currentMemory && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="memory-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>
                  <i className="fas fa-heart" /> {currentMemory.title}
                </h2>
                <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p className="memory-date">
                  <i className="fas fa-calendar-alt" /> Visited on <span>{currentMemory.date}</span>
                </p>
                <div className="memory-description">{currentMemory.description}</div>
                <div className="memory-gallery">
                  {currentMemory.images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={currentMemory.title}
                      className="memory-image"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="photo-counter">
          <i className="fas fa-heart heart-icon" />
          <span>12 Shared Memories</span>
        </div>

        <div className="footer">
          Made with <i className="fas fa-heart" style={{ color: '#e75488' }} /> in Phnom Penh
        </div>
      </div>

      <style jsx global>{`
        /* Your CSS here, unchanged from your original code */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body,
        #__next {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .memory-map-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          font-family: 'Raleway', sans-serif;
          background: #fff0f6;
          color: #490b3d;
          overflow: hidden;
          user-select: none;
        }

        #map {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100vh;
          width: 100vw;
          z-index: 1;
        }

        .map-title {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9000;
          text-align: center;
          color: #490b3d;
          font-family: 'Dancing Script', cursive;
          font-size: 2.5rem;
          text-shadow:
            0 0 5px #e75488,
            0 0 15px #e75488;
          pointer-events: none;
          user-select: none;
          letter-spacing: 0.05em;
        }

        .map-title p {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          margin-top: 5px;
          font-size: 1.25rem;
          user-select: none;
          pointer-events: none;
        }

        .heart-marker {
          font-size: 2.5rem;
          color: #e75488;
          text-shadow:
            0 0 5px #e75488,
            0 0 15px #e75488,
            0 0 20px #e75488;
          cursor: pointer;
          user-select: none;
        }

        .heart-marker:hover {
          transform: scale(1.2);
          transition: transform 0.3s ease;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .memory-modal {
          background: #fff0f6;
          border-radius: 10px;
          max-width: 600px;
          width: 90vw;
          max-height: 85vh;
          overflow-y: auto;
          padding: 20px;
          box-shadow: 0 0 20px #e75488;
          color: #490b3d;
          font-family: 'Raleway', sans-serif;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          user-select: none;
        }

        .modal-header h2 {
          font-family: 'Dancing Script', cursive;
          font-size: 2rem;
          color: #e75488;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          user-select: text;
        }

        .close-modal {
          font-size: 2rem;
          background: none;
          border: none;
          color: #e75488;
          cursor: pointer;
          user-select: none;
          transition: color 0.3s ease;
        }

        .close-modal:hover {
          color: #490b3d;
        }

        .modal-body {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          font-size: 1.1rem;
          user-select: text;
        }

        .memory-date {
          font-size: 0.9rem;
          margin-bottom: 10px;
          color: #a44a72;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
        }

        .memory-date span {
          font-weight: 700;
          color: #e75488;
        }

        .memory-description {
          margin-bottom: 15px;
          line-height: 1.5;
          color: #490b3d;
        }

        .memory-gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .memory-image {
          max-width: 45%;
          border-radius: 8px;
          box-shadow: 0 0 10px #e75488;
          user-select: none;
        }

        .photo-counter {
          position: fixed;
          bottom: 15px;
          right: 15px;
          color: #e75488;
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          z-index: 9000;
          display: flex;
          align-items: center;
          gap: 8px;
          user-select: none;
        }

        .heart-icon {
          font-size: 1.5rem;
          animation: heartbeat 1.5s infinite;
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }

        .footer {
          position: fixed;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          color: #490b3d;
          font-family: 'Raleway', sans-serif;
          font-size: 0.85rem;
          user-select: none;
          z-index: 9000;
        }

        .footer i {
          margin-left: 0.25rem;
        }

        .hearts-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
          user-select: none;
        }

        .heart {
          position: fixed;
          color: #e75488;
          opacity: 0.8;
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          user-select: none;
          text-shadow:
            0 0 5px #e75488,
            0 0 15px #e75488;
          will-change: transform;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
