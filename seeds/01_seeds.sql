INSERT INTO users (name, email, password)
  VALUES ('Frodo', 'oneRing@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Samwise', 'gardenerHobbit@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
    ('Pippin', 'foolOfATook@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
    ('Merry', 'comesInPints@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES (1, 'Mount Doom', 'Lovely Mountainside views', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930.61, 6, 4, 8, 'Middle-Earth', '123 Mountain Crest', 'Doom', 'Mordor', 123654, true),
  (2, 'Bag End', 'Beautiful rolling hills', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 420.00, 12, 6, 9, 'Middle-Earth', '987 Under Hill', 'Hobbiton', 'The Shire', 574824, true),
  (4, 'Rivendale', 'Secret Forest village', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 1300.99, 2, 3, 4, 'Middle-Earth', '093 Riverside Way', 'Forest', 'Rivendale', 163404, true);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES ('2018-09-11', '2018-09-26', 2, 3), 
    ('2019-01-04', '2019-02-01', 1, 3),
    ('2021-10-01', '2021-10-14', 2, 3),
    ('2014-10-21', '2014-10-22', 3, 1);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES (2, 3, 2, 3, 'Nice'), 
    (1, 2, 3, 1, 'Alright'), 
    (3, 1, 2, 4, 'Perfect'), 
    (2, 3, 1, 3, 'WoW');