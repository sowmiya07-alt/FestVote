CREATE DATABASE IF NOT EXISTS cultural_fest_voting;
USE cultural_fest_voting;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    college_id VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nominees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    year VARCHAR(50) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    nominee_id INT NOT NULL,
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (nominee_id) REFERENCES nominees(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_vote (user_id, category_id)
);

-- Seed Data

-- Admin User: password is 'Admin@123' (hashed)
-- Student Users: password is 'password123' (hashed)
INSERT INTO users (name, college_id, email, password, role) VALUES 
('System Admin', 'ADMIN001', 'admin@college.com', '$2b$10$tZ8QvX9n5aO02/A4qZtD9uY1V7.U3h3fUaEqtW3l1YQxO0I4r.0s6', 'admin'),
('Rahul Sharma', 'STU2024001', 'student1@college.com', '$2b$10$dJbzH4YcOqN6sDkT8F4C2OuJ8L50l4kM7B5rTXZP6n7zJ9j0w6e5y', 'student'),
('Ananya Iyer', 'STU2024002', 'student2@college.com', '$2b$10$dJbzH4YcOqN6sDkT8F4C2OuJ8L50l4kM7B5rTXZP6n7zJ9j0w6e5y', 'student'),
('Vikram Singh', 'STU2024003', 'student3@college.com', '$2b$10$dJbzH4YcOqN6sDkT8F4C2OuJ8L50l4kM7B5rTXZP6n7zJ9j0w6e5y', 'student');

INSERT INTO categories (name, description, status) VALUES 
('Best Singer', 'Award for the most melodious and captivating vocal performance.', 'active'),
('Best Dancer', 'Award for the most energetic and rhythmic dance performance.', 'active'),
('Best Actor', 'Award for the most expressive and moving dramatic performance.', 'active'),
('Best Artist', 'Award for the most creative and visually stunning artwork.', 'active'),
('Best Emcee', 'Award for the most engaging and charismatic event host.', 'active');

-- Best Singer Nominees
INSERT INTO nominees (category_id, name, department, year, description, image) VALUES 
(1, 'Neha Reddy', 'Computer Science', '3rd Year', 'Trained classical singer with a versatile voice.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha'),
(1, 'Arjun Patel', 'Mechanical', '4th Year', 'Lead vocalist of the college rock band.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun'),
(1, 'Shruti Hassan', 'Information Technology', '2nd Year', 'Won 1st prize in the intra-college singing competition.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shruti');

-- Best Dancer Nominees
INSERT INTO nominees (category_id, name, department, year, description, image) VALUES 
(2, 'Priya Das', 'Electrical', '3rd Year', 'Renowned for contemporary and expressive dance moves.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'),
(2, 'Karthik Kumar', 'Civil', '4th Year', 'Hip-hop specialist and choreographer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik'),
(2, 'Meghna Roy', 'Biotechnology', '1st Year', 'Classically trained Bharatanatyam dancer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meghna');

-- Best Actor Nominees
INSERT INTO nominees (category_id, name, department, year, description, image) VALUES 
(3, 'Rohan Verma', 'Computer Science', '4th Year', 'Lead role in the college theater play "The Tempest".', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan'),
(3, 'Nisha Gupta', 'Electronics', '3rd Year', 'Known for her impeccable comic timing.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nisha'),
(3, 'Varun Dhawan', 'Mechanical', '2nd Year', 'Method actor with intense performances.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Varun');

-- Best Artist Nominees
INSERT INTO nominees (category_id, name, department, year, description, image) VALUES 
(4, 'Siddharth Bose', 'Architecture', '3rd Year', 'Specializes in charcoal portraits and mural painting.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth'),
(4, 'Kavya Pillai', 'Fashion Technology', '2nd Year', 'Abstract artist with exhibitions across the city.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya'),
(4, 'Tanya Menon', 'Information Technology', '4th Year', 'Digital art expert and the face of our magazine.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanya');

-- Best Emcee Nominees
INSERT INTO nominees (category_id, name, department, year, description, image) VALUES 
(5, 'Aditya Choudhury', 'Civil', '4th Year', 'The voice of our college since his freshman year.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya'),
(5, 'Sana Khan', 'Computer Science', '3rd Year', 'Witty, energetic, and a crowd favorite.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sana');
