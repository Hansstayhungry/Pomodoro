-- seeds/01_users.sql
-- users seeds
INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES 
  ('Alice', 'Smith', 'alicesmith123@gmail.com', 'alice123!', now(), now()), 
  ('Bob', 'Jones', 'bobjones@gmail.com', 'bobj456@', now(), now()), 
  ('Charlie', 'Brown', 'charliebrown@gmail.com', 'charlie789#', now(), now()), 
  ('David', 'Lee', 'davidlee@gmail.com', 'david101$', now(), now()), 
  ('Emma', 'Watson', 'emma.watson@gmail.com', 'emmaw202%', now(), now()), 
  ('Frank', 'Miller', 'frankmiller@gmail.com', 'frank303^', now(), now()), 
  ('Grace', 'Kim', 'gracekim@gmail.com', 'grace404&', now(), now()), 
  ('Harry', 'Potter', 'harrypotter@gmail.com', 'harry505*', now(), now()), 
  ('Iris', 'Wang', 'iriswang@gmail.com', 'iris606+', now(), now()), 
  ('Jack', 'Chen', 'jackchen@gmail.com', 'jack707=', now(), now()), 
  ('Kate', 'Wilson', 'katewilson@gmail.com', 'kate808?', now(), now()), 
  ('Leo', 'Garcia', 'leo.garcia@gmail.com', 'leog909~', now(), now());