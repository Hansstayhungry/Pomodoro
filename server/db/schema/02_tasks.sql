-- schema/02_tasks.sql
DROP TABLE IF EXISTS tasks CASCADE;
-- CREATE TASKS
CREATE TABLE tasks ( 
  id SERIAL PRIMARY KEY NOT NULL, 
  title TEXT NOT NULL, 
  description TEXT, 
  status VARCHAR(255) NOT NULL CHECK (status IN ('pending', 'in progress', 'completed', 'canceled')), 
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE 
);
