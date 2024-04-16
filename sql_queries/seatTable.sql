CREATE TABLE Seats (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    train_id INT,
    seat_number INT NOT NULL,
    status ENUM('available', 'booked') DEFAULT 'available',
    FOREIGN KEY (train_id) REFERENCES Trains(train_id) ON DELETE CASCADE
);
