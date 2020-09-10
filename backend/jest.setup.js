//@Author ismael alves
import env from './config/environments'
import mongoose from 'mongoose'
import UtilsTest from './test/suport/utils'

beforeAll( async()=>{
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex: true,
    };
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(env.db.url, opts)
})

afterAll( async()=>{
    await mongoose.disconnect()
    //delete folders
    UtilsTest.deleteFolder([
        './src/public/uploads/produto',
    ])
})

