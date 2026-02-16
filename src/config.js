const config={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL), //Here we are doing this setup so that we can easily use enviorment variables without writting such long lines
                                                        //Here we converted to string because all env variables must be string so if by mistake in .env we set some variable as number value we convert it to string
                                                        
    appwriteProjectID :String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionID:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketID:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default config