CREATE TABLE "resumes" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"name" varchar(255),
	"positionTitle" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"keywords" varchar(255)[] NOT NULL,
	"date" varchar(255) NOT NULL,
	"fileUrl" varchar(255),
	"completed" integer
);
