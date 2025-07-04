import React, { useState } from "react";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [generated, setGenerated] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const generateContent = async () => {
    if (!content) return alert("Please enter content to generate");

    // Simple dummy content generation — replace with actual AI call later
    const result = `Generated content based on: ${content}`;
    setGenerated(result);

    // Save to Firestore
    try {
      await addDoc(collection(db, "generatedContent"), {
        userId: user.uid,
        input: content,
        output: result,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      alert("Failed to save generated content: " + error.message);
    }
  };

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>ContentGenie Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10, width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 10, width: "100%" }}
        />
        <button onClick={handleSignIn} style={{ marginRight: 10 }}>Sign In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>ContentGenie</h2>
      <textarea
        placeholder="Enter text to generate content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: 100, marginBottom: 10 }}
      />
      <button onClick={generateContent}>Generate Content</button>
      {generated && (
        <div style={{ marginTop: 20 }}>
          <h3>Generated Content:</h3>
          <p>{generated}</p>
        </div>
      )}
    </div>
  );
}

export default App;
