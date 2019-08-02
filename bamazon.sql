DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE inventory (
	item_id INT NOT NULL auto_increment,
    item_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    sales INT NOT NULL DEFAULT 0,
    PRIMARY KEY (item_id)
);




INSERT INTO inventory (item_name, department_name, price, quantity, sales) VALUES
('Wooster Sash Brush', 'Hardware', '17.99','45', '0'),
('Aluminum Ladder', 'Hardware', '450.00','100', '0'),
('Google Home','Electronics','150.00','150', '0'),
('Nike Air Force One','Fashion', '79.50','25', '0'),
('Functional Programming by Eric Elliot','Literature','24.50','30', '0'),
('You Don\'t Know JS by Kyle Simpson', 'Literature','12.99', '20', '0'),
('Lenovo ThinkZone','Electronics','560.00','15', '0'),
('Ski-set','Sports','159.99','150', '0'),
('Asics Running Shoes','Sports','89.99','75', '0'),
('Terpentine','Hardware','11.99','100', '0');

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name TEXT NOT NULL,
over_head_costs DECIMAL(10,2) NOT NULL,
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs) VALUES
('Hardware', '3000'),
('Fashion', '2000'),
('Electronics', '5000'),
('Literature', '2000'),
('Sports', '1200')

