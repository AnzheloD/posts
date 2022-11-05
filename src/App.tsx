import { Box } from "@mui/material";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import { store } from "./store/store";

const App = () => {
  return (
    <Box className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </Box>
  );
};

export default App;
