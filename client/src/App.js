import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApolloProvider from "./ApolloProvider";
import "./App.scss";
import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/messages";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <MessageProvider>
            <Container className="pt-5">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Container>
          </MessageProvider>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider >
  );
}

export default App;
