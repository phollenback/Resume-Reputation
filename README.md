# Resume-Reputation
> Read about the key technology and view the app's progress up until now.

## TODO
- [x] Implement the UploadThing upload button and configure my UploadThing storage
- [x] Create a Resume Details form that stores all resume instance metadata entered by the user
- [x] Add Clerk Sign Up and Log in, assign users to all activity done storing the above
- [x] Create point system rewarding each phase of the hiring process
- [ ] Create User Leaderboards
- [ ] Create global leaderboards
- [ ] Convert to Serverless by upgrading from mysql to postgresql
- [ ] Deploy to Vercel

## Tech Stack

### UploadThing - v.7d
[Documentation](https://docs.uploadthing.com)  
Used as a cheaper and easier alternative to AWS S3. Provides really clear documentation, and is practically aimed at Next apps. Once I discovered UploadThing I knew I had to convert and the job was done within hours.

### Shadcn-ui
[Documentation](https://ui.shadcn.com/docs)  
At the UI's current state, shadcn-ui stock components have styled my simple multi-page app far better than most of my quick side projects in the past. This is my first time installing shadcn on any of my apps, but I predict Shad+Tailwind to be my go-to styling libraries in the future.

### Drizzle ORM
Drizzle facilitates the database interaction with a local mysql server. This is a good use case for Drizzle for numerous reasons; like its ease of being used in a serverless app, as well as the quick mutability of database configuration. Because Drizzle works with so many different databases, if I had to tie in another data store that had to separate resume data from user data for user privacy for instance, I can tie all database connection in under one roof.
