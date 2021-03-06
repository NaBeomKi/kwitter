import { ChangeEvent, FormEvent, useState } from "react";
import TweetService, { Tweet } from "../service/tweet";

type NewTweetFormProps = {
  tweetService: TweetService;
  onError: (error: Error) => void;
};

const NewTweetForm = ({ tweetService, onError }: NewTweetFormProps) => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet)
      .then((created) => {
        setTweet("");
      })
      .catch(onError);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTweet(event.target.value);
  };

  return (
    <form className="tweet-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Edit your tweet"
        value={tweet}
        required
        autoFocus
        onChange={onChange}
        className="form-input tweet-input"
      />
      <button type="submit" className="form-btn">
        Post
      </button>
    </form>
  );
};

export default NewTweetForm;
