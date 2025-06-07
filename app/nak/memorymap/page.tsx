'use client'

import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

interface Memory {
  title: string
  lat: number
  lng: number
  date: string
  images: string[]
  description: string
}

const LazyLeaflet = dynamic(() => import('leaflet'), { ssr: false })

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
]

export default function MemoryMapPage() {
  const mapRef = useRef(null)
  const heartsContainerRef = useRef(null)
  const [currentMemory, setCurrentMemory] = useState<Memory | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isMapLoading, setIsMapLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    let map: any
    setIsMapLoading(true)

    // Initialize map
    if (mapRef.current && typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        })

        map = L.map(mapRef.current).setView([11.5564, 104.9282], 14)

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

        // Hide loading when map is ready
        map.whenReady(() => {
          setIsMapLoading(false)
        })
      })
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

    return () => {
      if (map) map.remove()
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
        <div className="hearts-container" ref={heartsContainerRef}></div>

        <div id="map" ref={mapRef}></div>

        {isMapLoading && (
          <div className="map-loading">
            <div className="loading-spinner">
              <i className="fas fa-heart fa-beat"></i>
            </div>
            <p>Loading our love map...</p>
          </div>
        )}

        <div className="map-title">
          <h1>Our Journey in Phnom Penh</h1>
          <p>Every heart holds a precious memory of our love story</p>
        </div>

        {isModalOpen && currentMemory && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="memory-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>
                  <i className="fas fa-heart"></i> {currentMemory.title}
                </h2>
                <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p className="memory-date">
                  <i className="fas fa-calendar-alt"></i> Visited on{' '}
                  <span>{currentMemory.date}</span>
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
          <i className="fas fa-heart heart-icon"></i>
          <span>12 Shared Memories</span>
        </div>

        <div className="footer">
          Made with <i className="fas fa-heart" style={{ color: '#e75488' }}></i> in Phnom Penh
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .memory-map-container {
          font-family: 'Raleway', sans-serif;
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #f9d1d1, #f0c5f0, #d1d1f9);
          color: #5a3e5a;
          position: relative;
          overflow: hidden;
        }

        #map {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          filter: sepia(0.2) saturate(1.1) brightness(0.95);
        }

        .map-loading {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 240, 245, 0.8);
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .loading-spinner {
          font-size: 3rem;
          color: #e75488;
        }

        .map-loading p {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: #5a3e5a;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          animation: fadeIn 0.5s;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .memory-modal {
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          background: linear-gradient(to bottom, #fff8f8, #fff0f0);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(163, 95, 163, 0.4);
          z-index: 1001;
          border: 1px solid rgba(255, 182, 193, 0.5);
        }

        .modal-header {
          padding: 20px;
          background: linear-gradient(to right, #e75488, #c86dd7);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        }

        .close-modal {
          background: none;
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .close-modal:hover {
          transform: scale(1.2);
        }

        .modal-body {
          padding: 25px;
          overflow-y: auto;
          max-height: 60vh;
        }

        .memory-date {
          color: #a76ea7;
          margin-bottom: 20px;
          font-style: italic;
          font-size: 1.1em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .memory-gallery {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .memory-image {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition:
            transform 0.4s,
            box-shadow 0.4s;
          border: 1px solid rgba(232, 84, 136, 0.2);
        }

        .memory-image:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(163, 95, 163, 0.3);
        }

        .heart-marker {
          background: linear-gradient(145deg, #ff6b9d, #e75488);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 15px rgba(231, 84, 136, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
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

        .heart-marker:hover {
          transform: scale(1.15);
        }

        .map-title {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          background: rgba(255, 255, 255, 0.85);
          padding: 20px 30px;
          border-radius: 50px;
          box-shadow: 0 5px 25px rgba(163, 95, 163, 0.3);
          text-align: center;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          max-width: 90%;
        }

        .map-title h1 {
          font-family: 'Dancing Script', cursive;
          font-size: 2.5em;
          color: #e75488;
          margin-bottom: 8px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }

        .map-title p {
          font-family: 'Playfair Display', serif;
          font-size: 1.1em;
          color: #5a3e5a;
          font-style: italic;
        }

        .memory-description {
          font-family: 'Playfair Display', serif;
          font-size: 1.1em;
          line-height: 1.6;
          color: #5a3e5a;
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(255, 240, 245, 0.6);
          border-radius: 10px;
          border-left: 4px solid #e75488;
        }

        .hearts-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .heart {
          position: absolute;
          color: rgba(231, 84, 136, 0.15);
          font-size: 20px;
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

        .footer {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 100;
          color: white;
          font-family: 'Raleway', sans-serif;
          font-size: 0.9em;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }

        .photo-counter {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 100;
          background: rgba(255, 255, 255, 0.9);
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9em;
          color: #e75488;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .heart-icon {
          color: #e75488;
          font-size: 1.2em;
          animation: heartbeat 1.5s infinite;
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

        @media (max-width: 768px) {
          .map-title {
            padding: 15px 20px;
            width: 90%;
            border-radius: 20px;
          }

          .map-title h1 {
            font-size: 1.8em;
          }

          .map-title p {
            font-size: 0.9em;
          }

          .modal-body {
            padding: 15px;
          }
        }
      `}</style>
    </>
  )
}
