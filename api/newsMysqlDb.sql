CREATE SCHEMA okogai_news_db COLLATE utf8mb3_general_ci;

USE okogai_news_db;

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    image VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    author VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

INSERT INTO posts (title, text, image) VALUES
('Global Economy Trends', 'An in-depth analysis of the current global economy and its future direction.', 'images/a2af562f-159c-48f0-9ff8-9f9a2d3979a6.jpg'),
('AI and the Future', 'Exploring how artificial intelligence is reshaping industries and our daily lives.', 'images/0cda3148-bd33-4f48-b5f2-88a631ef4217.jpg'),
('World Cup 2024 Highlights', 'Highlights from the most exciting moments of the 2024 World Cup.', 'images/ae12d19a-8bad-4bdd-b754-e9ac028f7acb.jpg');


INSERT INTO comments (post_id, author, comment) VALUES
(1, 'Alice Cooper', 'Great analysis! Very informative and well-written.'),
(1, 'Bob Marley', 'Interesting read, but I think the conclusion could be more detailed.'),
(2, 'Tech Geek', 'AI is fascinating! Can’t wait to see where it takes us in the next decade.'),
(2, 'Emma Stone', 'AI will definitely change the way we work and live, but what about its ethics?'),
(3, 'Jack Ryan', 'The World Cup this year was phenomenal! Can’t believe the underdog team won.'),
(3, 'Sarah Lee', 'Amazing highlights! The final match was nerve-wracking.');
