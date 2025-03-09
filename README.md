# Resume-Reputation
> Read about the key technology and view the apps progress up until now.
>
> TODO
> [ x  ] Implement the UploadThing upload button and configure my UploadThing storage
> [ x  ] Create a Resume Details form that stores all resume instance metadata entered by the user
> [ x  ] Add Clerk Sign Up and Log in, assign users to all activity done storing the above
> [ x  ] Create point system rewarding each phase of the hiring process
> [   ] Create User Leaderboards
> [   ] Create global leaderboards
> [   ] Convert to Serverless by upgrading from mysql to postgresql
> [   ] Deploy to Vercel
>

<h3> <--- Tech ---></h3>

  <p> <b>UploadThing</b> - v.7d - <a href="https://docs.uploadthing.com">https://docs.uploadthing.com </a> </p>
  Used as a cheaper and easier alternative to AWS S3. Provides really clear documentation, and is practically aimed at Next apps. Once I discovered UploadThing I knew I had to   convert and the job was done within hours.
  
<p> <b>Shadcn-ui</b> - <a href="https://ui.shadcn.com/docs">https://ui.shadcn.com/docs</a></p>
At the UI's current state, shadcn-ui stock components have styled my simple multi-page app far better than most of my quick side projects in the past. This is my first time installing shadcn on any of my apps, but I predict Shad+Tailwind to be my go-to styling libraries in the future.

<p> <b>Drizzle ORM</b></p>
Drizzle facilitates the database interaction with a local mysql server. This is a good use case for Drizzle for numerous reasons; like it's ease of being used in a serververless app, as well as the quick mutability of database configuration. Because Drizzle works with so many different databases, if I had to tie in another data store that had to seperate resume data from user data for user privacy for instance, I can tie all database connection in under one roof.
