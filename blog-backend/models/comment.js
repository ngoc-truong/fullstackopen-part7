const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true, 
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blog"
	},
});

commentSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model("Comment", commentSchema);