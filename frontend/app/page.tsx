import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to FundiLink
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with trusted local service providers in Uganda
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/search" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Find Services
          </Link>
          <Link 
            href="/register" 
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Become a Provider
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">For Customers</h3>
            <p className="text-gray-600">
              Find verified service providers, compare quotes, and book services
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">For Providers</h3>
            <p className="text-gray-600">
              Create your profile, showcase your work, and grow your business
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Trusted Platform</h3>
            <p className="text-gray-600">
              Verified reviews, secure bookings, and quality assurance
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
