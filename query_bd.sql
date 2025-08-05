create table if not exists users(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT,
masterpass TEXT
);

create table if not exists data( 
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT Not NULL,
user_name TEXT,
password TEXT,
url TEXT,
notes TEXT,
user_id INTEGER, 
FOREIGN KEY (user_id) REFERENCES users(id)
);
