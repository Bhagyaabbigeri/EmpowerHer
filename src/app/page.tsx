// src/app/page.tsx
import { AlertTriangle, Bell, MapPin, Shield, Smartphone, Users, Wifi, Home, Car, Phone, ShieldAlert, ShieldCheck, HeartPulse, Search, Building2, Train, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 mb-6 leading-tight">
              Empowering Women, Building Futures
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Access resources, mentorship, and support to help you thrive in your personal and professional life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/get-started" 
                className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                to="/learn-more" 
                className="px-8 py-3 border-2 border-primary text-primary bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOS Emergency Section */}
      <section className="space-y-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">SOS Emergency</h2>
          <p className="text-gray-600 mt-2">Immediate help at your fingertips</p>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="text-2xl text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Emergency SOS</h3>
                <p className="text-gray-600 mt-1">Quickly alert emergency contacts with your location</p>
              </div>
              <Link href="/sos" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Activate SOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Threat Detection Section */}
      <section className="space-y-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">AI Threat Detection</h2>
          <p className="text-gray-600 mt-2">Stay protected with intelligent monitoring</p>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <ShieldCheck className="text-2xl text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Voice Threat Detection</h3>
                <p className="text-gray-600 mt-1">AI-powered voice analysis to detect potential threats</p>
              </div>
              <Link href="/ai-threat-detection" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Enable Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="space-y-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Emergency Contacts</h2>
          <p className="text-gray-600 mt-2">Quick access to important contacts</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: 'Police', number: '100', icon: <Shield className="h-5 w-5" /> },
            { name: 'Ambulance', number: '108', icon: <HeartPulse className="h-5 w-5" /> },
            { name: 'Women Helpline', number: '181', icon: <Phone className="h-5 w-5" /> },
            { name: 'Child Helpline', number: '1098', icon: <Users className="h-5 w-5" /> }
          ].map((contact, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  {contact.icon}
                </div>
                <div>
                  <h4 className="font-medium">{contact.name}</h4>
                  <a href={`tel:${contact.number}`} className="text-blue-600 hover:underline">
                    {contact.number}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Find Nearby Help Section */}
      <section className="space-y-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Find Nearby Help</h2>
          <p className="text-gray-600 mt-2">Locate the nearest help centers and safe spaces</p>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MapPin className="text-2xl text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Nearby Safety Points</h3>
                <p className="text-gray-600 mt-1">Find police stations, hospitals, and safe spaces near you</p>
              </div>
              <Link href="/nearby-help" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                View Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Working Women Hostel/PG Section */}
      <section className="space-y-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Working Women Hostel/PG</h2>
          <p className="text-gray-600 mt-2">Safe and secure accommodation options</p>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Home className="text-2xl text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Find Safe Accommodation</h3>
                <p className="text-gray-600 mt-1">Verified hostels and PGs for working women</p>
              </div>
              <Link href="/hostel-pg" className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                Browse Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Safety Section */}
      <section className="space-y-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Travel Safety</h2>
          <p className="text-gray-600 mt-2">Safe travel planning and real-time tracking</p>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Car className="text-2xl text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Safe Travel Planner</h3>
                <p className="text-gray-600 mt-1">Plan and share your travel routes with trusted contacts</p>
              </div>
              <Link href="/travel-safety" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Plan Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Online Safety Section */}
      <section className="space-y-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Online Safety</h2>
          <p className="text-gray-600 mt-2">Protect your digital presence</p>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <ShieldAlert className="text-2xl text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Digital Safety Guide</h3>
                <p className="text-gray-600 mt-1">Learn how to stay safe online and protect your privacy</p>
              </div>
              <Link href="/online-safety" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors Section */}
      <section className="space-y-4 mb-12">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Featured Mentors</h3>
          <Link 
            href="/mentors" 
            className="flex items-center text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        {/* Mentors grid will go here */}
      </section>

      {/* Resources CTA */}
      <section className="bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Explore More Resources</h3>
        <p className="text-gray-600 mb-6">Discover funding opportunities, women's schemes, and career development resources</p>
        <Link 
          href="/resources"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          View All Resources <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}