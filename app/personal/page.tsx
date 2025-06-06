'use client'

import { useEffect, useRef, useState } from 'react'

const colors = ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1']

export default function KawaiiPage() {
  const heartsContainerRef = useRef<HTMLDivElement>(null)
  const [quoteVisible, setQuoteVisible] = useState(false)

  // Create floating hearts
  useEffect(() => {
    if (!heartsContainerRef.current) return

    const container = heartsContainerRef.current
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div')
      heart.className = 'floating-heart absolute text-pink-400'
      heart.innerHTML = '♥'
      heart.style.left = `${Math.random() * 100}vw`
      heart.style.top = `${Math.random() * 100}vh`
      heart.style.fontSize = `${Math.random() * 20 + 10}px`
      heart.style.animationDelay = `${Math.random() * 3}s`
      heart.style.color = colors[Math.floor(Math.random() * colors.length)]

      container.appendChild(heart)
    }
  }, []) // colors is constant so no need to add here

  // Create sparkle elements dynamically
  function createSparkles(count: number) {
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div')
      sparkle.className = 'sparkle absolute pointer-events-none text-pink-400'
      sparkle.innerHTML = '✧'
      sparkle.style.left = `${Math.random() * 100}vw`
      sparkle.style.top = `${Math.random() * 100}vh`
      sparkle.style.fontSize = `${Math.random() * 20 + 10}px`
      sparkle.style.animationDelay = `${Math.random()}s`

      document.body.appendChild(sparkle)

      setTimeout(() => {
        sparkle.remove()
      }, 1500)
    }
  }

  // Handle button click
  function handleClick() {
    setQuoteVisible((v) => !v)
    createSparkles(20)
  }

  // Sparkles on mouse move
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (Math.random() > 0.7) {
        const sparkle = document.createElement('div')
        sparkle.className = 'sparkle absolute pointer-events-none text-pink-300'
        sparkle.innerHTML = '⋆'
        sparkle.style.left = `${e.pageX}px`
        sparkle.style.top = `${e.pageY}px`
        sparkle.style.fontSize = '16px'

        document.body.appendChild(sparkle)

        setTimeout(() => {
          sparkle.remove()
        }, 1500)
      }
    }
    document.addEventListener('mousemove', onMouseMove)
    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Interval sparkles
  useEffect(() => {
    const interval = setInterval(() => createSparkles(2), 1000)
    return () => clearInterval(interval)
  }, [])

  // Initial big sparkles on mount
  useEffect(() => {
    const timeout = setTimeout(() => createSparkles(30), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes float-heart {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        .sparkle {
          animation: sparkle 1.5s infinite;
          pointer-events: none;
          position: absolute;
        }
        .floating-heart {
          animation: float-heart 4s ease-in-out infinite;
          opacity: 0.7;
          pointer-events: none;
          position: absolute;
        }
        .animate-blink {
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        body {
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='%23ff69b4' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>"), auto;
          background-color: #fff5f7;
        }
      `}</style>

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff5f7] p-8">
        <div ref={heartsContainerRef} />

        {/* Kawaii clouds */}
        <div className="pointer-events-none absolute top-10 left-10 select-none text-4xl text-pink-300">
          (´｡• ω •｡`)
        </div>
        <div className="pointer-events-none absolute bottom-20 right-10 select-none text-4xl text-pink-300">
          (◕‿◕✿)
        </div>

        <div className="z-10 mx-auto max-w-md p-6 text-center relative">
          {/* Speech bubble */}
          <div className="floating relative mb-8 rounded-3xl border-4 border-pink-300 bg-white p-8 shadow-lg">
            <div className="absolute -bottom-6 right-10 h-0 w-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-pink-300" />
            <h1 className="mb-2 text-4xl font-bold text-pink-600">
              You're so <span className="text-pink-800">kawaii!</span>
            </h1>
            <p className="text-pink-500">〜(꒪꒳꒪)〜</p>
          </div>

          {/* Anime face */}
          <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-full bg-pink-300">
            <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full bg-pink-100">
              {/* Eyes */}
              <div className="relative z-10 mb-2 flex">
                <div className="relative mx-1 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <div className="animate-blink h-6 w-6 rounded-full bg-pink-600" />
                </div>
                <div className="relative mx-1 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <div className="animate-blink h-6 w-6 rounded-full bg-pink-600" />
                </div>
              </div>
              {/* Blush */}
              <div className="relative z-10 mb-1 flex">
                <div className="mx-4 h-3 w-6 rounded-full bg-pink-300" />
                <div className="mx-4 h-3 w-6 rounded-full bg-pink-300" />
              </div>
              {/* Mouth */}
              <div className="relative z-10 h-6 w-12 rounded-b-full bg-pink-400" />
              {/* Sparkles in eyes */}
              <div className="pointer-events-none absolute top-8 left-8 select-none text-xs text-white">
                ✧
              </div>
              <div className="pointer-events-none absolute top-8 right-8 select-none text-xs text-white">
                ✧
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-400 text-2xl text-white select-none">
              ♡
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleClick}
            className="relative mb-6 overflow-hidden rounded-full border-2 border-pink-700 bg-pink-500 px-6 py-3 text-lg font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-pink-600 select-none"
          >
            <span className="relative z-10 flex items-center">
              <i className="fas fa-heart mr-2" />
              {quoteVisible ? 'Aishiteru!' : 'Click me, senpai!'}
            </span>
            <span className="absolute inset-0 bg-pink-400 opacity-0 transition-opacity duration-300 hover:opacity-30"></span>
          </button>

          {/* Hidden anime quote */}
          <div
            className={`rounded-xl border-2 border-pink-300 bg-pink-100 p-4 text-pink-700 transition-opacity duration-500 ${
              quoteVisible ? 'block opacity-100' : 'hidden opacity-0'
            }`}
          >
            <p className="italic">
              &quot;No matter how far apart we are, my heart will always find its way to you.&quot;
            </p>
            <p className="mt-2 text-sm text-pink-500">
              - Your personal anime love interest ♡
            </p>
            <div className="mt-2 flex justify-center space-x-2 select-none">
              <span>(｡♥‿♥｡)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
