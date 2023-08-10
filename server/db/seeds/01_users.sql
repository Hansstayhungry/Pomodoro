-- seeds/01_users.sql
-- users seeds
INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES 
  ('Alice', 'Smith', 'alicesmith123@gmail.com', md5('alice123!'), now(), now()), 
  ('Bob', 'Jones', 'bobjones@gmail.com', md5('bobj456@'), now(), now()), 
  ('Charlie', 'Brown', 'charliebrown@gmail.com', md5('charlie789#'), now(), now()), 
  ('David', 'Lee', 'davidlee@gmail.com', md5('david101$'), now(), now()), 
  ('Emma', 'Watson', 'emma.watson@gmail.com', md5('emmaw202%'), now(), now()), 
  ('Frank', 'Miller', 'frankmiller@gmail.com', md5('frank303^'), now(), now()), 
  ('Grace', 'Kim', 'gracekim@gmail.com', md5('grace404&'), now(), now()), 
  ('Harry', 'Potter', 'harrypotter@gmail.com', md5('harry505*'), now(), now()), 
  ('Iris', 'Wang', 'iriswang@gmail.com', md5('iris606+'), now(), now()), 
  ('Jack', 'Chen', 'jackchen@gmail.com', md5('jack707='), now(), now()), 
  ('Kate', 'Wilson', 'katewilson@gmail.com', md5('kate808?'), now(), now()), 
  ('Leo', 'Garcia', 'leo.garcia@gmail.com', md5('leog909~'), now(), now());