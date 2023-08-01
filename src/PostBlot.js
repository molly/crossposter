import Quill from "quill";
let Block = Quill.import("blots/block");

class PostBlot extends Block {
  static blotName = "post";
  static className = "post";
  static tagName = "div";
}

export default PostBlot;
