import TokenStorage from "../db/token";
import HttpClient from "../network/http";
import Socket from "../network/socket";

export type Tweet = {
  id: number;
  text: string;
  createdAt: string;
  name: string;
  username: string;
  url?: string;
};

export type TweetsList = Array<Tweet>;

interface TweetServiceInterface {
  getTweets: (username?: string) => Promise<TweetsList>;
  postTweet: (text: string) => Promise<Tweet>;
  deleteTweet: (tweetId: number) => Promise<void>;
  updateTweet: (tweetId: number, text: string) => Promise<Tweet>;
}

export default class TweetService implements TweetServiceInterface {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private socket: Socket
  ) {}

  async getTweets(username?: string) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
      headers: this.getHeader(),
    });
  }

  async postTweet(text: string) {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      headers: this.getHeader(),
      body: JSON.stringify({ text }),
    });
  }

  async deleteTweet(tweetId: number) {
    this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeader(),
    });
  }

  async updateTweet(tweetId: number, text: string) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      headers: this.getHeader(),
      body: JSON.stringify({ text }),
    });
  }

  private getHeader() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  onSync(callback: (tweet: Tweet) => void) {
    return this.socket.onSync("tweets", callback);
  }
}
