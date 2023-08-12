-- seeds/01_users.sql
-- users seeds
INSERT INTO users (first_name, last_name, email, password) VALUES 
  ('Alice', 'Smith', 'alicesmith123@gmail.com', '$2a$10$EFVDeED3rwW4rQj2Ifzele8GM733ce86m42mG5heKnVFm9vay1y/K'), 
  ('Bob', 'Jones', 'bobjones@gmail.com', '$2a$10$lzaF7Lg3K0ULJCug3IbnwuTmsGBqDlEAx/4RKswfgJ1L2u8936PKS'), 
  ('Charlie', 'Brown', 'charliebrown@gmail.com', '$2a$10$Dzpd8kqrP7hUSx8G5kQ00O/dZ57G5OtisY.Mb3XKxTdYWc5Hol6WK'), 
  ('David', 'Lee', 'davidlee@gmail.com', '$2a$10$csQ.w6yWv1qqyfwYDMwX5OA15Kur4jX8EiCPjAfmBur3TUdm0CJ5u'), 
  ('Emma', 'Watson', 'emma.watson@gmail.com', '$2a$10$gq2P6i7l2bFAEz45poZMC.znFMaU361Kv8IEmTOHy8423hny8Piiu'), 
  ('Frank', 'Miller', 'frankmiller@gmail.com', '$2a$10$psI8YnbH6D9nQuwMXnbDNu4AhNp4scP5O6BuQ4yQrzKjGaOHGdlm.'), 
  ('Grace', 'Kim', 'gracekim@gmail.com', '$2a$10$r/rMyFP6VBw/pggHyhnx/OwiIXVUYgdZY7dIz9At1VaXncFasQsCG'), 
  ('Harry', 'Potter', 'harrypotter@gmail.com', '$2a$10$ivIDCqbzGQJ6a7ntgeU2xulPIjWS/3dWX6igzzlk6UjuHrT/dUcHi'), 
  ('Iris', 'Wang', 'iriswang@gmail.com', '$2a$10$6eE/4y5cwku3DS1ZnBs4muhfbZUJbgaC6bkpUKWKNXxGZ7ukPdySG'), 
  ('Jack', 'Chen', 'jackchen@gmail.com', '$2a$10$W80A.zctuR3lhGOF//NZDuYnAvxT5YlYp/VsOeQCr2Jx0tNB5kuTK'), 
  ('Kate', 'Wilson', 'katewilson@gmail.com', '$2a$10$ZZrB0IZUo1Bam0EkhrYVI.1ojhhq.mGTGwGKhEo2TrMPtU1B4KXfe'), 
  ('Leo', 'Garcia', 'leo.garcia@gmail.com', '$2a$10$0fN3aCE1Wn7vkZoxd6NIQuTVTa6HpBevm92vQYpCgN6Xk2D6DSQVK');



-- seeds/01_users.sql
-- users seeds
-- INSERT INTO users (first_name, last_name, email, password) VALUES 
--   ('Alice', 'Smith', 'alicesmith123@gmail.com', 'alice123!'), 
--   ('Bob', 'Jones', 'bobjones@gmail.com', 'bobj456@'), 
--   ('Charlie', 'Brown', 'charliebrown@gmail.com', 'charlie789#'), 
--   ('David', 'Lee', 'davidlee@gmail.com', 'david101$'), 
--   ('Emma', 'Watson', 'emma.watson@gmail.com', 'emmaw202%'), 
--   ('Frank', 'Miller', 'frankmiller@gmail.com', 'frank303^'), 
--   ('Grace', 'Kim', 'gracekim@gmail.com', 'grace404&'), 
--   ('Harry', 'Potter', 'harrypotter@gmail.com', 'harry505*'), 
--   ('Iris', 'Wang', 'iriswang@gmail.com', 'iris606+'), 
--   ('Jack', 'Chen', 'jackchen@gmail.com', 'jack707='), 
--   ('Kate', 'Wilson', 'katewilson@gmail.com', 'kate808?'), 
--   ('Leo', 'Garcia', 'leo.garcia@gmail.com', 'leog909~');