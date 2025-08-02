/*
  # Library Management System Schema

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `semester` (integer)
      - `created_at` (timestamp)
    
    - `books`
      - `id` (uuid, primary key)
      - `title` (text)
      - `author` (text)
      - `isbn` (text, unique)
      - `available_copies` (integer)
      - `created_at` (timestamp)
    
    - `book_loans`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `book_id` (uuid, foreign key)
      - `borrow_date` (timestamp)
      - `due_date` (timestamp)
      - `return_date` (timestamp)
      - `reminder_sent` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create students table
CREATE TABLE students (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  semester integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create books table
CREATE TABLE books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  isbn text UNIQUE NOT NULL,
  available_copies integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Create book_loans table
CREATE TABLE book_loans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) NOT NULL,
  book_id uuid REFERENCES books(id) NOT NULL,
  borrow_date timestamptz DEFAULT now(),
  due_date timestamptz NOT NULL,
  return_date timestamptz,
  reminder_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_loans ENABLE ROW LEVEL SECURITY;

-- Policies for students
CREATE POLICY "Students can view own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policies for books
CREATE POLICY "Anyone can view books"
  ON books
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for book_loans
CREATE POLICY "Students can view own loans"
  ON book_loans
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

-- Function to send email reminders
CREATE OR REPLACE FUNCTION check_overdue_books()
RETURNS void AS $$
BEGIN
  -- Send reminders for books due in 13, 14, or 15 days
  WITH overdue_books AS (
    SELECT 
      bl.id,
      s.email,
      b.title,
      bl.due_date,
      EXTRACT(DAY FROM now() - bl.due_date) as days_overdue
    FROM book_loans bl
    JOIN students s ON s.id = bl.student_id
    JOIN books b ON b.id = bl.book_id
    WHERE 
      bl.return_date IS NULL 
      AND bl.reminder_sent = false
      AND EXTRACT(DAY FROM now() - bl.due_date) IN (13, 14, 15)
  )
  UPDATE book_loans bl
  SET reminder_sent = true
  FROM overdue_books ob
  WHERE bl.id = ob.id;
END;
$$ LANGUAGE plpgsql;