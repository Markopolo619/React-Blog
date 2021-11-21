import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import NewPost from "./Components/NewPost";
import PostPage from "./Components/PostPage";
import About from "./Components/About";
import Missing from "./Components/Missing";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Post 1",
      datetime: "2020-05-01",
      body: "Hello world",
    },
    {
      id: 2,
      title: "Post 2",
      datetime: "2020-05-02",
      body: "Hello world",
    },
    {
      id: 3,
      title: "Post 3",
      datetime: "2020-05-03",
      body: "Hello world",
    },
    {
      id: 4,
      title: "Post 4",
      datetime: "2020-05-04",
      body: "Hello world",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const history = useHistory();

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmt = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), "MMMM dd, yyyyy pp");
    const newPost = { id, title: postTitle, dateTime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    history.push("/");
  };
  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    history.push("/");
  };
  return (
    <div className="App">
      <Header title="React JS blog" />
      <Nav search={search} setSearch={setSearch}/>
      <Switch>
        <Route exact path="/">
          <Home posts={searchResults} />
        </Route>
        <Route exact path="/post">
          <NewPost
            handleSubmt={handleSubmt}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
        <Missing />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;