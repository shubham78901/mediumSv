import mongoose from 'mongoose';

const Connection = async () => {
    const MONGO_USERNAME = 'scrypt'; // Hardcoded MongoDB username
    const MONGO_PASSWORD = 'scrypt'; // Hardcoded MongoDB password
    const MONGO_DB_NAME = 'blog';

    
    // Construct MongoDB connection URL with hardcoded credentials
    // const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb:27017/${MONGO_DB_NAME}?authSource=admin`;
    const MONGO_URL='mongodb+srv://Shubham:Shubham123@clusterblogs.dsf7wsh.mongodb.net/blog?retryWrites=true&w=majority&appName=ClusterBlog';
    try {
        // Connect to MongoDB using the constructed URL
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error while connecting to the database ', error);
    }
};

export default Connection;


// import mongoose from 'mongoose';

// const connectToDatabase = async () => {
//     const MONGO_USERNAME = 'scrypt'; // MongoDB username
//     const MONGO_PASSWORD = 'scrypt'; // MongoDB password
//     const MONGO_DB_NAME = 'blog';

//     // Construct MongoDB connection URL with credentials and localhost
//     const MONGO_URL = `mongodb://localhost:27017/blog`;

//     try {
//         // Connect to MongoDB using the constructed URL
//         await mongoose.connect(MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Database connected successfully');
//     } catch (error) {
//         console.error('Error while connecting to the database ', error);
//     }
// };

// export default connectToDatabase;
