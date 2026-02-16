import config from "../config";
import {Client,ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);
        this.databases= new Databases(this.client);
        this.bucket= new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userID}){
        try {
            return await this.databases.createDocument(    //If this gives error than pass the params of createPost inside json
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,      //slug is like the document id for our document
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                
            }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.error(error)
            return false
        }
    }

    //Now we want to get all the posts but we cant directly use listDocuments of appwrite since it will give all the documents, whether they have active or not status
    //therefore we use query

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            console.error(error)
        }
    }

    //file upload services  (should be created in seprate service file but for now we are ignoring it)

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileID
            )
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

getFilePreview(fileID){       //Debugging that getFilePreview method not works instead used getFileView
    return this.bucket.getFileView(
        config.appwriteBucketID,
        fileID
    )
}

}

const service= new Service()
export default service