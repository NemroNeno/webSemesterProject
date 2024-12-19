import mongoos from "mongoose";
const categorySchcema = new mongoos.Schema({
  name: {
    type: String,
    //required:true,
    //unique:true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoos.model("Category", categorySchcema);
