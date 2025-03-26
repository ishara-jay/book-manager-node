CREATE TABLE book (
    bookID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(43) NOT NULL,
    author VARCHAR(18) NOT NULL,
    numberOfBooks INT NOT NULL,
    topic VARCHAR(18) NOT NULL
);

INSERT INTO book (name, author, numberOfBooks, topic) 
VALUES ('The Art of Computer Programming', 'Donald Knuth', 5, 'Algorithms');

INSERT INTO book (name, author, numberOfBooks, topic) 
VALUES ('Clean Code', 'Robert C. Martin', 10, 'Software Eng.');

CREATE USER 'thomas'@'localhost' IDENTIFIED BY 'JPALbMyg';

GRANT ALL PRIVILEGES ON *.* TO 'thomas'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;

