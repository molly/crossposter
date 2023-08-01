import "./styles.css";

import Quill from "quill";
import "quill-mention";
import PostBlot from "./PostBlot";

const postTypes = ["twitter", "mastodon", "bluesky"];

let twitterModified = false;
let mastodonModified = false;
let blueskyModified = false;

Quill.register("format/post", PostBlot);

const makeQuillConfig = (editor) => ({
  theme: "snow",
  formats: ["image", "mention", "post"],
  modules: {
    toolbar: { container: `#${editor}-toolbar` },
    mention: {
      mentionDenotationCharacters: ["@"],
      source: function (searchTerm, renderList, mentionChar) {
        const matches = [{ id: 1, value: "todo" }];
        renderList(matches, searchTerm);
      },
    },
  },
});

const originalEditor = new Quill("#original", makeQuillConfig("original"));
const twitterEditor = new Quill("#twitter", makeQuillConfig("twitter"));
const mastodonEditor = new Quill("#mastodon", makeQuillConfig("mastodon"));
const blueskyEditor = new Quill("#bluesky", makeQuillConfig("bluesky"));

originalEditor.on("text-change", function (delta, oldDelta, source) {
  if (!twitterModified) {
    twitterEditor.updateContents(delta);
  }
  if (!mastodonModified) {
    mastodonEditor.updateContents(delta);
  }
  if (!blueskyModified) {
    blueskyEditor.updateContents(delta);
  }
});
