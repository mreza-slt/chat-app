import { Container } from "react-bootstrap";
import ApolloProvider from "./ApolloProvider";
import "./App.scss";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {

  return (
    <ApolloProvider>
      <BrowserRouter>
        <Container className="pt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
