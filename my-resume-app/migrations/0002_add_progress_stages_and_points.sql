ALTER TABLE resumes
MODIFY COLUMN progress ENUM(
  'applied',
  'phone_screen',
  'technical_test',
  'interview_1',
  'interview_2',
  'offer_received',
  'hired'
) DEFAULT 'applied';

ALTER TABLE resumes
ADD COLUMN points INT DEFAULT 0 AFTER completed;

ALTER TABLE resumes
ADD COLUMN details TEXT AFTER points; 