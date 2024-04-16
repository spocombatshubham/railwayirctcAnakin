CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    train_id INT,
    user_id INT,
    seat_number INT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (train_id) REFERENCES Trains(train_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
