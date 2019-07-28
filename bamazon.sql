DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE inventory (
	item_id INT NOT NULL auto_increment,
    item_name TEXT NOT NULL,
    category_name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    sales DECIMAL(10, 2),
    PRIMARY KEY (item_id)
);

INSERT INTO inventory (item_name, category_name, price, quantity) VALUES
('Wooster 2inch Sash Brush', 'Hardware', '17.99','45'),
('32ft Ladder', 'Hardware', '450.00','12'),
('Google Home','Electronics','150.00','150'),
('Nike Air Force One','Fashion', '79.50','25'),
('Functional Programming by Eric Elliot','Literature','24.50','30'),
('You Don\'t Know JS by Kyle Simpson', 'Literature','12.99', '20'),
('Lenovo ThinkZone','Electronics','560.00','15'),
('Computer Science Degree','Scholarly','60000.00','150')