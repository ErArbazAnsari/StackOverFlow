import { IndexType, Permission } from "node-appwrite";
import { db, questionAttachmentCollection, questionCollection } from "../name";
import { databases } from "./config";
import { permission } from "process";
import { Flag } from "appwrite";

export default async function createQestionCollection() {
    // Create a new collection
    await databases.createCollection(
        db,
        questionCollection,
        questionCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
    );
    console.log("Collection created: ", questionCollection);

    // Creating Attributes and Indexes
    await Promise.all([
        databases.createStringAttribute(
            db,
            questionCollection,
            "title",
            100,
            true
        ),
        databases.createStringAttribute(
            db,
            questionCollection,
            "content",
            10000,
            true
        ),
        databases.createStringAttribute(
            db,
            questionCollection,
            "authorId",
            50,
            true
        ),
        databases.createStringAttribute(
            db,
            questionCollection,
            "tags",
            50,
            true,
            undefined,
            true
        ),
        databases.createStringAttribute(
            db,
            questionCollection,
            "attachmentId",
            50,
            false
        ),
    ]);
    console.log("Question Attributes created");

    // Create Indexes
    /*
    await Promise.all([
        databases.createIndex(
            db,
            questionCollection,
            "title",
            IndexType.Fulltext,
            ["title"],
            ["asc"]
        ),
        databases.createIndex(
            db,
            questionCollection,
            "content",
            IndexType.Fulltext,
            ["content"],
            ["asc"]
        ),
    ]); */
}
