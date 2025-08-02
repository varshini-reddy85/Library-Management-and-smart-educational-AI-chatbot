import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Bot, Library, Brain } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Student Profile Hub</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your all-in-one platform for managing library resources and accessing AI-powered learning assistance
          </p>
          <Link
            to="/login"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Access Your Profile
          </Link>
        </div>
      </div>

      {/* Main Features */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Digital Library Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
                    backgroundBlendMode: 'overlay',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Library className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
                  Digital Library
                </h2>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2"></span>
                    Browse and borrow from our extensive collection of books
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2"></span>
                    Track your borrowed books and due dates
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2"></span>
                    Receive timely return reminders
                  </li>
                </ul>
                <Link
                  to="/login"
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700"
                >
                  Access Library
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* AI Chatbot Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
                    backgroundBlendMode: 'overlay',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Bot className="w-6 h-6 mr-2 text-indigo-600" />
                  Learning AI Assistant
                </h2>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2"></span>
                    Get instant answers to your academic questions
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2"></span>
                    Receive personalized study recommendations
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2"></span>
                    Access 24/7 learning support
                  </li>
                </ul>
                <Link
                  to="/login"
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700"
                >
                  Start Learning
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;