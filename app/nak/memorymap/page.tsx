'use client'

import { genPageMetadata } from 'app/seo'
import { useEffect } from 'react'
import Head from 'next/head'

// export const metadata = genPageMetadata({ title: 'Our Journey in Phnom Penh' })

export default function MemoryMap() {
  useEffect(() => {
    // Load Leaflet CSS dynamically
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
    document.head.appendChild(link)

    // Load Leaflet JS dynamically
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
    script.async = true
    script.onload = initializeMap
    document.body.appendChild(script)

    // Create floating hearts
    createFloatingHearts()

    return () => {
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  const createFloatingHearts = () => {
    const heartsContainer = document.getElementById('heartsContainer')
    if (!heartsContainer) return

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

  const initializeMap = () => {
    // Check if L (Leaflet) is available
    if (typeof L === 'undefined') return

    // Initialize the map
    const map = L.map('map').setView([11.5564, 104.9282], 14)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Couple's memory locations in Phnom Penh
    const memories = [
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

    // Add heart markers for each memory
    memories.forEach((memory) => {
      const marker = L.marker([memory.lat, memory.lng], {
        icon: L.divIcon({
          className: 'heart-marker',
          html: '♥',
          iconSize: [36, 36],
        }),
      }).addTo(map)

      // Add click event to show memory
      marker.on('click', () => {
        showMemoryModal(memory)
      })
    })

    // Show memory in modal
    const showMemoryModal = (memory) => {
      const memoryTitle = document.getElementById('memoryTitle')
      const memoryDate = document.getElementById('memoryDate')
      const memoryDescription = document.getElementById('memoryDescription')
      const gallery = document.getElementById('memoryGallery')

      if (memoryTitle && memoryDate && memoryDescription && gallery) {
        memoryTitle.innerHTML = `<i class="fas fa-heart"></i> ${memory.title}`
        memoryDate.textContent = memory.date
        memoryDescription.textContent = memory.description

        gallery.innerHTML = ''

        memory.images.forEach((imageUrl) => {
          const img = document.createElement('img')
          img.src = imageUrl
          img.alt = memory.title
          img.className = 'memory-image'
          gallery.appendChild(img)
        })

        const modal = document.getElementById('memoryModal')
        if (modal) modal.style.display = 'block'
      }
    }

    // Close modal
    const closeModalBtn = document.querySelector('.close-modal')
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        const modal = document.getElementById('memoryModal')
        if (modal) modal.style.display = 'none'
      })
    }

    // Close modal when clicking outside
    const modalOverlay = document.getElementById('memoryModal')
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.style.display = 'none'
        }
      })
    }

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('memoryModal')
        if (modal) modal.style.display = 'none'
      }
    })
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Raleway:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <div className="relative h-screen w-full overflow-hidden">
        {/* Floating hearts background */}
        <div
          className="pointer-events-none fixed top-0 left-0 z-0 h-full w-full overflow-hidden"
          id="heartsContainer"
        ></div>

        {/* Map container */}
        <div id="map" className="absolute top-0 bottom-0 z-10 w-full"></div>

        {/* Map title */}
        <div className="absolute top-5 left-1/2 z-20 max-w-[90%] -translate-x-1/2 transform rounded-full border border-white/50 bg-white/85 px-6 py-5 text-center shadow-lg backdrop-blur-sm">
          <h1 className="font-dancing mb-2 text-4xl text-pink-600 drop-shadow">
            Our Journey in Phnom Penh
          </h1>
          <p className="font-playfair text-lg text-purple-900 italic">
            Every heart holds a precious memory of our love story
          </p>
        </div>

        {/* Memory modal */}
        <div id="memoryModal" className="animate-fadeIn fixed inset-0 z-30 hidden bg-black/70">
          <div className="fixed top-1/2 left-1/2 z-40 max-h-[90vh] w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl border border-pink-200 bg-gradient-to-b from-white/95 to-white/90 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/30 bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-4 text-white">
              <h2 id="memoryTitle" className="text-xl font-semibold">
                <i className="fas fa-heart mr-2"></i> Memory Location
              </h2>
              <button className="close-modal cursor-pointer border-none bg-transparent text-2xl text-white transition-transform hover:scale-125">
                &times;
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-6">
              <p
                id="memoryDate"
                className="mb-5 flex items-center gap-2 text-lg text-purple-700 italic"
              >
                <i className="fas fa-calendar-alt"></i> Visited on <span>January 1, 2023</span>
              </p>
              <div
                id="memoryDescription"
                className="font-playfair mb-5 rounded-lg border-l-4 border-pink-500 bg-pink-50/60 p-4 text-lg leading-relaxed text-purple-900"
              >
                Our very first date where we talked for hours over coffee
              </div>
              <div id="memoryGallery" className="flex flex-col gap-5"></div>
            </div>
          </div>
        </div>

        {/* Photo counter */}
        <div className="absolute right-5 bottom-5 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm text-pink-600 shadow">
          <i className="fas fa-heart animate-pulse text-lg text-pink-600"></i>
          <span>12 Shared Memories</span>
        </div>

        {/* Footer */}
        <div className="font-raleway absolute right-0 bottom-5 left-0 z-20 text-center text-sm text-white drop-shadow">
          Made with <i className="fas fa-heart text-pink-500"></i> in Phnom Penh
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s;
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

        body {
          font-family: 'Raleway', sans-serif;
          background: linear-gradient(135deg, #f9d1d1, #f0c5f0, #d1d1f9);
          color: #5a3e5a;
        }

        #map {
          filter: sepia(0.2) saturate(1.1) brightness(0.95);
        }

        .font-dancing {
          font-family: 'Dancing Script', cursive;
        }

        .font-playfair {
          font-family: 'Playfair Display', serif;
        }

        .font-raleway {
          font-family: 'Raleway', sans-serif;
        }
      `}</style>
    </>
  )
}
