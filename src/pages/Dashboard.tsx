import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Book, Calendar, Bot } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
}

interface BookLoan {
  id: string;
  book: Book;
  borrow_date: string;
  due_date: string;
}

interface StudentInfo {
  semester: number;
}

const Dashboard = () => {
  const { session } = useAuth();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<BookLoan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student info
        const { data: studentData } = await supabase
          .from('students')
          .select('semester')
          .eq('id', session?.user.id)
          .single();

        if (studentData) {
          setStudentInfo(studentData);
        }

        // Fetch borrowed books
        const { data: loansData } = await supabase
          .from('book_loans')
          .select(`
            id,
            borrow_date,
            due_date,
            book:books (
              id,
              title,
              author,
              isbn
            )
          `)
          .eq('student_id', session?.user.id)
          .is('return_date', null);

        if (loansData) {
          setBorrowedBooks(loansData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Student Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Student Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{session?.user.email}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Current Semester</p>
              <p className="font-semibold">{studentInfo?.semester}</p>
            </div>
          </div>
        </div>

        {/* AI Chatbot Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="w-8 h-8 text-indigo-600" />
              <h2 className="text-2xl font-bold">AI Study Assistant</h2>
            </div>
            <a
              href="https://lyfydjzo.chat.qbusiness.us-east-1.on.aws/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Bot className="w-5 h-5 mr-2" />
              Chat with AI Assistant
            </a>
          </div>
          <p className="mt-4 text-gray-600">
            Get instant help with your studies! Our AI assistant can help you with research, answer questions, and provide study guidance.
          </p>
        </div>

        {/* Borrowed Books */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Borrowed Books</h2>
          <div className="grid gap-4">
            {borrowedBooks.length === 0 ? (
              <p className="text-gray-600">No books currently borrowed.</p>
            ) : (
              borrowedBooks.map((loan) => (
                <div key={loan.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Book className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <h3 className="font-semibold">{loan.book.title}</h3>
                        <p className="text-gray-600">{loan.book.author}</p>
                        <p className="text-sm text-gray-500">ISBN: {loan.book.isbn}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due: {format(new Date(loan.due_date), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;