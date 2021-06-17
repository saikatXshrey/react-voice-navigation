import React, { useState } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import Home from "./Home";
import Blog from "./Blog";
import NewBlogPost from "./NewBlogPost";
import Contact from "./Contact";

const App = () => {
	const commands = [
		{
			command: ["Go to *", "Open *"],
			callback: (redirectPage) => setRedirectUrl(redirectPage),
		},
	];

	const { transcript } = useSpeechRecognition({ commands });

	const [redirectUrl, setRedirectUrl] = useState("");

	const pages = ["home", "blog", "new blog post", "contact"];
	const urls = {
		home: "/",
		blog: "/blog",
		"new blog post": "/blog/new",
		contact: "/contact",
	};

	if (!SpeechRecognition.browserSupportsSpeechRecognition) return null;

	let redirect = "";

	if (redirectUrl) {
		if (pages.includes(redirectUrl)) {
			redirect = <Redirect to={urls[redirectUrl]} />;
		} else {
			redirect = <p>Could not find page:{redirectUrl}</p>;
		}
	}

	return (
		<div className="App">
			<BrowserRouter>
				<div id="link">
					<Link to="/">Home</Link>
					<Link to="/blog">Blog</Link>
					<Link to="blog/new/">Add Blog</Link>
					<Link to="/contact">Contact</Link>
				</div>

				<Route path="/" exact component={Home} />
				<Route path="/blog" exact component={Blog} />
				<Route path="/blog/new" component={NewBlogPost} />
				<Route path="/contact" component={Contact} />

				{redirect}
			</BrowserRouter>
			<br />
			<br />
			<p id="transcript">Transcript:{transcript}</p>

			<button onClick={SpeechRecognition.startListening}>Speak</button>
		</div>
	);
};

export default App;
