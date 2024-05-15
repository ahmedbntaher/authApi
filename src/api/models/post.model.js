module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let PostSchema= new Schema ({
    title: { type: String, required: true},
    content: { type: String, required: true},
    slug: { type: String, required: true},
    tags: {type: Array},
    author: { type: String, required: true},
    published: {type: Boolean, enum: [true, false], default: true},
    }, {
    timestamps: true
    });
    PostSchema.method('toJSON', function(){
    const{_v,_id,...object}= this.toobject();
    object.id = id;
    return object;
    })
    const Post = mongoose.model('Post', PostSchema);
    return Post;
}